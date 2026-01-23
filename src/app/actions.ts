'use server'

import { supabase } from '@/lib/supabase'
import { Invitation, InvitationStatus } from '@/lib/types'
import { revalidatePath } from 'next/cache'

export async function getInvitation(slug: string): Promise<{ data: Invitation | null; error: string | null }> {
    try {
        const { data, error } = await supabase
            .from('invitations')
            .select('*')
            .eq('slug', slug)
            .single()

        if (error) {
            // Extract error properties explicitly to avoid serialization issues
            const errorInfo = {
                message: error.message || 'Unknown error',
                code: error.code || 'NO_CODE',
                details: error.details || null,
                hint: error.hint || null
            }
            console.error(`[getInvitation] Supabase error for slug "${slug}":`, JSON.stringify(errorInfo, null, 2))
            return { data: null, error: errorInfo.message }
        }

        if (!data) {
            console.error(`[getInvitation] No data returned for slug: "${slug}"`)
            return { data: null, error: 'Invitation not found' }
        }

        return { data: data as Invitation, error: null }
    } catch (err) {
        // Handle non-Supabase errors (network, etc.)
        const errorMessage = err instanceof Error ? err.message : String(err)
        const errorName = err instanceof Error ? err.name : 'UnknownError'
        
        console.error(`[getInvitation] Exception for slug "${slug}":`, errorName, errorMessage)
        
        return { data: null, error: errorMessage || 'Failed to fetch invitation' }
    }
}

export async function markAsOpened(slug: string) {
    try {
        await supabase
            .from('invitations')
            .update({ opened_at: new Date().toISOString() })
            .eq('slug', slug)
            .is('opened_at', null) // Only update if not already opened? Optional.
    } catch (err) {
        console.error('Error marking as opened:', err)
    }
}

export async function respondToInvitation(slug: string, status: InvitationStatus) {
    if (status === 'pending') return { error: 'Invalid status' }

    try {
        // Check if already responded
        const { data: existing } = await supabase
            .from('invitations')
            .select('status')
            .eq('slug', slug)
            .single()

        if (!existing) return { error: 'Invitation not found' }
        if (existing.status !== 'pending') {
            return { error: 'You have already responded to this invitation.' }
        }

        const { error } = await supabase
            .from('invitations')
            .update({
                status,
                responded_at: new Date().toISOString()
            })
            .eq('slug', slug)

        if (error) throw error

        revalidatePath(`/invite/${slug}`)
        return { success: true }
    } catch (err) {
        console.error('Error responding:', err)
        return { error: 'Failed to submit response' }
    }
}

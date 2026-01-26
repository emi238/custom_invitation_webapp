'use server'

import { createClient } from '@supabase/supabase-js'
import { InvitationStatus } from '@/lib/types'

// Initialize Supabase Client with Service Role Key (Server-Side Only)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables in actions.ts')
}

// We use a getter or simple client creation to ensure we pick up the env vars at runtime if needed.
const getSupabase = () => createClient(supabaseUrl!, supabaseKey!)

// --- Community Signups ---

export async function submitCommunitySignup(email: string) {
    const supabase = getSupabase()

    try {
        const { error } = await supabase
            .from('community_signups')
            .insert([{ email }])

        if (error) {
            console.error('Supabase Error (Signup):', error)
            return { success: false, message: error.message }
        }
        return { success: true }
    } catch (err) {
        console.error('Unexpected Error (Signup):', err)
        return { success: false, message: 'An unexpected error occurred.' }
    }
}

// --- Events ---

export async function getPublicEvents() {
    const supabase = getSupabase()

    try {
        const { data, error } = await supabase
            .from('events')
            .select('*')
            .order('created_at', { ascending: true })

        if (error) {
            console.error('Supabase Error (Get Events):', error)
            return []
        }
        return data || []
    } catch (err) {
        console.error('Unexpected Error (Get Events):', err)
        return []
    }
}

// --- Invitations ---

export async function getInvitation(slug: string) {
    const supabase = getSupabase()

    try {
        const { data, error } = await supabase
            .from('invitations')
            .select('*')
            .eq('slug', slug)
            .single()

        return { data, error }
    } catch (error) {
        return { data: null, error }
    }
}

export async function respondToInvitation(slug: string, status: InvitationStatus) {
    const supabase = getSupabase()

    try {
        const { error } = await supabase
            .from('invitations')
            .update({
                status,
                responded_at: new Date().toISOString()
            })
            .eq('slug', slug)

        if (error) throw error
        return { success: true }
    } catch (error: any) {
        console.error('Error responding to invitation:', error)
        return { success: false, error: error.message }
    }
}

export async function markAsOpened(slug: string) {
    const supabase = getSupabase()

    try {
        // Only mark as opened if not already opened? Logic is usually fine to overwrite or check first.
        // For simplicity, just update opened_at if it's null, but SQL update is easier.
        const { error } = await supabase
            .from('invitations')
            .update({ opened_at: new Date().toISOString() })
            .eq('slug', slug)
            .is('opened_at', null) // Only update if currently null

        if (error) throw error
        return { success: true }
    } catch (error: any) {
        console.error('Error marking as opened:', error)
        return { success: false, error: error.message }
    }
}

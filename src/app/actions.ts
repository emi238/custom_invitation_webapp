'use server'

import { createClient } from '@supabase/supabase-js'
import { InvitationStatus } from '@/lib/types'

// Initialize Supabase Client with Service Role Key (Server-Side Only)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
    if (process.env.NODE_ENV === 'production') {
        console.error('Missing Supabase Service Role Key environment variables in actions.ts')
    }
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

export async function getUpcomingEvents() {
    const supabase = getSupabase()

    try {
        const { data, error } = await supabase
            .from('upcoming_events')
            .select('*')
            .order('event_timestamp', { ascending: true })

        if (error) {
            console.error('Supabase Error (Get Upcoming Events):', error)
            return []
        }

        if (!data) return []

        // Process photo URLs
        // If the user manually stored "filename.jpg", we need to convert to full public URL
        const events = data.map(event => {
            let finalPhotoUrl = event.photo_url?.trim()

            // If it doesn't start with http, assume it's a file path in the bucket
            if (finalPhotoUrl && !finalPhotoUrl.startsWith('http')) {
                const { data: { publicUrl } } = supabase.storage
                    .from('event_thumbnails')
                    .getPublicUrl(finalPhotoUrl)
                finalPhotoUrl = publicUrl
            }

            return {
                ...event,
                photo_url: finalPhotoUrl
            }
        })

        return events
    } catch (err) {
        console.error('Unexpected Error (Get Upcoming Events):', err)
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

// --- Community Polaroids ---

// --- Community Photos (General Community Section) ---

export async function getCommunityPhotos() {
    const supabase = getSupabase()

    try {
        const { data, error } = await supabase
            .from('community_photos')
            .select('*')

        if (error) {
            console.error('Supabase Error (Get Community Photos):', error)
            return []
        }

        if (!data) return []

        // Generate public URLs for each item server-side
        const photos = data.map(item => {
            const { data: { publicUrl } } = supabase.storage
                .from('photos')
                .getPublicUrl(item.storage_path)

            return {
                ...item,
                src: publicUrl
            }
        })

        return photos
    } catch (err) {
        console.error('Unexpected Error (Get Community Photos):', err)
        return []
    }
}

// --- Community Polaroids (Who We Are - Founders) ---

export async function getCommunityPolaroids() {
    const supabase = getSupabase()

    try {
        const { data, error } = await supabase
            .from('community_polaroids')
            .select('*')

        if (error) {
            console.error('Supabase Error (Get Polaroids):', error)
            return []
        }

        if (!data) return []

        // Generate public URLs for each item server-side
        const polaroids = data.map(item => {
            const { data: { publicUrl } } = supabase.storage
                .from('polaroids')
                .getPublicUrl(item.storage_path)

            return {
                ...item,
                src: publicUrl
            }
        })

        return polaroids
    } catch (err) {
        console.error('Unexpected Error (Get Polaroids):', err)
        return []
    }
}


// --- Community Board ---

export async function getPosts(type: 'internship' | 'cofounder' | 'event') {
    const supabase = getSupabase()

    try {
        if (type === 'internship') {
            const { data, error } = await supabase
                .from('internship_posts')
                .select(`
                    *,
                    roles:internship_roles(*)
                `)
                .order('created_at', { ascending: false })

            if (error) {
                console.error('Supabase Error (Get Internships):', error)
                return []
            }
            return data || []
        } else if (type === 'cofounder') {
            const { data, error } = await supabase
                .from('cofounder_posts')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) {
                console.error('Supabase Error (Get Cofounders):', error)
                return []
            }
            return data || []
        } else {
            const { data, error } = await supabase
                .from('board_posts')
                .select('*')
                .eq('type', type)
                .order('created_at', { ascending: false })

            if (error) {
                console.error(`Supabase Error (Get ${type}):`, error)
                return []
            }
            return data || []
        }

    } catch (err) {
        console.error(`Unexpected Error (Get ${type}):`, err)
        return []
    }
}

export async function createPost(type: 'internship' | 'cofounder' | 'event', content: any) {
    const supabase = getSupabase()

    try {
        if (type === 'internship') {
            // ... existing internship logic ...
            const { roles, ...postData } = content
            const { data: post, error: postError } = await supabase
                .from('internship_posts')
                .insert([postData])
                .select()
                .single()

            if (postError) throw postError

            if (roles && roles.length > 0) {
                const rolesWithId = roles.map((r: any) => ({
                    ...r,
                    internship_id: post.id
                }))
                const { error: rolesError } = await supabase
                    .from('internship_roles')
                    .insert(rolesWithId)
                if (rolesError) throw rolesError
            }
            return { success: true }

        } else if (type === 'cofounder') {
            const { error } = await supabase
                .from('cofounder_posts')
                .insert([content])

            if (error) {
                console.error('Supabase Error (Create Cofounder):', error)
                return { success: false, message: error.message }
            }
            return { success: true }

        } else {
            const { error } = await supabase
                .from('board_posts')
                .insert([{ type, ...content }])

            if (error) {
                console.error(`Supabase Error (Create ${type}):`, error)
                return { success: false, message: error.message }
            }
            return { success: true }
        }
        // ... existing createPost ...
    } catch (err: any) {
        console.error(`Unexpected Error (Create ${type}):`, err)
        return { success: false, message: err.message || 'An unexpected error occurred.' }
    }
}

export async function getCofounderPost(slug: string) {
    const supabase = getSupabase()

    try {
        const { data, error } = await supabase
            .from('cofounder_posts')
            .select('*')
            .eq('slug', slug)
            .single()

        return { data, error }
    } catch (error) {
        console.error('Unexpected Error (Get Cofounder Post):', error)
        return { data: null, error }
    }
}

// --- Storage ---

export async function uploadFile(formData: FormData) {
    const supabase = getSupabase()
    const file = formData.get('file') as File

    if (!file) {
        return { success: false, message: 'No file provided' }
    }

    try {
        const fileExt = file.name.split('.').pop()
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
        const filePath = `${fileName}`

        const { error: uploadError } = await supabase.storage
            .from('board-uploads')
            .upload(filePath, file)

        if (uploadError) {
            console.error('Supabase Storage Error:', uploadError)
            return { success: false, message: uploadError.message }
        }

        const { data: { publicUrl } } = supabase.storage
            .from('board-uploads')
            .getPublicUrl(filePath)

        return { success: true, url: publicUrl }
    } catch (error: any) {
        console.error('Upload Error:', error)
        return { success: false, message: error.message || 'Upload failed' }
    }
}

// --- Community Events ---

export async function uploadEventImage(formData: FormData) {
    const supabase = getSupabase()
    const file = formData.get('file') as File

    if (!file) {
        return { success: false, message: 'No file provided' }
    }

    try {
        const fileExt = file.name.split('.').pop()
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
        const filePath = `${fileName}`

        // Upload to 'event_thumbnails' bucket
        const { error: uploadError } = await supabase.storage
            .from('event_thumbnails')
            .upload(filePath, file)

        if (uploadError) {
            console.error('Supabase Storage Error (Event):', uploadError)
            return { success: false, message: uploadError.message }
        }

        const { data: { publicUrl } } = supabase.storage
            .from('event_thumbnails')
            .getPublicUrl(filePath)

        return { success: true, url: publicUrl }
    } catch (error: any) {
        console.error('Upload Event Image Error:', error)
        return { success: false, message: error.message || 'Upload failed' }
    }
}

export async function createEvent(eventData: any) {
    const supabase = getSupabase()

    try {
        const { error } = await supabase
            .from('upcoming_events')
            .insert([eventData])

        if (error) {
            console.error('Supabase Error (Create Event):', error)
            return { success: false, message: error.message }
        }
        return { success: true }
    } catch (err: any) {
        console.error('Unexpected Error (Create Event):', err)
        return { success: false, message: err.message || 'An unexpected error occurred.' }
    }
}

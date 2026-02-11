import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  // If we lack keys, we can't create a valid client.
  const missing = []
  if (!supabaseUrl) missing.push('NEXT_PUBLIC_SUPABASE_URL')
  if (!supabaseKey) missing.push('NEXT_PUBLIC_SUPABASE_ANON_KEY')

  if (process.env.NODE_ENV === 'production') {
    console.warn(`[supabase.ts] Missing Supabase keys: ${missing.join(', ')}. App might not work correctly.`)
  } else {
    // In dev, we might want to know, but throwing error in module scope crashes the app immediately.
    console.error(`[supabase.ts] Missing Supabase environment variables: ${missing.join(', ')}`)
  }
}

// Export the client directly.
const url = supabaseUrl || 'https://placeholder.supabase.co'
const key = supabaseKey || 'placeholder-key'

export const supabase = createClient(url, key, {
  auth: {
    autoRefreshToken: true,
    persistSession: true
  }
})

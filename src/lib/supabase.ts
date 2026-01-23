import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  // If we lack keys, we can't create a valid client.
  // In development, this provides a helpful error.
  // In production build, this might be hit if env vars aren't present.
  const missing = []
  if (!supabaseUrl) missing.push('NEXT_PUBLIC_SUPABASE_URL')
  if (!supabaseKey) missing.push('SUPABASE_SERVICE_ROLE_KEY')

  // Note: Throwing here will stop the build if this file is imported during build time
  // and env vars are missing.
  if (process.env.NODE_ENV === 'production') {
    console.warn(`[supabase.ts] Missing Supabase keys: ${missing.join(', ')}. Build might fail or app won't work.`)
  } else {
    throw new Error(`Missing Supabase environment variables: ${missing.join(', ')}`)
  }
}

// Log connection attempt in dev
if (process.env.NODE_ENV === 'development') {
  console.log('[supabase.ts] Initializing Supabase client.')
}

// Export the client directly. 
// Note: We use the '!' assertion or fallback string to satisfy TS if we warned above, 
// strictly speaking createClient expects strings.
// But if we threw, we won't reach here.
// To be safe for the "warn" case:
const url = supabaseUrl || ''
const key = supabaseKey || ''

export const supabase = createClient(url, key, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

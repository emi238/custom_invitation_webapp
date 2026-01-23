import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY // Use Service Role for backend actions to bypass RLS if needed, or enforce strict logic

if (!supabaseUrl || !supabaseKey) {
  const missing = []
  if (!supabaseUrl) missing.push('NEXT_PUBLIC_SUPABASE_URL')
  if (!supabaseKey) missing.push('SUPABASE_SERVICE_ROLE_KEY')
  const errorMsg = `Missing Supabase environment variables: ${missing.join(', ')}`
  console.error('[supabase.ts]', errorMsg)
  throw new Error(errorMsg)
}

// Log connection attempt (without exposing keys)
if (process.env.NODE_ENV === 'development') {
  console.log('[supabase.ts] Initializing Supabase client:', {
    url: supabaseUrl ? `${supabaseUrl.substring(0, 20)}...` : 'MISSING',
    hasKey: !!supabaseKey,
    keyLength: supabaseKey ? supabaseKey.length : 0
  })
}

let supabase
try {
  supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
} catch (err) {
  const errorMsg = err instanceof Error ? err.message : 'Failed to create Supabase client'
  console.error('[supabase.ts] Failed to initialize:', errorMsg)
  throw new Error(`Supabase initialization failed: ${errorMsg}`)
}

export { supabase }

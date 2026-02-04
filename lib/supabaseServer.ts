import { createClient } from '@supabase/supabase-js'

/**
 * Server-only Supabase client using the service role key.
 * 
 * IMPORTANT: This client bypasses RLS policies.
 * Only use this in server components, API routes, or Edge Functions
 * where you need elevated permissions.
 * 
 * For client components, use the regular supabase client from lib/supabase/client.ts
 */

export const supabaseServer = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      // Disable auto-refreshing on the server
      autoRefreshToken: false,
      // Disable persisting sessions on the server
      persistSession: false,
    },
  }
)

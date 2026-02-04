'use client'

import { createClient } from './client'
import { Session } from '@supabase/supabase-js'

// Store session in memory for client-side access
let session: Session | null = null

export function getSession(): Session | null {
  return session
}

export function setSession(s: Session | null) {
  session = s
}

export async function getCurrentUser() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export async function signOut() {
  const supabase = createClient()
  await supabase.auth.signOut()
  session = null
}

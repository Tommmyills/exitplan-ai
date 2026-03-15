import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function saveRelocPlan(data: {
  quiz_answers: object
  recommendations: object
  is_premium: boolean
  session_id: string
}) {
  if (!supabaseUrl || !supabaseAnonKey) return { data: null, error: null }
  
  const { data: result, error } = await supabase
    .from('reloc_plans')
    .insert([data])
    .select()
    .single()

  return { data: result, error }
}

export async function getRelocPlan(sessionId: string) {
  if (!supabaseUrl || !supabaseAnonKey) return { data: null, error: null }

  const { data, error } = await supabase
    .from('reloc_plans')
    .select('*')
    .eq('session_id', sessionId)
    .single()

  return { data, error }
}

export async function updatePremiumStatus(sessionId: string) {
  if (!supabaseUrl || !supabaseAnonKey) return { data: null, error: null }

  const { data, error } = await supabase
    .from('reloc_plans')
    .update({ is_premium: true })
    .eq('session_id', sessionId)
    .select()
    .single()

  return { data, error }
}

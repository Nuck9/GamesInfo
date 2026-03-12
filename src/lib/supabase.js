import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://ewsrxvudhvbhayiwmfge.supabase.co"
const supabaseKey = "sb_publishable_I1Td4yi_zwPIzgDiqMj8tw_L6KI0xQv"

export const supabase = createClient(supabaseUrl, supabaseKey)
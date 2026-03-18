/**
 * Responsabilidad:
 * - Crear e inicializar una instancia del cliente de Supabase
 * - Permitir interacción con:
 *   - Autenticación (Auth)
 *   - Base de datos
 */

import { createClient } from "@supabase/supabase-js"

/**
 * URL del proyecto en Supabase
 * 
 * Identifica el backend al que se conectará la aplicación
 */
const supabaseUrl = "https://ewsrxvudhvbhayiwmfge.supabase.co"

/**
 * Clave pública (anon key / publishable key)
 * 
 * IMPORTANTE:
 * - Esta clave es segura para usarse en frontend
 * - Está limitada por las políticas de seguridad (RLS)
 * - NO es una clave secreta
 */
const supabaseKey = "sb_publishable_I1Td4yi_zwPIzgDiqMj8tw_L6KI0xQv"

/**
 * Creación del cliente Supabase
 * 
 * Este objeto será utilizado en toda la aplicación
 * para interactuar con los servicios de Supabase
 */
export const supabase = createClient(supabaseUrl, supabaseKey)
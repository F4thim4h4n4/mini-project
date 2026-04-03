import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://jusnsrjupkspcwunbhbt.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1c25zcmp1cGtzcGN3dW5iaGJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0ODcyMjQsImV4cCI6MjA4NzA2MzIyNH0.RHxMJ3WHHGuzD8u7otbNW1EQIMoBMruoXWfpHSj_M0U'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

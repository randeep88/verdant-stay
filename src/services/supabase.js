import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://gzcmxhelgchblsdblxja.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6Y214aGVsZ2NoYmxzZGJseGphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE5MTczMDcsImV4cCI6MjA1NzQ5MzMwN30.ijnwmTZdBJPyXUze9c5bj9c5koWRZpwEkyMw4HPg-BU"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;
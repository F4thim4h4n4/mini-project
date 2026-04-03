import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://jusnsrjupkspcwunbhbt.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1c25zcmp1cGtzcGN3dW5iaGJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0ODcyMjQsImV4cCI6MjA4NzA2MzIyNH0.RHxMJ3WHHGuzD8u7otbNW1EQIMoBMruoXWfpHSj_M0U';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function check() {
  console.log("Checking 'student' table:");
  const res1 = await supabase.from('student').select('*').limit(5);
  console.log(res1.data || res1.error);

  console.log("Checking 'students' table:");
  const res2 = await supabase.from('students').select('*').limit(5);
  console.log(res2.data || res2.error);

  console.log("Checking 'admin' table:");
  const res3 = await supabase.from('admin').select('*').limit(5);
  console.log(res3.data || res3.error);
}

check();

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://jusnsrjupkspcwunbhbt.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1c25zcmp1cGtzcGN3dW5iaGJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0ODcyMjQsImV4cCI6MjA4NzA2MzIyNH0.RHxMJ3WHHGuzD8u7otbNW1EQIMoBMruoXWfpHSj_M0U';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function seed() {
  console.log("Seeding student...");
  const sRes = await supabase.from('student').insert([{
    email: 'johndoe@nexhostel.com',
    name: 'John Doe',
    password: 'password123',
    phone: '1234567890',
    dept: 'CS',
    year: '2'
  }]);
  console.log("Student:", sRes.error ? sRes.error : 'Success');

  console.log("Seeding admin...");
  const aRes = await supabase.from('admin').insert([{
    email: 'admin@nexhostel.com',
    password: 'adminpassword',
    name: 'Super Admin'
  }]);
  console.log("Admin:", aRes.error ? aRes.error : 'Success');
}

seed();

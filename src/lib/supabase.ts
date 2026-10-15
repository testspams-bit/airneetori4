import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

export type AccountRole = 'student_mentee' | 'mentor';

export const roleLabel = (role: AccountRole) =>
  role === 'student_mentee' ? 'Student Mentee' : 'Mentor';

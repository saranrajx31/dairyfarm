import { createClient } from '@supabase/supabase-js';

// Access environmental variables if available
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-dairy.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const isSupabaseConfigured = () => {
  return (
    import.meta.env.VITE_SUPABASE_URL &&
    import.meta.env.VITE_SUPABASE_ANON_KEY &&
    import.meta.env.VITE_SUPABASE_URL !== 'https://placeholder-dairy.supabase.co'
  );
};

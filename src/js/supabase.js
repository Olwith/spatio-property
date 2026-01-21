// Supabase Configuration
const SUPABASE_URL = "https://uszdeftivhahkofgenyc.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_A76mC6vVZU453e-og52GRQ_g4zycHuy";

// Initialize Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export { supabase };

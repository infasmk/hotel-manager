import { createClient } from '@supabase/supabase-js';

/**
 * Supabase client initialization.
 * The credentials below were provided to ensure direct connectivity.
 * When deploying to Vercel, it is recommended to set these in Environment Variables.
 */
const supabaseUrl = process.env.SUPABASE_URL || 'https://cqhohxofzuqfdulehfis.supabase.co';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'sb_publishable_fnvysd3AyoYASamtywIuWg_NPrNOrC2';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

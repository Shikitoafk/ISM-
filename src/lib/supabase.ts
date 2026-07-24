import { createClient, SupabaseClient } from '@supabase/supabase-js';

const PLACEHOLDER_PATTERNS = [
  'placeholder',
  'placeholder.supabase.co',
  'your-supabase-project',
  'your-anon-key-here',
  'your-anon-key',
  'invalid.local',
];

export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';
  if (!url.trim() || !key.trim()) return false;
  const combined = `${url} ${key}`.toLowerCase();
  return !PLACEHOLDER_PATTERNS.some((pattern) => combined.includes(pattern));
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

export const supabase: SupabaseClient = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createClient('https://invalid.local', 'invalid-key');

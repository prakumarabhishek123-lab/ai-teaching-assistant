import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() || "https://placeholder.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() || "placeholder-anon-key";

export const isSupabaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder") &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("your-project") &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() &&
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.includes("placeholder") &&
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.includes("your-anon-key")
);

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

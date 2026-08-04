import { createClient } from "@supabase/supabase-js";

// Publishable (anon) credentials — safe to ship in client code.
const supabaseUrl =
  (import.meta.env['VITE_SUPABASE_URL'] as string | undefined) ??
  "https://bkmbgyhrldolybyuebwj.supabase.co";
const supabaseAnonKey =
  (import.meta.env['VITE_SUPABASE_ANON_KEY'] as string | undefined) ??
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJrbWJneWhybGRvbHlieXVlYndqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU4MjIzMjUsImV4cCI6MjEwMTM5ODMyNX0.yjS-iPOldHUDBdEucyfNBjxKT5G7X07Z1vV-je1UTh8";

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: true, autoRefreshToken: true },
    })
  : null;

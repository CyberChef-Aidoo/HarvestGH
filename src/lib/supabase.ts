import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { config, isSupabaseConfigured } from "./config";

let client: SupabaseClient | null = null;

/**
 * Returns a singleton Supabase client, or null when credentials are not
 * configured (in which case pages fall back to demo data).
 */
export function getSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured) return null;
  if (!client) {
    client = createClient(config.supabaseUrl, config.supabaseAnon);
  }
  return client;
}

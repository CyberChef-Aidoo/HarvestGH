// ╔══════════════════════════════════════════════════════════════════╗
// ║  HARVESTGH CONFIGURATION — EDIT THIS FILE ONLY                  ║
// ║  Paste your Supabase credentials below, then push to GitHub.    ║
// ║  You only need to edit THIS ONE FILE — all pages use it.        ║
// ╚══════════════════════════════════════════════════════════════════╝

// ── SUPABASE ──────────────────────────────────────────────────────
// Get these from: supabase.com → Your Project → Settings → API
var SUPABASE_URL  = 'https://ebnztpyonsrccmbfqfuu.supabase.co';   // e.g. https://abcdefghij.supabase.co
var SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVibnp0cHlvbnNyY2NtYmZxZnV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY3NTMwOTQsImV4cCI6MjEwMjMyOTA5NH0.Ck0mxCi8JNOfG3EGfsFTCYI6LELSUC7qyw2Rpfs44uI'; // starts with eyJ...

// ── PAYSTACK ──────────────────────────────────────────────────────
// Get from: paystack.com → Settings → API Keys
// Use pk_test_... while testing, pk_live_... when going live
var PAYSTACK_KEY  = 'pk_test_YOUR_PAYSTACK_KEY_HERE';

// ── SUPPORT CONTACT ───────────────────────────────────────────────
var SUPPORT_PHONE = '0544823484';
var SUPPORT_WA    = '233544823484';

// ─────────────────────────────────────────────────────────────────
// DO NOT EDIT BELOW THIS LINE
// ─────────────────────────────────────────────────────────────────
window.HARVESTGH = {
  supabaseUrl:  SUPABASE_URL,
  supabaseAnon: SUPABASE_ANON,
  paystackKey:  PAYSTACK_KEY,
  phone:        SUPPORT_PHONE,
  whatsapp:     SUPPORT_WA,
};

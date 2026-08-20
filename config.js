// ╔══════════════════════════════════════════════════════════════════╗
// ║  HARVESTGH CONFIGURATION — EDIT THIS FILE ONLY                  ║
// ║  Paste your Supabase credentials below, then push to GitHub.    ║
// ║  You only need to edit THIS ONE FILE — all pages use it.        ║
// ╚══════════════════════════════════════════════════════════════════╝

// ── SUPABASE ──────────────────────────────────────────────────────
// Get these from: supabase.com → Your Project → Settings → API
var SUPABASE_URL  = 'YOUR_SUPABASE_URL_HERE';   // e.g. https://abcdefghij.supabase.co
var SUPABASE_ANON = 'YOUR_SUPABASE_ANON_KEY_HERE'; // starts with eyJ...

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

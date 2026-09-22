// Centralized runtime configuration sourced from environment variables.
export const config = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  supabaseAnon: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
  paystackKey: process.env.NEXT_PUBLIC_PAYSTACK_KEY || "pk_test_YOUR_PAYSTACK_KEY_HERE",
  supportPhone: process.env.NEXT_PUBLIC_SUPPORT_PHONE || "0544823484",
  supportWhatsApp: process.env.NEXT_PUBLIC_SUPPORT_WHATSAPP || "233544823484",
  anthropicKey: process.env.NEXT_PUBLIC_ANTHROPIC_KEY || "",
};

export const isSupabaseConfigured =
  !!config.supabaseUrl &&
  !!config.supabaseAnon &&
  !config.supabaseUrl.includes("your-project");

export const whatsappLink = (text?: string) =>
  `https://wa.me/${config.supportWhatsApp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

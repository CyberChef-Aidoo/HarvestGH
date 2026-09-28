// Centralized runtime configuration sourced from environment variables.
export const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000",
  paystackKey: process.env.NEXT_PUBLIC_PAYSTACK_KEY || "pk_test_YOUR_PAYSTACK_KEY_HERE",
  supportPhone: process.env.NEXT_PUBLIC_SUPPORT_PHONE || "0544823484",
  supportWhatsApp: process.env.NEXT_PUBLIC_SUPPORT_WHATSAPP || "233544823484",
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "hello@agrobridge.gh",
  supportCity: process.env.NEXT_PUBLIC_SUPPORT_CITY || "Accra",
  anthropicKey: process.env.NEXT_PUBLIC_ANTHROPIC_KEY || "",
};

export const whatsappLink = (text?: string) =>
  `https://wa.me/${config.supportWhatsApp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

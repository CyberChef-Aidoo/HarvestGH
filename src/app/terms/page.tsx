import type { Metadata } from "next";
import LegalDoc from "@/components/LegalDoc";
import { TERMS_SECTIONS } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The rules and agreements that govern your use of the agro Bridge platform.",
};

export default function TermsPage() {
  return (
    <LegalDoc
      title="Terms of Service"
      subtitle="The rules and agreements that govern your use of the agro Bridge platform."
      updated="January 2026 · Effective immediately"
      intro="Agrobridge matches farmer groups to verified buyers before harvest. Registration and listing are free. A 2% buyer fee applies only when a trade clears, and the FBO leader is paid 1% on qualifying group volume."
      sections={TERMS_SECTIONS}
    />
  );
}

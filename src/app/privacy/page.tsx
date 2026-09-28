import type { Metadata } from "next";
import LegalDoc from "@/components/LegalDoc";
import { PRIVACY_SECTIONS } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How agro Bridge collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <LegalDoc
      title="Privacy Policy"
      subtitle="How agro Bridge collects, uses, and protects your personal information."
      updated="January 2026"
      intro="agro Bridge is committed to protecting your privacy. We collect only what we need, use it only for connecting farmers to buyers, and never sell your personal information to anyone."
      sections={PRIVACY_SECTIONS}
    />
  );
}

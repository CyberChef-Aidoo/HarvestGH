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
      intro="agro Bridge connects farmers to buyers — we are a marketplace, not a party to any transaction. Registration and listing are free; we charge a 1–2% fee on completed deals. You are responsible for the accuracy of your listings."
      sections={TERMS_SECTIONS}
    />
  );
}

import type { Metadata } from "next";
import "./globals.css";
import Chatbot from "@/components/Chatbot";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import PageViewTracker from "@/components/PageViewTracker";

export const metadata: Metadata = {
  title: {
    default: "Agro Bridge — Connecting Farmers to Customers",
    template: "%s — Agro Bridge",
  },
  description:
    "Order fresh produce and poultry directly from verified FBO farmers across Ghana. Secure escrow payment. Nationwide delivery.",
  keywords: [
    "Ghana farm produce",
    "poultry Ghana",
    "buy fresh vegetables Ghana",
    "agricultural marketplace Ghana",
    "FBO farmers Ghana",
    "Agro Bridge",
    "farm to table Ghana",
  ],
  authors: [{ name: "Ibrahim Mohammed Lotsu" }],
  metadataBase: new URL("https://harvestgh.vercel.app"),
  openGraph: {
    type: "website",
    siteName: "Agro Bridge",
    title: "Agro Bridge — Connecting Farmers to Customers",
    description:
      "Order fresh produce and poultry directly from verified farms across Ghana. Secure payment. Nationwide delivery.",
    images: ["/images/market.jpg"],
  },
  icons: { icon: "/logo.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-body antialiased">
        {children}
        <PageViewTracker />
        <WhatsAppFloat />
        <Chatbot />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import "./globals.css";
import Chatbot from "@/components/Chatbot";
import PageViewTracker from "@/components/PageViewTracker";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const body = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

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
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="font-body antialiased">
        {children}
        <PageViewTracker />
        <Chatbot />
      </body>
    </html>
  );
}

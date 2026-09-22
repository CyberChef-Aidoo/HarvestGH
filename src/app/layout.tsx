import type { Metadata } from "next";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import "./globals.css";
import Chatbot from "@/components/Chatbot";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const sans = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "HarvestGH — Fresh Farm Produce Delivered Across Ghana",
    template: "%s — HarvestGH",
  },
  description:
    "Order fresh tomatoes, maize, yam, plantain and more directly from verified FBO farmers across Ghana. Secure escrow payment. Nationwide delivery.",
  keywords: [
    "Ghana farm produce",
    "buy fresh vegetables Ghana",
    "agricultural marketplace Ghana",
    "FBO farmers Ghana",
    "farm to table Ghana",
  ],
  authors: [{ name: "Ibrahim Mohammed Lotsu" }],
  metadataBase: new URL("https://harvestgh.vercel.app"),
  openGraph: {
    type: "website",
    siteName: "HarvestGH",
    title: "HarvestGH — Fresh Farm Produce Delivered Across Ghana",
    description:
      "Order fresh produce directly from verified farms across Ghana. Secure payment. Nationwide delivery.",
    images: ["/images/market.jpg"],
  },
  icons: { icon: "/logo.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        {children}
        <WhatsAppFloat />
        <Chatbot />
      </body>
    </html>
  );
}

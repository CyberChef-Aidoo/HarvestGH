import type { Metadata, Viewport } from "next";
import "./globals.css";
import Chatbot from "@/components/Chatbot";
import PageViewTracker from "@/components/PageViewTracker";

export const viewport: Viewport = {
  themeColor: "#7A3E2B",
};

export const metadata: Metadata = {
  title: {
    default: "Agrobridge — Match the harvest before it is picked",
    template: "Agrobridge — %s",
  },
  description:
    "Agrobridge connects farmer-based organisations to verified bulk buyers. FBOs list expected supply. Buyers pre-order. Payment is held until delivery. Pilot in the Eastern Region.",
  keywords: [
    "Ghana farm produce",
    "poultry Ghana",
    "FBO Ghana",
    "Eastern Region agriculture Ghana",
    "Agrobridge",
  ],
  metadataBase: new URL("https://agrobridge.gh"),
  openGraph: {
    type: "website",
    siteName: "Agrobridge",
    title: "Agrobridge — Match the harvest before it is picked",
    description:
      "Farmer-based organisations list expected crops and animal protein. Verified buyers pre-order. Escrow holds payment until delivery. Pilot in the Eastern Region.",
    images: ["/images/hero.jpg"],
  },
  icons: { icon: "/images/logo.jpeg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-body antialiased">
        {children}
        <PageViewTracker />
        <Chatbot />
      </body>
    </html>
  );
}

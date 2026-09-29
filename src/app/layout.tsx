import type { Metadata, Viewport } from "next";
import dynamic from "next/dynamic";
import "./globals.css";

const Chatbot = dynamic(() => import("@/components/Chatbot"), { ssr: false });
const PageViewTracker = dynamic(() => import("@/components/PageViewTracker"), { ssr: false });

export const viewport: Viewport = {
  themeColor: "#436A27",
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
  },
  icons: { icon: "/images/logo.jpeg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/fonts/inter-400.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/plus-jakarta-sans-700.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-body antialiased">
        {children}
        <PageViewTracker />
        <Chatbot />
      </body>
    </html>
  );
}

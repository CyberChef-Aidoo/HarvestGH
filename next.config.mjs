import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";

/** @type {import('next').NextConfig} */
const nextConfig = (phase) => ({
  distDir: phase === PHASE_DEVELOPMENT_SERVER ? ".next-dev" : ".next",
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/listings.html", destination: "/shop", permanent: true },
      { source: "/listings", destination: "/shop", permanent: true },
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/about.html", destination: "/about", permanent: true },
      { source: "/contact.html", destination: "/contact", permanent: true },
      { source: "/checkout.html", destination: "/checkout", permanent: true },
      { source: "/register-farmer.html", destination: "/register/farmer", permanent: true },
      { source: "/register-buyer.html", destination: "/register/buyer", permanent: true },
      { source: "/order-status.html", destination: "/order-status", permanent: true },
      { source: "/harvest-calendar.html", destination: "/harvest-calendar", permanent: true },
      { source: "/farmer-portal.html", destination: "/farmer-portal", permanent: true },
      { source: "/privacy.html", destination: "/privacy", permanent: true },
      { source: "/terms.html", destination: "/terms", permanent: true },
      { source: "/agent-portal.html", destination: "/agent-portal", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/fonts/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
});

export default nextConfig;

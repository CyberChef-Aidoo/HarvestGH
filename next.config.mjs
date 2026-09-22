/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
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
};

export default nextConfig;

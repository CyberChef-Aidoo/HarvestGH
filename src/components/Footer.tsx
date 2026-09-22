import Link from "next/link";
import { config, whatsappLink } from "@/lib/config";

const columns = [
  {
    title: "Marketplace",
    links: [
      { href: "/shop", label: "Shop all produce" },
      { href: "/shop?type=preorder", label: "Preorder items" },
      { href: "/harvest-calendar", label: "Crop calendar" },
      { href: "/order-status", label: "Track my order" },
    ],
  },
  {
    title: "Suppliers",
    links: [
      { href: "/register/farmer", label: "Register as supplier" },
      { href: "/farmer-portal", label: "Check my listing" },
      { href: "/agent-portal", label: "FBO agent login" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About Agro Bridge" },
      { href: "/contact", label: "Contact us" },
      { href: "/register/buyer", label: "Register as buyer" },
      { href: "/privacy", label: "Privacy policy" },
      { href: "/terms", label: "Terms of service" },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0a1a12] px-6 pt-16 text-white">
      <div className="mx-auto grid max-w-content gap-9 border-b border-white/[0.07] pb-12 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_1.2fr]">
        <div>
          <div className="mb-3 inline-block rounded-lg bg-white px-2.5 py-1.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="Agro Bridge" className="h-9 w-auto object-contain" />
          </div>
          <p className="mb-4 max-w-[280px] caption leading-relaxed text-white/55">
            Connecting farmers to customers — verified FBO produce and poultry for households,
            restaurants, and retailers.
          </p>
          <div className="flex gap-2">
            {[
              { href: whatsappLink(), label: "WhatsApp" },
              { href: "https://instagram.com/agrobridge", label: "Instagram" },
              { href: "https://facebook.com/agrobridge", label: "Facebook" },
              { href: "https://twitter.com/agrobridge", label: "X" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                title={s.label}
                className="flex h-9 w-9 items-center justify-center rounded-[9px] border border-white/10 bg-white/[0.06] text-xs transition hover:-translate-y-0.5 hover:border-gold hover:bg-green"
              >
                {s.label[0]}
              </a>
            ))}
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <div className="mb-3.5 text-xs font-semibold uppercase tracking-[0.1em] text-white/85">
              {col.title}
            </div>
            <ul className="flex list-none flex-col gap-2.5">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="caption text-white/45 transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <div className="mb-3.5 text-xs font-semibold uppercase tracking-[0.1em] text-white/85">
            Contact
          </div>
          <div className="mb-3 caption leading-snug text-white/45">
            <strong className="mb-0.5 block text-[0.78rem] text-white/70">Phone / WhatsApp</strong>
            <a href={`tel:${config.supportPhone}`} className="tabular">
              {config.supportPhone}
            </a>
          </div>
          <div className="mb-3 caption leading-snug text-white/45">
            <strong className="mb-0.5 block text-[0.78rem] text-white/70">Email</strong>
            <a href={`mailto:${config.supportEmail}`}>{config.supportEmail}</a>
          </div>
          <div className="caption leading-snug text-white/45">
            <strong className="mb-0.5 block text-[0.78rem] text-white/70">Location</strong>
            {config.supportCity}, Ghana
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-content py-5">
        <p className="m-0 max-w-none caption leading-relaxed text-white/40">
          © {year} Agro Bridge. Verified farmers · Secure escrow · Nationwide delivery.{" "}
          <a href={`mailto:${config.supportEmail}`} className="hover:text-white/70">
            {config.supportEmail}
          </a>{" "}
          ·{" "}
          <a href={`tel:${config.supportPhone}`} className="tabular hover:text-white/70">
            {config.supportPhone}
          </a>{" "}
          · {config.supportCity}, Ghana
        </p>
        <div className="mt-3 flex gap-4">
          <Link href="/privacy" className="caption text-white/40 transition-colors hover:text-white/60">
            Privacy
          </Link>
          <Link href="/terms" className="caption text-white/40 transition-colors hover:text-white/60">
            Terms
          </Link>
          <Link href="/contact" className="caption text-white/40 transition-colors hover:text-white/60">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}

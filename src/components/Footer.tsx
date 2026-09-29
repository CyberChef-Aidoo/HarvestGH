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
      { href: "/about", label: "About Agrobridge" },
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
    <footer className="bg-brand-900 px-6 pt-16 text-white">
      <div className="mx-auto grid max-w-content gap-9 border-b border-white/[0.07] pb-12 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_1.2fr]">
        <div>
          <div className="mb-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/Agrobridge_logo.png"
              alt="Agrobridge"
              className="h-14 w-auto max-w-[220px] object-contain object-left"
              loading="lazy"
              decoding="async"
            />
          </div>
          <p className="mb-4 max-w-[280px] caption leading-relaxed text-white/55">
            Connecting farmer groups to verified bulk buyers. Match the harvest before it is
            picked. Escrow until delivery. Pilot in the Eastern Region.
          </p>
          <div className="flex gap-2">
            {[
              { href: whatsappLink(), label: "WhatsApp", icon: (
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.888 3.488"/>
                </svg>
              )},
              { href: "https://instagram.com/agrobridge", label: "Instagram", icon: (
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              )},
              { href: "https://facebook.com/agrobridge", label: "Facebook", icon: (
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              )},
              { href: "https://twitter.com/agrobridge", label: "X", icon: (
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
                </svg>
              )},
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                title={s.label}
                className="flex h-9 w-9 items-center justify-center rounded-[9px] border border-white/10 bg-white/[0.06] text-white transition hover:-translate-y-0.5 hover:border-accent-500 hover:bg-accent-500 hover:text-ink"
              >
                {s.icon}
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
            <a href={config.supportPhoneHref} className="tabular">
              {config.supportPhone}
            </a>
          </div>
          <div className="mb-3 caption leading-snug text-white/45">
            <strong className="mb-0.5 block text-[0.78rem] text-white/70">Email</strong>
            <a href={`mailto:${config.supportEmail}`}>{config.supportEmail}</a>
          </div>
          <div className="caption leading-snug text-white/45">
            <strong className="mb-0.5 block text-[0.78rem] text-white/70">Location</strong>
            Eastern Region, Ghana
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-content py-5">
        <p className="m-0 max-w-none caption leading-relaxed text-white/40">
          © {year} Agrobridge · Eastern Region pilot · Call or WhatsApp 054 411 4198 · GPS EN-004-8921{" "}
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

import Link from "next/link";
import { config } from "@/lib/config";
import Icon from "@/components/Icon";

const columns = [
  {
    title: "Marketplace",
    links: [
      { href: "/shop", label: "Shop all produce" },
      { href: "/order-status", label: "Track my order" },
      { href: "/harvest-calendar", label: "Crop calendar" },
    ],
  },
  {
    title: "Suppliers",
    links: [
      { href: "/register/farmer", label: "Register your FBO" },
      { href: "/farmer-portal", label: "Check my listing" },
      { href: "/about", label: "About Agro Bridge" },
      { href: "/contact", label: "Contact us" },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0a1a12] px-6 pt-14 text-white">
      <div className="mx-auto grid max-w-content gap-10 border-b border-white/[0.07] pb-10 md:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
        <div>
          <div className="mb-3 inline-block bg-white px-2.5 py-1.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="Agro Bridge" className="h-9 w-auto object-contain" />
          </div>
          <p className="mb-0 max-w-[280px] caption leading-relaxed text-white/55">
            Escrow marketplace for verified FBO produce and poultry across Ghana.
          </p>
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
            <a href={`tel:${config.supportPhone}`} className="tabular hover:text-white">
              {config.supportPhone}
            </a>
          </div>
          <div className="mb-3 caption leading-snug text-white/45">
            <a href={`mailto:${config.supportEmail}`} className="hover:text-white">
              {config.supportEmail}
            </a>
          </div>
          <div className="caption leading-snug text-white/45">
            {config.supportCity}, Ghana
          </div>
          <a
            href={`https://wa.me/${config.supportWhatsApp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 caption text-white/55 hover:text-white"
          >
            <Icon name="message-circle" size="sm" />
            WhatsApp
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-content py-5">
        <p className="m-0 max-w-none caption leading-relaxed text-white/40">
          © {year} Agro Bridge. Verified farmers · Secure escrow · Nationwide delivery.{" "}
          {config.supportEmail} · {config.supportPhone} · {config.supportCity}, Ghana
        </p>
        <div className="mt-3 flex gap-4">
          <Link href="/privacy" className="caption text-white/40 hover:text-white/60">
            Privacy
          </Link>
          <Link href="/terms" className="caption text-white/40 hover:text-white/60">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}

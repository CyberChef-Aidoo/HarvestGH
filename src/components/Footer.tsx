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
      { href: "/about", label: "About HarvestGH" },
      { href: "/contact", label: "Contact us" },
      { href: "/register/buyer", label: "Register as buyer" },
      { href: "/privacy", label: "Privacy policy" },
      { href: "/terms", label: "Terms of service" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#060e09] px-6 pt-16 text-white">
      <div className="mx-auto grid max-w-content gap-9 border-b border-white/[0.07] pb-12 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_1.2fr]">
        <div>
          <div className="mb-3 font-display text-[1.35rem] font-extrabold">
            Harvest<span className="text-gold">GH</span>
          </div>
          <p className="mb-4 max-w-[280px] text-[0.84rem] leading-relaxed text-white/40">
            Ghana&apos;s agricultural marketplace connecting smallholder FBO farmers to verified
            bulk buyers — reducing post-harvest loss and raising farmer income.
          </p>
          <div className="flex gap-2">
            {[
              { href: whatsappLink(), label: "WhatsApp" },
              { href: "https://instagram.com/harvestgh", label: "Instagram" },
              { href: "https://facebook.com/harvestgh", label: "Facebook" },
              { href: "https://twitter.com/harvestgh", label: "X" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                title={s.label}
                className="flex h-9 w-9 items-center justify-center rounded-[9px] border border-white/10 bg-white/[0.06] text-xs transition hover:-translate-y-0.5 hover:border-green hover:bg-green"
              >
                {s.label[0]}
              </a>
            ))}
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <div className="mb-3.5 text-xs font-bold uppercase tracking-[0.1em] text-white/85">
              {col.title}
            </div>
            <ul className="flex list-none flex-col gap-2.5">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[0.84rem] text-white/40 transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <div className="mb-3.5 text-xs font-bold uppercase tracking-[0.1em] text-white/85">
            Contact
          </div>
          <div className="mb-3 text-[0.84rem] leading-snug text-white/40">
            <strong className="mb-0.5 block text-[0.78rem] text-white/70">Phone / WhatsApp</strong>
            <a href={`tel:${config.supportPhone}`}>{config.supportPhone}</a>
          </div>
          <div className="mb-3 text-[0.84rem] leading-snug text-white/40">
            <strong className="mb-0.5 block text-[0.78rem] text-white/70">Location</strong>
            Accra, Ghana
          </div>
          <div className="text-[0.84rem] leading-snug text-white/40">
            <strong className="mb-0.5 block text-[0.78rem] text-white/70">Support</strong>
            Mon–Fri 7am–8pm · Sat 8am–6pm
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-content flex-wrap items-center justify-between gap-2.5 py-5 text-[0.74rem] text-white/28">
        <span>© 2026 HarvestGH · Accra, Ghana · Founder: Ibrahim Mohammed Lotsu</span>
        <div className="flex gap-4">
          <Link href="/privacy" className="transition-colors hover:text-white/60">
            Privacy
          </Link>
          <Link href="/terms" className="transition-colors hover:text-white/60">
            Terms
          </Link>
          <Link href="/contact" className="transition-colors hover:text-white/60">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}

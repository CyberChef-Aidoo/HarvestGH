"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/data";
import { BrandLink, BrandWordmark } from "@/components/BrandMark";
import Icon from "@/components/Icon";

interface NavbarProps {
  /** @deprecated Ignored — navbar is always solid cream. Kept for call-site compatibility. */
  variant?: "hero" | "solid";
  /** Hide the header supplier CTA (homepage — CTA lives in hero). */
  hideSupplierCta?: boolean;
}

export default function Navbar({ hideSupplierCta = false }: NavbarProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-[200] flex h-[68px] items-center justify-between border-b border-line bg-cream px-[5%]">
        <BrandLink size="md" withText />

        <ul className="hidden list-none items-center gap-0.5 md:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="nav-link rounded-[6px] px-3.5 py-2 text-ink transition-colors hover:bg-green-pale hover:text-green"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          {!hideSupplierCta && (
            <Link href="/register/farmer" className="btn btn-sm btn-ghost">
              Register your FBO
            </Link>
          )}
          <Link href="/shop" className="btn btn-sm btn-gold">
            Order now
          </Link>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center text-ink md:hidden"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <Icon name="menu" size="lg" />
        </button>
      </nav>

      <div
        className={[
          "fixed inset-0 z-[299] bg-black/40 transition-opacity duration-200 md:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
        onClick={() => setOpen(false)}
      />
      <aside
        className={[
          "fixed left-0 top-0 z-[300] flex h-full w-[min(300px,88vw)] flex-col overflow-y-auto bg-green transition-transform duration-200 md:hidden",
          open ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <div className="flex items-center justify-between border-b border-white/10 p-5">
          <BrandWordmark light className="text-xl" />
          <button
            className="flex h-10 w-10 items-center justify-center text-white/50"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <Icon name="x" size="lg" />
          </button>
        </div>
        <nav className="flex flex-1 flex-col gap-0.5 p-3">
          <Link
            href="/"
            className="rounded-[6px] px-3 py-3 text-[0.92rem] font-medium text-white/70 transition hover:bg-white/[0.07] hover:text-white"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-[6px] px-3 py-3 text-[0.92rem] font-medium text-white/70 transition hover:bg-white/[0.07] hover:text-white"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/farmer-portal"
            className="rounded-[6px] px-3 py-3 text-[0.92rem] font-medium text-white/70 transition hover:bg-white/[0.07] hover:text-white"
            onClick={() => setOpen(false)}
          >
            Check my listing
          </Link>
        </nav>
        <div className="flex flex-col gap-2.5 border-t border-white/10 p-4">
          <Link
            href="/shop"
            className="rounded-[6px] bg-gold py-3 text-center text-sm font-bold text-charcoal"
            onClick={() => setOpen(false)}
          >
            Browse listings
          </Link>
          {!hideSupplierCta && (
            <Link
              href="/register/farmer"
              className="rounded-[6px] border border-white/12 bg-white/[0.07] py-3 text-center text-sm font-semibold text-white/80"
              onClick={() => setOpen(false)}
            >
              Register your FBO
            </Link>
          )}
        </div>
      </aside>
    </>
  );
}

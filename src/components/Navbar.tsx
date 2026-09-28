"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/data";
import { BrandLink, BrandWordmark } from "@/components/BrandMark";
import Icon from "@/components/Icon";

interface NavbarProps {
  /** "hero" starts solid white, then glassmorphic on scroll. "solid" is always opaque. */
  variant?: "hero" | "solid";
  /** Hide the header "Become a Supplier" CTA (homepage — CTA lives in hero). */
  hideSupplierCta?: boolean;
}

export default function Navbar({ variant = "solid", hideSupplierCta = false }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (variant !== "hero") return;
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [variant]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const glass = variant === "hero" && scrolled;

  return (
    <>
      <nav
        className={[
          "fixed inset-x-0 top-0 z-[200] flex h-[68px] items-center justify-between px-[5%] transition-all duration-300",
          glass
            ? "border-b border-white/40 bg-white/55 shadow-[0_8px_32px_rgba(12,26,17,0.08)] backdrop-blur-xl backdrop-saturate-150"
            : "border-b border-line bg-white",
        ].join(" ")}
      >
        <BrandLink size="md" withText />

        <ul className="hidden list-none items-center gap-0.5 md:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="nav-link rounded-lg px-3.5 py-2 text-ink transition-colors hover:bg-green-pale hover:text-green"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          {!hideSupplierCta && (
            <Link href="/register/farmer" className="btn btn-sm btn-ghost">
              Become a Supplier
            </Link>
          )}
          <Link href="/shop" className="btn btn-sm btn-gold">
            Order Now
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
          "fixed inset-0 z-[299] bg-black/55 transition-opacity duration-300 md:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
        onClick={() => setOpen(false)}
      />
      <aside
        className={[
          "fixed left-0 top-0 z-[300] flex h-full w-[min(300px,88vw)] flex-col overflow-y-auto bg-dark transition-transform duration-300 md:hidden",
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
            className="rounded-[9px] px-3 py-3 text-[0.92rem] font-medium text-white/70 transition hover:bg-white/[0.07] hover:text-white"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-[9px] px-3 py-3 text-[0.92rem] font-medium text-white/70 transition hover:bg-white/[0.07] hover:text-white"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/farmer-portal"
            className="rounded-[9px] px-3 py-3 text-[0.92rem] font-medium text-white/70 transition hover:bg-white/[0.07] hover:text-white"
            onClick={() => setOpen(false)}
          >
            Check My Listing
          </Link>
        </nav>
        <div className="flex flex-col gap-2.5 border-t border-white/10 p-4">
          <Link
            href="/shop"
            className="rounded-[10px] bg-gold py-3 text-center text-sm font-bold text-dark"
            onClick={() => setOpen(false)}
          >
            Shop Produce
          </Link>
          <Link
            href="/register/farmer"
            className={[
              "rounded-[10px] border border-white/12 bg-white/[0.07] py-3 text-center text-sm font-semibold text-white/80",
              hideSupplierCta ? "hidden" : "",
            ].join(" ")}
            onClick={() => setOpen(false)}
          >
            Become a Supplier
          </Link>
        </div>
      </aside>
    </>
  );
}

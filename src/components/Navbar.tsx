"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/data";

interface NavbarProps {
  /** "hero" is transparent over a dark hero and turns solid on scroll. "solid" is always solid. */
  variant?: "hero" | "solid";
}

export default function Navbar({ variant = "solid" }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (variant !== "hero") return;
    const onScroll = () => setScrolled(window.scrollY > 60);
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

  const transparent = variant === "hero" && !scrolled;

  return (
    <>
      <nav
        className={[
          "fixed inset-x-0 top-0 z-[200] flex h-[68px] items-center justify-between px-[5%] transition-all duration-300",
          transparent
            ? "bg-transparent"
            : "border-b border-line bg-cream/95 backdrop-blur-md shadow-[0_4px_24px_rgba(12,26,17,0.05)]",
        ].join(" ")}
      >
        <Link
          href="/"
          className={[
            "flex items-center gap-2.5 font-display text-[1.35rem] font-extrabold tracking-tight",
            transparent ? "text-white" : "text-green",
          ].join(" ")}
        >
          <img
            src="/logo.png"
            alt=""
            className="h-8 w-auto"
            onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
          />
          Harvest<span className="text-gold">GH</span>
        </Link>

        <ul className="hidden list-none items-center gap-0.5 md:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={[
                  "rounded-lg px-3.5 py-2 text-[0.88rem] font-medium transition-colors",
                  transparent
                    ? "text-white/90 hover:bg-white/10 hover:text-white"
                    : "text-ink hover:bg-green-pale hover:text-green",
                ].join(" ")}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/register/farmer"
            className={["btn btn-sm", transparent ? "btn-ghost-light" : "btn-ghost"].join(" ")}
          >
            Become a Supplier
          </Link>
          <Link href="/shop" className="btn btn-sm btn-gold">
            Order Now
          </Link>
        </div>

        <button
          className={["p-1.5 text-2xl md:hidden", transparent ? "text-white" : "text-ink"].join(" ")}
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          ☰
        </button>
      </nav>

      {/* Mobile drawer */}
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
          <span className="font-display text-xl font-extrabold text-white">
            Harvest<span className="text-gold">GH</span>
          </span>
          <button
            className="text-2xl text-white/50"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>
        <nav className="flex-1 p-3">
          <Link href="/" className="mob-link" onClick={() => setOpen(false)}>
            Home
          </Link>
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="mob-link" onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link href="/farmer-portal" className="mob-link" onClick={() => setOpen(false)}>
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
            className="rounded-[10px] border border-white/12 bg-white/[0.07] py-3 text-center text-sm font-semibold text-white/80"
            onClick={() => setOpen(false)}
          >
            Become a Supplier
          </Link>
        </div>
      </aside>

      <style jsx>{`
        .mob-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px;
          border-radius: 9px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.92rem;
          font-weight: 500;
          transition: background 0.2s, color 0.2s;
        }
        .mob-link:hover {
          background: rgba(255, 255, 255, 0.07);
          color: #fff;
        }
      `}</style>
    </>
  );
}

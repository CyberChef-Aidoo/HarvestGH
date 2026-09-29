"use client";

import { memo, Suspense, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Icon from "@/components/Icon";
import { fetchProducts } from "@/lib/api";
import { REGIONS } from "@/lib/data";
import { config } from "@/lib/config";
import { DEMO_PRODUCTS } from "@/lib/demo-products";
import type { Product } from "@/lib/types";

const SHOP_DEMO: Product[] = DEMO_PRODUCTS;

function fmtDate(d?: string | null) {
  if (!d) return "soon";
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

const ShopCard = memo(function ShopCard({ p }: { p: Product }) {
  const [imgError, setImgError] = useState(false);
  const remaining = Math.max(0, Number(p.quantity_available) - Number(p.sold_quantity || 0));
  const isOut = p.status === "out_of_stock" || remaining <= 0;
  const isPre = p.is_preorder || p.status === "preorder";
  const min = p.min_order ?? 1;
  const isLow = !isOut && !isPre && remaining <= min * 3;

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-brand-100 bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-soft">
      <div className="relative h-44 overflow-hidden bg-brand-100">
        {imgError || !p.image_url ? (
          <div className="flex h-full w-full items-center justify-center p-4 text-center font-display text-sm font-bold text-brand-700">
            {p.name}
          </div>
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={p.image_url}
            alt={p.name}
            className="h-full w-full object-cover"
            width={800}
            height={600}
            onError={() => setImgError(true)}
            loading="lazy"
            decoding="async"
          />
        )}
        <div className="absolute left-2.5 top-2.5 flex flex-wrap gap-1.5">
          {isPre && <span className="rounded-full bg-accent-50 px-2.5 py-1 text-[0.68rem] font-bold text-brand-700">Preorder</span>}
          {isOut && <span className="rounded-full bg-black/10 px-2.5 py-1 text-[0.68rem] font-bold text-ink-muted">Out of stock</span>}
          {isLow && <span className="rounded-full bg-accent-50 px-2.5 py-1 text-[0.68rem] font-bold text-brand-700">Low stock</span>}
          {!isPre && !isOut && !isLow && <span className="rounded-full bg-brand-100 px-2.5 py-1 text-[0.68rem] font-bold text-brand-700">In stock</span>}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-1 text-[0.7rem] font-bold uppercase tracking-[0.06em] text-ink-muted">
          {p.crop_type}
        </div>
        <h3 className="font-display text-[1.05rem] font-bold leading-tight">{p.name}</h3>
        <div className="mb-2.5 mt-1 text-[0.76rem] text-ink-muted">
          {p.region}
          {p.fbo_source ? ` · ${p.fbo_source}` : ""}
        </div>
        <div className="mb-2.5 flex items-end justify-between">
          <div className="font-display text-[1.4rem] font-extrabold leading-none text-brand-700">
            GH₵{Number(p.price_per_unit).toFixed(2)}
            <span className="block font-sans text-[0.72rem] font-medium text-ink-muted">per {p.unit}</span>
          </div>
          <div className="text-right">
            <div className="text-[0.9rem] font-bold text-ink">
              {isOut ? "—" : `${remaining} ${p.unit}${remaining !== 1 ? "s" : ""}`}
            </div>
            <div className="text-[0.7rem] text-ink-muted">{isOut ? "sold out" : "available"}</div>
          </div>
        </div>
        <div className="mb-3 flex flex-wrap gap-1.5">
          <span className="rounded-md bg-surface px-2.5 py-1 text-[0.72rem] font-semibold text-ink-muted">
            Min: {min} {p.unit}
            {min > 1 ? "s" : ""}
          </span>
          {isPre && p.available_date && (
            <span className="rounded-md bg-surface px-2.5 py-1 text-[0.72rem] font-semibold text-ink-muted">
              {fmtDate(p.available_date)}
            </span>
          )}
        </div>
        {isPre && (
          <div className="mb-3 rounded-lg bg-accent-50 px-3 py-2 text-[0.78rem] font-medium text-brand-700">
            Preorder now — available {fmtDate(p.available_date)}. Pay a deposit to reserve stock.
          </div>
        )}
        <div className="mt-auto">
          {isOut ? (
            <button
              disabled
              className="btn btn-block cursor-not-allowed bg-surface text-ink-faint"
            >
              Out of stock
            </button>
          ) : isPre ? (
            <Link href={`/checkout?id=${p.id}&type=preorder`} className="btn btn-block btn-accent">
              Preorder
            </Link>
          ) : (
            <Link href={`/checkout?id=${p.id}&type=direct`} className="btn btn-block btn-primary">
              Order now
            </Link>
          )}
        </div>
      </div>
    </div>
  );
});

function ShopInner() {
  const params = useSearchParams();
  const [products, setProducts] = useState<Product[]>(SHOP_DEMO);
  const [crop, setCrop] = useState("");
  const [region, setRegion] = useState("");
  const [type, setType] = useState(params.get("type") === "preorder" ? "preorder" : "");
  const [search, setSearch] = useState("");
  const [cropOptions, setCropOptions] = useState(() =>
    Array.from(new Set(SHOP_DEMO.map((p) => p.crop_type))).sort(),
  );
  const heroVideo = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = heroVideo.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    video.src = "/images/shop-bg.mp4";
    video.load();
    void video.play().catch(() => undefined);
  }, []);

  useEffect(() => {
    let active = true;
    const handle = window.setTimeout(() => {
      const params: Record<string, string> = {};
      if (crop) params.crop = crop;
      if (region) params.region = region;
      if (type === "preorder") params.preorder = "1";
      if (type === "available") params.status = "available";
      if (search.trim()) params.search = search.trim();
      void fetchProducts(params).then((data) => {
        if (!active || data === null) return;
        setProducts(data);
        if (!crop && !region && !type && !search.trim()) {
          setCropOptions(Array.from(new Set(data.map((p) => p.crop_type))).sort());
        }
      });
    }, search.trim() ? 300 : 0);
    return () => {
      active = false;
      window.clearTimeout(handle);
    };
  }, [crop, region, type, search]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return products.filter((p) => {
      if (crop && p.crop_type !== crop) return false;
      if (region && p.region !== region) return false;
      const isPre = p.is_preorder || p.status === "preorder";
      if (type === "available" && (isPre || p.status === "out_of_stock")) return false;
      if (type === "preorder" && !isPre) return false;
      if (q && ![p.name, p.crop_type, p.region, p.fbo_source || ""].join(" ").toLowerCase().includes(q))
        return false;
      return true;
    });
  }, [products, crop, region, type, search]);

  return (
    <>
      <header className="relative overflow-hidden bg-brand-900 px-[5%] pb-12 pt-[calc(68px+40px)] text-white">
        <video
          ref={heroVideo}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
          muted
          loop
          playsInline
          preload="none"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(120deg,rgba(43,68,25,0.90),rgba(67,106,39,0.78))]"
          aria-hidden
        />
        <div className="relative z-10 mx-auto max-w-content">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-red-600">Marketplace</p>
          <h1 className="mb-3 mt-3 font-display text-[clamp(1.9rem,4vw,2.7rem)] font-extrabold leading-[1.12] tracking-tight text-white">
            What is on the board
          </h1>
          <p className="max-w-[36rem] leading-relaxed text-white/70">
            Expected supply from verified FBOs, plus lots already in stock. Pilot trades are in the
            Eastern Region. To order by phone, call or WhatsApp 054 411 4198.
          </p>
          <p className="mt-3.5 text-[0.9rem] font-semibold text-white/90">
            Order by phone:{" "}
            <a href="tel:+233544114198" className="text-red-600 underline underline-offset-4">
              054 411 4198
            </a>
          </p>
        </div>
      </header>

      {/* Filters */}
      <div className="sticky top-[68px] z-40 border-b border-brand-100 bg-white/95 px-[5%] py-3 backdrop-blur-md">
        <div className="mx-auto flex max-w-content flex-wrap items-center gap-2.5">
          <select value={crop} onChange={(e) => setCrop(e.target.value)} className="field !w-auto !py-2.5">
            <option value="">All crops</option>
            {cropOptions.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <select value={region} onChange={(e) => setRegion(e.target.value)} className="field !w-auto !py-2.5">
            <option value="">All regions</option>
            {REGIONS.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
          <select value={type} onChange={(e) => setType(e.target.value)} className="field !w-auto !py-2.5">
            <option value="">All types</option>
            <option value="available">In stock now</option>
            <option value="preorder">Preorder</option>
          </select>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search crop, region…"
            className="field !min-w-[180px] flex-1 !py-2.5"
          />
          <span className="ml-auto whitespace-nowrap text-[0.78rem] font-medium text-ink-muted">
            {filtered.length} product{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-content px-[5%] py-10">
        {filtered.length ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p) => (
              <ShopCard key={p.id} p={p} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <div className="mb-3 flex justify-center text-ink-muted">
              <Icon name="search" size="2xl" />
            </div>
            <h3 className="mb-2 font-display text-[1.3rem] font-bold">No products found</h3>
            <p className="mx-auto mb-5 max-w-xs text-ink-muted">
              Try different filters or check back soon for new listings.
            </p>
            <Link href="/contact" className="btn btn-primary">
              Contact us
            </Link>
          </div>
        )}
      </div>

      {/* How it works */}
      <section className="bg-brand-700 px-6 py-14 text-white">
        <div className="mx-auto grid max-w-3xl gap-8 sm:grid-cols-3">
          {[
            ["01", "Choose your produce", "Browse the board. Each listing shows exact price, unit, quantity and source region."],
            ["02", "Pay into escrow", "Select your quantity and pay by Paystack or MoMo. Funds are held until you receive the produce."],
            ["03", "Delivered, then recorded", "We collect from the farm after the match. The farmer is paid when you confirm, and the trade is stored."],
          ].map(([n, t, d]) => (
            <div key={n} className="text-center">
              <div className="font-display text-[2rem] font-extrabold text-white/10">{n}</div>
              <div className="mb-1.5 font-bold text-white">{t}</div>
              <div className="text-[0.8rem] leading-relaxed text-white/70">{d}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default function ShopPage() {
  return (
    <>
      <Navbar variant="solid" />
      <main className="min-h-screen">
        <Suspense fallback={<div className="pt-[120px] text-center text-ink-muted">Loading…</div>}>
          <ShopInner />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
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

// Richer demo set for the shop (includes out-of-stock + preorder states).
const SHOP_DEMO: Product[] = [
  ...DEMO_PRODUCTS,
  {
    id: "d-yam",
    name: "Yam, Puna",
    crop_type: "Yam",
    price_per_unit: 1800,
    unit: "100 tubers",
    quantity_available: 45,
    sold_quantity: 5,
    min_order: 1,
    region: "Eastern",
    fbo_source: "FBO onboarding — Eastern",
    status: "available",
    is_preorder: false,
    image_url: "/images/tomatoes.jpg",
  },
  {
    id: "d-mango-out",
    name: "Mango, Julie",
    crop_type: "Mango",
    price_per_unit: 85,
    unit: "box",
    quantity_available: 0,
    sold_quantity: 120,
    min_order: 10,
    region: "Eastern",
    fbo_source: "FBO onboarding — Eastern",
    status: "out_of_stock",
    is_preorder: false,
    image_url: "/images/mango.jpg",
  },
];

function fmtDate(d?: string | null) {
  if (!d) return "soon";
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function ShopCard({ p }: { p: Product }) {
  const [imgError, setImgError] = useState(false);
  const remaining = Math.max(0, Number(p.quantity_available) - Number(p.sold_quantity || 0));
  const isOut = p.status === "out_of_stock" || remaining <= 0;
  const isPre = p.is_preorder || p.status === "preorder";
  const min = p.min_order ?? 1;
  const isLow = !isOut && !isPre && remaining <= min * 3;

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-line bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-soft">
      <div className="relative h-44 overflow-hidden bg-brand-pale">
        {imgError || !p.image_url ? (
          <div className="flex h-full w-full items-center justify-center p-4 text-center font-display text-sm font-bold text-brand">
            {p.name}
          </div>
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={p.image_url}
            alt={p.name}
            className="h-full w-full object-cover"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        )}
        <div className="absolute left-2.5 top-2.5 flex flex-wrap gap-1.5">
          {isPre && <span className="rounded-full bg-accent-pale px-2.5 py-1 text-[0.68rem] font-bold text-accent-deep">Preorder</span>}
          {isOut && <span className="rounded-full bg-black/10 px-2.5 py-1 text-[0.68rem] font-bold text-muted">Out of stock</span>}
          {isLow && <span className="rounded-full bg-accent-pale px-2.5 py-1 text-[0.68rem] font-bold text-accent-deep">Low stock</span>}
          {!isPre && !isOut && !isLow && <span className="rounded-full bg-leaf-pale px-2.5 py-1 text-[0.68rem] font-bold text-leaf">In stock</span>}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-1 text-[0.7rem] font-bold uppercase tracking-[0.06em] text-muted">
          {p.crop_type}
        </div>
        <h3 className="font-display text-[1.05rem] font-bold leading-tight">{p.name}</h3>
        <div className="mb-2.5 mt-1 text-[0.76rem] text-muted">
          {p.region}
          {p.fbo_source ? ` · ${p.fbo_source}` : ""}
        </div>
        <div className="mb-2.5 flex items-end justify-between">
          <div className="font-display text-[1.4rem] font-extrabold leading-none text-brand">
            GH₵{Number(p.price_per_unit).toFixed(2)}
            <span className="block font-sans text-[0.72rem] font-medium text-muted">per {p.unit}</span>
          </div>
          <div className="text-right">
            <div className="text-[0.9rem] font-bold text-ink">
              {isOut ? "—" : `${remaining} ${p.unit}${remaining !== 1 ? "s" : ""}`}
            </div>
            <div className="text-[0.7rem] text-muted">{isOut ? "sold out" : "available"}</div>
          </div>
        </div>
        <div className="mb-3 flex flex-wrap gap-1.5">
          <span className="rounded-md bg-surface px-2.5 py-1 text-[0.72rem] font-semibold text-muted">
            Min: {min} {p.unit}
            {min > 1 ? "s" : ""}
          </span>
          {isPre && p.available_date && (
            <span className="rounded-md bg-surface px-2.5 py-1 text-[0.72rem] font-semibold text-muted">
              {fmtDate(p.available_date)}
            </span>
          )}
        </div>
        {isPre && (
          <div className="mb-3 rounded-lg bg-accent-pale px-3 py-2 text-[0.78rem] font-medium text-accent-deep">
            Preorder now — available {fmtDate(p.available_date)}. Pay a deposit to reserve stock.
          </div>
        )}
        <div className="mt-auto">
          {isOut ? (
            <button
              disabled
              className="btn btn-block cursor-not-allowed bg-surface text-faint"
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
}

function ShopInner() {
  const params = useSearchParams();
  const [products, setProducts] = useState<Product[]>(SHOP_DEMO);
  const [crop, setCrop] = useState("");
  const [region, setRegion] = useState("");
  const [type, setType] = useState(params.get("type") === "preorder" ? "preorder" : "");
  const [search, setSearch] = useState("");

  useEffect(() => {
    let active = true;
    (async () => {
      const data = await fetchProducts();
      if (active && data.length) setProducts(data);
    })();
    return () => {
      active = false;
    };
  }, []);

  const crops = useMemo(
    () => Array.from(new Set(products.map((p) => p.crop_type))).sort(),
    [products]
  );

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
      <header
        className="px-[5%] pb-12 pt-[calc(68px+40px)] text-white"
        style={{ background: "linear-gradient(120deg, rgba(42,26,20,0.90), rgba(92,46,32,0.78)), url('/images/shop-header.jpg') center/cover" }}
      >
        <div className="mx-auto max-w-content">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-accent">Marketplace</p>
          <h1 className="mb-3 mt-3 font-display text-[clamp(1.9rem,4vw,2.7rem)] font-extrabold leading-[1.12] tracking-tight text-white">
            What is on the board
          </h1>
          <p className="max-w-[36rem] leading-relaxed text-white/70">
            Expected supply from verified FBOs, plus lots already in stock. Pilot trades are in the
            Eastern Region. To order by phone, call or WhatsApp 054 411 4198.
          </p>
          <p className="mt-3.5 text-[0.9rem] font-semibold text-white/90">
            Order by phone:{" "}
            <a href="tel:+233544114198" className="text-accent underline underline-offset-4">
              054 411 4198
            </a>
          </p>
        </div>
      </header>

      {/* Filters */}
      <div className="sticky top-[68px] z-40 border-b border-line bg-white/95 px-[5%] py-3 backdrop-blur-md">
        <div className="mx-auto flex max-w-content flex-wrap items-center gap-2.5">
          <select value={crop} onChange={(e) => setCrop(e.target.value)} className="field !w-auto !py-2.5">
            <option value="">All crops</option>
            {crops.map((c) => (
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
          <span className="ml-auto whitespace-nowrap text-[0.78rem] font-medium text-muted">
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
            <div className="mb-3 flex justify-center text-muted">
              <Icon name="search" size="2xl" />
            </div>
            <h3 className="mb-2 font-display text-[1.3rem] font-bold">No products found</h3>
            <p className="mx-auto mb-5 max-w-xs text-muted">
              Try different filters or check back soon for new listings.
            </p>
            <Link href="/contact" className="btn btn-primary">
              Contact us
            </Link>
          </div>
        )}
      </div>

      {/* How it works */}
      <section className="bg-brand-deep px-6 py-14 text-white">
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
        <Suspense fallback={<div className="pt-[120px] text-center text-muted">Loading…</div>}>
          <ShopInner />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

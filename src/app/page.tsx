import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeaturedProducts from "@/components/FeaturedProducts";
import HowItWorks from "@/components/HowItWorks";
import { DELIVERY_FEES } from "@/lib/data";

const TRUST = [
  "Every farmer is verified on-site before listing.",
  "Your payment stays in escrow until delivery is confirmed.",
  "Track every order from farm gate to your door.",
];

export default function HomePage() {
  return (
    <div>
      <Navbar hideSupplierCta />

      {/* Editorial split hero — no overlay, no motion */}
      <section className="grid min-h-[72svh] border-b border-line bg-cream pt-[68px] lg:grid-cols-2">
        <div className="flex flex-col justify-center px-5 py-12 sm:px-8 lg:px-12 xl:px-16">
          <h1 className="mb-4 max-w-[16ch] text-charcoal">
            Escrow-backed produce from Ghanaian FBO farms.
          </h1>
          <p className="mb-8 max-w-[34rem] text-[1.05rem] font-medium leading-[1.55] text-muted">
            Buy from verified farmer groups. Pay with Paystack or MoMo — funds stay in escrow until
            you confirm delivery. Register an FBO of 15–50 farmers in one session.
          </p>
          <div className="flex flex-col gap-2.5 sm:flex-row">
            <Link href="/shop" className="btn btn-gold">
              Browse this week&apos;s listings
            </Link>
            <Link href="/register/farmer" className="btn btn-ghost">
              Register your FBO
            </Link>
          </div>
        </div>
        <div className="relative min-h-[280px] lg:min-h-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/tomatoes.jpg"
            alt="Fresh tomatoes from a Ghanaian farm"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </section>

      {/* Verifiable facts — no invented percentages */}
      <div className="border-b border-line bg-white px-5 py-4 sm:px-6">
        <p className="mx-auto m-0 max-w-content text-center text-[0.9rem] text-muted sm:text-left">
          Delivery: Greater Accra GH₵{DELIVERY_FEES.accra} · Ashanti GH₵{DELIVERY_FEES.ashanti} ·
          other regions GH₵{DELIVERY_FEES.other}. Platform fee 1–2% on completed deals only.
          Listings free.
        </p>
      </div>

      <section className="border-b border-line bg-cream px-5 py-14 sm:px-6">
        <div className="mx-auto max-w-content">
          <h2 className="mb-8">How Agro Bridge protects your order</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {TRUST.map((t) => (
              <div key={t} className="border-t-2 border-gold pt-4">
                <p className="m-0 max-w-none text-[0.95rem] leading-relaxed text-ink">{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-6">
        <div className="mx-auto max-w-content">
          <p className="eyebrow">Listings</p>
          <h2 className="mb-2">This week&apos;s produce and poultry</h2>
          <p className="mb-6 max-w-[34rem] text-muted">
            Prices and stock from verified FBO farmers. Payment held until delivery is confirmed.
          </p>
          <FeaturedProducts />
          <div className="mt-6">
            <Link href="/shop" className="btn btn-primary">
              View all listings
            </Link>
          </div>
        </div>
      </section>

      {/* Narrow text-only */}
      <section className="border-y border-line bg-white px-5 py-14 sm:px-6">
        <div className="mx-auto max-w-[65ch]">
          <h2 className="mb-4">FBO registration, escrow, and regional delivery</h2>
          <p className="m-0 text-muted">
            Agro Bridge registers farmer-based organisations (typically 15–50 members) and lists
            their produce for households, restaurants, and retailers. Buyers pay via Paystack or
            MoMo into escrow. Delivery is priced by region. The platform charges 1–2% only when a
            deal completes.
          </p>
          <Link href="/about" className="mt-6 inline-flex font-semibold text-green hover:underline">
            How the operation works
          </Link>
        </div>
      </section>

      <HowItWorks />

      {/* Flat colour CTA — no reused photo */}
      <section className="bg-green px-5 py-14 text-white sm:px-6">
        <div className="mx-auto grid max-w-content gap-8 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="mb-3 text-white">Register your FBO or browse listings</h2>
            <p className="m-0 max-w-[34rem] text-white/75">
              Leaders list the group once. Buyers order with escrow. Delivery fees are published by
              region before you pay.
            </p>
          </div>
          <div className="flex flex-col gap-2.5 sm:flex-row md:justify-end">
            <Link href="/register/farmer" className="btn btn-gold">
              Register your FBO
            </Link>
            <Link href="/shop" className="btn btn-ghost-light">
              Browse this week&apos;s listings
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

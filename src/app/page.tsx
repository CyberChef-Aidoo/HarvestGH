import Link from "next/link";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HowItWorks from "@/components/HowItWorks";
import HeroFacts from "@/components/HeroFacts";

const FeaturedProducts = dynamic(() => import("@/components/FeaturedProducts"));

const TRUST = [
  "FBOs list expected supply. Buyers lock grade, quantity, and price before harvest.",
  "Bank or Mobile Money holds payment until delivery is confirmed.",
  "Farmers without smartphones use SMS and WhatsApp. Each cleared trade keeps a farm-to-buyer record.",
];

export default function HomePage() {
  return (
    <div>
      <Navbar variant="hero" hideSupplierCta={true} />

      <section className="relative flex min-h-[72svh] items-end md:items-stretch overflow-hidden bg-brand-900 md:min-h-[68svh]">
        <div className="absolute inset-0 hero-overlay" aria-hidden />
        <div className="relative z-10 flex w-full flex-col gap-8 px-[6%] pb-10 pt-[calc(68px+36px)] md:flex-row md:items-end md:justify-between md:pb-12">
          <div className="w-full max-w-[640px]">
            <h1 className="mb-3 max-w-[18ch] text-white">
              Match the harvest before it is picked.
            </h1>
            <p className="hero-sub mb-7 max-w-[34rem] font-body text-[1.05rem] font-medium leading-[1.55] text-surface">
              Farmer groups list expected crops and animal protein. Verified hotels, shops, and
              processors pre-order. Payment is held until delivery. The pilot is in the Eastern Region.
            </p>
            <div className="flex flex-col gap-2.5 sm:flex-row">
              <Link href="/shop" className="btn btn-accent">
                Shop on the board
              </Link>
              <Link href="/register/farmer" className="btn btn-ghost-light">
                Register your FBO
              </Link>
            </div>
          </div>
          <HeroFacts updated="28 Sep 2026" />
        </div>
      </section>

      <section className="border-b border-brand-100 bg-surface px-5 py-12 sm:px-6 md:py-14">
        <div className="mx-auto max-w-content">
          <h2 className="mb-8">How Agrobridge protects your order</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {TRUST.map((t) => (
              <div key={t} className="border-t-2 border-accent-500 pt-4">
                <p className="m-0 max-w-none text-[0.95rem] leading-relaxed text-ink">{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-12 sm:px-6 md:py-14">
        <div className="mx-auto max-w-content">
          <p className="eyebrow">Listed on the board</p>
          <h2 className="mb-2">Crops, fruit preorders, and meat</h2>
          <p className="mb-6 max-w-[34rem] text-ink-muted">
            Expected lots from verified farmer groups. Pre-order coconut, pepper, pineapple, and
            other fruit, or buy what is already listed.
          </p>
          <FeaturedProducts />
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/shop" className="btn btn-primary">
              View all on the board
            </Link>
            <Link href="/shop?type=preorder" className="btn btn-accent">
              Preorder harvests
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-12 sm:px-6 md:py-14">
        <div className="mx-auto max-w-content">
          <h2 className="mb-4">Built for Ghana&apos;s Farmers and Buyers</h2>
          <p className="m-0 max-w-[65ch] text-ink-muted">
            Joining is free. Agrobridge takes a 2% buyer fee only when a trade clears — GHS 500 on a
            GHS 25,000 order. Farmers
            without smartphones are reached by SMS, WhatsApp, or phone. Every completed trade stores
            a farm-to-buyer record, with a transaction ID such as AGB-TOM-2026-00041.
          </p>
          <Link href="/about" className="mt-6 inline-flex font-semibold text-brand-700 hover:underline">
            Learn more about us
          </Link>
        </div>
      </section>

      <HowItWorks />

      <section className="border-t border-brand-100 bg-white px-5 py-12 sm:px-6">
        <div className="mx-auto flex max-w-content flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Order tracking</p>
            <h2 className="mb-2">See where your delivery is</h2>
            <p className="m-0 max-w-[36rem] text-ink-muted">
              Use the reference from your confirmation and the phone number from checkout. You will see when the lot is confirmed,
              collected, on the way, and delivered.
            </p>
          </div>
          <form action="/order-status" method="get" className="flex w-full max-w-md flex-col gap-2">
            <label className="sr-only" htmlFor="home-order-ref">
              Order reference
            </label>
            <input
              id="home-order-ref"
              name="ref"
              className="field"
              placeholder="AGB-2026-1002"
              maxLength={20}
            />
            <label className="sr-only" htmlFor="home-order-phone">
              Phone number
            </label>
            <input
              id="home-order-phone"
              name="phone"
              className="field"
              placeholder="024 433 3444"
              inputMode="tel"
            />
            <button type="submit" className="btn btn-primary shrink-0">
              Track order
            </button>
          </form>
        </div>
      </section>

      <section
        className="px-5 py-14 text-center text-white sm:px-6"
        style={{
          background: "linear-gradient(120deg, #2B4419, #436A27)",
        }}
      >
        <h2 className="mx-auto mb-2.5 max-w-[18ch] text-white">
          From fragmented farms to verified supply.
        </h2>
        <p className="mx-auto mb-6 max-w-[34rem] text-surface">
          Partner on the Eastern Region pilot. Match, pay, and trace crops and animal
          protein before they are lost. Call 054 411 4198.
        </p>
        <div className="flex flex-col justify-center gap-2.5 sm:flex-row">
          <Link href="/shop" className="btn btn-accent">
            Order from the board
          </Link>
          <Link href="/register/farmer" className="btn btn-ghost-light">
            Register your FBO
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

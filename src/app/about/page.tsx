import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import Icon from "@/components/Icon";

export const metadata: Metadata = {
  title: "About Agro Bridge — Ghana's farm marketplace",
  description:
    "Agro Bridge connects FBO farmers to bulk buyers with escrow payment, SMS matching, and regional delivery across Ghana.",
};

export default function AboutPage() {
  return (
    <PageShell>
      <header className="border-b border-line bg-cream px-[6%] pb-14 pt-[calc(68px+48px)]">
        <div className="mx-auto max-w-content">
          <p className="eyebrow">Our story</p>
          <h1 className="max-w-[20ch] text-charcoal">
            Built to reduce post-harvest loss through market coordination.
          </h1>
          <p className="mt-4 max-w-[34rem] text-base leading-relaxed text-muted">
            Ghana loses a large share of harvest each year when farmers cannot reach buyers before
            produce spoils. Agro Bridge coordinates FBOs, buyers, escrow, and delivery.
          </p>
        </div>
      </header>

      <section className="section bg-white">
        <div className="mx-auto grid max-w-content items-start gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Mission</p>
            <h2 className="mb-3.5">Connect every farm to a market</h2>
            <p className="mb-3.5 leading-relaxed text-muted">
              A farmer in Brong-Ahafo often cannot reach a buyer in Accra before tomatoes spoil.
              Agro Bridge lists FBO produce, notifies both sides by SMS, holds payment in escrow,
              and coordinates pickup and delivery.
            </p>
            <ul className="flex flex-col gap-3">
              {[
                "Free listing for farmers and FBOs",
                "Works by phone — no app required for farmers",
                "Escrow via Paystack or MoMo until delivery is confirmed",
                "1–2% fee only on completed deals",
                "Delivery priced by region before checkout",
              ].map((v) => (
                <li key={v} className="flex items-start gap-2 text-[0.92rem] leading-snug">
                  <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-[6px] bg-green-pale text-green">
                    <Icon name="check" size="sm" />
                  </span>
                  {v}
                </li>
              ))}
            </ul>
          </div>
          <div className="h-[420px] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/farmland.jpg"
              alt="Ghanaian farmland"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Before / with comparison */}
      <section className="section border-y border-line bg-cream">
        <div className="mx-auto max-w-content">
          <h2 className="mb-8">Before Agro Bridge / with Agro Bridge</h2>
          <div className="grid gap-0 border border-line md:grid-cols-2">
            <div className="border-b border-line bg-white p-7 md:border-b-0 md:border-r">
              <h3 className="mb-3 text-[1rem]">Before</h3>
              <ul className="m-0 flex list-none flex-col gap-2.5 p-0 text-[0.92rem] text-muted">
                <li>Farmers travel or wait for buyers who may never arrive.</li>
                <li>Payment risk sits with whoever ships first.</li>
                <li>FBO leaders manage matching by phone, one deal at a time.</li>
              </ul>
            </div>
            <div className="bg-white p-7">
              <h3 className="mb-3 text-[1rem]">With Agro Bridge</h3>
              <ul className="m-0 flex list-none flex-col gap-2.5 p-0 text-[0.92rem] text-muted">
                <li>An FBO of 15–50 farmers registers once; produce goes live with price and stock.</li>
                <li>Buyer pays into escrow; funds release after delivery confirmation.</li>
                <li>SMS notifies both sides; delivery fees are published by region.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Founder — single column narrative */}
      <section className="section bg-white">
        <div className="mx-auto grid max-w-content gap-10 lg:grid-cols-[280px_1fr]">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/ibrahim.jpg"
              alt="Ibrahim Mohammed Lotsu, founder of Agro Bridge"
              className="mb-4 h-[280px] w-full object-cover object-top"
            />
            <div className="font-display text-[1.15rem] font-semibold">Ibrahim Mohammed Lotsu</div>
            <div className="mt-1 text-[0.85rem] text-muted">
              Founder, Agro Bridge · Accounting student, Accra Technical University
            </div>
          </div>
          <div>
            <p className="eyebrow">Founder</p>
            <h2 className="mb-4">Built by a student who treated loss as a systems problem</h2>
            <p className="mb-4 leading-relaxed text-muted">
              Agro Bridge was founded by <strong className="text-ink">Ibrahim Mohammed Lotsu</strong>.
              Accounting trained him to see broken coordination — not a shortage of production — as
              the core of post-harvest waste.
            </p>
            <blockquote className="my-6 border-l-[3px] border-gold pl-5 text-[1.05rem] font-medium leading-snug text-ink">
              Ghana loses tomatoes before they reach a buyer. That is a market design problem, and
              those can be fixed.
            </blockquote>
            <p className="mb-0 leading-relaxed text-muted">
              The strategy starts with FBOs already organised by MoFA Ghana. Registering a group of
              15–50 farmers in one afternoon puts volume on the marketplace without requiring
              farmers to download an app.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-green px-6 py-14 text-white">
        <div className="mx-auto flex max-w-content flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="mb-2 text-white">Register your FBO or browse listings</h2>
            <p className="m-0 max-w-[32rem] text-white/70">
              Listing is free. Escrow applies on every paid order. Delivery fees are shown before
              checkout.
            </p>
          </div>
          <div className="flex flex-col gap-2.5 sm:flex-row">
            <Link href="/register/farmer" className="btn bg-white text-green hover:bg-cream">
              Register your FBO
            </Link>
            <Link href="/shop" className="btn btn-ghost-light">
              Browse listings
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

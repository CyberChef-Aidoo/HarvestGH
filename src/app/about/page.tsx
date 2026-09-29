import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import Icon from "@/components/Icon";

export const metadata: Metadata = {
  title: "About Agrobridge",
  description:
    "Agrobridge matches farmer-based organisations to verified bulk buyers before harvest. Pilot in the Eastern Region.",
};

const WHAT_WE_DO = [
  { num: "01", title: "We list expected supply", desc: "FBOs record grade, quantity, location, and harvest date before the crop is picked." },
  { num: "02", title: "Buyers pre-order", desc: "Hotels, shops, and processors lock supply from a verified group." },
  { num: "03", title: "We hold escrow", desc: "Bank or Mobile Money keeps payment until delivery is confirmed. The buyer fee is 2%, only when the trade clears." },
  { num: "04", title: "We record the trade", desc: "Goods are delivered, the farmer is paid, and the farm-to-buyer history is stored." },
];

export default function AboutPage() {
  return (
    <PageShell>
      {/* HERO */}
      <header
        className="px-[6%] pb-16 pt-[calc(68px+56px)] text-white"
        style={{
          background:
            "linear-gradient(120deg, rgba(43,68,25,0.92), rgba(67,106,39,0.78)), url('/images/farmland.webp') center/cover, #2B4419",
        }}
      >
        <div className="mx-auto max-w-content">
          <p className="eyebrow eyebrow-gold">Our work</p>
          <h1 className="max-w-[18ch] font-display text-[clamp(2rem,5vw,3.4rem)] font-extrabold leading-[1.1] tracking-tight text-white">
            Connecting farmer groups to verified buyers before harvest.
          </h1>
          <p className="mt-4 max-w-[34rem] text-base leading-relaxed text-white/75">
            Agrobridge is opening a pilot in the Eastern Region: 2–3 farmer groups and 5–10
            verified buyers. Crops and animal protein use the same rails.
          </p>
        </div>
      </header>

      {/* MISSION */}
      <section className="section bg-white">
        <div className="mx-auto grid max-w-content items-center gap-16 lg:grid-cols-2">
          <div>
            <p className="eyebrow">The model</p>
            <h2 className="mb-3.5 text-[clamp(1.8rem,3.5vw,2.5rem)] font-bold leading-tight">
              Match the order before the harvest
            </h2>
            <p className="mb-3.5 leading-relaxed text-ink-muted">
              More than 30% of fresh produce can spoil before a buyer is found. Over $3 billion of
              Ghana&apos;s agricultural value is lost or left idle. Hotels and processors still cannot
              lock grade and timing.
            </p>
            <p className="mb-5 leading-relaxed text-ink-muted">
              FBOs list expected supply. Anchor buyers pre-order. Payment is held until delivery.
              Joining is free. Agrobridge keeps 2% of a cleared trade, and the FBO leader is paid 1%
              on qualifying group volume. Farmers without smartphones are reached by SMS, WhatsApp,
              or a phone call.
            </p>
            <ul className="flex flex-col gap-3">
              {[
                "Free for farmer groups and buyers to join",
                "No smartphone required — SMS, WhatsApp, or a phone call",
                "FBO leaders are paid 1% on qualifying group volume",
                "2% buyer fee only when the trade clears",
                "Pilot in the Eastern Region",
              ].map((v) => (
                <li key={v} className="flex items-start gap-2 text-[0.92rem] leading-snug">
                  <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                    <Icon name="check" size="sm" />
                  </span>
                  {v}
                </li>
              ))}
            </ul>
          </div>
          <div className="h-[420px] overflow-hidden rounded-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/farmland.webp"
              alt="Farmers in Ghana's producing regions"
              className="h-full w-full object-cover"
              width={1200}
              height={800}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>

      {/* PROBLEM STATS */}
      <section className="section bg-brand-700 text-white">
        <div className="mx-auto grid max-w-content items-center gap-12 lg:grid-cols-[1fr_2fr]">
          <div>
            <p className="eyebrow eyebrow-gold">The operation</p>
            <h2 className="text-[clamp(1.8rem,3.5vw,2.4rem)] font-bold leading-tight text-white">
              Why the match has to happen earlier
            </h2>
            <p className="mt-3 leading-relaxed text-white/55">
              Post-harvest apps and middlemen arrive after the food is already picked. Agrobridge
              matches expected supply to a verified buyer first. Source for the spoilage figure:
              Ghana Statistical Authority.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3.5">
            {[
              ["30%+", "fresh produce can spoil before a buyer is found"],
              ["$3bn+", "Ghana farm value lost or left idle"],
              ["2%", "buyer fee only when a trade clears"],
              ["1%", "paid to the FBO leader on qualifying volume"],
            ].map(([v, l]) => (
              <div key={l} className="rounded-2xl border border-white/[0.08] bg-white/[0.05] p-5">
                <div className="font-display text-[2.2rem] font-extrabold leading-none text-accent-300">
                  {v}
                </div>
                <div className="mt-2 text-[0.85rem] leading-snug text-white/55">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OPERATIONS */}
      <section className="section bg-surface">
        <div className="mx-auto grid max-w-content items-start gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div className="overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-soft lg:sticky lg:top-24">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/farmland.webp"
              alt="Agrobridge field onboarding"
              className="h-[280px] w-full object-cover object-center"
              width={1200}
              height={800}
              loading="lazy"
              decoding="async"
            />
            <div className="p-6">
              <div className="font-display text-[1.25rem] font-extrabold">
                Agrobridge Operations
              </div>
              <div className="mt-1 text-[0.78rem] leading-snug text-ink-muted">
                Field onboarding · Eastern Region pilot
              </div>
              <blockquote className="mt-3.5 rounded-r-[9px] border-l-[3px] border-brand-500 bg-surface-muted px-4 py-3 text-[0.84rem] italic leading-relaxed text-ink-muted">
                &ldquo;FBOs list what is coming. Buyers lock grade, location, date, and price before
                harvest. Every cleared trade keeps a farm-to-buyer record.&rdquo;
              </blockquote>
            </div>
          </div>

          <div>
            <p className="eyebrow">The onboarding stage</p>
            <h2 className="mb-4 text-[clamp(1.8rem,3.5vw,2.5rem)] font-bold leading-tight">
              The pilot, then the prove gate
            </h2>
            <p className="mb-3 leading-relaxed text-ink-muted">
              The order flow is designed. The next work is real trades in the Eastern Region: sign 2–3
              FBOs, open conversations with 5–10 buyers, and complete 20–30 deliveries with escrow.
              Crops, beef, goat meat, and chicken meat use the same rails.
            </p>
            <div className="my-6 rounded-2xl bg-brand-100 px-6 py-5">
              <p className="font-display text-[1.15rem] font-bold leading-snug text-brand-700">
                &ldquo;We measure completed trades, delivery success, and repeat orders. Registrations
                alone are not the win.&rdquo;
              </p>
            </div>
            <p className="mb-3 leading-relaxed text-ink-muted">
              On a GHS 25,000 order that clears, Agrobridge keeps GHS 500. Traceability, logistics,
              and B2B membership fees start in year two. There is no fee to join.
            </p>
            <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-6 shadow-sm">
              <h3 className="mb-3.5 text-[0.92rem] font-bold">Key operational facts</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  ["Eastern Region", "Pilot geography"],
                  ["Bank / MoMo", "Escrow until delivery"],
                  ["2%", "Buyer fee at clear"],
                  ["1%", "FBO leader share"],
                ].map(([v, l]) => (
                  <div key={l} className="rounded-[10px] bg-surface px-3.5 py-3">
                    <div className="font-display text-[1.3rem] font-extrabold text-brand-700">{v}</div>
                    <div className="mt-0.5 text-[0.76rem] text-ink-muted">{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="section bg-white">
        <div className="mx-auto max-w-content">
          <p className="eyebrow">What Agrobridge does</p>
          <h2 className="mb-9 text-[clamp(1.8rem,3.5vw,2.5rem)] font-bold leading-tight">
            How a trade actually happens
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {WHAT_WE_DO.map((c) => (
              <div
                key={c.num}
                className="card-hover rounded-2xl border border-brand-100 bg-surface p-6 hover:bg-white"
              >
                <div className="font-display text-[2.2rem] font-extrabold leading-none text-brand-700">
                  {c.num}
                </div>
                <h3 className="mb-2 mt-2.5 font-display text-[1.05rem] font-bold">{c.title}</h3>
                <p className="text-[0.85rem] leading-relaxed text-ink-muted">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-accent-500 px-6 py-[70px] text-center text-ink">
        <h2 className="mb-3 text-[clamp(1.8rem,4vw,2.7rem)] font-extrabold text-white">
          Partner on the Eastern Region pilot
        </h2>
        <p className="mx-auto mb-7 max-w-[30rem] leading-relaxed text-white/70">
          Buyers: pre-order from a verified group. FBO leaders: register your group and we will
          call you back on 054 411 4198.
        </p>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/register/farmer" className="btn bg-white text-brand-700 hover:-translate-y-0.5">
            Register your FBO
          </Link>
          <Link href="/shop" className="btn btn-ghost-light">
            View the board
          </Link>
        </div>
      </section>
    </PageShell>
  );
}

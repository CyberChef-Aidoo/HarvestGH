import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import Icon from "@/components/Icon";

export const metadata: Metadata = {
  title: "About agro Bridge — Ghana's Farm Marketplace",
  description:
    "agro Bridge was built by Ibrahim Mohammed Lotsu to solve Ghana's post-harvest loss crisis by connecting FBO farmers directly to verified bulk buyers.",
};

const WHAT_WE_DO = [
  { num: "01", title: "We Connect", desc: "We match FBO farmers' produce with bulk buyers by crop type, region, and quantity." },
  { num: "02", title: "We Notify", desc: "Both farmer and buyer receive an SMS the moment a match is confirmed. Works on any phone." },
  { num: "03", title: "We Protect", desc: "Buyer payment goes into escrow before produce leaves the farm. Released only after delivery." },
  { num: "04", title: "We Deliver", desc: "We coordinate pickup from farms and delivery to buyers — nobody has to travel to find the other." },
];

const NUMBERS = [
  ["18", "Platform files built from scratch"],
  ["9", "Supabase database tables"],
  ["10+", "Crops available on marketplace"],
  ["16", "Regions covered across Ghana"],
];

export default function AboutPage() {
  return (
    <PageShell>
      {/* HERO */}
      <header
        className="px-[6%] pb-16 pt-[calc(68px+56px)] text-white"
        style={{
          background:
            "linear-gradient(120deg, rgba(12,26,17,0.9), rgba(26,107,60,0.55)), url('/images/farmland.jpg') center/cover, #0f2418",
        }}
      >
        <div className="mx-auto max-w-content">
          <p className="eyebrow eyebrow-gold">Our story</p>
          <h1 className="max-w-[18ch] font-display text-[clamp(2rem,5vw,3.4rem)] font-extrabold leading-[1.1] tracking-tight text-white">
            Built to <span className="text-gold">end</span> post-harvest loss in Ghana.
          </h1>
          <p className="mt-4 max-w-[34rem] text-base leading-relaxed text-white/75">
            Ghana loses up to 50% of its harvest every year — not from bad farming, but from a
            broken market. agro Bridge is the fix.
          </p>
        </div>
      </header>

      {/* MISSION */}
      <section className="section bg-white">
        <div className="mx-auto grid max-w-content items-center gap-16 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Our mission</p>
            <h2 className="mb-3.5 text-[clamp(1.8rem,3.5vw,2.5rem)] font-bold leading-tight">
              Connect every farm to a market
            </h2>
            <p className="mb-3.5 leading-relaxed text-muted">
              Ghana loses 30–50% of its harvest every year to post-harvest waste — not because
              farmers are unproductive, but because a farmer in Brong-Ahafo cannot reach a buyer in
              Accra before tomatoes spoil.
            </p>
            <p className="mb-5 leading-relaxed text-muted">
              agro Bridge is that bridge. We connect smallholder FBO farmers directly to verified bulk
              buyers — through SMS, the web, and WhatsApp — so every harvest finds a market before
              it rots.
            </p>
            <ul className="flex flex-col gap-3">
              {[
                "Free for every farmer and FBO to join — zero barriers",
                "Works on any phone — no smartphone or internet needed by farmers",
                "FBO leaders earn commission — the community benefits",
                "Escrow payment — neither side can be cheated",
                "Built specifically for Ghana's agricultural context",
              ].map((v) => (
                <li key={v} className="flex items-start gap-2 text-[0.92rem] leading-snug">
                  <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-pale text-green">
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
              src="/images/farmland.jpg"
              alt="Ghanaian farmers at work"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* PROBLEM STATS */}
      <section className="section bg-dark text-white">
        <div className="mx-auto grid max-w-content items-center gap-12 lg:grid-cols-[1fr_2fr]">
          <div>
            <p className="eyebrow eyebrow-gold">The problem</p>
            <h2 className="text-[clamp(1.8rem,3.5vw,2.4rem)] font-bold leading-tight text-white">
              A market design problem
            </h2>
            <p className="mt-3 leading-relaxed text-white/55">
              The problem was never a lack of food — it was a lack of coordination between farmers
              with harvests and buyers with money.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3.5">
            {[
              ["30–50%", "of Ghana's harvest lost after harvest each year"],
              ["16", "regions where FBO farmers need buyers"],
              ["24–48h", "to match produce in peak season"],
              ["1–2%", "platform fee — only on completed deals"],
            ].map(([v, l]) => (
              <div key={l} className="rounded-2xl border border-white/[0.08] bg-white/[0.05] p-5">
                <div className="font-display text-[2.2rem] font-extrabold leading-none text-gold">
                  {v}
                </div>
                <div className="mt-2 text-[0.85rem] leading-snug text-white/55">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDER STORY */}
      <section className="section bg-cream">
        <div className="mx-auto grid max-w-content items-start gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-soft lg:sticky lg:top-24">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/ibrahim.jpg"
              alt="Ibrahim Mohammed Lotsu — Founder, agro Bridge"
              className="h-[280px] w-full object-cover object-top"
            />
            <div className="p-6">
              <div className="font-display text-[1.25rem] font-extrabold">
                Ibrahim Mohammed Lotsu
              </div>
              <div className="mt-1 text-[0.78rem] leading-snug text-muted">
                Founder &amp; CEO, agro Bridge · Accounting Student, Accra Technical University
              </div>
              <blockquote className="mt-3.5 rounded-r-[9px] border-l-[3px] border-green bg-[#f8faf8] px-4 py-3 text-[0.84rem] italic leading-relaxed text-muted">
                &ldquo;I am not a farmer. I am someone who understood that coordination is a problem
                technology can solve — and decided to solve it.&rdquo;
              </blockquote>
            </div>
          </div>

          <div>
            <p className="eyebrow">Our story</p>
            <h2 className="mb-4 text-[clamp(1.8rem,3.5vw,2.5rem)] font-bold leading-tight">
              Built by a student who believed it could be fixed
            </h2>
            <p className="mb-3 leading-relaxed text-muted">
              agro Bridge was founded by <strong className="text-ink">Ibrahim Mohammed Lotsu</strong>,
              an accounting student at Accra Technical University. He had never grown a crop — but
              studying accounting taught him to see systems, and post-harvest loss was a{" "}
              <em className="text-green">broken system</em> at its core.
            </p>
            <div className="my-6 rounded-2xl bg-green-pale px-6 py-5">
              <p className="font-display text-[1.15rem] font-bold leading-snug text-green">
                &ldquo;Ghana loses 50% of its tomatoes before they reach a buyer. That is not a
                farming problem — it is a market design problem. And those can be fixed.&rdquo;
              </p>
            </div>
            <p className="mb-3 leading-relaxed text-muted">
              The strategy starts with <strong className="text-ink">FBOs</strong> — the groups of
              15–50 farmers already organised by MoFA Ghana. By registering an entire group at once,
              agro Bridge can go from zero to 50 farmers in a single afternoon, without asking anyone
              to download an app.
            </p>
            <div className="mt-6 rounded-2xl bg-[#eef2ee] p-6">
              <h3 className="mb-3.5 text-[0.92rem] font-bold">agro Bridge by the numbers</h3>
              <div className="grid grid-cols-2 gap-3">
                {NUMBERS.map(([v, l]) => (
                  <div key={l} className="rounded-[10px] bg-white px-3.5 py-3">
                    <div className="font-display text-[1.5rem] font-extrabold text-green">{v}</div>
                    <div className="mt-0.5 text-[0.76rem] text-muted">{l}</div>
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
          <p className="eyebrow">What agro Bridge does</p>
          <h2 className="mb-9 text-[clamp(1.8rem,3.5vw,2.5rem)] font-bold leading-tight">
            Four things. Done well.
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {WHAT_WE_DO.map((c) => (
              <div
                key={c.num}
                className="card-hover rounded-2xl border border-line bg-cream p-6 hover:bg-white"
              >
                <div className="font-display text-[2.2rem] font-extrabold leading-none text-green-pale">
                  {c.num}
                </div>
                <h3 className="mb-2 mt-2.5 font-display text-[1.05rem] font-bold">{c.title}</h3>
                <p className="text-[0.85rem] leading-relaxed text-muted">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-green px-6 py-[70px] text-center text-white">
        <h2 className="mb-3 text-[clamp(1.8rem,4vw,2.7rem)] font-extrabold text-white">
          Join agro Bridge — for free
        </h2>
        <p className="mx-auto mb-7 max-w-[30rem] leading-relaxed text-white/70">
          Whether you are a farmer, buyer, FBO leader, or just curious — there is a place for you in
          Ghana&apos;s farm-to-market revolution.
        </p>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/register/farmer" className="btn bg-white text-green hover:-translate-y-0.5">
            Register as supplier
          </Link>
          <Link href="/shop" className="btn btn-ghost-light">
            Browse produce
          </Link>
        </div>
      </section>
    </PageShell>
  );
}

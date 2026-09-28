import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeaturedProducts from "@/components/FeaturedProducts";
import HowItWorks from "@/components/HowItWorks";

const PROOF = [
  { val: "50+", label: "Farmers" },
  { val: "10+", label: "Crops & poultry" },
  { val: "16", label: "Regions" },
  { val: "100%", label: "Escrow" },
];

const TRUST = [
  "Every farmer is verified on-site before listing.",
  "Your payment stays in escrow until delivery is confirmed.",
  "Track every order from farm gate to your door.",
];

export default function HomePage() {
  return (
    <div>
      <Navbar variant="hero" hideSupplierCta={true} />

      <section className="relative flex min-h-[72svh] items-end overflow-hidden bg-charcoal md:min-h-[68svh]">
        <div
          className="absolute inset-0 animate-heroZoom bg-cover bg-center"
          style={{ backgroundImage: "url('/images/market.jpg')" }}
          aria-hidden
        />
        <div className="absolute inset-0 hero-overlay" aria-hidden />
        <div className="relative z-10 w-full max-w-[640px] px-[6%] pb-12 pt-[calc(68px+36px)] md:pb-14">
          <h1 className="mb-3 max-w-[18ch] animate-fadeUp text-white">
            Fresh farm produce, delivered across Ghana.
          </h1>
          <p className="hero-sub mb-7 max-w-[34rem] animate-fadeUp font-body text-[1.05rem] font-medium leading-[1.55] text-[#F3F1EC] [animation-delay:0.12s]">
            Buy directly from verified farmer groups across Ghana. Payments held in escrow until
            your order arrives.
          </p>
          <div className="flex animate-fadeUp flex-col gap-2.5 [animation-delay:0.24s] sm:flex-row">
            <Link href="/shop" className="btn btn-gold">
              Shop Fresh Produce
            </Link>
            <Link href="/register/farmer" className="btn btn-ghost-light">
              Become a Supplier
            </Link>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-2 border-t border-white/[0.06] bg-green md:grid-cols-4">
        {PROOF.map((p, i) => (
          <div
            key={p.label}
            className={[
              "px-4 py-6 text-center",
              i < PROOF.length - 1 ? "md:border-r md:border-white/[0.08]" : "",
            ].join(" ")}
          >
            <div className="stat-number">{p.val}</div>
            <div className="mt-1.5 caption text-white/70">{p.label}</div>
          </div>
        ))}
      </div>

      <section className="border-b border-line bg-cream px-5 py-12 sm:px-6 md:py-14">
        <div className="mx-auto max-w-content">
          <h2 className="mb-8">How Agro Bridge Protects Your Order</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {TRUST.map((t) => (
              <div key={t} className="border-t-2 border-gold pt-4">
                <p className="m-0 max-w-none text-[0.95rem] leading-relaxed text-ink">{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-12 sm:px-6 md:py-14">
        <div className="mx-auto max-w-content">
          <p className="eyebrow">Fresh this week</p>
          <h2 className="mb-2">Available produce &amp; poultry</h2>
          <p className="mb-6 max-w-[34rem] text-muted">
            Crops and poultry from verified FBO farmers  -  order before stock runs out.
          </p>
          <FeaturedProducts />
          <div className="mt-6 text-center">
            <Link href="/shop" className="btn btn-primary">
              View all produce
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-12 sm:px-6 md:py-14">
        <div className="mx-auto max-w-content">
          <h2 className="mb-4">Built for Ghana&apos;s Farmers and Buyers</h2>
          <p className="m-0 max-w-[65ch] text-muted">
            Agro Bridge connects farmer-based organizations in all 16 regions with households,
            restaurants, and retailers  -  cutting out middlemen so farmers earn more and buyers pay
            fair prices for fresher produce.
          </p>
          <Link href="/about" className="mt-6 inline-flex font-semibold text-green hover:underline">
            Learn more about us
          </Link>
        </div>
      </section>

      <HowItWorks />

      <section
        className="px-5 py-14 text-center text-white sm:px-6"
        style={{
          background:
            "linear-gradient(120deg, rgba(18,53,36,0.92), rgba(18,53,36,0.72)), url('/images/market.jpg') center/cover",
        }}
      >
        <h2 className="mx-auto mb-2.5 max-w-[16ch] text-white">Ready to buy or sell?</h2>
        <p className="mx-auto mb-6 max-w-[34rem] text-[#F3F1EC]">
          Agro Bridge connects farmers and buyers  -  faster and safer.
        </p>
        <div className="flex flex-col justify-center gap-2.5 sm:flex-row">
          <Link href="/shop" className="btn btn-gold">
            Start buying
          </Link>
          <Link href="/register/farmer" className="btn btn-ghost-light">
            Become a supplier
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

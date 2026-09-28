"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fetchProducts, fetchFarmerRegistrations } from "@/lib/api";
import { config, whatsappLink } from "@/lib/config";

type Listing = {
  id?: string;
  crop_type?: string;
  product_name?: string;
  name?: string;
  status?: string;
  region?: string;
  quantity?: number | string;
  unit?: string;
  price?: number;
  buyer_name?: string;
  buyer_phone?: string;
};

const BADGE: Record<string, string> = {
  available: "bg-green-pale text-green",
  matched: "bg-gold-pale text-gold-deep",
  sold: "bg-[#e8f0fe] text-[#1a56db]",
  managed: "bg-black/5 text-muted",
  pending: "bg-gold-pale text-gold-deep",
};

export default function FarmerPortalPage() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState<Listing[] | null>(null);

  async function lookup() {
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length < 9) {
      setError("Enter a valid phone number");
      return;
    }
    setError("");
    setLoading(true);
    setResults(null);
    try {
      const products = await fetchProducts({ phone: cleaned });
      if (products.length) {
        setResults(
          products.map((p) => ({
            id: p.id,
            crop_type: p.crop_type,
            product_name: p.name,
            name: p.name,
            status: p.status,
            region: p.region,
            quantity: Math.max(0, Number(p.quantity_available) - Number(p.sold_quantity || 0)),
            unit: p.unit,
            price: p.price_per_unit,
          })),
        );
        return;
      }
      const regs = await fetchFarmerRegistrations(cleaned);
      setResults(
        regs.map((r) => ({
          id: String(r.id ?? ""),
          name: String(r.fbo_name || r.contact_name || "Registration"),
          status: String(r.status || "pending"),
          region: String(r.region || ""),
          crop_type: String(r.crops || ""),
        })),
      );
    } catch {
      setError("Could not look up listings. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar variant="solid" />
      <main className="min-h-screen bg-cream">
        <div className="lookup-shell">
          <div className="lookup-card">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-pale text-lg font-bold text-green">
              GH
            </div>
            <h1>Check my listing</h1>
            <p>Enter the phone number you registered with to see your listing status.</p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                className="field text-center tracking-wide sm:text-left"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="024 123 4567"
                onKeyDown={(e) => e.key === "Enter" && lookup()}
              />
              <button className="btn btn-primary shrink-0" disabled={loading} onClick={lookup}>
                {loading ? <span className="spinner" /> : "Look up"}
              </button>
            </div>
            {error && <p className="mt-3 text-left text-[0.82rem] text-[#c0392b]">{error}</p>}
            <p className="mt-3 text-[0.78rem] text-muted">
              Not registered yet?{" "}
              <Link href="/register/farmer" className="font-semibold text-green">
                Become a supplier
              </Link>
            </p>
          </div>

          {results && results.length === 0 && (
            <div className="mt-5 rounded-2xl border border-line bg-white p-8 text-center">
              <h3 className="mb-2 text-[1.2rem] font-extrabold">No listings found</h3>
              <p className="mb-4 text-[0.9rem] text-muted">
                We could not find a listing for that number. Register as a supplier or contact us.
              </p>
              <div className="flex flex-col justify-center gap-3 sm:flex-row">
                <Link href="/register/farmer" className="btn btn-primary">
                  Register
                </Link>
                <a
                  href={whatsappLink("Hi, I need help checking my listing")}
                  className="btn btn-ghost"
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp us
                </a>
              </div>
            </div>
          )}

          {results?.map((r) => {
            const status = (r.status || "pending").toLowerCase();
            const title = r.product_name || r.name || r.crop_type || "Listing";
            return (
              <div
                key={r.id || title}
                className="mt-4 rounded-2xl border border-line bg-white p-6 text-left shadow-soft"
              >
                <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-[1.15rem] font-bold">{title}</h3>
                    <p className="mt-1 text-[0.8rem] text-muted">{r.region || "Ghana"}</p>
                  </div>
                  <span
                    className={[
                      "rounded-full px-3 py-1 text-[0.75rem] font-bold capitalize",
                      BADGE[status] || BADGE.pending,
                    ].join(" ")}
                  >
                    {status}
                  </span>
                </div>

                <div className="mb-4 grid grid-cols-2 gap-2">
                  {r.crop_type && (
                    <div className="rounded-lg bg-cream px-3 py-2.5">
                      <div className="text-[0.68rem] font-bold uppercase tracking-wide text-muted">
                        Crop
                      </div>
                      <div className="text-[0.9rem] font-semibold">{r.crop_type}</div>
                    </div>
                  )}
                  {r.quantity != null && (
                    <div className="rounded-lg bg-cream px-3 py-2.5">
                      <div className="text-[0.68rem] font-bold uppercase tracking-wide text-muted">
                        Quantity
                      </div>
                      <div className="text-[0.9rem] font-semibold">
                        {r.quantity} {r.unit || ""}
                      </div>
                    </div>
                  )}
                </div>

                {status === "matched" && r.buyer_phone && (
                  <div className="rounded-xl bg-gradient-to-br from-green to-green-mid p-5 text-white">
                    <h4 className="mb-1 font-display text-[1.05rem] font-extrabold">Match found</h4>
                    <p className="mb-3 text-[0.85rem] text-white/85">
                      A buyer is ready. Call them to confirm pickup details.
                    </p>
                    <div className="rounded-lg bg-white/15 px-4 py-3">
                      <div className="text-[0.7rem] font-bold uppercase tracking-wide text-white/70">
                        Buyer
                      </div>
                      <div className="font-bold">{r.buyer_name || "Buyer"}</div>
                      <div className="mt-1 text-lg font-extrabold tracking-wide">{r.buyer_phone}</div>
                    </div>
                    <a
                      href={`tel:${r.buyer_phone}`}
                      className="mt-3 flex w-full items-center justify-center rounded-lg bg-white py-2.5 text-sm font-bold text-green"
                    >
                      Call buyer
                    </a>
                  </div>
                )}

                <p className="mt-4 text-[0.8rem] text-muted">
                  Questions? Call{" "}
                  <a className="font-semibold text-green" href={`tel:${config.supportPhone}`}>
                    {config.supportPhone}
                  </a>
                </p>
              </div>
            );
          })}
        </div>
      </main>
      <Footer />
    </>
  );
}

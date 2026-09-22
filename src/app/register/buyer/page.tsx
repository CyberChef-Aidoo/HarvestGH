"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Icon from "@/components/Icon";
import { useToast } from "@/components/Toast";
import { REGIONS } from "@/lib/data";
import { createBuyer } from "@/lib/api";

const BUYER_TYPES = [
  "Restaurant / hotel",
  "Trader / market seller",
  "School / institution",
  "Supermarket / retailer",
  "Processor / factory",
  "Individual / household",
  "Other",
];

export default function RegisterBuyerPage() {
  const { toast, ToastHost } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    name: "",
    business: "",
    phone: "",
    email: "",
    region: "",
    buyer_type: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  function validate() {
    const e: Record<string, boolean> = {
      name: form.name.trim().length < 2,
      phone: form.phone.replace(/\D/g, "").length < 9,
      region: !form.region,
      buyer_type: !form.buyer_type,
    };
    setErrors(e);
    return !Object.values(e).some(Boolean);
  }

  async function submit() {
    if (!validate()) {
      toast("Please fix the highlighted fields.", "error");
      return;
    }
    setSubmitting(true);
    try {
      const saved = await createBuyer({
            name: form.name.trim(),
            business_name: form.business.trim() || "",
            phone: form.phone.replace(/\s/g, ""),
            email: form.email.trim() || "",
            region: form.region,
            buyer_type: form.buyer_type,
            notes: form.notes.trim() || "",
          });
      if (!saved) throw new Error("failed");
      setDone(true);
    } catch {
      toast("Could not submit. Please try again or WhatsApp us.", "error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Navbar variant="solid" />
      <main className="flex min-h-screen items-start justify-center bg-cream px-5 pb-16 pt-[calc(68px+32px)] sm:px-6">
        <div className="w-full max-w-lg">
          {done ? (
            <div className="rounded-2xl border border-line bg-white p-10 text-center shadow-soft">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-pale text-green">
                <Icon name="check" size="2xl" />
              </div>
              <h1 className="mb-2 text-[1.65rem] font-extrabold">You&apos;re registered</h1>
              <p className="mx-auto mb-6 max-w-sm text-[0.95rem] leading-relaxed text-muted">
                Browse available produce and place your first order. Payment is held in escrow until
                delivery is confirmed.
              </p>
              <Link href="/shop" className="btn btn-primary">
                Shop produce
              </Link>
            </div>
          ) : (
            <div className="rounded-2xl border border-line bg-white p-6 shadow-soft sm:p-8">
              <div className="mb-1 text-center font-display text-[1.3rem] font-extrabold text-green">
                agro Bridge
              </div>
              <h1 className="mb-1 text-center text-[1.5rem] font-extrabold">Register as a buyer</h1>
              <p className="mb-7 text-center text-[0.9rem] leading-relaxed text-muted">
                Free to join. Order directly from verified FBO farms across Ghana.
              </p>

              <div className="space-y-4 text-left">
                <div>
                  <label className="field-label">
                    Full name <span className="req">*</span>
                  </label>
                  <input
                    className={["field", errors.name ? "border-[#c0392b]" : ""].join(" ")}
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="field-label">Business / organisation name</label>
                  <input
                    className="field"
                    value={form.business}
                    onChange={(e) => set("business", e.target.value)}
                    placeholder="Optional"
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="field-label">
                      Phone <span className="req">*</span>
                    </label>
                    <input
                      className={["field", errors.phone ? "border-[#c0392b]" : ""].join(" ")}
                      value={form.phone}
                      onChange={(e) => set("phone", e.target.value)}
                      placeholder="024 123 4567"
                    />
                  </div>
                  <div>
                    <label className="field-label">Email</label>
                    <input
                      className="field"
                      type="email"
                      value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                      placeholder="Optional"
                    />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="field-label">
                      Region <span className="req">*</span>
                    </label>
                    <select
                      className={["field", errors.region ? "border-[#c0392b]" : ""].join(" ")}
                      value={form.region}
                      onChange={(e) => set("region", e.target.value)}
                    >
                      <option value="">— Select —</option>
                      {REGIONS.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="field-label">
                      Buyer type <span className="req">*</span>
                    </label>
                    <select
                      className={["field", errors.buyer_type ? "border-[#c0392b]" : ""].join(" ")}
                      value={form.buyer_type}
                      onChange={(e) => set("buyer_type", e.target.value)}
                    >
                      <option value="">— Select —</option>
                      {BUYER_TYPES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="field-label">What are you looking to buy?</label>
                  <textarea
                    className="field min-h-[90px] resize-y"
                    value={form.notes}
                    onChange={(e) => set("notes", e.target.value)}
                    placeholder="Optional — crops, volumes, frequency"
                  />
                </div>
              </div>

              <button
                className="btn btn-primary btn-block mt-6"
                disabled={submitting}
                onClick={submit}
              >
                {submitting ? <span className="spinner" /> : "Register as buyer"}
              </button>
              <p className="mt-4 text-center text-[0.84rem] text-muted">
                Looking to sell?{" "}
                <Link href="/register/farmer" className="font-semibold text-green">
                  Register as a farmer
                </Link>
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <ToastHost />
    </>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Icon from "@/components/Icon";
import { PageHeader } from "@/components/PageShell";
import { useToast } from "@/components/Toast";
import { REGIONS } from "@/lib/data";
import { createFarmerRegistration } from "@/lib/api";

const CROPS = [
  "Tomato",
  "Maize",
  "Yam",
  "Cassava",
  "Plantain",
  "Mango",
  "Rice",
  "Pepper",
  "Onion",
  "Groundnut",
  "Poultry",
  "Beef",
  "Goat",
  "Chicken",
  "Other",
];

const BENEFITS = [
  {
    title: "In-person registration",
    desc: "An Agrobridge agent visits you and registers your whole group in one session.",
  },
  {
    title: "1% leader commission",
    desc: "FBO leaders earn a 1% commission on every completed deal from their members.",
  },
  {
    title: "Guaranteed escrow payout",
    desc: "Buyers pay before dispatch. Money is released to the farmer when delivery is confirmed.",
  },
  {
    title: "No smartphone needed",
    desc: "Farmers without smartphones are reached by SMS, WhatsApp, or a phone call.",
  },
];

export default function RegisterFarmerPage() {
  const { toast, ToastHost } = useToast();
  const [type, setType] = useState<"fbo" | "individual">("fbo");
  const [crops, setCrops] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    fbo_name: "",
    name: "",
    phone: "",
    region: "",
    location: "",
    members: "",
    quantity: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  function toggleCrop(c: string) {
    setCrops((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));
  }

  function validate() {
    const e: Record<string, boolean> = {
      fbo_name: type === "fbo" && form.fbo_name.trim().length < 2,
      name: form.name.trim().length < 2,
      phone: form.phone.replace(/\D/g, "").length < 9,
      region: !form.region,
      crops: crops.length === 0,
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
      const payload = {
        registration_type: type,
        fbo_name: type === "fbo" ? form.fbo_name.trim() : null,
        contact_name: form.name.trim(),
        phone: form.phone.replace(/\s/g, ""),
        region: form.region,
        location: form.location.trim() || null,
        member_count: form.members || null,
        crops: crops.join(", "),
        typical_quantity: form.quantity || null,
        notes: form.notes.trim() || null,
        status: "pending",
      };
      const saved = await createFarmerRegistration(payload);
      if (!saved) throw new Error("failed");
      setDone(true);
    } catch {
      toast("Could not submit. Please try again or call 054 411 4198.", "error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Navbar variant="solid" />
      <main className="min-h-screen">
        <PageHeader
          eyebrow="Farmer registration"
          title="Register your FBO with Agrobridge"
          subtitle="The pilot is in the Eastern Region. List expected crops and animal protein so verified buyers can pre-order before harvest."
        />

        <div className="grid gap-px border-y border-brand-100 bg-brand-100 md:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((b) => (
            <div key={b.title} className="bg-white px-5 py-6 text-left">
              <h3 className="mb-1.5 text-[0.95rem] font-bold">{b.title}</h3>
              <p className="text-[0.84rem] leading-relaxed text-ink-muted">{b.desc}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto max-w-2xl px-5 py-12 sm:px-6">
          {done ? (
            <div className="rounded-2xl border border-brand-100 bg-white p-10 text-center shadow-soft">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                <Icon name="check" size="2xl" />
              </div>
              <h2 className="mb-2 text-[1.7rem] font-extrabold">Registration received</h2>
              <p className="mx-auto mb-6 max-w-md text-[0.95rem] leading-relaxed text-ink-muted">
                An Agrobridge agent will call you on {form.phone || "your number"} to arrange an in-person visit and register your members. For urgent questions, call or WhatsApp 054 411 4198.
              </p>
              <div className="flex flex-col justify-center gap-3 sm:flex-row">
                <Link href="/farmer-portal" className="btn btn-primary">
                  Check listing status
                </Link>
                <Link href="/" className="btn btn-ghost">
                  Back to home
                </Link>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-brand-100 bg-white p-6 shadow-soft sm:p-8">
              <h2 className="mb-1 text-[1.4rem] font-extrabold">Register your farmer group</h2>
              <p className="mb-8 text-[0.9rem] leading-relaxed text-ink-muted">
                Fill in your details below. An Agrobridge agent will call you back on 054 411 4198 to arrange the in-person visit.
              </p>

              <div className="mb-8">
                <div className="mb-3 text-xs font-bold uppercase tracking-[0.08em] text-ink-muted">
                  Registration type
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {(
                    [
                      ["fbo", "FBO / Group leader", "I lead an FBO and want to register our members."],
                      ["individual", "Individual farmer", "I farm independently and want to supply produce."],
                    ] as const
                  ).map(([id, title, desc]) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setType(id)}
                      className={[
                        "rounded-xl border-2 p-4 text-left transition",
                        type === id
                          ? "border-brand-500 bg-brand-100"
                          : "border-brand-100 bg-white hover:border-brand-500/40",
                      ].join(" ")}
                    >
                      <div className="mb-1 font-bold text-ink">{title}</div>
                      <div className="text-[0.8rem] leading-relaxed text-ink-muted">{desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6 space-y-4">
                <div className="text-xs font-bold uppercase tracking-[0.08em] text-ink-muted">
                  Your details
                </div>
                {type === "fbo" && (
                  <div>
                    <label className="field-label">
                      FBO / Group name <span className="req">*</span>
                    </label>
                    <input
                      className={["field", errors.fbo_name ? "border-accent-500" : ""].join(" ")}
                      value={form.fbo_name}
                      onChange={(e) => set("fbo_name", e.target.value)}
                      placeholder="e.g. Ejisu Farmers Cooperative"
                    />
                  </div>
                )}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="field-label">
                      {type === "fbo" ? "Group leader name" : "Your name"}{" "}
                      <span className="req">*</span>
                    </label>
                    <input
                      className={["field", errors.name ? "border-accent-500" : ""].join(" ")}
                      value={form.name}
                      onChange={(e) => set("name", e.target.value)}
                      placeholder="e.g. Kwame Boateng"
                    />
                  </div>
                  <div>
                    <label className="field-label">
                      Phone number <span className="req">*</span>
                    </label>
                    <input
                      className={["field", errors.phone ? "border-accent-500" : ""].join(" ")}
                      value={form.phone}
                      onChange={(e) => set("phone", e.target.value)}
                      placeholder="024 123 4567"
                    />
                    <p className="form-hint mt-1 text-[0.74rem] text-ink-muted">
                      This is the number we will call you on.
                    </p>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="field-label">
                      Region <span className="req">*</span>
                    </label>
                    <select
                      className={["field", errors.region ? "border-accent-500" : ""].join(" ")}
                      value={form.region}
                      onChange={(e) => set("region", e.target.value)}
                    >
                      <option value="">— Select region —</option>
                      {REGIONS.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="field-label">Nearest town / market</label>
                    <input
                      className="field"
                      value={form.location}
                      onChange={(e) => set("location", e.target.value)}
                      placeholder="e.g. Near Ejisu, Kumasi"
                    />
                  </div>
                </div>
                {type === "fbo" && (
                  <div>
                    <label className="field-label">Number of farmers in your group</label>
                    <select
                      className="field"
                      value={form.members}
                      onChange={(e) => set("members", e.target.value)}
                    >
                      <option value="">— Select range —</option>
                      <option>1 – 10 farmers</option>
                      <option>11 – 30 farmers</option>
                      <option>31 – 50 farmers</option>
                      <option>51 – 100 farmers</option>
                      <option>More than 100 farmers</option>
                    </select>
                  </div>
                )}
              </div>

              <div className="mb-6">
                <div className="mb-3 text-xs font-bold uppercase tracking-[0.08em] text-ink-muted">
                  What you grow
                </div>
                <label className="field-label">
                  Crops you can supply <span className="req">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {CROPS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => toggleCrop(c)}
                      className={[
                        "rounded-lg border px-3 py-2.5 text-left text-[0.84rem] font-semibold transition",
                        crops.includes(c)
                          ? "border-brand-500 bg-brand-100 text-brand-700"
                          : "border-brand-100 text-ink hover:border-brand-500/40",
                      ].join(" ")}
                    >
                      {c}
                    </button>
                  ))}
                </div>
                {errors.crops && (
                  <p className="mt-2 text-[0.74rem] text-red-600">Select at least one crop.</p>
                )}
                <div className="mt-4">
                  <label className="field-label">Typical quantity per season</label>
                  <input
                    className="field"
                    value={form.quantity}
                    onChange={(e) => set("quantity", e.target.value)}
                    placeholder="e.g. 50 crates / 200 bags"
                  />
                </div>
                <div className="mt-4">
                  <label className="field-label">Anything else we should know?</label>
                  <textarea
                    className="field min-h-[100px] resize-y"
                    value={form.notes}
                    onChange={(e) => set("notes", e.target.value)}
                    placeholder="Optional notes about your farm or produce"
                  />
                </div>
              </div>

              <button
                className="btn btn-primary btn-block"
                disabled={submitting}
                onClick={submit}
              >
                {submitting ? <span className="spinner" /> : "Submit registration"}
              </button>
              <p className="mt-4 text-center text-[0.84rem] text-ink-muted">
                Looking to buy?{" "}
                <Link href="/register/buyer" className="font-semibold text-brand-700">
                  Register as a buyer
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

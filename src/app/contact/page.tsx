"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Icon from "@/components/Icon";
import { PageHeader } from "@/components/PageShell";
import { useToast } from "@/components/Toast";
import { config, whatsappLink } from "@/lib/config";
import { createMessage } from "@/lib/api";

const FAQS = [
  {
    q: "How do I register an FBO or farmer group?",
    a: "An Agrobridge agent visits your FBO leader in person to register all members and crops in one session. You can also start the registration online or call 054 411 4198.",
  },
  {
    q: "Do farmers need a smartphone to use Agrobridge?",
    a: "No. Farmers without smartphones use SMS, WhatsApp, or a phone call. The FBO leader is the point of contact for the group.",
  },
  {
    q: "Where is the pilot?",
    a: "Every listing and delivery is in the Eastern Region. The pilot starts with 2–3 farmer groups and 5–10 verified buyers. Crops, beef, goat meat, and chicken meat use the same flow.",
  },
  {
    q: "What are the platform fees?",
    a: "Joining is free. Agrobridge charges a 2% buyer fee only when a trade clears — GHS 500 on a GHS 25,000 order. The FBO leader is paid 1% on qualifying group volume.",
  },
  {
    q: "How does escrow payment work?",
    a: "The buyer pays by bank or Mobile Money. Funds stay in escrow until delivery is confirmed, then the farmer is paid.",
  },
  {
    q: "Who can buy?",
    a: "Verified bulk buyers: hotels, shops, and processors. Households can also order from listed lots. The pilot starts with buyers who can commit to grade, quantity, and a delivery date.",
  },
];

const SUBJECTS = [
  "I am an FBO leader registering my group",
  "I want to pre-order bulk supply",
  "Delivery and logistics question",
  "Escrow or payment question",
  "Partnership or collaboration",
  "Media inquiry",
  "Technical issue with website",
  "Other question",
];

export default function ContactPage() {
  const { toast, ToastHost } = useToast();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", role: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  function validate() {
    const e: Record<string, boolean> = {
      name: form.name.trim().length < 2,
      phone: form.phone.replace(/\s/g, "").length < 9,
      subject: !form.subject,
      message: form.message.trim().length < 3,
    };
    setErrors(e);
    return !Object.values(e).some(Boolean);
  }

  async function submit() {
    if (!validate()) return;
    setSubmitting(true);
    try {
      const saved = await createMessage({
        name: form.name.trim(),
        phone: form.phone.replace(/\s/g, ""),
        role: form.role || "",
        subject: form.subject,
        message: form.message.trim(),
      });
      if (!saved) throw new Error("failed");
      setDone(true);
    } catch {
      toast("Something went wrong. Please call or WhatsApp us directly.", "error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Navbar variant="solid" />
      <main className="min-h-screen">
        <PageHeader
          eyebrow="Contact"
          title="Contact us"
          subtitle="Whether you are a farmer, buyer, or just curious — we respond quickly on WhatsApp and phone."
        />

        <section className="section">
          <div className="mx-auto grid max-w-content items-start gap-10 lg:grid-cols-[1fr_1.4fr]">
            {/* LEFT: info */}
            <div>
              <h2 className="mb-4 font-display text-[1.4rem] font-bold">Get in touch</h2>
              {[
                { label: "Phone", val: config.supportPhone, sub: "Call or SMS — Hours: [TBD]", href: config.supportPhoneHref, cta: "Call now" }, // TODO confirm support hours
                { label: "WhatsApp", val: "Chat with us on WhatsApp", sub: "Fastest response — 054 411 4198", href: whatsappLink("Hi Agrobridge"), cta: "Open WhatsApp", wa: true },
                { label: "MoMo", val: "[TBD]", sub: "Payment via MTN MoMo — // TODO confirm MoMo merchant number" },
                { label: "Location", val: "Eastern Region", sub: "Pilot area · Office / Ghana Post GPS: [TBD]" },
              ].map((c) => (
                <div key={c.label} className="mb-3.5 rounded-xl border border-line bg-white p-5">
                  <div className="text-[0.74rem] font-bold uppercase tracking-[0.06em] text-muted">
                    {c.label}
                  </div>
                  <div className="mb-0.5 mt-1 text-[0.97rem] font-bold text-ink">{c.val}</div>
                  <div className="text-[0.78rem] text-muted">{c.sub}</div>
                  {c.href && (
                    <a
                      href={c.href}
                      target={c.wa ? "_blank" : undefined}
                      rel={c.wa ? "noopener noreferrer" : undefined}
                      className={[
                        "mt-2.5 inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[0.8rem] font-semibold text-white transition",
                        c.wa ? "bg-[#25d366] hover:bg-[#1db954]" : "bg-brand hover:bg-brand-deep",
                      ].join(" ")}
                    >
                      {c.cta}
                    </a>
                  )}
                </div>
              ))}
              <div className="mt-2 flex items-center gap-2.5 rounded-[10px] border border-line bg-brand-pale px-4 py-3 text-[0.83rem] text-brand">
                <span className="h-2 w-2 animate-pulse rounded-full bg-brand-deep" />
                We respond quickly during support hours ([TBD]). {/* TODO confirm support hours */}
              </div>
            </div>

            {/* RIGHT: form */}
            <div className="rounded-2xl border border-line bg-white p-7 shadow-[0_4px_20px_rgba(28,26,23,0.06)]">
              {done ? (
                <div className="py-6 text-center">
                  <div className="mx-auto mb-4 flex h-[70px] w-[70px] items-center justify-center rounded-full bg-leaf-pale text-leaf">
                    <Icon name="check" size="2xl" />
                  </div>
                  <h3 className="mb-2 font-display text-[1.4rem] font-extrabold">Message sent</h3>
                  <p className="leading-relaxed text-muted">
                    Thank you for reaching out. We will get back to you shortly. For
                    urgent help, call{" "}
                    <a href={config.supportPhoneHref} className="font-bold text-brand">
                      {config.supportPhone}
                    </a>
                    .
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="mb-1 font-display text-[1.3rem] font-extrabold">
                    Send us a message
                  </h2>
                  <p className="mb-5 text-[0.86rem] text-muted">
                    We reply to the phone number you provide.
                  </p>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="field-label">
                        Your name <span className="req">*</span>
                      </label>
                      <input
                        className="field"
                        value={form.name}
                        onChange={(e) => set("name", e.target.value)}
                        placeholder="e.g. Kofi Mensah"
                      />
                      {errors.name && <p className="mt-1 text-[0.74rem] text-accent">Enter your name.</p>}
                    </div>
                    <div>
                      <label className="field-label">
                        Phone <span className="req">*</span>
                      </label>
                      <input
                        className="field"
                        value={form.phone}
                        onChange={(e) => set("phone", e.target.value)}
                        placeholder="024 123 4567"
                      />
                      {errors.phone && <p className="mt-1 text-[0.74rem] text-accent">Enter a valid phone.</p>}
                    </div>
                  </div>

                  <div className="mt-3">
                    <label className="field-label">I am a</label>
                    <select className="field" value={form.role} onChange={(e) => set("role", e.target.value)}>
                      <option value="">— Select —</option>
                      {["FBO Leader", "Farmer", "Buyer / Trader", "Driver / Logistics", "NGO / Partner", "Other"].map((r) => (
                        <option key={r}>{r}</option>
                      ))}
                    </select>
                  </div>

                  <div className="mt-3">
                    <label className="field-label">
                      Subject <span className="req">*</span>
                    </label>
                    <select className="field" value={form.subject} onChange={(e) => set("subject", e.target.value)}>
                      <option value="">— What is this about? —</option>
                      {SUBJECTS.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                    {errors.subject && <p className="mt-1 text-[0.74rem] text-accent">Please select a subject.</p>}
                  </div>

                  <div className="mt-3">
                    <label className="field-label">
                      Message <span className="req">*</span>
                    </label>
                    <textarea
                      className="field"
                      rows={4}
                      maxLength={500}
                      value={form.message}
                      onChange={(e) => set("message", e.target.value)}
                      placeholder="Tell us more about your question or how we can help..."
                    />
                    <div className="mt-1 text-right text-[0.72rem] text-muted">
                      {form.message.length} / 500
                    </div>
                    {errors.message && <p className="text-[0.74rem] text-accent">Please write a message.</p>}
                  </div>

                  <button
                    onClick={submit}
                    disabled={submitting}
                    className="btn btn-primary btn-block mt-2 disabled:opacity-60"
                  >
                    {submitting ? <span className="spinner" /> : "Send message"}
                  </button>
                  <p className="mt-3 text-center text-[0.78rem] text-muted">
                    Or reach us on{" "}
                    <a href={whatsappLink("Hi Agrobridge")} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand">
                      WhatsApp
                    </a>{" "}
                    for the fastest response.
                  </p>
                </>
              )}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section pt-0">
          <div className="mx-auto max-w-content">
            <h2 className="mb-5 font-display text-[1.6rem] font-extrabold">
              Frequently asked questions
            </h2>
            <div className="flex flex-col gap-2.5">
              {FAQS.map((f, i) => (
                <div key={f.q} className="overflow-hidden rounded-xl border border-line bg-white">
                  <button
                    className="flex w-full items-center justify-between px-5 py-4 text-left text-[0.93rem] font-semibold transition hover:bg-surface"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    {f.q}
                    <span className={["text-muted transition-transform", openFaq === i ? "rotate-180" : ""].join(" ")}>
                      ▼
                    </span>
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-4 text-[0.88rem] leading-relaxed text-muted">{f.a}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ToastHost />
    </>
  );
}

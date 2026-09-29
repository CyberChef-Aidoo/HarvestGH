"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Icon from "@/components/Icon";
import { config, whatsappLink } from "@/lib/config";
import {
  escrowLabel,
  formatWhen,
  lookupOrders,
  maskPhone,
  orderTimeline,
  STATUS_LABELS,
  type TrackedOrder,
} from "@/lib/tracked-orders";

function TrackInner() {
  const params = useSearchParams();
  const [ref, setRef] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [orders, setOrders] = useState<TrackedOrder[] | null>(null);

  useEffect(() => {
    const r = params.get("ref") || "";
    const p = params.get("phone") || "";
    if (r) setRef(r.toUpperCase());
    if (p) setPhone(p);
    if (r && p) void lookup(r, p);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  async function lookup(refValue: string, phoneValue: string) {
    const cleanedRef = refValue.trim().toUpperCase();
    const cleanedPhone = phoneValue.replace(/\D/g, "");
    if (cleanedRef.length < 6) {
      setError("Enter a valid order reference (e.g. AGB-2026-1002)");
      return;
    }
    if (cleanedPhone.length < 9) {
      setError("Enter the phone number used at checkout");
      return;
    }
    setError("");
    setLoading(true);
    setOrders(null);
    try {
      setOrders(await lookupOrders({ ref: cleanedRef, phone: cleanedPhone }));
    } catch {
      setError("Could not look up that order. Try again or contact support.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="lookup-shell !max-w-3xl">
      <div className="lookup-card">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-100 text-brand-700">
          <Icon name="package" size="lg" />
        </div>
        <h1>Track your order</h1>
        <p>Enter the order reference and the phone number used at checkout.</p>

        <div className="flex flex-col gap-2">
          <input
            className="field text-center font-semibold tracking-wide sm:text-left"
            value={ref}
            onChange={(e) => setRef(e.target.value.toUpperCase())}
            placeholder="e.g. AGB-2026-1002"
            maxLength={20}
            aria-label="Order reference"
            onKeyDown={(e) => e.key === "Enter" && lookup(ref, phone)}
          />
          <input
            className="field"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="024 433 3444"
            aria-label="Phone number"
            onKeyDown={(e) => e.key === "Enter" && lookup(ref, phone)}
          />
          <button
            className="btn btn-primary shrink-0"
            disabled={loading}
            onClick={() => lookup(ref, phone)}
          >
            {loading ? <span className="spinner" /> : "Track"}
          </button>
        </div>

        {error && <p className="mt-3 text-left text-[0.82rem] text-red-600">{error}</p>}

        <p className="mt-4 text-center text-[0.78rem] text-ink-muted">
          Try{" "}
          <button
            type="button"
            className="font-semibold text-brand-700"
            onClick={() => {
              setRef("AGB-2026-1002");
              setPhone("0244333444");
              void lookup("AGB-2026-1002", "0244333444");
            }}
          >
            AGB-2026-1002
          </button>{" "}
          and 0244333444 to see a delivery that is on the way.
        </p>
      </div>

      {orders && orders.length === 0 && (
        <div className="mt-5 rounded-2xl border border-brand-100 bg-white p-8 text-center">
          <h3 className="mb-2 text-[1.2rem] font-extrabold">No order found</h3>
          <p className="mb-4 text-[0.9rem] text-ink-muted">
            Double-check the reference, or message us on WhatsApp with your phone number.
          </p>
          <a href={whatsappLink("Hi, I need help tracking my order")} className="btn btn-primary" target="_blank" rel="noreferrer">
            Chat on WhatsApp
          </a>
        </div>
      )}

      {orders?.map((order) => {
        const cancelled = order.order_status === "cancelled";
        const steps = orderTimeline(order);
        return (
          <article key={order.id || order.order_ref} className="mt-5 rounded-2xl border border-brand-100 bg-white p-6 text-left shadow-soft">
            <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="text-[0.72rem] font-bold uppercase tracking-wide text-ink-muted">
                  Order reference
                </div>
                <div className="font-display text-xl font-extrabold tabular text-brand-700">
                  {order.order_ref}
                </div>
                <div className="mt-1 text-[0.78rem] text-ink-muted">
                  Placed {formatWhen(order.created_at)}
                  {order.order_type === "preorder" ? " · Preorder" : ""}
                </div>
              </div>
              <span
                className={[
                  "rounded-full px-3 py-1 text-[0.75rem] font-bold",
                  cancelled ? "bg-accent-50 text-red-600" : "bg-brand-100 text-brand-700",
                ].join(" ")}
              >
                {STATUS_LABELS[order.order_status] || order.order_status}
              </span>
            </div>

            <p className="mb-5 rounded-xl bg-brand-100 px-4 py-3 text-[0.86rem] leading-relaxed text-brand-700">
              {escrowLabel(order)}
            </p>

            {!cancelled && (
              <ol className="mb-6 space-y-0">
                {steps.map((step, i) => (
                  <li key={step.key} className="relative flex gap-3 pb-4 last:pb-0">
                    {i < steps.length - 1 && (
                      <span
                        className={[
                          "absolute left-[13px] top-7 h-[calc(100%-12px)] w-0.5",
                          step.state === "done" ? "bg-brand-600" : "bg-brand-100",
                        ].join(" ")}
                      />
                    )}
                    <span
                      className={[
                        "z-[1] flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 text-[0.7rem] font-bold",
                        step.state === "done"
                          ? "border-brand-600 bg-brand-600 text-white"
                          : step.state === "current"
                            ? "border-accent-500 bg-accent-500 text-ink"
                            : "border-brand-100 bg-white text-ink-muted",
                      ].join(" ")}
                    >
                      {step.state === "done" ? <Icon name="check" size="sm" /> : i + 1}
                    </span>
                    <div className="min-w-0 pt-0.5">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                        <span
                          className={[
                            "text-[0.9rem] font-semibold",
                            step.state === "upcoming" ? "text-ink-muted" : "text-ink",
                          ].join(" ")}
                        >
                          {step.label}
                        </span>
                        {step.at && (
                          <span className="text-[0.72rem] text-ink-muted">{formatWhen(step.at)}</span>
                        )}
                      </div>
                      {step.state !== "upcoming" && (
                        <p className="m-0 mt-0.5 text-[0.8rem] leading-snug text-ink-muted">{step.detail}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            )}

            <div className="grid gap-2 sm:grid-cols-2">
              {[
                ["Product", order.product_name],
                ["Quantity", `${order.quantity} ${order.product_unit}`.trim()],
                ["Total", `GH₵${Number(order.total_price).toFixed(2)}`],
                ["Delivery", order.delivery_fee ? `GH₵${Number(order.delivery_fee).toFixed(2)}` : "Included"],
                ["Deliver to", order.delivery_address],
                ["Region", order.delivery_region],
                ["Buyer", order.buyer_name],
                ["Phone", maskPhone(order.buyer_phone)],
              ].map(([label, val]) =>
                val ? (
                  <div key={label} className="rounded-lg bg-surface px-3 py-2.5">
                    <div className="text-[0.68rem] font-bold uppercase tracking-wide text-ink-muted">{label}</div>
                    <div className="text-[0.9rem] font-semibold text-ink">{val}</div>
                  </div>
                ) : null,
              )}
            </div>

            <p className="mt-4 text-[0.8rem] text-ink-muted">
              Need help? Call{" "}
              <a className="font-semibold text-brand-700" href={config.supportPhoneHref}>
                {config.supportPhone}
              </a>{" "}
              or{" "}
              <Link href="/contact" className="font-semibold text-brand-700">
                contact us
              </Link>
              .
            </p>
          </article>
        );
      })}
    </div>
  );
}

export default function OrderStatusPage() {
  return (
    <>
      <Navbar variant="solid" />
      <main className="min-h-screen bg-surface">
        <Suspense
          fallback={
            <div className="lookup-shell">
              <div className="lookup-card">
                <p>Loading…</p>
              </div>
            </div>
          }
        >
          <TrackInner />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

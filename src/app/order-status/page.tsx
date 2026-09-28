"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Icon from "@/components/Icon";
import { fetchOrders } from "@/lib/api";
import { config, whatsappLink } from "@/lib/config";

const STATUS_STEPS = ["pending", "confirmed", "processing", "dispatched", "delivered"] as const;
const STATUS_LABELS: Record<string, string> = {
  pending: "Order placed",
  confirmed: "Confirmed",
  processing: "Processing",
  dispatched: "On the way",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

type Order = {
  id?: string;
  order_ref?: string;
  status?: string;
  order_status?: string;
  buyer_name?: string;
  buyer_phone?: string;
  product_name?: string;
  quantity?: number;
  unit?: string;
  product_unit?: string;
  total_amount?: number;
  total_price?: number;
  delivery_region?: string;
  created_at?: string;
};

function normalizeOrder(row: Record<string, unknown>): Order {
  return {
    id: String(row.id ?? ""),
    order_ref: String(row.order_ref ?? ""),
    status: String(row.order_status ?? row.status ?? "pending"),
    order_status: String(row.order_status ?? row.status ?? "pending"),
    buyer_name: String(row.buyer_name ?? ""),
    buyer_phone: String(row.buyer_phone ?? ""),
    product_name: String(row.product_name ?? ""),
    quantity: Number(row.quantity ?? 0),
    unit: String(row.product_unit ?? row.unit ?? ""),
    total_amount: Number(row.total_price ?? row.total_amount ?? 0),
    total_price: Number(row.total_price ?? 0),
    delivery_region: String(row.delivery_region ?? ""),
    created_at: String(row.created_at ?? ""),
  };
}

function TrackInner() {
  const params = useSearchParams();
  const [ref, setRef] = useState("");
  const [phone, setPhone] = useState("");
  const [showPhone, setShowPhone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [orders, setOrders] = useState<Order[] | null>(null);

  useEffect(() => {
    const r = params.get("ref");
    if (r) {
      setRef(r.toUpperCase());
      void lookupByRef(r.toUpperCase());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  async function lookupByRef(value: string) {
    const cleaned = value.trim().toUpperCase();
    if (cleaned.length < 6) {
      setError("Enter a valid order reference (e.g. HGH-2026-4721)");
      return;
    }
    setError("");
    setLoading(true);
    setOrders(null);
    try {
      const data = await fetchOrders({ ref: cleaned });
      setOrders(data.map((row) => normalizeOrder(row)));
    } catch {
      setError("Could not look up that order. Try again or contact support.");
    } finally {
      setLoading(false);
    }
  }

  async function lookupByPhone() {
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length < 9) {
      setError("Enter a valid phone number");
      return;
    }
    setError("");
    setLoading(true);
    setOrders(null);
    try {
      const data = await fetchOrders({ phone: cleaned });
      setOrders(data.map((row) => normalizeOrder(row)));
    } catch {
      setError("Could not find orders for that number.");
    } finally {
      setLoading(false);
    }
  }

  function statusIndex(status?: string) {
    const i = STATUS_STEPS.indexOf((status || "pending") as (typeof STATUS_STEPS)[number]);
    return i < 0 ? 0 : i;
  }

  return (
    <div className="lookup-shell">
      <div className="lookup-card">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-pale text-xl font-bold text-green">
          H
        </div>
        <h1>Track your order</h1>
        <p>Enter your order reference to see delivery status and order details.</p>

        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            className="field text-center font-semibold tracking-wide sm:text-left"
            value={ref}
            onChange={(e) => setRef(e.target.value.toUpperCase())}
            placeholder="e.g. HGH-2026-4721"
            maxLength={20}
            onKeyDown={(e) => e.key === "Enter" && lookupByRef(ref)}
          />
          <button
            className="btn btn-primary shrink-0"
            disabled={loading}
            onClick={() => lookupByRef(ref)}
          >
            {loading ? <span className="spinner" /> : "Track"}
          </button>
        </div>

        {error && <p className="mt-3 text-left text-[0.82rem] text-[#c0392b]">{error}</p>}

        <p className="mt-4 text-center text-[0.78rem] text-muted">
          Reference was sent by SMS after ordering. You can also{" "}
          <button
            type="button"
            className="font-semibold text-green underline-offset-2 hover:underline"
            onClick={() => setShowPhone(true)}
          >
            search by phone number
          </button>
          .
        </p>

        {showPhone && (
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <input
              className="field"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="024 123 4567"
              onKeyDown={(e) => e.key === "Enter" && lookupByPhone()}
            />
            <button className="btn btn-primary shrink-0" disabled={loading} onClick={lookupByPhone}>
              Search
            </button>
          </div>
        )}
      </div>

      {orders && orders.length === 0 && (
        <div className="mt-5 rounded-2xl border border-line bg-white p-8 text-center">
          <h3 className="mb-2 text-[1.2rem] font-extrabold">No order found</h3>
          <p className="mb-4 text-[0.9rem] text-muted">
            Double-check the reference, or message us on WhatsApp with your phone number.
          </p>
          <a href={whatsappLink("Hi, I need help tracking my order")} className="btn btn-primary" target="_blank" rel="noreferrer">
            Chat on WhatsApp
          </a>
        </div>
      )}

      {orders &&
        orders.map((o) => {
          const idx = statusIndex(o.status);
          const cancelled = o.status === "cancelled";
          return (
            <div key={o.id || o.order_ref} className="mt-5 rounded-2xl border border-line bg-white p-6 text-left shadow-soft">
              <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="text-[0.72rem] font-bold uppercase tracking-wide text-muted">
                    Order reference
                  </div>
                  <div className="font-display text-xl font-extrabold order-id tabular text-green">
                    {o.order_ref || "—"}
                  </div>
                </div>
                <span
                  className={[
                    "rounded-full px-3 py-1 text-[0.75rem] font-bold",
                    cancelled ? "bg-[#fdecea] text-[#c0392b]" : "bg-green-pale text-green",
                  ].join(" ")}
                >
                  {STATUS_LABELS[o.status || "pending"] || o.status}
                </span>
              </div>

              {!cancelled && (
                <div className="mb-5 flex items-center">
                  {STATUS_STEPS.map((step, i) => (
                    <div key={step} className="relative flex flex-1 flex-col items-center">
                      <div
                        className={[
                          "z-[1] flex h-7 w-7 items-center justify-center rounded-full border-2 text-[0.7rem] font-bold",
                          i < idx
                            ? "border-green bg-green text-white"
                            : i === idx
                              ? "border-gold bg-gold text-dark"
                              : "border-line bg-white text-muted",
                        ].join(" ")}
                      >
                        {i < idx ? <Icon name="check" size="sm" /> : i + 1}
                      </div>
                      {i < STATUS_STEPS.length - 1 && (
                        <div
                          className={[
                            "absolute left-1/2 top-[13px] h-0.5 w-full",
                            i < idx ? "bg-green" : "bg-line",
                          ].join(" ")}
                        />
                      )}
                      <div
                        className={[
                          "mt-1.5 text-center text-[0.62rem] font-medium",
                          i === idx ? "font-bold text-gold" : i < idx ? "text-green" : "text-muted",
                        ].join(" ")}
                      >
                        {STATUS_LABELS[step]}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="grid gap-2 sm:grid-cols-2">
                {[
                  ["Product", o.product_name],
                  ["Quantity", o.quantity != null ? `${o.quantity} ${o.unit || ""}` : null],
                  ["Total", o.total_amount != null ? `GH₵${Number(o.total_amount).toFixed(2)}` : null],
                  ["Region", o.delivery_region],
                  ["Buyer", o.buyer_name],
                  ["Phone", o.buyer_phone],
                ].map(([label, val]) =>
                  val ? (
                    <div key={String(label)} className="rounded-lg bg-cream px-3 py-2.5">
                      <div className="text-[0.68rem] font-bold uppercase tracking-wide text-muted">
                        {label}
                      </div>
                      <div className="text-[0.9rem] font-semibold text-ink">{val}</div>
                    </div>
                  ) : null,
                )}
              </div>

              <p className="mt-4 text-[0.8rem] text-muted">
                Need help? Call{" "}
                <a className="font-semibold text-green" href={`tel:${config.supportPhone}`}>
                  {config.supportPhone}
                </a>{" "}
                or{" "}
                <Link href="/contact" className="font-semibold text-green">
                  contact us
                </Link>
                .
              </p>
            </div>
          );
        })}
    </div>
  );
}

export default function OrderStatusPage() {
  return (
    <>
      <Navbar variant="solid" />
      <main className="min-h-screen bg-cream">
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

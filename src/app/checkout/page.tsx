"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Icon from "@/components/Icon";
import { useToast } from "@/components/Toast";
import { fetchProduct, createOrder } from "@/lib/api";
import { config } from "@/lib/config";
import { saveTrackedOrder } from "@/lib/tracked-orders";
import { REGIONS, deliveryFeeFor } from "@/lib/data";
import { DEMO_PRODUCTS } from "@/lib/demo-products";
import type { Product } from "@/lib/types";

declare global {
  interface Window {
    PaystackPop?: {
      setup: (opts: Record<string, unknown>) => { openIframe: () => void };
    };
  }
}

function loadPaystack() {
  if (typeof window === "undefined" || window.PaystackPop) return Promise.resolve();
  return new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>("script[data-paystack]");
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("Paystack failed to load")), { once: true });
      return;
    }
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    script.dataset.paystack = "true";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Paystack failed to load"));
    document.body.appendChild(script);
  });
}

function fmtDate(d?: string | null) {
  if (!d) return "a future date";
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function CheckoutInner() {
  const params = useSearchParams();
  const id = params.get("id");
  const orderType = params.get("type") || "direct";
  const { toast, ToastHost } = useToast();

  const [status, setStatus] = useState<"loading" | "error" | "ok" | "success">("loading");
  const [product, setProduct] = useState<Product | null>(null);
  const [qty, setQty] = useState(1);
  const [form, setForm] = useState({ name: "", phone: "", email: "", region: "", address: "", notes: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [paying, setPaying] = useState(false);
  const [orderRef, setOrderRef] = useState("");

  useEffect(() => {
    if (!id) {
      setStatus("error");
      return;
    }
    (async () => {
      const data = await fetchProduct(id);
      const demo = DEMO_PRODUCTS.find((p) => p.id === id);
      const next = data ?? demo ?? null;
      if (!next) {
        setStatus("error");
        return;
      }
      setProduct(next);
      setQty(next.min_order ?? 1);
      setStatus("ok");
    })();
  }, [id]);

  if (status === "loading") {
    return <div className="flex min-h-[60vh] items-center justify-center text-ink-muted">Loading product…</div>;
  }

  if (status === "error" || !product) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-6">
        <div className="w-full max-w-md rounded-2xl border border-brand-100 bg-white p-9 text-center">
          <div className="mb-3 flex justify-center text-red-600">
            <Icon name="alert-triangle" size="2xl" />
          </div>
          <h2 className="mb-2 font-display text-[1.4rem] font-extrabold">Product not found</h2>
          <p className="mb-5 text-ink-muted">
            This product may no longer be available. Browse our marketplace for other options.
          </p>
          <Link href="/shop" className="btn btn-primary">
            Browse products
          </Link>
        </div>
      </div>
    );
  }

  const remaining = Math.max(0, Number(product.quantity_available) - Number(product.sold_quantity || 0));
  const min = product.min_order ?? 1;
  const isPre = product.is_preorder || orderType === "preorder";
  const subtotal = qty * Number(product.price_per_unit);
  const delivery = form.region ? deliveryFeeFor(form.region) : 0;
  const total = subtotal + delivery;

  const setField = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));
  const changeQty = (d: number) => setQty((q) => Math.max(min, Math.min(q + d, remaining || q + d)));

  function validate() {
    const e: Record<string, string> = {};
    if (qty < min) e.qty = `Minimum order is ${min} ${product!.unit}s.`;
    else if (qty > remaining) e.qty = `Only ${remaining} ${product!.unit}s available.`;
    if (form.name.trim().length < 2) e.name = "Enter your name.";
    if (form.phone.replace(/\s/g, "").length < 9) e.phone = "Enter a valid phone number.";
    if (!form.region) e.region = "Select your delivery region.";
    if (form.address.trim().length < 6) e.address = "Enter your delivery address.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function saveOrder(payRef: string, ref: string) {
    const order = {
      order_ref: ref,
      product_id: product!.id,
      product_name: product!.name,
      product_unit: product!.unit,
      buyer_name: form.name.trim(),
      buyer_phone: form.phone.replace(/\s/g, ""),
      buyer_email: form.email.trim() || "",
      quantity: qty,
      price_per_unit: Number(product!.price_per_unit),
      subtotal,
      delivery_fee: delivery,
      total_price: total,
      delivery_address: form.address.trim(),
      delivery_region: form.region,
      order_type: orderType,
      payment_status: payRef.startsWith("DEMO_") ? "pending" : "paid",
      payment_ref: payRef,
      payment_method: "paystack",
      notes: form.notes.trim() || "",
    };
    try {
      await createOrder(order);
    } catch {
      /* demo mode — ignore */
    }
    saveTrackedOrder({
      id: ref,
      order_ref: ref,
      order_status: "pending",
      payment_status: order.payment_status,
      buyer_name: order.buyer_name,
      buyer_phone: order.buyer_phone,
      product_name: order.product_name,
      product_unit: order.product_unit,
      quantity: order.quantity,
      total_price: order.total_price,
      delivery_fee: order.delivery_fee,
      delivery_address: order.delivery_address,
      delivery_region: order.delivery_region,
      order_type: order.order_type,
      created_at: new Date().toISOString(),
      notes: order.notes,
    });
    setPaying(false);
    setOrderRef(ref);
    setStatus("success");
  }

  async function startPayment() {
    if (!validate()) return;
    const ref = "AGB-" + new Date().getFullYear() + "-" + String(Math.floor(Math.random() * 9000) + 1000);
    const email = form.email.trim() || `${form.phone.replace(/\s/g, "")}@agrobridge.gh`;
    setPaying(true);

    if (!config.paystackKey.includes("YOUR_")) {
      try {
        await loadPaystack();
        if (!window.PaystackPop) throw new Error("Paystack missing");
        const handler = window.PaystackPop.setup({
          key: config.paystackKey,
          email,
          amount: Math.round(total * 100),
          currency: "GHS",
          ref,
          metadata: { order_ref: ref, buyer_name: form.name.trim(), product_name: product!.name, quantity: qty },
          callback: (res: { reference: string }) => saveOrder(res.reference, ref),
          onClose: () => {
            toast("Payment cancelled. Your order was not placed.", "error");
            setPaying(false);
          },
        });
        handler.openIframe();
        return;
      } catch {
        /* fall through to demo */
      }
    }
    toast("Paystack not configured — saving order in demo mode.", "info");
    saveOrder("DEMO_" + Date.now(), ref);
  }

  if (status === "success") {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-6 py-16">
        <div className="w-full max-w-md rounded-2xl border border-brand-100 bg-white p-9 text-center shadow-card">
          <div className="mx-auto mb-4 flex h-[76px] w-[76px] items-center justify-center rounded-full bg-brand-100 text-brand-700">
            <Icon name="check" size="2xl" />
          </div>
          <h2 className="mb-2 font-display text-[1.6rem] font-extrabold">Order placed</h2>
          <p className="mb-4 text-ink-muted">
            Thank you for your order. An Agrobridge agent will contact you to confirm delivery for the Eastern Region pilot.
          </p>
          <div className="mb-4 rounded-xl border border-brand-100 bg-surface px-5 py-4">
            <div className="text-[0.72rem] font-bold uppercase tracking-[0.06em] text-ink-muted">
              Your order reference
            </div>
            <div className="font-display text-[1.3rem] font-extrabold text-brand-700">{orderRef}</div>
          </div>
          <p className="mb-5 text-[0.8rem] text-ink-muted">Save this reference to track your order.</p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link href={`/order-status?ref=${orderRef}`} className="btn btn-primary">
              Track my order
            </Link>
            <Link href="/shop" className="btn btn-ghost">
              Continue shopping
            </Link>
          </div>
        </div>
        <ToastHost />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-[5%] pb-16 pt-[calc(68px+24px)]">
      <Link href="/shop" className="mb-4 inline-flex items-center gap-2 text-[0.84rem] font-semibold text-brand-700">
        <Icon name="arrow-left" size="sm" />
        Back to shop
      </Link>
      <div className="grid items-start gap-6 lg:grid-cols-[1fr_1.3fr]">
        {/* Summary */}
        <aside className="rounded-2xl border border-brand-100 bg-white p-5 lg:sticky lg:top-24">
          {product.image_url ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={product.image_url}
              alt={product.name}
              className="mb-3.5 h-40 w-full rounded-xl object-cover"
              width={800}
              height={600}
              decoding="async"
            />
          ) : (
            <div className="mb-3.5 flex h-40 w-full items-center justify-center rounded-xl bg-brand-100">
              <span className="font-display text-lg font-bold text-brand-700">{product.crop_type}</span>
            </div>
          )}
          <div className="text-[0.72rem] font-bold uppercase tracking-[0.07em] text-ink-muted">
            {product.crop_type}
          </div>
          <h2 className="mb-1.5 font-display text-[1.15rem] font-bold leading-tight">{product.name}</h2>
          <div className="mb-3.5 text-[0.8rem] text-ink-muted">
            {product.region}
            {product.fbo_source ? ` · ${product.fbo_source}` : ""}
          </div>
          {isPre && (
            <div className="mb-3 rounded-lg border border-accent-500 bg-accent-50 px-3 py-2.5 text-[0.8rem] leading-snug text-brand-700">
              This is a preorder. Available from {fmtDate(product.available_date)}. You pay a deposit
              now to reserve your stock.
            </div>
          )}
          <div className="my-3.5 h-px bg-brand-100" />
          {[
            [`Price per ${product.unit}`, `GH₵${Number(product.price_per_unit).toFixed(2)}`],
            ["Quantity", `${qty} ${product.unit}${qty !== 1 ? "s" : ""}`],
            ["Subtotal", `GH₵${subtotal.toFixed(2)}`],
            ["Delivery fee", form.region ? `GH₵${delivery.toFixed(2)}` : "Select region"],
          ].map(([l, v]) => (
            <div key={l} className="mb-2 flex items-center justify-between text-[0.9375rem] font-medium">
              <span className="text-ink-muted">{l}</span>
              <span className="font-semibold tabular price">{v}</span>
            </div>
          ))}
          <div className="mt-1.5 flex items-center justify-between border-t-2 border-brand-100 py-3">
            <span className="text-[0.95rem] font-bold">Total</span>
            <span className="font-display text-[1.5rem] font-extrabold tabular price text-brand-700">
              GH₵{total.toFixed(2)}
            </span>
          </div>
        </aside>

        {/* Form */}
        <div className="rounded-2xl border border-brand-100 bg-white p-6">
          <h2 className="mb-1 font-display text-[1.2rem] font-bold">
            {isPre ? "Place your preorder" : "Complete your order"}
          </h2>
          <p className="mb-5 text-[0.84rem] text-ink-muted">
            Enter your details below. Your payment is held securely until you receive your produce.
          </p>

          <div className="mb-3.5">
            <label className="field-label">Quantity ({product.unit}s) *</label>
            <div className="flex max-w-[180px] overflow-hidden rounded-[10px] border-[1.5px] border-brand-300">
              <button onClick={() => changeQty(-1)} className="h-11 w-11 bg-surface text-xl font-bold">
                −
              </button>
              <input
                type="number"
                value={qty}
                min={min}
                max={remaining}
                onChange={(e) => setQty(parseInt(e.target.value) || min)}
                className="w-full border-none text-center text-base font-bold outline-none"
              />
              <button onClick={() => changeQty(1)} className="h-11 w-11 bg-surface text-xl font-bold">
                +
              </button>
            </div>
            <div className="mt-1 text-[0.74rem] text-ink-muted">
              Minimum order: {min} {product.unit}
              {min > 1 ? "s" : ""}. Available: {remaining} {product.unit}
              {remaining !== 1 ? "s" : ""}.
            </div>
            {errors.qty && <p className="mt-1 text-[0.74rem] text-red-600">{errors.qty}</p>}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="field-label">Your full name *</label>
              <input className="field" value={form.name} onChange={(e) => setField("name", e.target.value)} placeholder="e.g. Kofi Mensah" />
              {errors.name && <p className="mt-1 text-[0.74rem] text-red-600">{errors.name}</p>}
            </div>
            <div>
              <label className="field-label">Phone number *</label>
              <input className="field" value={form.phone} onChange={(e) => setField("phone", e.target.value)} placeholder="024 123 4567" />
              {errors.phone && <p className="mt-1 text-[0.74rem] text-red-600">{errors.phone}</p>}
            </div>
          </div>

          <div className="mt-3">
            <label className="field-label">Email (optional — for payment receipt)</label>
            <input className="field" value={form.email} onChange={(e) => setField("email", e.target.value)} placeholder="youremail@gmail.com" />
          </div>

          <div className="mt-3">
            <label className="field-label">Delivery region *</label>
            <select className="field" value={form.region} onChange={(e) => setField("region", e.target.value)}>
              <option value="">— Select your region —</option>
              {REGIONS.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
            {errors.region && <p className="mt-1 text-[0.74rem] text-red-600">{errors.region}</p>}
          </div>

          <div className="mt-3">
            <label className="field-label">Delivery address *</label>
            <input className="field" value={form.address} onChange={(e) => setField("address", e.target.value)} placeholder="e.g. Near Koforidua market" />
            {errors.address && <p className="mt-1 text-[0.74rem] text-red-600">{errors.address}</p>}
          </div>

          <div className="mt-3">
            <label className="field-label">Order notes (optional)</label>
            <textarea className="field" rows={2} value={form.notes} onChange={(e) => setField("notes", e.target.value)} placeholder="e.g. Call me when driver is 30 minutes away" />
          </div>

          <button onClick={startPayment} disabled={paying} className="btn btn-primary btn-block mt-4 disabled:opacity-60">
            {paying ? <span className="spinner" /> : `Pay GH₵ ${total.toFixed(2)} securely`}
          </button>
          <p className="mt-2.5 text-center text-[0.76rem] leading-relaxed text-ink-muted">
            Payment is processed by Paystack and held until your produce is delivered. To pay via
            MoMo, call <strong>{config.supportPhone}</strong>.
          </p>
        </div>
      </div>
      <ToastHost />
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <>
      <Navbar variant="solid" />
      <main className="min-h-screen bg-brand-50">
        <Suspense fallback={<div className="pt-[120px] text-center text-ink-muted">Loading…</div>}>
          <CheckoutInner />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

import { fetchOrders } from "./api";

export type TrackedOrder = {
  id: string;
  order_ref: string;
  order_status: string;
  payment_status: string;
  buyer_name: string;
  buyer_phone: string;
  product_name: string;
  product_unit: string;
  quantity: number;
  total_price: number;
  delivery_fee: number;
  delivery_address: string;
  delivery_region: string;
  order_type: string;
  created_at: string;
  notes?: string;
};

const STORAGE_KEY = "agrobridge.orders";

export const STATUS_STEPS = ["pending", "confirmed", "processing", "dispatched", "delivered"] as const;

export const STATUS_LABELS: Record<string, string> = {
  pending: "Order placed",
  confirmed: "Confirmed",
  processing: "Collected",
  dispatched: "On the way",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

const STEP_DETAIL: Record<string, string> = {
  pending: "We received the order and are matching it to the farmer group.",
  confirmed: "The group confirmed grade, quantity, and the delivery date.",
  processing: "Goods have been collected from the farm and packed.",
  dispatched: "The lot is on the way to the delivery address.",
  delivered: "The buyer confirmed receipt. Escrow can be released.",
};

function daysAgo(days: number) {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
}

/** Sample pilot orders so tracking works before the API has live data. */
export const SAMPLE_ORDERS: TrackedOrder[] = [
  {
    id: "sample-1001",
    order_ref: "AGB-2026-1001",
    order_status: "delivered",
    payment_status: "paid",
    buyer_name: "Ama Boateng",
    buyer_phone: "0244111222",
    product_name: "Tomato, Pectomech",
    product_unit: "crate",
    quantity: 8,
    delivery_fee: 50,
    total_price: 3090,
    delivery_address: "Commercial Area, Koforidua",
    delivery_region: "Eastern",
    order_type: "direct",
    created_at: daysAgo(6),
  },
  {
    id: "sample-1002",
    order_ref: "AGB-2026-1002",
    order_status: "dispatched",
    payment_status: "paid",
    buyer_name: "Kwame Mensah",
    buyer_phone: "0244333444",
    product_name: "Tomato, Pectomech",
    product_unit: "crate",
    quantity: 5,
    delivery_fee: 50,
    total_price: 1950,
    delivery_address: "New Juaben, Koforidua",
    delivery_region: "Eastern",
    order_type: "direct",
    created_at: daysAgo(3),
  },
  {
    id: "sample-1003",
    order_ref: "AGB-2026-1003",
    order_status: "confirmed",
    payment_status: "paid",
    buyer_name: "Akosua Darko",
    buyer_phone: "0244555666",
    product_name: "Maize, yellow",
    product_unit: "cob",
    quantity: 12,
    delivery_fee: 50,
    total_price: 5090,
    delivery_address: "Nkawkaw market",
    delivery_region: "Eastern",
    order_type: "direct",
    created_at: daysAgo(1),
  },
  {
    id: "sample-1004",
    order_ref: "AGB-2026-1004",
    order_status: "pending",
    payment_status: "pending",
    buyer_name: "Yaw Asante",
    buyer_phone: "0244777888",
    product_name: "Mango, Kent",
    product_unit: "box",
    quantity: 4,
    delivery_fee: 50,
    total_price: 490,
    delivery_address: "Akim Oda",
    delivery_region: "Eastern",
    order_type: "preorder",
    created_at: daysAgo(0),
  },
];

function digits(value: string) {
  return value.replace(/\D/g, "").slice(-9);
}

export function maskPhone(phone: string) {
  const d = digits(phone);
  if (d.length < 9) return phone;
  return `0${d.slice(0, 2)} *** ${d.slice(-4)}`;
}

function readLocal(): TrackedOrder[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as TrackedOrder[]) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveTrackedOrder(order: TrackedOrder) {
  if (typeof window === "undefined") return;
  const rest = readLocal().filter((row) => row.order_ref.toUpperCase() !== order.order_ref.toUpperCase());
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify([order, ...rest].slice(0, 40)));
}

function matches(order: TrackedOrder, query: { ref?: string; phone?: string }) {
  const ref = query.ref?.trim();
  const needle = digits(query.phone || "");
  if (!ref || needle.length < 9) return false;
  return order.order_ref.toUpperCase() === ref.toUpperCase() && digits(order.buyer_phone) === needle;
}

function fromApi(row: Record<string, unknown>): TrackedOrder {
  return {
    id: String(row.id ?? row.order_ref ?? ""),
    order_ref: String(row.order_ref ?? ""),
    order_status: String(row.order_status ?? row.status ?? "pending"),
    payment_status: String(row.payment_status ?? "pending"),
    buyer_name: String(row.buyer_name ?? ""),
    buyer_phone: String(row.buyer_phone ?? ""),
    product_name: String(row.product_name ?? ""),
    product_unit: String(row.product_unit ?? row.unit ?? ""),
    quantity: Number(row.quantity ?? 0),
    total_price: Number(row.total_price ?? row.total_amount ?? 0),
    delivery_fee: Number(row.delivery_fee ?? 0),
    delivery_address: String(row.delivery_address ?? ""),
    delivery_region: String(row.delivery_region ?? ""),
    order_type: String(row.order_type ?? "direct"),
    created_at: String(row.created_at ?? new Date().toISOString()),
    notes: row.notes ? String(row.notes) : "",
  };
}

export async function lookupOrders(query: { ref?: string; phone?: string }): Promise<TrackedOrder[]> {
  const ref = query.ref?.trim();
  const phone = digits(query.phone || "");
  if (!ref || phone.length < 9) return [];
  const remote = (await fetchOrders({ ref, phone })).map(fromApi).filter((row) => row.order_ref && matches(row, query));
  const local = [...readLocal(), ...SAMPLE_ORDERS].filter((row) => matches(row, query));
  const byRef = new Map<string, TrackedOrder>();
  for (const order of [...local, ...remote]) byRef.set(order.order_ref.toUpperCase(), order);
  return [...byRef.values()].sort((a, b) => b.created_at.localeCompare(a.created_at));
}

export function statusIndex(status?: string) {
  const i = STATUS_STEPS.indexOf((status || "pending") as (typeof STATUS_STEPS)[number]);
  return i < 0 ? 0 : i;
}

export function escrowLabel(order: TrackedOrder) {
  if (order.order_status === "cancelled") return "Order cancelled. Escrow was not released.";
  if (order.payment_status !== "paid") return "Payment is not in escrow yet.";
  if (order.order_status === "delivered") return "Delivery confirmed. Farmer payment released.";
  return "Payment is held in escrow until you confirm delivery.";
}

export type TimelineStep = {
  key: string;
  label: string;
  detail: string;
  state: "done" | "current" | "upcoming";
  at: string | null;
};

export function orderTimeline(order: TrackedOrder): TimelineStep[] {
  const start = new Date(order.created_at).getTime();
  const current = statusIndex(order.order_status);
  return STATUS_STEPS.map((key, i) => ({
    key,
    label: STATUS_LABELS[key],
    detail: STEP_DETAIL[key],
    state: i < current ? "done" : i === current ? "current" : "upcoming",
    at: i <= current ? new Date(start + i * 18 * 60 * 60 * 1000).toISOString() : null,
  }));
}

export function formatWhen(iso?: string | null) {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleString("en-GH", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

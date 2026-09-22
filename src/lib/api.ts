import { config } from "./config";
import type { Product } from "./types";

const API = config.apiUrl.replace(/\/$/, "");

async function request<T>(path: string, init?: RequestInit): Promise<T | null> {
  if (!API) return null;
  try {
    const res = await fetch(`${API}/api/v1${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(init?.headers || {}),
      },
    });
    if (!res.ok) return null;
    if (res.status === 204) return {} as T;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

function unwrapList<T>(data: T[] | { results: T[] } | null): T[] {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.results)) return data.results;
  return [];
}

export async function fetchProducts(params?: Record<string, string>): Promise<Product[]> {
  const qs = params
    ? "?" + new URLSearchParams(Object.entries(params).filter(([, v]) => Boolean(v))).toString()
    : "";
  return unwrapList<Product>(await request<Product[] | { results: Product[] }>(`/products/${qs}`));
}

export async function fetchProduct(id: string): Promise<Product | null> {
  return request<Product>(`/products/${id}/`);
}

export async function createOrder(payload: Record<string, unknown>) {
  return request<Record<string, unknown>>("/orders/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function fetchOrders(params: { ref?: string; phone?: string }) {
  const qs = new URLSearchParams();
  if (params.ref) qs.set("ref", params.ref);
  if (params.phone) qs.set("phone", params.phone);
  return unwrapList<Record<string, unknown>>(
    await request<Record<string, unknown>[] | { results: Record<string, unknown>[] }>(
      `/orders/?${qs.toString()}`,
    ),
  );
}

export async function createFarmerRegistration(payload: Record<string, unknown>) {
  return request("/farmer-registrations/", { method: "POST", body: JSON.stringify(payload) });
}

export async function fetchFarmerRegistrations(phone: string) {
  return unwrapList<Record<string, unknown>>(
    await request(`/farmer-registrations/?phone=${encodeURIComponent(phone)}`),
  );
}

export async function createBuyer(payload: Record<string, unknown>) {
  return request("/buyers/", { method: "POST", body: JSON.stringify(payload) });
}

export async function createMessage(payload: Record<string, unknown>) {
  return request("/messages/", { method: "POST", body: JSON.stringify(payload) });
}

export async function recordPageView(path: string) {
  return request("/pageviews/", { method: "POST", body: JSON.stringify({ path }) });
}

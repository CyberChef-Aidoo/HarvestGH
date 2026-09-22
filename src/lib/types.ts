export interface Product {
  id: string;
  name: string;
  crop_type: string;
  price_per_unit: number;
  unit: string;
  quantity_available: number;
  sold_quantity: number;
  min_order?: number;
  region: string;
  fbo_source: string;
  status: "available" | "sold_out" | "hidden" | string;
  is_preorder: boolean;
  available_date?: string | null;
  image_url: string;
  description?: string;
  created_at?: string;
}

export interface Order {
  id?: string;
  order_ref: string;
  product_id: string;
  product_name: string;
  product_unit: string;
  buyer_name: string;
  buyer_phone: string;
  buyer_email?: string | null;
  quantity: number;
  price_per_unit: number;
  subtotal: number;
  delivery_fee: number;
  total_price: number;
  delivery_address: string;
  delivery_region: string;
  order_type: string;
  payment_status: "pending" | "paid" | string;
  payment_ref: string;
  payment_method: string;
  notes?: string | null;
  order_status: "pending" | "confirmed" | "dispatched" | "delivered" | "cancelled" | string;
  created_at?: string;
}

export interface FarmerListing {
  id?: string;
  farmer_name: string;
  phone: string;
  fbo_name?: string;
  region: string;
  crop_type: string;
  quantity?: string;
  status?: "pending" | "available" | "matched" | "sold" | "managed" | string;
  created_at?: string;
}

export interface SiteSetting {
  key: string;
  value: string;
}

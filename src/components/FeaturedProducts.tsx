"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { DEMO_PRODUCTS } from "@/lib/demo-products";
import { getSupabase } from "@/lib/supabase";
import type { Product } from "@/lib/types";

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>(DEMO_PRODUCTS.slice(0, 6));

  useEffect(() => {
    const db = getSupabase();
    if (!db) return;
    let active = true;
    (async () => {
      const { data } = await db
        .from("products")
        .select("*")
        .eq("status", "available")
        .order("created_at", { ascending: false })
        .limit(6);
      if (active && data && data.length) setProducts(data as Product[]);
    })();
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}

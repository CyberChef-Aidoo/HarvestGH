"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { DEMO_PRODUCTS } from "@/lib/demo-products";
import { fetchProducts } from "@/lib/api";
import type { Product } from "@/lib/types";

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>(() => {
    const crops = DEMO_PRODUCTS.filter((p) => p.crop_type !== "Poultry").slice(0, 4);
    const poultry = DEMO_PRODUCTS.filter((p) => p.crop_type === "Poultry").slice(0, 2);
    return [...crops, ...poultry];
  });

  useEffect(() => {
    let active = true;
    (async () => {
      const data = await fetchProducts({ status: "available" });
      if (!active || !data.length) return;
      const crops = data.filter((p) => p.crop_type !== "Poultry").slice(0, 4);
      const poultry = data.filter((p) => p.crop_type === "Poultry").slice(0, 2);
      setProducts(poultry.length ? [...crops, ...poultry] : data.slice(0, 6));
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

"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { DEMO_PRODUCTS } from "@/lib/demo-products";
import { fetchProducts } from "@/lib/api";
import type { Product } from "@/lib/types";

function isPre(p: Product) {
  return p.is_preorder || p.status === "preorder";
}

function isMeat(p: Product) {
  return p.crop_type === "Beef" || p.crop_type === "Goat" || p.crop_type === "Poultry";
}

function featuredFrom(list: Product[]): Product[] {
  const pre = list.filter(isPre).slice(0, 3);
  const meat = list.filter((p) => isMeat(p) && !isPre(p));
  const crops = list.filter((p) => !isMeat(p) && !isPre(p)).slice(0, 3);
  return [...crops, ...pre, ...meat].slice(0, 9);
}

function mergeDemo(apiList: Product[]): Product[] {
  const source = apiList.length ? apiList : DEMO_PRODUCTS;
  const names = new Set(source.map((p) => p.name));
  const extra = DEMO_PRODUCTS.filter((p) => !names.has(p.name));
  return extra.length ? [...source, ...extra] : source;
}

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>(() => featuredFrom(DEMO_PRODUCTS));

  useEffect(() => {
    let active = true;
    (async () => {
      const data = await fetchProducts();
      if (!active || data === null) return;
      setProducts(featuredFrom(mergeDemo(data)));
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

"use client";

import Link from "next/link";
import type { Product } from "@/lib/types";

export default function ProductCard({ product }: { product: Product }) {
  const isPre = product.is_preorder;
  const href = `/checkout?id=${product.id}${isPre ? "&type=preorder" : ""}`;

  return (
    <Link
      href={href}
      className="card-hover group flex flex-col overflow-hidden rounded-2xl border border-line bg-white"
    >
      <div className="relative h-44 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image_url}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => ((e.target as HTMLImageElement).src = "/images/market.jpg")}
          loading="lazy"
        />
        <div className="absolute left-2.5 top-2.5">
          <span
            className={[
              "rounded-full px-2.5 py-1 text-[0.68rem] font-bold",
              isPre ? "bg-gold-pale text-gold-deep" : "bg-green-pale text-green",
            ].join(" ")}
          >
            {isPre ? "Preorder" : "In stock"}
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-1.5 text-[0.7rem] font-bold uppercase tracking-[0.06em] text-green">
          {product.crop_type} · {product.region}
        </div>
        <h3 className="mb-1 leading-tight">{product.name}</h3>
        <div className="mb-3 text-[0.78rem] text-muted">{product.fbo_source}</div>
        <div className="mt-auto flex items-center justify-between">
          <div className="font-display text-[1.15rem] font-extrabold tabular text-green price">
            GH₵{Number(product.price_per_unit).toFixed(2)}
            <span className="font-body text-[0.7rem] font-medium text-muted"> / {product.unit}</span>
          </div>
          <span className="btn btn-sm btn-primary">{isPre ? "Preorder" : "Order"}</span>
        </div>
      </div>
    </Link>
  );
}

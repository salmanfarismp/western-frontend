"use client";

import React from "react";
import { ProductCard } from "@/components/modules/products-list";
import { PRODUCTS_LIST_ITEMS } from "@/lib/data/products-list-data";
import type { Product } from "@/types/home";

interface SimilarProductsProps {
  currentProductId?: string;
  onAddToCart: (product: Product) => void;
}

export function SimilarProducts({
  currentProductId,
  onAddToCart,
}: SimilarProductsProps) {
  // Take up to 3 or 4 products, excluding the current one if matched
  const similarItems = PRODUCTS_LIST_ITEMS.filter(
    (item) => item.id !== currentProductId
  ).slice(0, 3);

  return (
    <section
      id="bestsellers"
      className="w-full bg-surface-container-low py-8 sm:py-12 lg:py-16 border-t border-border-subtle/70"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 gap-3">
          <div>
            <span className="text-[11px] font-sans uppercase tracking-wider text-moss-deep font-semibold block mb-1">
              MORE OPTIONS
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-espresso-rich font-normal">
             Discover More Like This
            </h2>
          </div>
        </div>

        {/* Product Cards identical to collections page */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {similarItems.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

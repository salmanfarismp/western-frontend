"use client";

import React from "react";
import type { Product } from "@/types/home";
import { ProductCard } from "./product-card";

interface ProductsGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export function ProductsGrid({ products, onAddToCart }: ProductsGridProps) {
  if (products.length === 0) {
    return (
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 text-center">
        <p className="font-serif text-xl text-espresso-rich">
          No handcrafted pieces found in this category.
        </p>
        <p className="font-sans text-sm text-neutral-mineral mt-2">
          Please select another category to view our collection.
        </p>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </section>
  );
}

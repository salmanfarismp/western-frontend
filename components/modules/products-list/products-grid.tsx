"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import type { Product } from "@/types/home";
import { ProductCard } from "./product-card";
import { useCart } from "@/context/cart-context";

interface ProductsGridProps {
  products: Product[];
  onAddToCart?: (product: Product) => void;
}

export function ProductsGrid({ products, onAddToCart }: ProductsGridProps) {
  const { addToCart } = useCart();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleAddToCart = (product: Product) => {
    if (onAddToCart) {
      onAddToCart(product);
    } else {
      addToCart(product.id, 1);
      setToastMessage(`Added ${product.name} to your sanctuary cart`);
      setTimeout(() => {
        setToastMessage(null);
      }, 3000);
    }
  };

  if (products.length === 0) {
    return (
      <section
        id="products-grid"
        aria-label="Collection Products"
        className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center"
      >
        <div className="max-w-md mx-auto space-y-4">
          <p className="font-serif text-2xl text-espresso-rich font-semibold">
            No Handcrafted Models Found
          </p>
          <p className="font-sans text-sm text-neutral-mineral leading-relaxed">
            We couldn&apos;t find any pieces in this specific silhouette right now. Explore our complete architectural collection.
          </p>
          <div className="pt-2">
            <Link
              href="/collections"
              className="inline-flex items-center px-5 py-2.5 rounded-full bg-primary-container text-surface-card hover:bg-moss-deep text-xs font-semibold transition-all shadow-sm"
            >
              View All Swings
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="products-grid"
      aria-label="Collection Products"
      className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12"
    >
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>

      {/* Tactile Notification Toast */}
      {toastMessage && (
        <aside
          role="status"
          aria-live="polite"
          className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-espresso-rich text-canvas-linen px-5 py-3 rounded-full shadow-2xl flex items-center gap-2.5 text-xs font-sans font-medium border border-sand-tint/20 animate-fadeIn"
        >
          <div className="w-5 h-5 rounded-full bg-primary-container text-surface-card flex items-center justify-center shrink-0">
            <Check className="w-3 h-3" />
          </div>
          <span>{toastMessage}</span>
        </aside>
      )}
    </section>
  );
}

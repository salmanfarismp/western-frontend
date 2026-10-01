"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HOME_PRODUCTS } from "@/lib/data/home-data";
import type { Product, ProductCategory } from "@/types/home";

interface ProductShowcaseProps {
  onAddToCart: (product: Product) => void;
}

export function ProductShowcase({
  onAddToCart,
}: ProductShowcaseProps) {
  const [activeFilter, setActiveFilter] = useState<ProductCategory>("all");

  const filterTabs: { label: string; value: ProductCategory }[] = [
    { label: "All Swings", value: "all" },
    { label: "Single Cocoon", value: "single" },
    { label: "Double Loveseat", value: "double" },
    { label: "Swing Bed", value: "swingbed" },
  ];

  const filteredProducts =
    activeFilter === "all"
      ? HOME_PRODUCTS
      : HOME_PRODUCTS.filter((p) => p.category === activeFilter);

  return (
    <section id="products" className="w-full bg-surface-cream py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header & Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 gap-4">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-moss-deep block mb-1.5 font-sans">
              Curated Favorites
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-espresso-rich tracking-tight">
              Signature Porch Masterpieces
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap pb-2 sm:pb-0 scrollbar-none">
            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab.value;
              return (
                <button
                  key={tab.value}
                  onClick={() => setActiveFilter(tab.value)}
                  className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "bg-primary-container text-surface-card shadow-sm"
                      : "bg-surface-card text-espresso-rich hover:bg-surface-container border border-border-subtle"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
          {filteredProducts.map((product) => {
            const productSlug = product.slug || product.id;
            return (
              <div
                key={product.id}
                className="group bg-surface-card rounded-lg sm:rounded-xl overflow-hidden shadow-ambient hover:shadow-floating transition-all duration-300 flex flex-col border border-border-subtle/80"
              >
                {/* Product Image Tile */}
                <Link
                  href={`/product/${productSlug}`}
                  className="relative aspect-square bg-canvas-linen overflow-hidden block"
                >
                  <Image
                    src={product.image}
                    alt={product.alt}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />

                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-10">
                      <Badge
                        variant={product.badge.variant}
                        size="sm"
                        className="bg-surface-card/90 backdrop-blur-xs font-semibold shadow-xs text-[9px] sm:text-[10px] px-2 py-0.5"
                      >
                        {product.badge.text}
                      </Badge>
                    </div>
                  )}
                </Link>

                {/* Product Details */}
                <div className="p-3 sm:p-4 flex flex-col flex-1 justify-between space-y-2.5 sm:space-y-3 bg-surface-card">
                  <div className="space-y-1">
                    {/* Rating */}
                    <div className="flex items-center gap-1 text-terracotta-soft">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-3 h-3 fill-current text-terracotta-soft"
                          />
                        ))}
                      </div>
                      <span className="text-[10px] sm:text-[11px] text-neutral-mineral ml-0.5 font-sans">
                        ({product.reviewsCount})
                      </span>
                    </div>

                    <Link href={`/product/${productSlug}`}>
                      <h3 className="font-serif text-sm sm:text-base font-semibold text-espresso-rich group-hover:text-primary-container transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="font-sans text-[11px] sm:text-xs text-neutral-mineral line-clamp-1 sm:line-clamp-2 leading-relaxed">
                      {product.subtitle}
                    </p>
                  </div>

                  <div className="space-y-2.5 pt-1">
                    {/* Color Swatches (Non-clickable visual display) */}
                    {product.tones && product.tones.length > 0 && (
                      <div className="flex items-center gap-1.5">
                        <div className="flex items-center gap-1">
                          {product.tones.map((tone) => (
                            <span
                              key={tone.name}
                              title={tone.name}
                              style={{ backgroundColor: tone.hex }}
                              className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border border-black/10 shadow-2xs inline-block"
                            />
                          ))}
                        </div>
                        <span className="text-[10px] sm:text-[11px] text-neutral-mineral font-sans">
                          {product.tones.length} {product.tones.length === 1 ? "shade" : "shades"}
                        </span>
                      </div>
                    )}

                    {/* Price and Add to Bag */}
                    <div className="flex items-center justify-between pt-2 border-t border-border-subtle/50 gap-1.5">
                      <div className="flex flex-col min-[380px]:flex-row min-[380px]:items-baseline gap-0.5 min-[380px]:gap-1.5">
                        <span className="font-serif text-sm sm:text-base font-bold text-espresso-rich">
                          ₹{product.price.toLocaleString("en-IN")}
                        </span>
                        {product.originalPrice && (
                          <span className="text-[10px] sm:text-xs text-neutral-mineral line-through">
                            ₹{product.originalPrice.toLocaleString("en-IN")}
                          </span>
                        )}
                      </div>

                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => onAddToCart(product)}
                        className="flex items-center gap-1 sm:gap-1.5 text-xs px-2 sm:px-3 h-7 sm:h-8"
                      >
                        <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        <span className="hidden min-[420px]:inline text-[11px] sm:text-xs">Add to Bag</span>
                        <span className="min-[420px]:hidden text-[11px]">Add</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

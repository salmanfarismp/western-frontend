"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, Eye, ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HOME_PRODUCTS } from "@/lib/data/home-data";
import type { Product, ProductCategory } from "@/types/home";

interface ProductShowcaseProps {
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export function ProductShowcase({
  onQuickView,
  onAddToCart,
}: ProductShowcaseProps) {
  const [activeFilter, setActiveFilter] = useState<ProductCategory>("all");
  const [selectedTones, setSelectedTones] = useState<Record<string, number>>({});

  const filterTabs: { label: string; value: ProductCategory }[] = [
    { label: "All Swings", value: "all" },
    { label: "Single Cocoon", value: "single" },
    { label: "Double Loveseat", value: "double" },
    { label: "Daybeds", value: "daybed" },
  ];

  const filteredProducts =
    activeFilter === "all"
      ? HOME_PRODUCTS
      : HOME_PRODUCTS.filter((p) => p.category === activeFilter);

  const handleToneSelect = (productId: string, toneIndex: number) => {
    setSelectedTones((prev) => ({ ...prev, [productId]: toneIndex }));
  };

  return (
    <section id="products" className="w-full bg-surface-cream py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header & Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-5">
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
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => {
            const activeToneIdx = selectedTones[product.id] ?? 0;
            const currentTone = product.tones[activeToneIdx] ?? product.tones[0];

            return (
              <div
                key={product.id}
                className="group bg-surface-card rounded-xl overflow-hidden shadow-ambient hover:shadow-floating transition-all duration-300 flex flex-col border border-border-subtle/80"
              >
                {/* Product Image Tile */}
                <div className="relative aspect-square bg-canvas-linen overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />

                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-4 left-4 z-10">
                      <Badge
                        variant={product.badge.variant}
                        size="md"
                        className="bg-surface-card/90 backdrop-blur-xs font-semibold shadow-xs"
                      >
                        {product.badge.text}
                      </Badge>
                    </div>
                  )}

                  {/* Quick View Hover Button */}
                  <button
                    onClick={() => onQuickView(product)}
                    className="absolute inset-x-6 bottom-4 bg-espresso-rich/90 hover:bg-espresso-rich text-canvas-linen text-xs font-semibold py-2.5 rounded-lg backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Quick View</span>
                  </button>
                </div>

                {/* Product Details */}
                <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between space-y-4 bg-surface-card">
                  <div className="space-y-1.5">
                    {/* Rating */}
                    <div className="flex items-center gap-1 text-terracotta-soft">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3.5 h-3.5 fill-current text-terracotta-soft"
                        />
                      ))}
                      <span className="text-[11px] text-neutral-mineral ml-1 font-sans">
                        ({product.reviewsCount} reviews)
                      </span>
                    </div>

                    <h3 className="font-serif text-lg font-semibold text-espresso-rich group-hover:text-primary-container transition-colors">
                      {product.name}
                    </h3>
                    <p className="font-sans text-xs text-neutral-mineral line-clamp-2 leading-relaxed">
                      {product.subtitle}
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    {/* Color Swatches */}
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-neutral-mineral font-sans font-medium">
                        Tone:
                      </span>
                      <div className="flex items-center gap-1.5">
                        {product.tones.map((tone, idx) => {
                          const isSelected = activeToneIdx === idx;
                          return (
                            <button
                              key={tone.name}
                              onClick={() => handleToneSelect(product.id, idx)}
                              title={tone.name}
                              aria-label={`Select tone: ${tone.name}`}
                              style={{ backgroundColor: tone.hex }}
                              className={`w-5 h-5 rounded-full shadow-2xs transition-all cursor-pointer ${
                                isSelected
                                  ? "ring-2 ring-primary-container ring-offset-2 scale-110"
                                  : "hover:opacity-80"
                              }`}
                            />
                          );
                        })}
                      </div>
                      <span className="text-[11px] text-neutral-mineral/80 italic ml-1 truncate max-w-[120px]">
                        {currentTone.name}
                      </span>
                    </div>

                    {/* Price and Add to Bag */}
                    <div className="flex items-center justify-between pt-2 border-t border-border-subtle/50">
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-serif text-lg font-bold text-espresso-rich">
                          ₹{product.price.toLocaleString("en-IN")}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-neutral-mineral line-through">
                            ₹{product.originalPrice.toLocaleString("en-IN")}
                          </span>
                        )}
                      </div>

                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => onAddToCart(product)}
                        className="flex items-center gap-1.5"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add to Bag</span>
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

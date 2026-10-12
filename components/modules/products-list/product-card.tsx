"use client";

import React from "react";
import { SafeImage } from "@/components/ui/safe-image";
import Link from "next/link";
import { Star, ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types/home";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <article className="group bg-surface-card rounded-lg sm:rounded-xl overflow-hidden shadow-ambient hover:shadow-floating transition-all duration-300 flex flex-col border border-border-subtle/80">
      {/* Product Image Tile */}
      <Link
        href={`/product/${product.slug || product.id}`}
        className="relative aspect-square bg-canvas-linen overflow-hidden block"
      >
        <SafeImage
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

          <Link href={`/product/${product.slug || product.id}`}>
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
              onClick={() => onAddToCart?.(product)}
              className="flex items-center gap-1 sm:gap-1.5 text-xs px-2 sm:px-3 h-7 sm:h-8 cursor-pointer"
            >
              <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span className="hidden min-[420px]:inline text-[11px] sm:text-xs">Add to Bag</span>
              <span className="min-[420px]:hidden text-[11px]">Add</span>
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}

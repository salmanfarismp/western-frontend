"use client";

import React, { useState } from "react";
import { SafeImage } from "@/components/ui/safe-image";
import { FALLBACK_IMAGE_URL } from "@/lib/utils/media";
import type { ProductGalleryItem } from "@/lib/data/product-detail-data";

interface ProductGalleryProps {
  gallery: ProductGalleryItem[];
  badges?: Array<{
    text: string;
    variant: "espresso" | "terracotta" | "primary" | "surface";
  }>;
}

export function ProductGallery({ gallery, badges }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const validGallery =
    gallery && gallery.length > 0
      ? gallery.filter((item) => Boolean(item && item.src && item.src.trim() !== ""))
      : [];

  const currentImage =
    validGallery[selectedIndex] ||
    validGallery[0] || {
      id: "img-fallback",
      src: FALLBACK_IMAGE_URL,
      alt: "Westernswings Handcrafted",
      label: "Primary View",
    };

  return (
    <div className="w-full space-y-3 sm:space-y-4">
      {/* Main Interactive Viewport */}
      <div className="relative w-full rounded-2xl overflow-hidden bg-surface-cream shadow-ambient group border border-border-subtle/80">
        {/* Badges Overlay */}
        {badges && badges.length > 0 && (
          <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 z-10 flex flex-col gap-2 pointer-events-none">
            {badges.map((badge, idx) => {
              const bgClass =
                badge.variant === "espresso"
                  ? "bg-espresso-rich text-surface-bright"
                  : badge.variant === "terracotta"
                  ? "bg-terracotta-soft text-white"
                  : badge.variant === "primary"
                  ? "bg-primary-container text-white"
                  : "bg-surface-card text-espresso-rich border border-border-subtle";

              return (
                <span
                  key={idx}
                  className={`text-[10px] sm:text-[11px] font-sans tracking-wider uppercase px-3 py-1 rounded-full shadow-2xs font-semibold ${bgClass}`}
                >
                  {badge.text}
                </span>
              );
            })}
          </div>
        )}

        {/* Hero Image Container */}
        <div className="relative w-full aspect-[4/5] sm:aspect-square max-h-[380px] sm:max-h-[480px] lg:max-h-[580px] overflow-hidden cursor-zoom-in">
          <SafeImage
            src={currentImage.src}
            alt={currentImage.alt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-all duration-500 ease-out group-hover:scale-105"
          />
        </div>
      </div>

      {/* Thumbnail Selectors (rendered only when multiple images exist) */}
      {validGallery.length > 1 && (
        <div className="flex sm:grid sm:grid-cols-5 gap-2 sm:gap-3 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {validGallery.map((item, idx) => {
            const isActive = idx === selectedIndex;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedIndex(idx)}
                aria-label={`View ${item.label || `angle ${idx + 1}`}`}
                className={`relative flex-shrink-0 w-16 h-16 sm:w-auto sm:h-auto sm:aspect-square rounded-xl overflow-hidden bg-surface-cream p-0.5 shadow-2xs transition-all duration-200 focus:outline-hidden cursor-pointer ${
                  isActive
                    ? "ring-2 ring-primary-container ring-offset-2 ring-offset-canvas-linen opacity-100"
                    : "opacity-75 hover:opacity-100 border border-border-subtle/80"
                }`}
              >
                <div className="relative w-full h-full rounded-lg overflow-hidden">
                  <SafeImage
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="100px"
                    className="object-cover"
                  />
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

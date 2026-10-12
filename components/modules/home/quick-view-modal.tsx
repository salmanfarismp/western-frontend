"use client";

import React, { useEffect } from "react";
import { SafeImage } from "@/components/ui/safe-image";
import { X, Check, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types/home";

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export function QuickViewModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
}: QuickViewModalProps) {
  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="quick-view-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-espresso-rich/60 backdrop-blur-xs animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-surface-card max-w-3xl w-full rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row relative border border-border-subtle"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close Quick View"
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-surface-cream text-espresso-rich flex items-center justify-center hover:bg-surface-container transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Product Image Tile */}
        <div className="md:w-1/2 aspect-square md:aspect-auto relative bg-surface-container min-h-[280px]">
          <SafeImage
            src={product.image}
            alt={product.alt}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover"
          />
        </div>

        {/* Product Information */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-5 bg-surface-card">
          <div className="space-y-3">
            <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-moss-deep block font-sans">
              Quick Specifications
            </span>
            <h3
              id="quick-view-title"
              className="font-serif text-xl sm:text-2xl font-semibold text-espresso-rich"
            >
              {product.name}
            </h3>
            <p className="font-serif text-xl font-bold text-espresso-rich">
              ₹{product.price.toLocaleString("en-IN")}
            </p>
            <p className="font-sans text-xs sm:text-sm text-neutral-mineral leading-relaxed">
              {product.specs || product.description}
            </p>
          </div>

          <div className="space-y-4 pt-2">
            {/* Included Hardware Checklist */}
            {product.hardware && product.hardware.length > 0 && (
              <div>
                <span className="text-xs font-semibold text-espresso-rich block mb-2 font-sans">
                  Included Hardware:
                </span>
                <ul className="text-xs text-neutral-mineral space-y-1.5 font-sans">
                  {product.hardware.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-primary-container shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Add to Cart CTA */}
            <Button
              variant="primary"
              size="lg"
              onClick={() => {
                onAddToCart(product);
                onClose();
              }}
              className="w-full flex items-center justify-center gap-2 py-3"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Cart • ₹{product.price.toLocaleString("en-IN")}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

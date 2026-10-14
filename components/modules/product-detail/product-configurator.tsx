"use client";

import React, { useState } from "react";
import { Star, CheckCircle2, Lock, ShoppingBag, Zap, ArrowRight, Minus, Plus, Check } from "lucide-react";
import type { ToneOption } from "@/lib/data/product-detail-data";

interface ProductConfiguratorProps {
  name: string;
  subtitle: string;
  price: number;
  originalPrice: number;
  savings: number;
  rating: number;
  reviewsCount: number;
  tones: ToneOption[];
  hangingKitIncluded: boolean;
  hangingKitDescription: string;
  onAddToCart?: (quantity: number, selectedTone: string, totalPrice: number) => void;
  onBuyNow?: (quantity: number, selectedTone: string, totalPrice: number) => void;
}

export function ProductConfigurator({
  name,
  subtitle,
  price,
  originalPrice,
  savings,
  rating,
  reviewsCount,
  tones,
  hangingKitIncluded,
  hangingKitDescription,
  onAddToCart,
  onBuyNow,
}: ProductConfiguratorProps) {
  const [selectedToneId, setSelectedToneId] = useState<string>(tones[0]?.id || "");
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [localToast, setLocalToast] = useState<string | null>(null);

  const selectedTone = tones.find((t) => t.id === selectedToneId) || tones[0];
  const selectedToneName = selectedTone?.name || "";
  const orderTotal = price * quantity;

  const handleDecreaseQty = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleIncreaseQty = () => {
    if (quantity < 10) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleAdd = () => {
    setIsAdded(true);
    if (onAddToCart) {
      onAddToCart(quantity, selectedToneName, orderTotal);
    } else {
      const toneLabel = selectedToneName ? ` (${selectedToneName})` : "";
      setLocalToast(`Added ${quantity} × ${name}${toneLabel} to your cart`);
      setTimeout(() => setLocalToast(null), 3500);
    }
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  const handleBuy = () => {
    if (onBuyNow) {
      onBuyNow(quantity, selectedToneName, orderTotal);
    } else {
      handleAdd();
    }
  };

  const scrollToReviews = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById("customer-reviews-section");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full bg-surface-card p-5 sm:p-7 lg:p-8 rounded-2xl border border-border-subtle/80 shadow-ambient space-y-5 sm:space-y-6">
      {/* Header & Social Proof */}
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5">
            <div className="flex text-terracotta-soft text-sm">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-current text-terracotta-soft"
                />
              ))}
            </div>
            <span className="font-serif text-sm font-bold text-espresso-rich">
              {rating.toFixed(1)}
            </span>
            <a
              href="#customer-reviews-section"
              onClick={scrollToReviews}
              className="text-xs sm:text-sm text-on-surface-variant hover:text-primary-container transition-colors cursor-pointer"
            >
              ({reviewsCount} reviews)
            </a>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-container/10 text-primary-container text-[11px] font-sans uppercase tracking-wider font-semibold">
            <span className="w-2 h-2 rounded-full bg-primary-container " />
            In Stock
          </span>
        </div>

        <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-espresso-rich tracking-tight leading-snug font-normal">
          {name}
        </h1>

        <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* Pricing Tier */}
      <div className="bg-canvas-linen p-4 rounded-xl border border-border-subtle flex items-baseline justify-between">
        <div className="flex items-baseline gap-2.5 sm:gap-3">
          <span className="font-serif text-2xl sm:text-3xl font-bold text-espresso-rich">
            ₹{price.toLocaleString("en-IN")}
          </span>
          <span className="text-sm sm:text-base text-neutral-mineral line-through">
            ₹{originalPrice.toLocaleString("en-IN")}
          </span>
        </div>
        <span className="text-xs font-bold text-terracotta-soft bg-surface-card px-2.5 py-1 rounded-md border border-border-subtle shadow-2xs">
          Save ₹{savings.toLocaleString("en-IN")}
        </span>
      </div>

      {/* Option: Tone Selection */}
      <div className="space-y-2">
        {tones.length > 0 && (
          <>
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="font-semibold text-neutral-charcoal">
                Selected Finish:{" "}
                <span className="font-normal text-on-surface-variant">
                  {selectedToneName}
                </span>
              </span>
              {selectedTone?.materialLabel && (
                <span className="text-[11px] text-neutral-mineral uppercase tracking-wider">
                  {selectedTone.materialLabel}
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              {tones.map((tone) => {
                const isSelected = tone.id === selectedToneId;
                return (
                  <button
                    key={tone.id}
                    type="button"
                    onClick={() => setSelectedToneId(tone.id)}
                    title={tone.name}
                    aria-label={tone.name}
                    style={{ backgroundColor: tone.colorHex }}
                    className={`w-8 h-8 rounded-full border border-black/10 shadow-2xs transition-all cursor-pointer ${
                      isSelected
                        ? "ring-2 ring-primary-container ring-offset-2 ring-offset-surface-card scale-105"
                        : "hover:scale-105 opacity-90 hover:opacity-100"
                    }`}
                  />
                );
              })}
            </div>
          </>
        )}

        <div className="pt-1 text-xs">
          <a
            href="https://wa.me/916238473506"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-moss-deep hover:text-primary-container hover:underline inline-flex items-center gap-1.5"
          >
            <span>Contact us for personalized customization</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Option: Hanging Foundation (Ceiling Kit) */}
      {hangingKitIncluded && (
        <div className="bg-canvas-linen p-3.5 rounded-xl flex items-center justify-between border border-border-subtle">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-primary-container shrink-0" />
            <div>
              <span className="text-xs sm:text-sm font-medium text-espresso-rich block">
                Ceiling Hanging Kit
              </span>
              <span className="text-[11px] text-neutral-mineral">
                {hangingKitDescription}
              </span>
            </div>
          </div>
          <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-wider font-semibold text-primary-container bg-surface-card border border-border-subtle px-2.5 py-1 rounded-full shadow-2xs">
            Included
          </span>
        </div>
      )}

      {/* Quantity & Primary Action Buttons */}
      <div className="space-y-3 pt-1">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Stepper */}
          <div className="flex items-center justify-between sm:justify-center rounded-xl p-1 bg-surface-card border border-border-subtle">
            <button
              type="button"
              onClick={handleDecreaseQty}
              aria-label="Decrease quantity"
              className="w-10 h-10 flex items-center justify-center rounded-lg text-espresso-rich transition-colors font-semibold hover:bg-surface-cream cursor-pointer disabled:opacity-40"
              disabled={quantity <= 1}
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-10 text-center font-serif text-base font-bold text-espresso-rich">
              {quantity}
            </span>
            <button
              type="button"
              onClick={handleIncreaseQty}
              aria-label="Increase quantity"
              className="w-10 h-10 flex items-center justify-center rounded-lg text-espresso-rich transition-colors font-semibold hover:bg-surface-cream cursor-pointer disabled:opacity-40"
              disabled={quantity >= 10}
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Bag CTA */}
          <button
            type="button"
            onClick={handleAdd}
            className="flex-1 bg-primary-container hover:bg-moss-deep text-white font-medium py-3.5 px-6 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>
              {isAdded
                ? "Added to Bag ✓"
                : `Add to Bag - ₹${orderTotal.toLocaleString("en-IN")}`}
            </span>
          </button>
        </div>

        {/* Buy Now CTA */}
        <button
          type="button"
          onClick={handleBuy}
          className="w-full bg-espresso-rich hover:bg-black text-canvas-linen font-medium py-3.5 px-6 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
        >
          <Zap className="w-4 h-4 fill-current text-sand-tint" />
          <span>Buy Now</span>
        </button>
      </div>

      {/* Safe Checkout Badges */}
      <div className="pt-2 flex flex-col items-center gap-2.5 border-t border-border-subtle/60">
        <div className="flex items-center gap-1.5 text-neutral-mineral">
          <Lock className="w-3.5 h-3.5 text-primary-container" />
          <span className="text-[11px] font-sans tracking-wider uppercase font-semibold">
            Guaranteed Safe &amp; Secure Checkout
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
          {["UPI", "Google Pay", "PhonePe", "Visa", "Mastercard", "NetBanking"].map(
            (method) => (
              <span
                key={method}
                className="px-2.5 py-1 rounded-md bg-surface-card border border-border-subtle text-on-surface-variant text-[10px] sm:text-[11px] font-medium tracking-wide shadow-2xs"
              >
                {method}
              </span>
            )
          )}
        </div>
      </div>

      {/* Tactile Notification Toast */}
      {localToast && (
        <aside
          role="status"
          aria-live="polite"
          className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-espresso-rich text-canvas-linen px-5 py-3 rounded-full shadow-2xl flex items-center gap-2.5 text-xs font-sans font-medium border border-sand-tint/20 animate-fadeIn max-w-[90vw] sm:max-w-md text-center"
        >
          <div className="w-5 h-5 rounded-full bg-primary-container text-surface-card flex items-center justify-center shrink-0">
            <Check className="w-3 h-3" />
          </div>
          <span className="truncate">{localToast}</span>
        </aside>
      )}
    </div>
  );
}

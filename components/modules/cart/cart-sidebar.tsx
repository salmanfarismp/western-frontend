"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Truck,
  Sparkles,
} from "lucide-react";
import { useCart } from "@/context/cart-context";
import { useAuth } from "@/context/auth-context";
import { SafeImage } from "@/components/ui/safe-image";

export function CartSidebar() {
  const { user, openAuthModal } = useAuth();
  const {
    items,
    cartCount,
    subtotal,
    savings,
    isLoading,
    isUpdating,
    isSidebarOpen,
    closeCart,
    updateQuantity,
    removeItem,
  } = useCart();

  const sidebarRef = useRef<HTMLDivElement>(null);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isSidebarOpen) {
        closeCart();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSidebarOpen, closeCart]);

  // Lock background scroll when sidebar is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen]);

  if (!isSidebarOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end animate-fadeIn">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="fixed inset-0 bg-espresso-rich/50 backdrop-blur-xs transition-opacity cursor-pointer"
        aria-hidden="true"
      />

      {/* Slide-over Panel */}
      <div
        ref={sidebarRef}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping Cart"
        className="relative w-full max-w-md bg-surface-card h-full shadow-2xl flex flex-col z-10 border-l border-border-subtle animate-slideInRight"
      >
        {/* Header */}
        <div className="px-5 sm:px-6 py-4.5 border-b border-border-subtle/80 flex items-center justify-between bg-surface-cream/40">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-primary-container" />
            <h2 className="font-serif text-lg sm:text-xl font-semibold text-espresso-rich">
              Your Cart
            </h2>
            {cartCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-primary-container/10 text-primary-container text-xs font-bold">
                {cartCount}
              </span>
            )}
          </div>

          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="p-1.5 text-neutral-mineral hover:text-espresso-rich hover:bg-surface-cream rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Delivery Banner */}
        <div className="bg-canvas-linen px-5 sm:px-6 py-2.5 border-b border-border-subtle/60 flex items-center gap-2 text-xs text-primary-container font-medium">
          <Sparkles className="w-3.5 h-3.5 text-terracotta-soft shrink-0" />
          <span>Complimentary Pan-India White-Glove Delivery</span>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-4 space-y-4">
          {isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center space-y-3 text-neutral-mineral">
              <div className="w-7 h-7 border-2 border-primary-container border-t-transparent rounded-full animate-spin" />
              <p className="text-xs">Loading your cart...</p>
            </div>
          ) : items.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-surface-cream flex items-center justify-center text-neutral-mineral">
                <ShoppingBag className="w-8 h-8 stroke-1 text-primary-container" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-serif text-lg font-medium text-espresso-rich">
                  Your cart is currently empty
                </h3>
                <p className="text-xs text-neutral-mineral max-w-xs mx-auto leading-relaxed">
                  Discover finecrafted swings made with kiln-dried teak & weather-resilient wicker.
                </p>
              </div>
              <div className="pt-2">
                <Link
                  href="/collections"
                  onClick={closeCart}
                  className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-primary-container text-surface-card hover:bg-moss-deep text-xs font-semibold transition-all shadow-xs"
                >
                  Explore Collections
                </Link>
              </div>
            </div>
          ) : (
            <ul className="divide-y divide-border-subtle/60">
              {items.map((item) => (
                <li key={item.id} className="py-4 flex gap-3.5 first:pt-1">
                  {/* Thumbnail */}
                  <Link
                    href={`/product/${item.slug}`}
                    onClick={closeCart}
                    className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-lg overflow-hidden bg-canvas-linen shrink-0 border border-border-subtle/80 group"
                  >
                    <SafeImage
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div className="space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/product/${item.slug}`}
                          onClick={closeCart}
                          className="font-serif text-sm font-semibold text-espresso-rich hover:text-primary-container transition-colors line-clamp-1"
                        >
                          {item.name}
                        </Link>
                        <button
                          onClick={() => removeItem(item.id)}
                          disabled={isUpdating}
                          aria-label={`Remove ${item.name} from cart`}
                          className="text-neutral-mineral hover:text-terracotta-rich transition-colors p-1 cursor-pointer disabled:opacity-50"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {item.subtitle && (
                        <p className="text-[11px] text-neutral-mineral line-clamp-1">
                          {item.subtitle}
                        </p>
                      )}
                    </div>

                    {/* Price and Quantity Controls */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-1.5">
                        <span className="font-serif text-sm font-bold text-espresso-rich">
                          ₹{item.price.toLocaleString("en-IN")}
                        </span>
                        {item.originalPrice && item.originalPrice > item.price && (
                          <span className="text-[11px] text-neutral-mineral line-through">
                            ₹{item.originalPrice.toLocaleString("en-IN")}
                          </span>
                        )}
                      </div>

                      {/* Stepper */}
                      <div className="flex items-center border border-border-subtle rounded-md bg-canvas-linen">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={isUpdating}
                          aria-label="Decrease quantity"
                          className="p-1 sm:p-1.5 hover:bg-surface-cream text-espresso-rich disabled:opacity-40 transition-colors cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-semibold text-espresso-rich select-none">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={isUpdating || item.quantity >= 10}
                          aria-label="Increase quantity"
                          className="p-1 sm:p-1.5 hover:bg-surface-cream text-espresso-rich disabled:opacity-40 transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-5 sm:p-6 border-t border-border-subtle/80 bg-surface-cream/30 space-y-4">
            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs text-espresso-rich">
              {savings > 0 && (
                <div className="flex justify-between items-center text-primary-container font-medium">
                  <span>Special Savings</span>
                  <span>-₹{savings.toLocaleString("en-IN")}</span>
                </div>
              )}
              <div className="flex justify-between items-baseline pt-2 border-t border-border-subtle/80 font-serif text-base sm:text-lg font-semibold text-espresso-rich">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              <p className="text-[10px] text-neutral-mineral text-center pt-0.5">
                Inclusive of all taxes. Custom finishes confirmed after checkout.
              </p>
            </div>

            {/* Action Button */}
            <button
              onClick={() => {
                if (!user) {
                  openAuthModal({
                    title: "Sign In to Checkout",
                    description:
                      "Sign in with Google to complete your purchase, save delivery preferences, and track shipments.",
                  });
                  return;
                }
                alert("Proceeding to checkout with " + cartCount + " item(s).");
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-primary-container hover:bg-moss-deep text-surface-card text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-sm cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Assurance Badges */}
            <div className="pt-2 flex items-center justify-around text-[10px] text-neutral-mineral border-t border-border-subtle/60">
              <span className="inline-flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-primary-container" />
                1-Year Warranty
              </span>
              <span className="inline-flex items-center gap-1">
                <Truck className="w-3 h-3 text-primary-container" />
                Insured Transit
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

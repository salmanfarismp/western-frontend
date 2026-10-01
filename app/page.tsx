"use client";

import React, { useState } from "react";
import {
  AnnouncementBar,
  Navbar,
  Footer,
  WhatsAppButton,
} from "@/components/common";
import {
  HeroSection,
  CategoryGrid,
  ProductShowcase,
  CraftStory,
  CustomerReviews,
  LookbookGallery,
  QuickViewModal,
} from "@/components/modules/home";
import type { Product } from "@/types/home";
import { Check } from "lucide-react";
import { CategoryBar } from "@/components/common/category-bar";

export default function HomePage() {
  const [cartCount, setCartCount] = useState(3);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleAddToCart = (product: Product) => {
    setCartCount((prev) => prev + 1);
    setToastMessage(`Added ${product.name} to your sanctuary cart`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-canvas-linen text-espresso-rich flex flex-col selection:bg-sand-tint selection:text-espresso-rich">
      {/* Top Announcements */}
      <AnnouncementBar />

      {/* Main Navigation Header */}
      <Navbar
        cartCount={cartCount}
        showSearch
        onCartClick={() =>
          setToastMessage(`Your cart contains ${cartCount} handcrafted items`)
        }
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        <CategoryBar />
        {/* Editorial Hero Section */}
        <HeroSection />

        {/* Shop By Silhouette / Categories */}
        <CategoryGrid />

        {/* Signature Masterpieces / Featured Products with Filters */}
        <ProductShowcase onAddToCart={handleAddToCart} />

        {/* Brand Integrity & Materials Engineering Story */}
        <CraftStory />

        {/* Customer Verified Veranda Reviews */}
        <CustomerReviews />

        {/* Community & Instagram Lookbook Gallery */}
        <LookbookGallery />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Concierge Action */}
      <WhatsAppButton />

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
    </div>
  );
}

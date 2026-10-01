"use client";

import React, { useState } from "react";
import {
  AnnouncementBar,
  Navbar,
  Footer,
  WhatsAppButton,
} from "@/components/common";
import { LookbookGallery } from "@/components/modules/home";
import { ProductsHero, ProductsGrid } from "@/components/modules/products-list";
import { PRODUCTS_LIST_ITEMS } from "@/lib/data/products-list-data";
import type { Product, ProductCategory } from "@/types/home";
import { Check } from "lucide-react";

export default function ProductsListPage() {
  const [cartCount, setCartCount] = useState(3);
  const [activeCategory, setActiveCategory] = useState<ProductCategory>("all");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleAddToCart = (product: Product) => {
    setCartCount((prev) => prev + 1);
    setToastMessage(`Added ${product.name} to your sanctuary cart`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const filteredProducts =
    activeCategory === "all"
      ? PRODUCTS_LIST_ITEMS
      : PRODUCTS_LIST_ITEMS.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-canvas-linen text-espresso-rich flex flex-col selection:bg-sand-tint selection:text-espresso-rich">
      {/* Top Announcements */}
      <AnnouncementBar />

      {/* Main Navigation Header */}
      <Navbar
        cartCount={cartCount}
        showSearch={false}
        onCartClick={() =>
          setToastMessage(`Your cart contains ${cartCount} handcrafted items`)
        }
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {/* Curated Collection Hero & Category Filter Pills */}
        <ProductsHero
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />

        {/* Product Grid identical to Home Page Cards */}
        <ProductsGrid
          products={filteredProducts}
          onAddToCart={handleAddToCart}
        />

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

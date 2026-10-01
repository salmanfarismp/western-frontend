"use client";

import React, { useState } from "react";
import {
  AnnouncementBar,
  Navbar,
  Footer,
  WhatsAppButton,
} from "@/components/common";
import { ProductBreadcrumbs } from "./product-breadcrumbs";
import { ProductGallery } from "./product-gallery";
import { ProductConfigurator } from "./product-configurator";
import { ProductLogistics } from "./product-logistics";
import { ProductReviews } from "./product-reviews";
import { SimilarProducts } from "./similar-products";
import type { ProductDetailData } from "@/lib/data/product-detail-data";
import type { Product } from "@/types/home";
import { Check } from "lucide-react";

interface ProductDetailViewProps {
  product: ProductDetailData;
}

export function ProductDetailView({ product }: ProductDetailViewProps) {
  const [cartCount, setCartCount] = useState(3);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleAddToCart = (quantity: number, selectedTone: string, totalPrice: number) => {
    setCartCount((prev) => prev + quantity);
    showToast(
      `Added ${quantity} × ${product.name} (${selectedTone}) to your cart (₹${totalPrice.toLocaleString(
        "en-IN"
      )})`
    );
  };

  const handleSimilarAddToCart = (similarProduct: Product) => {
    setCartCount((prev) => prev + 1);
    showToast(`Added ${similarProduct.name} to your sanctuary cart`);
  };

  const handleBuyNow = (quantity: number, selectedTone: string, totalPrice: number) => {
    setCartCount((prev) => prev + quantity);
    showToast(
      `Proceeding to checkout with ${quantity} × ${product.name} (${selectedTone})`
    );
  };

  return (
    <div className="min-h-screen bg-canvas-linen text-espresso-rich flex flex-col selection:bg-sand-tint selection:text-espresso-rich">
      {/* Top Announcements (Identical to collections page) */}
      <AnnouncementBar />

      {/* Main Navigation Header (Identical to collections page) */}
      <Navbar
        cartCount={cartCount}
        showSearch={false}
        onCartClick={() =>
          showToast(`Your cart contains ${cartCount} handcrafted items`)
        }
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {/* Top Breadcrumb & Inventory Alert Bar */}
        <ProductBreadcrumbs
          category={product.breadcrumbCategory}
          categorySlug={product.categorySlug}
          productName={product.name}
          inventoryStatus={product.inventoryStatus}
        />

        {/* Main Showcase & Commerce Engine */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7 lg:py-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start">
            {/* Media Gallery (Left Column) */}
            <ProductGallery
              gallery={product.gallery}
              badges={product.badges}
            />

            {/* Configurator & Commerce Engine (Right Column) */}
            <ProductConfigurator
              name={product.name}
              subtitle={product.subtitle}
              price={product.price}
              originalPrice={product.originalPrice}
              savings={product.savings}
              rating={product.rating}
              reviewsCount={product.reviewsCount}
              tones={product.tones}
              hangingKitIncluded={product.hangingKitIncluded}
              hangingKitDescription={product.hangingKitDescription}
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
            />
          </div>
        </section>

        {/* Product Maintenance & Delivery Logistics */}
        <ProductLogistics
          shipping={product.shippingLogistics}
          care={product.careLogistics}
        />

        {/* Customer Reviews & Stories Section */}
        <ProductReviews
          reviews={product.reviews}
          rating={product.rating}
          reviewsCount={product.reviewsCount}
        />

        {/* Similar Products Section */}
        <SimilarProducts
          currentProductId={product.id}
          onAddToCart={handleSimilarAddToCart}
        />
      </main>

      {/* Unified Footer (Identical to collections page) */}
      <Footer />

      {/* Floating Concierge Action (Identical to collections page) */}
      <WhatsAppButton />

      {/* Tactile Notification Toast */}
      {toastMessage && (
        <aside
          role="status"
          aria-live="polite"
          className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-espresso-rich text-canvas-linen px-5 py-3 rounded-full shadow-2xl flex items-center gap-2.5 text-xs font-sans font-medium border border-sand-tint/20 animate-fadeIn max-w-[90vw] sm:max-w-md text-center"
        >
          <div className="w-5 h-5 rounded-full bg-primary-container text-surface-card flex items-center justify-center shrink-0">
            <Check className="w-3 h-3" />
          </div>
          <span className="truncate">{toastMessage}</span>
        </aside>
      )}
    </div>
  );
}

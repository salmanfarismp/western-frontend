import React from "react";
import {
  AnnouncementBar,
  Navbar,
  Footer,
  WhatsAppButton,
} from "@/components/common";
import {
  ProductBreadcrumbs,
  ProductGallery,
  ProductConfigurator,
  ProductLogistics,
  ProductReviews,
  ProductFaqSection,
  SimilarProducts,
} from "@/components/modules/product-detail";
import type { ProductDetailData } from "@/lib/data/product-detail-data";
import type { Product } from "@/types/home";
import type { FaqItem } from "@/types/faq";

interface ProductDetailViewProps {
  product: ProductDetailData;
  similarProducts?: Product[];
  faqs?: FaqItem[];
}

export function ProductDetailView({
  product,
  similarProducts,
  faqs,
}: ProductDetailViewProps) {
  return (
    <div className="min-h-screen bg-canvas-linen text-espresso-rich flex flex-col selection:bg-sand-tint selection:text-espresso-rich">
      {/* Top Announcements */}
      <AnnouncementBar />

      {/* Main Navigation Header (Client Island) */}
      <Navbar cartCount={3} showSearch={false} />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {/* Top Breadcrumb & Inventory Alert Bar (SSR Semantic Component) */}
        <ProductBreadcrumbs
          category={product.breadcrumbCategory}
          categorySlug={product.categorySlug}
          productName={product.name}
          inventoryStatus={product.inventoryStatus}
        />

        {/* Main Showcase & Commerce Engine */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7 lg:py-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start">
            {/* Media Gallery (Client Island) */}
            <ProductGallery
              gallery={product.gallery}
              badges={product.badges}
            />

            {/* Configurator & Commerce Engine (Client Island) */}
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
            />
          </div>
        </section>

        {/* Product Maintenance & Delivery Logistics (SSR Component) */}
        <ProductLogistics
          shipping={product.shippingLogistics}
          care={product.careLogistics}
        />

        {/* Specifications & Model Installation FAQ (SSR Component for AEO) */}
        <ProductFaqSection product={product} faqs={faqs} />

        {/* Customer Reviews & Verified Stories Section (Client Island) */}
        <ProductReviews
          reviews={product.reviews}
          rating={product.rating}
          reviewsCount={product.reviewsCount}
        />

        {/* Similar Curated Options Section (SSR Component) */}
        <SimilarProducts
          currentProductId={product.id}
          similarProducts={similarProducts}
        />
      </main>

      {/* Unified Footer */}
      <Footer />

      {/* Floating Concierge Action */}
      <WhatsAppButton />
    </div>
  );
}

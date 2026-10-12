import React from "react";
import {
  AnnouncementBar,
  Navbar,
  Footer,
  WhatsAppButton,
  CategoryBar,
} from "@/components/common";
import {
  HeroSection,
  CategoryGrid,
  ProductShowcase,
  CraftStory,
  CustomerReviews,
  FaqSection,
  LookbookGallery,
} from "@/components/modules/home";
import type { Product, CategorySilhouette, HeroSectionData } from "@/types/home";
import type { ProductCategoryRow } from "@/types/database";
import type { FaqItem } from "@/types/faq";

interface HomeViewProps {
  products: Product[];
  categories: ProductCategoryRow[];
  categorySilhouettes: CategorySilhouette[];
  heroData?: HeroSectionData | null;
  lifestyleImages?: string[];
  faqs?: FaqItem[];
}

export function HomeView({
  products,
  categories,
  categorySilhouettes,
  heroData,
  lifestyleImages,
  faqs,
}: HomeViewProps) {
  return (
    <div className="min-h-screen bg-canvas-linen text-espresso-rich flex flex-col selection:bg-sand-tint selection:text-espresso-rich">
      {/* Top Announcements */}
      <AnnouncementBar />

      {/* Main Navigation Header (Client Island) */}
      <Navbar cartCount={3} showSearch />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {/* Category Sub-navigation */}
        <CategoryBar categories={categories} />

        {/* Editorial Hero Section (SSR with Priority LCP Image) */}
        <HeroSection data={heroData} />

        {/* Shop By Silhouette / Categories */}
        <CategoryGrid categories={categorySilhouettes} />

        {/* Signature Masterpieces / Featured Products with Interactive Filters (Client Island) */}
        <ProductShowcase
          products={products}
          categories={categories}
        />

        {/* Brand Integrity & Materials Engineering Story (SSR with Semantic Specification List) */}
        <CraftStory />

        {/* Customer Verified Veranda Reviews (Client Island Carousel) */}
        <CustomerReviews />

        {/* Buyer Guide & Specifications FAQ (SSR Semantic Q&A for AEO & Voice Search) */}
        <FaqSection faqs={faqs} />

        {/* Community & Instagram Lookbook 3D Gallery (Client Island) */}
        <LookbookGallery images={lifestyleImages} />
      </main>

      {/* Footer with Business NAP & Contact Signals */}
      <Footer />

      {/* Floating Concierge Action */}
      <WhatsAppButton />
    </div>
  );
}

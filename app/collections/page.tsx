"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  AnnouncementBar,
  Navbar,
  Footer,
  WhatsAppButton,
  CategoryBar,
} from "@/components/common";
import { LookbookGallery } from "@/components/modules/home";
import { ProductsHero, ProductsGrid } from "@/components/modules/products-list";
import { getCategories } from "@/lib/api/categories";
import { getProducts } from "@/lib/api/products";
import type { Product, ProductCategory } from "@/types/home";
import type { ProductCategoryRow } from "@/types/database";
import { Check } from "lucide-react";

function CollectionsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeCategory =
    (searchParams.get("category") as ProductCategory) ?? "all";

  const [categories, setCategories] = useState<ProductCategoryRow[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loadedCategory, setLoadedCategory] = useState<string | null>(null);
  const [cartCount, setCartCount] = useState(3);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const loading = loadedCategory !== activeCategory;

  // Load categories initially
  useEffect(() => {
    let mounted = true;
    getCategories().then((cats) => {
      if (mounted) setCategories(cats);
    });
    return () => {
      mounted = false;
    };
  }, []);

  // Fetch products when activeCategory changes
  useEffect(() => {
    let mounted = true;

    getProducts({
      categorySlug: activeCategory === "all" ? undefined : activeCategory,
    })
      .then((data) => {
        if (mounted) {
          setProducts(data);
          setLoadedCategory(activeCategory);
        }
      })
      .catch((err) => {
        console.error("Failed to load products:", err);
        if (mounted) setLoadedCategory(activeCategory);
      });

    return () => {
      mounted = false;
    };
  }, [activeCategory]);

  const handleSelectCategory = (category: ProductCategory) => {
    const newUrl =
      category === "all" ? "/collections" : `/collections?category=${category}`;
    router.push(newUrl, { scroll: false });
  };

  const handleAddToCart = (product: Product) => {
    setCartCount((prev) => prev + 1);
    setToastMessage(`Added ${product.name} to your cart`);
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
        showSearch={false}
        onCartClick={() =>
          setToastMessage(`Your cart contains ${cartCount} handcrafted items`)
        }
      />

      {/* Secondary Category Navigation */}
      <CategoryBar activeCategory={activeCategory} categories={categories} />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {/* Curated Collection Hero & Category Filter Pills */}
        <ProductsHero
          activeCategory={activeCategory}
          onSelectCategory={handleSelectCategory}
          categories={categories}
          totalModels={products.length}
        />

        {/* Product Grid or Loading State */}
        {loading ? (
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 flex flex-col items-center justify-center">
            <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin mb-4" />
            <p className="text-sm font-sans text-neutral-mineral">
              Gathering handcrafted swings...
            </p>
          </div>
        ) : (
          <ProductsGrid
            products={products}
            onAddToCart={handleAddToCart}
          />
        )}

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

export default function ProductsListPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-canvas-linen text-espresso-rich flex flex-col items-center justify-center">
          <div className="animate-pulse text-sm text-neutral-mineral font-sans">
            Loading collections...
          </div>
        </div>
      }
    >
      <CollectionsContent />
    </Suspense>
  );
}

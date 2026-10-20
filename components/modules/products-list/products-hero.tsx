import React from "react";
import Link from "next/link";
import { ShieldCheck, Search, X } from "lucide-react";
import type { ProductCategory } from "@/types/home";
import type { ProductCategoryRow } from "@/types/database";

interface ProductsHeroProps {
  activeCategory: ProductCategory;
  categories?: ProductCategoryRow[];
  totalModels?: number;
  searchQuery?: string;
}

const HERO_EDITORIAL = {
  eyebrow: "Curated Sanctuary Collection",
  title: "Fine-Crafted Outdoor Swings & Porch Daybeds",
  description:
    "Fine crafted outdoor nests engineered with marine-grade hardware, hand-woven UV resin fibers, and kiln-dried FSC teak for years of unhurried mornings.",
};

export function ProductsHero({
  activeCategory,
  categories,
  totalModels = 28,
  searchQuery,
}: ProductsHeroProps) {
  const getTabHref = (slugOrId: string) => {
    const params = new URLSearchParams();
    if (slugOrId !== "all") {
      params.set("category", slugOrId);
    }
    if (searchQuery) {
      params.set("search", searchQuery);
    }
    const queryString = params.toString();
    return queryString ? `/collections?${queryString}` : "/collections";
  };

  const filterTabs = [
    { label: "All Swings", href: getTabHref("all"), value: "all" },
    ...(categories && categories.length > 0
      ? categories.map((c) => ({
          label: c.nick_name || c.name || "Category",
          href: getTabHref(c.slug || String(c.id)),
          value: (c.slug || String(c.id)) as ProductCategory,
        }))
      : [
          { label: "Single Swings", href: getTabHref("single-swing-chair"), value: "single-swing-chair" as ProductCategory },
          { label: "Double Swings", href: getTabHref("double-swing-chair"), value: "double-swing-chair" as ProductCategory },
          { label: "Three Seater Swings", href: getTabHref("swing-bed"), value: "swing-bed" as ProductCategory },
          { label: "Accessories", href: getTabHref("swing-chair-accessories"), value: "swing-chair-accessories" as ProductCategory },
        ]),
  ];

  return (
    <section
      aria-labelledby="collection-hero-heading"
      className="relative w-full bg-surface-container-low overflow-hidden px-4 sm:px-6 lg:px-8 py-7 sm:py-9 border-b border-border-subtle/50"
    >
      {/* Ambient background glows */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-sand-tint/25 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full bg-moss-light/15 blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Headline & Editorial Intro + Stat Badge */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 sm:gap-6">
          <div className="max-w-2xl">
            {/* Eyebrow Label */}
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-block w-6 h-[1.5px] bg-primary" />
              <span className="font-sans text-[11px] uppercase tracking-widest text-primary font-bold">
                {HERO_EDITORIAL.eyebrow}
              </span>
            </div>

            {/* H1 Heading */}
            <h1
              id="collection-hero-heading"
              className="font-serif text-3xl sm:text-4xl lg:text-[42px] text-espresso-rich font-semibold tracking-tight leading-tight"
            >
              {HERO_EDITORIAL.title}
            </h1>

            {/* Subtitle Description */}
            <p className="font-sans text-sm sm:text-base text-on-surface-variant mt-2 max-w-xl leading-relaxed">
              {HERO_EDITORIAL.description}
            </p>
          </div>

          {/* Right Stat & Warranty Badge */}
          <div className="flex items-center gap-4 bg-surface-card/85 backdrop-blur-md px-5 py-3 rounded-xl shadow-sm border border-border-subtle/60 self-start md:self-auto shrink-0">
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold text-primary leading-none">
                {totalModels}
              </span>
              <span className="font-sans text-[10px] uppercase tracking-wider text-neutral-mineral font-semibold mt-1">
                Models Available
              </span>
            </div>
            <div className="w-[1px] h-8 bg-border-subtle" />
            <div className="flex items-center gap-1.5 text-moss-deep">
              <ShieldCheck className="w-5 h-5 text-moss-deep shrink-0" />
              <span className="font-sans text-xs sm:text-sm font-semibold tracking-tight">
                1-Yr All-Weather Warranty
              </span>
            </div>
          </div>
        </div>

        {/* Active Search Filter Banner */}
        {searchQuery && (
          <div className="mt-4 sm:mt-5 inline-flex items-center gap-2 px-3.5 py-1.5 bg-surface-card/90 border border-border-subtle rounded-full text-xs shadow-xs">
            <Search className="w-3.5 h-3.5 text-primary-container shrink-0" />
            <span className="text-espresso-rich">
              Showing results for <strong className="font-semibold text-espresso-rich">&ldquo;{searchQuery}&rdquo;</strong>
            </span>
            <Link
              href={activeCategory !== "all" ? `/collections?category=${activeCategory}` : "/collections"}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-neutral-mineral hover:text-red-600 ml-1 pl-2 border-l border-border-subtle transition-colors"
              title="Clear search query"
            >
              <X className="w-3 h-3" />
              <span>Clear</span>
            </Link>
          </div>
        )}

        {/* Crawlable Semantic Category Filter Navigation */}
        <nav
          aria-label="Category Navigation"
          className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto py-2 mt-4 sm:mt-6 scrollbar-none whitespace-nowrap"
        >
          {filterTabs.map((filter) => {
            const isActive =
              activeCategory === filter.value ||
              (activeCategory && filter.value !== "all" && (activeCategory.includes(filter.value) || filter.value.includes(activeCategory)));

            return (
              <Link
                key={filter.value}
                href={filter.href}
                scroll={false}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-[13px] transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-primary text-on-primary shadow-sm font-semibold"
                    : "bg-surface-card hover:bg-surface-container text-espresso-rich font-medium border border-border-subtle/70 hover:border-primary/40"
                }`}
              >
                {filter.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </section>
  );
}

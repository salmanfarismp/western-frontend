"use client";

import React from "react";
import { ShieldCheck } from "lucide-react";
import type { ProductCategory } from "@/types/home";
import { PRODUCTS_LIST_FILTERS } from "@/lib/data/products-list-data";

interface ProductsHeroProps {
  activeCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  totalModels?: number;
}

export function ProductsHero({
  activeCategory,
  onSelectCategory,
  totalModels = 28,
}: ProductsHeroProps) {
  return (
    <section className="relative w-full bg-surface-container-low overflow-hidden px-4 sm:px-6 lg:px-8 py-7 sm:py-9 border-b border-border-subtle/50">
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
                ALL Collection
              </span>
            </div>

            {/* H1 Heading */}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-[42px] text-espresso-rich font-semibold tracking-tight leading-tight">
              Fine-crafted Swing Chairs
            </h1>

            {/* Subtitle Description */}
            <p className="font-sans text-sm sm:text-base text-on-surface-variant mt-2 max-w-xl leading-relaxed">
              fine crafted outdoor nests engineered with marine-grade hardware, hand-woven UV resin fibers, and kiln-dried FSC teak for years of unhurried mornings.
            </p>
          </div>

          {/* Right Stat & Warranty Badge */}
          <div className="flex items-center gap-4 bg-surface-card/85 backdrop-blur-md px-5 py-3 rounded-xl shadow-sm border border-border-subtle/60 self-start md:self-auto shrink-0">
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold text-primary leading-none">
                {totalModels}
              </span>
              <span className="font-sans text-[10px] uppercase tracking-wider text-neutral-mineral font-semibold mt-1">
                Models
              </span>
            </div>
            <div className="w-[1px] h-8 bg-border-subtle" />
            <div className="flex items-center gap-1.5 text-moss-deep">
              <ShieldCheck className="w-5 h-5 text-moss-deep shrink-0" />
              <span className="font-sans text-xs sm:text-sm font-semibold tracking-tight">
                1-Yr Warranty
              </span>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto py-2 mt-5 sm:mt-7 scrollbar-none whitespace-nowrap">
          {PRODUCTS_LIST_FILTERS.map((filter) => {
            const isActive = activeCategory === filter.value;
            return (
              <button
                key={filter.value}
                onClick={() => onSelectCategory(filter.value)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-[13px] transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-primary text-on-primary shadow-sm font-semibold"
                    : "bg-surface-card hover:bg-surface-container text-espresso-rich font-medium border border-border-subtle/70"
                }`}
              >
                {filter.label} ({filter.count})
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

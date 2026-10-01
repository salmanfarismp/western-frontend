"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface ProductBreadcrumbsProps {
  category: string;
  categorySlug?: string;
  productName: string;
  inventoryStatus: string;
}

export function ProductBreadcrumbs({
  category,
  categorySlug = "collections",
  productName,
  inventoryStatus,
}: ProductBreadcrumbsProps) {
  return (
    <section className="w-full bg-surface-container-low px-4 sm:px-6 lg:px-8 py-3 sm:py-3.5 border-b border-border-subtle/50">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Breadcrumb Links */}
        <nav
          aria-label="Breadcrumbs"
          className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-on-surface-variant overflow-x-auto whitespace-nowrap py-0.5"
        >
          <Link
            href="/"
            className="hover:text-primary-container transition-colors"
          >
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-mineral shrink-0" />
          <Link
            href="/collections"
            className="hover:text-primary-container transition-colors"
          >
            {category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-mineral shrink-0" />
          <span className="text-espresso-rich font-medium truncate max-w-[200px] sm:max-w-none">
            {productName}
          </span>
        </nav>

        {/* Ready to Ship Badge */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-cream text-moss-deep text-[11px] font-sans uppercase tracking-wider font-semibold shadow-2xs border border-border-subtle/60">
            <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse" />
            {inventoryStatus}
          </span>
        </div>
      </div>
    </section>
  );
}

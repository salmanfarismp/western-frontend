import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CategorySilhouette } from "@/types/home";

interface CategoryGridProps {
  categories: CategorySilhouette[];
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <section className="w-full py-12 sm:py-16 bg-canvas-linen border-t border-border-subtle/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-4">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-moss-deep block mb-1.5 font-sans">
              Tailored Suspensions
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-espresso-rich tracking-tight">
              Architectural Sanctuary Silhouettes
            </h2>
          </div>
          <p className="font-sans text-sm text-neutral-mineral max-w-md leading-relaxed">
            Whether you crave solitary contemplation or quiet evenings shared beneath the
            stars, our structural range meets every porch scale.
          </p>
        </div>

        {/* 4-Card Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className="group flex flex-col bg-surface-card rounded-xl overflow-hidden shadow-ambient hover:shadow-floating transition-all duration-300 border border-border-subtle/80 cursor-pointer"
            >
              {/* Category Image Tile */}
              <div className="relative aspect-[3/4] overflow-hidden bg-surface-container">
                <Image
                  src={category.image}
                  alt={category.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>

              {/* Category Metadata */}
              <div className="p-5 flex flex-col flex-1 justify-between bg-surface-card">
                <div>
                  <h3 className="font-serif text-lg font-semibold text-espresso-rich group-hover:text-primary-container transition-colors">
                    {category.name}
                  </h3>
                  <p className="font-sans text-xs text-neutral-mineral mt-1.5 leading-relaxed line-clamp-2">
                    {category.description}
                  </p>
                </div>

                <div className="pt-4 mt-auto border-t border-border-subtle/50 flex items-center justify-between">
                  <span className="text-xs font-semibold text-primary-container">
                    {category.countLabel}
                  </span>
                  <ArrowRight className="w-4 h-4 text-neutral-mineral group-hover:text-primary-container group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

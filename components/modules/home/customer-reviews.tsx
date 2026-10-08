"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { CUSTOMER_REVIEWS } from "@/lib/data/home-data";

export function CustomerReviews() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? CUSTOMER_REVIEWS.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === CUSTOMER_REVIEWS.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section
      aria-labelledby="reviews-heading"
      className="w-full bg-canvas-linen py-12 sm:py-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-4">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-moss-deep block mb-1.5 font-sans">
              In The Wild
            </span>
            <h2
              id="reviews-heading"
              className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-espresso-rich tracking-tight"
            >
              Real Homes. Gentle Breezes.
            </h2>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              aria-label="Previous customer story"
              className="w-10 h-10 rounded-full bg-surface-card hover:bg-surface-cream text-espresso-rich shadow-sm border border-border-subtle flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next customer story"
              className="w-10 h-10 rounded-full bg-surface-card hover:bg-surface-cream text-espresso-rich shadow-sm border border-border-subtle flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 3 Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {CUSTOMER_REVIEWS.map((review, idx) => (
            <article
              key={review.id}
              className={`bg-surface-card rounded-xl overflow-hidden shadow-ambient flex flex-col border border-border-subtle/80 transition-all duration-300 ${
                currentIndex === idx ? "ring-2 ring-primary-container/20" : ""
              }`}
            >
              {/* Customer Porch Photo */}
              <div className="aspect-[16/10] relative overflow-hidden bg-surface-container">
                <Image
                  src={review.image}
                  alt={review.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>

              {/* Review Details */}
              <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between space-y-4 bg-surface-card">
                <div className="space-y-2.5">
                  <div className="flex text-terracotta-soft">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 fill-current text-terracotta-soft"
                      />
                    ))}
                  </div>

                  <p className="font-serif text-sm text-espresso-rich italic leading-relaxed">
                    {review.quote}
                  </p>
                </div>

                <div className="pt-3 border-t border-border-subtle/50 flex items-center justify-between">
                  <div>
                    <span className="font-sans font-semibold text-xs sm:text-sm text-espresso-rich block">
                      {review.author}
                    </span>
                    <span className="text-[11px] text-neutral-mineral block font-sans">
                      {review.productPurchased}
                    </span>
                  </div>

                  {review.verified && (
                    <span className="inline-flex items-center gap-1 bg-surface-container-low px-2 py-0.5 rounded text-moss-deep text-[11px] font-sans font-medium">
                      <CheckCircle2 className="w-3 h-3 text-primary-container" />
                      <span>Verified</span>
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

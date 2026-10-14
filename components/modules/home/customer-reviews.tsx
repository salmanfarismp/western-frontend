"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { SafeImage } from "@/components/ui/safe-image";
import { Star, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import type { CustomerReview } from "@/types/home";

interface CustomerReviewsProps {
  reviews?: CustomerReview[];
}

export function CustomerReviews({ reviews = [] }: CustomerReviewsProps) {
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScrollBounds = useCallback(() => {
    if (!scrollTrackRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollTrackRef.current;
    // Allow a small 4px threshold for subpixel rounding
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 4);
  }, []);

  useEffect(() => {
    checkScrollBounds();
    const el = scrollTrackRef.current;
    if (!el) return;

    el.addEventListener("scroll", checkScrollBounds, { passive: true });
    window.addEventListener("resize", checkScrollBounds);

    return () => {
      el.removeEventListener("scroll", checkScrollBounds);
      window.removeEventListener("resize", checkScrollBounds);
    };
  }, [checkScrollBounds, reviews]);

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollTrackRef.current) return;
    const container = scrollTrackRef.current;
    // Scroll by the full visible width to move the entire set of cards
    const scrollAmount = container.clientWidth;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
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

          {/* Carousel Arrows (only if more than 1 review) */}
          {reviews.length > 1 && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleScroll("left")}
                disabled={!canScrollLeft}
                aria-label="Previous customer stories"
                className="w-10 h-10 rounded-full bg-surface-card hover:bg-surface-cream text-espresso-rich shadow-sm border border-border-subtle flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => handleScroll("right")}
                disabled={!canScrollRight}
                aria-label="Next customer stories"
                className="w-10 h-10 rounded-full bg-surface-card hover:bg-surface-cream text-espresso-rich shadow-sm border border-border-subtle flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Empty State */}
        {reviews.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-2xl bg-surface-card border border-border-subtle/80 max-w-xl mx-auto shadow-ambient">
            <div className="w-12 h-12 rounded-full bg-surface-cream border border-border-subtle/60 flex items-center justify-center mx-auto mb-3 text-neutral-mineral">
              <Star className="w-5 h-5 text-neutral-mineral/60" />
            </div>
            <h3 className="font-serif text-lg font-semibold text-espresso-rich">
              No customer reviews yet
            </h3>
            <p className="text-xs sm:text-sm text-on-surface-variant mt-1.5 max-w-md mx-auto">
              Check back soon for stories and veranda photos from our verified customers.
            </p>
          </div>
        ) : (
          /* Single-Line Swipeable Review Track */
          <div
            ref={scrollTrackRef}
            className="flex overflow-x-auto scrollbar-none snap-x snap-mandatory gap-6 sm:gap-8 pb-3 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0"
          >
            {reviews.map((review) => (
              <article
                key={review.id}
                className="w-[85vw] max-w-[340px] sm:w-[calc((100%-24px)/2)] lg:w-[calc((100%-64px)/3)] shrink-0 snap-start bg-surface-card rounded-xl overflow-hidden shadow-ambient hover:shadow-floating flex flex-col justify-between border border-border-subtle/80 transition-shadow duration-300"
              >
                {/* Customer Porch Photo */}
                <div className="aspect-[16/10] relative overflow-hidden bg-surface-container">
                  <SafeImage
                    src={review.image}
                    alt={review.alt}
                    fill
                    sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 33vw"
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
                        {review.location ? `${review.location} • ` : ""}
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
        )}
      </div>
    </section>
  );
}

"use client";

import React, { useState, useRef } from "react";
import { SafeImage } from "@/components/ui/safe-image";
import {
  Star,
  ArrowLeft,
  ArrowRight,
  PenSquare,
  X,
  BadgeCheck,
  Check,
} from "lucide-react";
import type { ProductReviewItem } from "@/lib/data/product-detail-data";

interface ProductReviewsProps {
  reviews: ProductReviewItem[];
  rating: number;
  reviewsCount: number;
}

export function ProductReviews({
  reviews: initialReviews,
  rating,
  reviewsCount,
}: ProductReviewsProps) {
  const [reviewsList, setReviewsList] = useState<ProductReviewItem[]>(initialReviews);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [headline, setHeadline] = useState("");
  const [story, setStory] = useState("");
  const [formSuccessMessage, setFormSuccessMessage] = useState<string | null>(null);

  const scrollTrackRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollTrackRef.current) {
      const scrollAmount = direction === "left" ? -380 : 380;
      scrollTrackRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !story.trim()) return;

    const newReview: ProductReviewItem = {
      id: `rev-user-${Date.now()}`,
      author: name.trim(),
      location: location.trim() || "Kerala",
      timeAgo: "Just now",
      rating: newRating,
      setupTag: "Recent Verification",
      quote: `“${story.trim()}”`,
      verified: true,
    };

    setReviewsList((prev) => [newReview, ...prev]);
    setShowReviewForm(false);
    setName("");
    setLocation("");
    setHeadline("");
    setStory("");
    setFormSuccessMessage(
      "Thank you for sharing your veranda story! Your review has been added."
    );
    setTimeout(() => {
      setFormSuccessMessage(null);
    }, 4000);
  };

  const activeRating = hoverRating !== null ? hoverRating : newRating;

  return (
    <section
      id="customer-reviews-section"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 w-full scroll-mt-24"
    >
      <div className="bg-surface-card rounded-2xl border border-border-subtle/80 p-5 sm:p-7 lg:p-10 shadow-ambient space-y-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border-subtle/70">
          <div className="space-y-1.5">
            <p className="text-[11px] uppercase tracking-widest text-neutral-mineral font-sans font-semibold mb-1">
              LISTEN TO OUR CUSTOMERS
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-espresso-rich tracking-tight font-normal">
                Customer Reviews &amp; Stories
              </h2>
              <div className="inline-flex items-center gap-2 bg-surface-cream px-3 py-1 rounded-full border border-border-subtle/60 shadow-2xs">
                <div className="flex items-center gap-1 text-terracotta-soft text-xs">
                  <Star className="w-3.5 h-3.5 fill-current text-terracotta-soft" />
                  <span className="font-semibold text-espresso-rich text-xs">
                    {rating.toFixed(1)}
                  </span>
                </div>
                <span className="text-xs text-neutral-mineral">•</span>
                <span className="text-[11px] font-sans text-on-surface-variant font-medium">
                  {reviewsCount} reviews across India
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-on-surface-variant">
              Authentic perspectives from homeowners across Kerala and India
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 sm:gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleScroll("left")}
                aria-label="Previous review"
                className="w-10 h-10 rounded-full border border-border-subtle bg-surface-card flex items-center justify-center text-espresso-rich hover:bg-surface-cream transition-colors shadow-2xs cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleScroll("right")}
                aria-label="Next review"
                className="w-10 h-10 rounded-full border border-border-subtle bg-surface-card flex items-center justify-center text-espresso-rich hover:bg-surface-cream transition-colors shadow-2xs cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => setShowReviewForm((prev) => !prev)}
              className="inline-flex items-center gap-2 bg-surface-cream hover:bg-surface-container text-espresso-rich border border-border-subtle hover:border-moss-deep text-xs sm:text-sm py-2.5 px-4 rounded-xl font-medium shadow-2xs transition-all cursor-pointer"
            >
              <PenSquare className="w-4 h-4 text-moss-deep" />
              <span>Write a Review</span>
            </button>
          </div>
        </div>

        {/* Success notification if posted */}
        {formSuccessMessage && (
          <div className="p-4 rounded-xl bg-primary-container/10 border border-primary-container/30 text-moss-deep text-xs sm:text-sm flex items-center gap-2">
            <Check className="w-4 h-4 text-primary-container shrink-0" />
            <span>{formSuccessMessage}</span>
          </div>
        )}

        {/* Expandable "Write a Review" Form */}
        {showReviewForm && (
          <div className="bg-surface-cream rounded-2xl p-5 sm:p-7 md:p-8 border border-border-subtle space-y-5 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-border-subtle/80 pb-3">
              <div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-espresso-rich">
                  Share Your Veranda Story
                </h3>
                <p className="text-xs sm:text-sm text-on-surface-variant">
                  Let fellow porch lovers know how your swing feels in your sanctuary.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowReviewForm(false)}
                aria-label="Close form"
                className="p-1.5 text-neutral-mineral hover:text-espresso-rich rounded-full hover:bg-surface-card transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              {/* Star Rating Selector */}
              <div className="space-y-1.5">
                <label className="text-xs sm:text-sm font-semibold text-espresso-rich block">
                  Your Overall Rating
                </label>
                <div className="flex items-center gap-1.5 text-terracotta-soft text-2xl cursor-pointer">
                  {[1, 2, 3, 4, 5].map((starVal) => (
                    <button
                      key={starVal}
                      type="button"
                      onMouseEnter={() => setHoverRating(starVal)}
                      onMouseLeave={() => setHoverRating(null)}
                      onClick={() => setNewRating(starVal)}
                      className="hover:scale-110 transition-transform focus:outline-hidden"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          starVal <= activeRating
                            ? "fill-current text-terracotta-soft"
                            : "text-border-subtle fill-none"
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-sans text-moss-deep font-semibold ml-2">
                    {activeRating}.0 -{" "}
                    {activeRating === 5
                      ? "Excellent"
                      : activeRating === 4
                      ? "Very Good"
                      : "Good"}
                  </span>
                </div>
              </div>

              {/* Name & Location Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs sm:text-sm font-medium text-espresso-rich block">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Maya Nambiar"
                    className="w-full bg-surface-card px-3.5 py-2.5 rounded-xl border border-border-subtle text-xs sm:text-sm text-espresso-rich focus:outline-hidden focus:border-primary-container focus:ring-1 focus:ring-primary-container"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs sm:text-sm font-medium text-espresso-rich block">
                    Location
                  </label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Kochi, Kerala"
                    className="w-full bg-surface-card px-3.5 py-2.5 rounded-xl border border-border-subtle text-xs sm:text-sm text-espresso-rich focus:outline-hidden focus:border-primary-container focus:ring-1 focus:ring-primary-container"
                  />
                </div>
              </div>

              {/* Review Headline */}
              <div className="space-y-1">
                <label className="text-xs sm:text-sm font-medium text-espresso-rich block">
                  Review Headline
                </label>
                <input
                  type="text"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  placeholder="e.g. Best investment for our monsoon tea sessions"
                  className="w-full bg-surface-card px-3.5 py-2.5 rounded-xl border border-border-subtle text-xs sm:text-sm text-espresso-rich focus:outline-hidden focus:border-primary-container focus:ring-1 focus:ring-primary-container"
                />
              </div>

              {/* Experience Textarea */}
              <div className="space-y-1">
                <label className="text-xs sm:text-sm font-medium text-espresso-rich block">
                  Your Experience &amp; Veranda Story
                </label>
                <textarea
                  required
                  rows={3}
                  value={story}
                  onChange={(e) => setStory(e.target.value)}
                  placeholder="Tell us about the comfort, delivery experience, assembly, and how it holds up to outdoor weather..."
                  className="w-full bg-surface-card px-3.5 py-2.5 rounded-xl border border-border-subtle text-xs sm:text-sm text-espresso-rich focus:outline-hidden focus:border-primary-container focus:ring-1 focus:ring-primary-container"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowReviewForm(false)}
                  className="px-4 py-2 rounded-xl text-xs sm:text-sm text-on-surface-variant hover:text-espresso-rich transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary-container hover:bg-moss-deep text-white text-xs sm:text-sm px-6 py-2.5 rounded-xl font-medium shadow-2xs transition-colors cursor-pointer"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Verified Reviews Cards Grid */}
        <div
          ref={scrollTrackRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 overflow-x-auto pb-1"
        >
          {reviewsList.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl border border-border-subtle overflow-hidden shadow-2xs hover:shadow-ambient transition-shadow flex flex-col justify-between"
            >
              {/* Optional Photo */}
              {rev.image && (
                <div className="relative aspect-[16/10] overflow-hidden bg-canvas-linen">
                  <SafeImage
                    src={rev.image}
                    alt={rev.author}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                  {rev.setupTag && (
                    <span className="absolute top-3 left-3 bg-surface-bright/90 backdrop-blur-xs text-espresso-rich text-[10px] font-sans uppercase tracking-wider px-2 py-0.5 rounded-md font-semibold shadow-2xs">
                      {rev.setupTag}
                    </span>
                  )}
                </div>
              )}

              {/* Review Content */}
              <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-1 text-terracotta-soft">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating
                            ? "fill-current text-terracotta-soft"
                            : "text-border-subtle fill-none"
                        }`}
                      />
                    ))}
                    <span className="text-[11px] text-neutral-mineral ml-1">
                      {rev.rating.toFixed(1)}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-espresso-rich italic leading-relaxed">
                    {rev.quote}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-border-subtle/60">
                  <div>
                    <span className="text-xs sm:text-sm font-semibold text-espresso-rich block">
                      {rev.author}
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-neutral-mineral">
                      {rev.location} • {rev.timeAgo}
                    </span>
                  </div>

                  {rev.verified && (
                    <span className="inline-flex items-center gap-1 bg-surface-container-low border border-border-subtle/60 px-2 py-0.5 rounded-full text-moss-deep text-[10px] font-medium">
                      <BadgeCheck className="w-3.5 h-3.5 text-primary-container" />
                      Verified Buyer
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

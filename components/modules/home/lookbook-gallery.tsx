import React from "react";
import { LOOKBOOK_POSTS } from "@/lib/data/home-data";
import { CircularGallery } from "@/components/ui/circular-gallery";

interface LookbookGalleryProps {
  images?: string[];
}

export function LookbookGallery({ images }: LookbookGalleryProps = {}) {
  const activeImages =
    images && images.length > 0
      ? images
      : LOOKBOOK_POSTS.map((post) => post.image);

  const galleryItems = activeImages.map((image) => ({
    image,
  }));

  return (
    <section id="lookbook" className="w-full py-12 sm:py-16 bg-canvas-linen border-t border-border-subtle/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-1">
          <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-moss-deep block mb-1 font-sans">
            #Westernswings
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-espresso-rich tracking-tight">
            Slow Living Inspiration
          </h2>
          <p className="font-sans text-sm text-neutral-mineral mt-1.5 leading-relaxed">
            Tag @Westernswings on Instagram to share your tranquil patio setup and be
            featured in our seasonal lookbook.
          </p>
        </div>

        {/* Interactive 3D Circular Gallery */}
        <div className="w-full h-[400px] sm:h-[460px] md:h-[480px] relative select-none -mt-4 sm:-mt-6">
          <CircularGallery
            items={galleryItems}
            bend={0.5}
            borderRadius={0.06}
            scrollEase={0.04}
            enableWaviness={false}
          />
        </div>

        {/* Interaction Hint & Social Link */}
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-mineral font-sans border-t border-border-subtle/40 pt-4">
          
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-medium text-moss-deep hover:text-espresso-rich transition-colors"
          >
            Follow @Westernswings
          </a>
        </div>
      </div>
    </section>
  );
}

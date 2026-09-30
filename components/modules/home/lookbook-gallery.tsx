import React from "react";
import Image from "next/image";
import { Camera } from "lucide-react";
import { LOOKBOOK_POSTS } from "@/lib/data/home-data";

export function LookbookGallery() {
  return (
    <section id="lookbook" className="w-full py-12 sm:py-16 bg-canvas-linen border-t border-border-subtle/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-moss-deep block mb-1.5 font-sans">
            #WesternSanctuary
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-espresso-rich tracking-tight">
            Slow Living Inspiration
          </h2>
          <p className="font-sans text-sm text-neutral-mineral mt-2 leading-relaxed">
            Tag @Westernswings on Instagram to share your tranquil patio setup and be
            featured in our seasonal lookbook.
          </p>
        </div>

        {/* 4-Column Photo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
          {LOOKBOOK_POSTS.map((post) => (
            <a
              key={post.id}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Instagram Lookbook photo"
              className="group relative aspect-square overflow-hidden rounded-xl bg-surface-container border border-border-subtle/80 block shadow-2xs"
            >
              <Image
                src={post.image}
                alt={post.alt}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />

              {/* Hover Camera Overlay */}
              <div className="absolute inset-0 bg-espresso-rich/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-surface-card">
                <div className="w-10 h-10 rounded-full bg-surface-card/20 backdrop-blur-xs flex items-center justify-center">
                  <Camera className="w-5 h-5 text-white" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

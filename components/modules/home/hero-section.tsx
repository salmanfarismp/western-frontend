import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ShieldCheck, Truck, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HERO_FEATURED } from "@/lib/data/home-data";

export function HeroSection() {
  const b2bWhatsappUrl = `https://wa.me/916238473506?text=${encodeURIComponent(
    "Hello Westernswings, we are interested in B2B and commercial orders."
  )}`;

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative w-full overflow-hidden bg-canvas-linen flex flex-col justify-center min-h-[calc(100svh-var(--header-height))] lg:h-[calc(100svh-var(--header-height))] py-6 lg:py-0"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center w-full">
          {/* Left Column: Editorial Headline & Narrative */}
          <div className="lg:col-span-6 flex flex-col space-y-4 sm:space-y-5 z-10">
            <h1
              id="hero-heading"
              className="font-serif text-3xl sm:text-3xl lg:text-4xl xl:text-[44px] font-semibold text-espresso-rich leading-[1.16] tracking-tight"
            >
              Crafted for Quiet Moments &amp; Gentle Breezes
            </h1>

            <p className="font-sans text-sm sm:text-base text-neutral-mineral leading-relaxed max-w-xl">
              Surrender to the slow rhythm of the afternoon. When the sun hangs low and
              golden light spills across the deck, the WesternSwing Chair is waiting to welcome
              you home. Crafted with rugged, timeless elegance and engineered for a perfectly
              effortless sway, it invites you to kick off your boots, breathe in the open air,
              and let the motion set your pace.
            </p>

            {/* CTAs */}
            <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Button
                variant="primary"
                size="md"
                asChild
                className="w-full sm:w-auto"
              >
                <Link href="/collections">
                  <span>Explore The Collection</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>

              <Button
                variant="secondary"
                size="md"
                asChild
                className="w-full sm:w-auto bg-espresso-rich text-canvas-linen hover:bg-espresso-rich/90 hover:text-white border-espresso-rich"
              >
                <a
                  href={b2bWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Commercial &amp; B2B</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="pt-2 grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="flex flex-col space-y-1 bg-surface-cream/80 p-2.5 sm:p-3 rounded-lg border border-border-subtle shadow-2xs">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-primary-container" />
                <span className="font-sans font-semibold text-xs sm:text-sm text-espresso-rich">
                  1-Year
                </span>
                <span className="text-[10px] uppercase tracking-wider text-neutral-mineral font-medium">
                  Weatherproof Warranty
                </span>
              </div>

              <div className="flex flex-col space-y-1 bg-surface-cream/80 p-2.5 sm:p-3 rounded-lg border border-border-subtle shadow-2xs">
                <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-primary-container" />
                <span className="font-sans font-semibold text-xs sm:text-sm text-espresso-rich">
                  White-Glove
                </span>
                <span className="text-[10px] uppercase tracking-wider text-neutral-mineral font-medium">
                  Delivery &amp; Setup
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase (Strict 1:1 Aspect Ratio) */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <div className="relative w-full aspect-square max-w-[calc(100svh-var(--header-height)-48px)] xl:max-w-[560px] rounded-xl overflow-hidden shadow-ambient bg-surface-container border border-border-subtle/80">
              <Image
                src={HERO_FEATURED.image}
                alt={HERO_FEATURED.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso-rich/50 via-transparent to-transparent pointer-events-none" />

              {/* Bottom Floating Architecture Card */}
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 p-3.5 sm:p-4 rounded-lg bg-surface-card/95 backdrop-blur-md shadow-floating border border-border-subtle/60 flex items-center justify-between gap-3">
                <div className="space-y-0.5 min-w-0">
                  <span className="text-[10px] text-terracotta-rich uppercase tracking-wider font-semibold block">
                    {HERO_FEATURED.badge}
                  </span>
                  <span className="font-serif text-sm sm:text-base lg:text-lg font-semibold text-espresso-rich block truncate">
                    {HERO_FEATURED.title}
                  </span>
                  <span className="text-xs text-neutral-mineral block truncate">
                    {HERO_FEATURED.subtitle} •{" "}
                    <span className="font-medium text-espresso-rich">
                      {HERO_FEATURED.price}
                    </span>
                  </span>
                </div>

                <Link
                  href={`/product/${HERO_FEATURED.slug}`}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary-container text-surface-card flex items-center justify-center hover:bg-moss-deep transition-all shadow-md shrink-0 cursor-pointer"
                  aria-label="View The Solstice Cocoon Egg"
                >
                  <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
              </div>
            </div>

            {/* Decorative Floating Review Element */}
            <div className="hidden sm:flex absolute -top-3 -left-3 bg-surface-card p-2.5 sm:p-3 rounded-xl shadow-floating border border-border-subtle/70 flex-col gap-0.5 z-20">
              <div className="flex text-terracotta-soft">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3.5 h-3.5 fill-current text-terracotta-soft"
                  />
                ))}
              </div>
              <span className="font-sans text-xs sm:text-sm font-semibold text-espresso-rich leading-none">
                {HERO_FEATURED.rating}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

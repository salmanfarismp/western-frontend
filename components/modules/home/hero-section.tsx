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
    <section className="relative w-full overflow-hidden bg-canvas-linen py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Editorial Headline & Narrative */}
          <div className="lg:col-span-6 flex flex-col space-y-6 z-10">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-[54px] font-semibold text-espresso-rich leading-[1.15] tracking-tight">
              Crafted for Quiet Moments &amp; Gentle Breezes
            </h1>

            <p className="font-sans text-base sm:text-lg text-neutral-mineral leading-relaxed max-w-xl">
              Surrender to the slow rhythm of the afternoon. When the sun hangs low and
              golden light spills across the deck, the WesternSwing Chair is waiting to welcome
              you home. Crafted with rugged, timeless elegance and engineered for a perfectly
              effortless sway, it invites you to kick off your boots, breathe in the open air,
              and let the motion set your pace.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <Button
                variant="primary"
                size="lg"
                asChild
                className="w-full sm:w-auto"
              >
                <Link href="#products">
                  <span>Explore The Collection</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>

              <Button
                variant="secondary"
                size="lg"
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
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="flex flex-col space-y-1 bg-surface-cream/80 p-3 rounded-lg border border-border-subtle shadow-2xs">
                <ShieldCheck className="w-5 h-5 text-primary-container" />
                <span className="font-sans font-semibold text-sm text-espresso-rich">
                  1-Year
                </span>
                <span className="text-[10px] uppercase tracking-wider text-neutral-mineral font-medium">
                  Weatherproof Warranty
                </span>
              </div>

              <div className="flex flex-col space-y-1 bg-surface-cream/80 p-3 rounded-lg border border-border-subtle shadow-2xs">
                <Truck className="w-5 h-5 text-primary-container" />
                <span className="font-sans font-semibold text-sm text-espresso-rich">
                  White-Glove
                </span>
                <span className="text-[10px] uppercase tracking-wider text-neutral-mineral font-medium">
                  Delivery &amp; Setup
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden shadow-ambient bg-surface-container border border-border-subtle/80">
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
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 p-4 rounded-lg bg-surface-card/95 backdrop-blur-md shadow-floating border border-border-subtle/60 flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="text-[10px] text-terracotta-rich uppercase tracking-wider font-semibold block">
                    {HERO_FEATURED.badge}
                  </span>
                  <span className="font-serif text-base sm:text-lg font-semibold text-espresso-rich block">
                    {HERO_FEATURED.title}
                  </span>
                  <span className="text-xs text-neutral-mineral block">
                    {HERO_FEATURED.subtitle} •{" "}
                    <span className="font-medium text-espresso-rich">
                      {HERO_FEATURED.price}
                    </span>
                  </span>
                </div>

                <Link
                  href="#products"
                  className="w-10 h-10 rounded-full bg-primary-container text-surface-card flex items-center justify-center hover:bg-moss-deep transition-all shadow-md shrink-0 cursor-pointer"
                  aria-label="View The Solstice Cocoon Egg"
                >
                  <ArrowUpRight className="w-5 h-5" />
                </Link>
              </div>
            </div>

            {/* Decorative Floating Review Element */}
            <div className="hidden sm:flex absolute -top-4 -left-4 bg-surface-card p-3.5 rounded-xl shadow-floating border border-border-subtle/70 flex-col gap-1 z-20">
              <div className="flex text-terracotta-soft">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3.5 h-3.5 fill-current text-terracotta-soft"
                  />
                ))}
              </div>
              <span className="font-sans text-sm font-semibold text-espresso-rich leading-none">
                {HERO_FEATURED.rating}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

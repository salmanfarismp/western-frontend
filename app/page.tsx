"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  COLOR_PALETTE,
  TYPOGRAPHY_PRESETS,
  type ColorToken,
} from "@/types/design-tokens";
import {
  Sparkles,
  ShoppingBag,
  ArrowRight,
  Heart,
  Search,
  Check,
  Copy,
  SlidersHorizontal,
  Compass,
  Layers,
  Palette,
  Type,
  SquareDashedMousePointer,
  Tag,
  ShieldCheck,
} from "lucide-react";

export default function DesignSystemShowcase() {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    "all" | "colors" | "typography" | "buttons" | "badges" | "inputs" | "elevation"
  >("all");
  const [sampleInputValue, setSampleInputValue] = useState("Handwoven Natural Rattan");
  const [errorInputValue, setErrorInputValue] = useState("invalid-postal-code");

  const handleCopy = (token: ColorToken) => {
    navigator.clipboard.writeText(token.hex);
    setCopiedToken(token.name);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const categories = [
    { key: "canvas-surface", label: "Canvas & Surfaces" },
    { key: "brand-earth", label: "Brand & Earth Tones" },
    { key: "materials-accents", label: "Materials & Accents" },
    { key: "system", label: "Status & System" },
  ] as const;

  return (
    <div className="min-h-screen bg-canvas-linen text-espresso-rich">
      {/* Header Banner */}
      <header className="border-b border-border-subtle bg-surface-cream/70 backdrop-blur-sm sticky top-0 z-30 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary-container text-surface-card flex items-center justify-center font-serif text-lg font-semibold shadow-sm">
              W
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-title-lg tracking-tight text-espresso-rich">
                  Western Living
                </h1>
                <Badge variant="botanical" size="sm" dot>
                  Design Tokens v1.0
                </Badge>
              </div>
              <p className="text-xs text-neutral-mineral">
                Warm Natural Outdoor Living Architectural Design System
              </p>
            </div>
          </div>

          {/* Quick Navigation Tabs */}
          <nav className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {(
              [
                { id: "all", label: "Overview", icon: Layers },
                { id: "colors", label: "Palette", icon: Palette },
                { id: "typography", label: "Typography", icon: Type },
                { id: "buttons", label: "Buttons", icon: SquareDashedMousePointer },
                { id: "badges", label: "Badges", icon: Tag },
                { id: "inputs", label: "Inputs", icon: SlidersHorizontal },
                { id: "elevation", label: "Elevation", icon: Compass },
              ] as const
            ).map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150 whitespace-nowrap ${
                    isActive
                      ? "bg-espresso-rich text-canvas-linen shadow-sm"
                      : "text-neutral-mineral hover:text-espresso-rich hover:bg-surface-cream"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Hero Atmosphere Section */}
      <section className="border-b border-border-subtle bg-gradient-to-b from-surface-cream/40 to-canvas-linen py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="terracotta">EDITORIAL SPECIFICATION</Badge>
              <Badge variant="material">TACTILE MINIMALISM</Badge>
            </div>
            <h2 className="font-display-hero text-espresso-rich mb-6">
              Slow Outdoor Living, Curated Sanctuaries.
            </h2>
            <p className="font-body-lg text-neutral-mineral leading-relaxed mb-8">
              Balancing organic textures with high-end editorial refinement.
              Anchored by grounding botanical sage (<span className="font-medium text-espresso-rich">#627361</span>),
              deep espresso silhouettes (<span className="font-medium text-espresso-rich">#251B17</span>),
              warm linen canvas (<span className="font-medium text-espresso-rich">#FAF8F5</span>),
              and sunbaked terracotta accents (<span className="font-medium text-espresso-rich">#D99377</span>).
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button
                variant="primary"
                leftIcon={<ShoppingBag className="w-4 h-4" />}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Explore Living Primitives
              </Button>
              <Button variant="secondary">Download Design Tokens</Button>
              <Button variant="tertiary" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                Read Lookbook Editorial
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
        {/* Section 1: Color Palette */}
        {(activeTab === "all" || activeTab === "colors") && (
          <section id="colors" className="space-y-8 scroll-mt-24">
            <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-border-subtle pb-4 gap-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Palette className="w-5 h-5 text-primary-container" />
                  <h3 className="font-headline-md font-serif text-espresso-rich">
                    Color Architecture & Swatches
                  </h3>
                </div>
                <p className="text-sm text-neutral-mineral">
                  Warm sun-dappled foundations replacing cold digital whites with organic tactile tones.
                </p>
              </div>
              <span className="text-xs font-mono text-neutral-mineral bg-surface-cream px-2.5 py-1 rounded-full border border-border-subtle">
                {COLOR_PALETTE.length} Tokens Defined
              </span>
            </div>

            <div className="space-y-10">
              {categories.map((cat) => {
                const tokens = COLOR_PALETTE.filter(
                  (t) => t.category === cat.key
                );
                if (tokens.length === 0) return null;

                return (
                  <div key={cat.key} className="space-y-4">
                    <h4 className="text-xs font-semibold uppercase tracking-[0.06em] text-neutral-mineral">
                      {cat.label}
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {tokens.map((token) => {
                        const isCopied = copiedToken === token.name;
                        return (
                          <div
                            key={token.name}
                            onClick={() => handleCopy(token)}
                            className="group relative bg-surface-card rounded-DEFAULT border border-border-subtle p-3 shadow-ambient hover:shadow-floating transition-all duration-200 cursor-pointer overflow-hidden"
                          >
                            {/* Color preview block */}
                            <div
                              className="w-full h-24 rounded-sm border border-black/5 mb-3 transition-transform duration-200 group-hover:scale-[1.02] relative flex items-end justify-end p-2"
                              style={{ backgroundColor: token.hex }}
                            >
                              <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-espresso-rich/80 backdrop-blur-xs text-canvas-linen text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                                {isCopied ? (
                                  <>
                                    <Check className="w-3 h-3 text-emerald-300" />
                                    <span>Copied</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3 h-3" />
                                    <span>Copy Hex</span>
                                  </>
                                )}
                              </div>
                            </div>

                            {/* Token Info */}
                            <div className="space-y-1">
                              <div className="flex items-center justify-between">
                                <span className="font-mono text-xs font-semibold text-espresso-rich truncate">
                                  {token.name}
                                </span>
                                <span className="font-mono text-xs text-neutral-mineral uppercase">
                                  {token.hex}
                                </span>
                              </div>
                              <p className="text-[11px] text-neutral-mineral line-clamp-2 leading-relaxed">
                                {token.description}
                              </p>
                              <div className="pt-1.5 border-t border-border-subtle/50 flex items-center justify-between text-[10px] font-mono text-neutral-mineral/80">
                                <span>{token.variable}</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Section 2: Typography Hierarchy */}
        {(activeTab === "all" || activeTab === "typography") && (
          <section id="typography" className="space-y-8 scroll-mt-24">
            <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-border-subtle pb-4 gap-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Type className="w-5 h-5 text-primary-container" />
                  <h3 className="font-headline-md font-serif text-espresso-rich">
                    Typographical Scales & Editorial Pairing
                  </h3>
                </div>
                <p className="text-sm text-neutral-mineral">
                  High-contrast gravitas of <span className="font-serif font-semibold">Playfair Display</span> alongside ergonomic clarity of <span className="font-semibold">Plus Jakarta Sans</span>.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="material">Serif: Playfair Display</Badge>
                <Badge variant="botanical">Sans: Plus Jakarta Sans</Badge>
              </div>
            </div>

            <div className="bg-surface-card rounded-DEFAULT border border-border-subtle divide-y divide-border-subtle shadow-ambient overflow-hidden">
              {TYPOGRAPHY_PRESETS.map((preset) => (
                <div
                  key={preset.name}
                  className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center hover:bg-surface-cream/30 transition-colors"
                >
                  {/* Preset Meta */}
                  <div className="lg:col-span-4 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-espresso-rich">
                        {preset.name}
                      </span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                          preset.fontFamily === "Playfair Display"
                            ? "bg-sand-tint/70 text-espresso-rich"
                            : "bg-[#e5f8e1] text-moss-deep"
                        }`}
                      >
                        {preset.fontFamily}
                      </span>
                    </div>
                    <div className="text-xs font-mono text-neutral-mineral space-x-3">
                      <span>{preset.fontSize}</span>
                      <span>•</span>
                      <span>LH: {preset.lineHeight}</span>
                      <span>•</span>
                      <span>W: {preset.fontWeight}</span>
                      {preset.letterSpacing && (
                        <>
                          <span>•</span>
                          <span>LS: {preset.letterSpacing}</span>
                        </>
                      )}
                    </div>
                    <code className="text-[11px] text-primary-container font-mono block">
                      .{preset.className}
                    </code>
                  </div>

                  {/* Preset Live Preview */}
                  <div className="lg:col-span-8 overflow-x-auto py-1">
                    <p className={`${preset.className} text-espresso-rich break-words`}>
                      {preset.sampleText}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 3: Buttons */}
        {(activeTab === "all" || activeTab === "buttons") && (
          <section id="buttons" className="space-y-8 scroll-mt-24">
            <div className="border-b border-border-subtle pb-4">
              <div className="flex items-center gap-2 mb-1">
                <SquareDashedMousePointer className="w-5 h-5 text-primary-container" />
                <h3 className="font-headline-md font-serif text-espresso-rich">
                  Interactive Button Primitives
                </h3>
              </div>
              <p className="text-sm text-neutral-mineral">
                Built with Class Variance Authority (CVA), tailwind-merge, and tactile micro-interactions.
              </p>
            </div>

            {/* Variants Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Primary */}
              <div className="bg-surface-card rounded-DEFAULT border border-border-subtle p-6 space-y-4 shadow-ambient">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-sm text-espresso-rich">
                    Primary CTA (Organic Sage)
                  </h4>
                  <Badge variant="botanical" size="sm">
                    Solid #627361
                  </Badge>
                </div>
                <p className="text-xs text-neutral-mineral">
                  Solid sage container with white typography, 8px radius, subtle hover transition to moss-deep (#475546).
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Button variant="primary" size="md">
                    Primary Button
                  </Button>
                  <Button
                    variant="primary"
                    size="md"
                    leftIcon={<ShoppingBag className="w-4 h-4" />}
                  >
                    Add to Sanctuary
                  </Button>
                  <Button variant="primary" size="md" isLoading>
                    Loading
                  </Button>
                  <Button variant="primary" size="md" disabled>
                    Disabled
                  </Button>
                </div>
              </div>

              {/* Secondary */}
              <div className="bg-surface-card rounded-DEFAULT border border-border-subtle p-6 space-y-4 shadow-ambient">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-sm text-espresso-rich">
                    Secondary Button (Espresso Outline)
                  </h4>
                  <Badge variant="material" size="sm">
                    1.5px Solid #251B17
                  </Badge>
                </div>
                <p className="text-xs text-neutral-mineral">
                  Transparent base with espresso text and 1.5px border. Inverts gracefully to espresso fill and linen text on hover.
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Button variant="secondary" size="md">
                    Secondary Button
                  </Button>
                  <Button
                    variant="secondary"
                    size="md"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    View Lookbook
                  </Button>
                  <Button variant="secondary" size="md" disabled>
                    Disabled
                  </Button>
                </div>
              </div>

              {/* Tertiary / Link */}
              <div className="bg-surface-card rounded-DEFAULT border border-border-subtle p-6 space-y-4 shadow-ambient">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-sm text-espresso-rich">
                    Tertiary / Editorial Link
                  </h4>
                  <Badge variant="outline" size="sm">
                    Animated Underline
                  </Badge>
                </div>
                <p className="text-xs text-neutral-mineral">
                  Plain espresso text with an animated 1px underline that expands smoothly from left to right on hover.
                </p>
                <div className="flex flex-wrap items-center gap-6 pt-4">
                  <Button variant="tertiary">Discover Curated Stories</Button>
                  <Button
                    variant="tertiary"
                    rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                  >
                    Explore Materials
                  </Button>
                  <Button
                    variant="tertiary"
                    leftIcon={<Sparkles className="w-3.5 h-3.5" />}
                  >
                    Design Consultation
                  </Button>
                </div>
              </div>

              {/* Floating / Icon */}
              <div className="bg-surface-card rounded-DEFAULT border border-border-subtle p-6 space-y-4 shadow-ambient">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-sm text-espresso-rich">
                    Floating / Icon Action
                  </h4>
                  <Badge variant="terracotta" size="sm">
                    Warm Ambient Shadow
                  </Badge>
                </div>
                <p className="text-xs text-neutral-mineral">
                  Pure white rounded circular surface with espresso ambient shadow for wishlist triggers and quick actions.
                </p>
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Button variant="icon" size="icon" aria-label="Add to Wishlist">
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Button variant="icon" size="icon" aria-label="Search Collection">
                    <Search className="w-4 h-4" />
                  </Button>
                  <Button variant="icon" size="icon" aria-label="Explore Filters">
                    <SlidersHorizontal className="w-4 h-4" />
                  </Button>
                  <Button variant="icon" size="icon" disabled aria-label="Disabled Action">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Size Scale Demo */}
            <div className="bg-surface-card rounded-DEFAULT border border-border-subtle p-6 shadow-ambient space-y-4">
              <h4 className="font-semibold text-sm text-espresso-rich">
                Button Size Hierarchy
              </h4>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="primary" size="sm">
                  Small (32px)
                </Button>
                <Button variant="primary" size="md">
                  Medium Base (44px / Spec)
                </Button>
                <Button variant="primary" size="lg">
                  Large Hero (48px)
                </Button>
                <Button variant="icon" size="icon">
                  <ShoppingBag className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* Section 4: Badges */}
        {(activeTab === "all" || activeTab === "badges") && (
          <section id="badges" className="space-y-8 scroll-mt-24">
            <div className="border-b border-border-subtle pb-4">
              <div className="flex items-center gap-2 mb-1">
                <Tag className="w-5 h-5 text-primary-container" />
                <h3 className="font-headline-md font-serif text-espresso-rich">
                  Artisanal Pill Badges & Chips
                </h3>
              </div>
              <p className="text-sm text-neutral-mineral">
                Set in <code className="text-xs font-mono">label-caption</code> (11px, 500 weight, 0.06em tracking, uppercase) with fully rounded edges.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Botanical */}
              <div className="bg-surface-card rounded-DEFAULT border border-border-subtle p-6 space-y-3 shadow-ambient">
                <span className="font-semibold text-sm text-espresso-rich">
                  Natural Botanical
                </span>
                <p className="text-xs text-neutral-mineral leading-relaxed">
                  Pale sage background with #475546 deep moss text for organic and sustainability tags.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Badge variant="botanical" dot>
                    Handwoven
                  </Badge>
                  <Badge variant="botanical" icon={<ShieldCheck className="w-3 h-3" />}>
                    Eco-Certified Teak
                  </Badge>
                  <Badge variant="botanical" size="sm">
                    In Stock
                  </Badge>
                </div>
              </div>

              {/* Terracotta */}
              <div className="bg-surface-card rounded-DEFAULT border border-border-subtle p-6 space-y-3 shadow-ambient">
                <span className="font-semibold text-sm text-espresso-rich">
                  Terracotta Accent
                </span>
                <p className="text-xs text-neutral-mineral leading-relaxed">
                  #D99377 at 15% opacity with #C2795B text for curated curation and seasonal releases.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Badge variant="terracotta" dot>
                    Best Seller
                  </Badge>
                  <Badge variant="terracotta">
                    Limited Edition
                  </Badge>
                  <Badge variant="terracotta" icon={<Sparkles className="w-3 h-3" />}>
                    New Release
                  </Badge>
                </div>
              </div>

              {/* Material Specs */}
              <div className="bg-surface-card rounded-DEFAULT border border-border-subtle p-6 space-y-3 shadow-ambient">
                <span className="font-semibold text-sm text-espresso-rich">
                  Material Specifications
                </span>
                <p className="text-xs text-neutral-mineral leading-relaxed">
                  #E8DEC8 sand tint with rich espresso text for architectural material callouts.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Badge variant="material">Solid Teak</Badge>
                  <Badge variant="material">Sunbrella® Fabric</Badge>
                  <Badge variant="material" dot>
                    All-Weather Wicker
                  </Badge>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Section 5: Inputs */}
        {(activeTab === "all" || activeTab === "inputs") && (
          <section id="inputs" className="space-y-8 scroll-mt-24">
            <div className="border-b border-border-subtle pb-4">
              <div className="flex items-center gap-2 mb-1">
                <SlidersHorizontal className="w-5 h-5 text-primary-container" />
                <h3 className="font-headline-md font-serif text-espresso-rich">
                  Form Input Primitives
                </h3>
              </div>
              <p className="text-sm text-neutral-mineral">
                Linen-toned background (#FAF8F5), 1px border-subtle (#E4DDD3), rich espresso value text, and sage green focus ring (#627361).
              </p>
            </div>

            <div className="bg-surface-card rounded-DEFAULT border border-border-subtle p-6 sm:p-8 shadow-ambient">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Standard with Placeholder */}
                <div className="space-y-2">
                  <Input
                    label="Search Sanctuaries & Furniture"
                    placeholder="E.g., Teak Dining Table, Egg Chair..."
                    leftIcon={<Search className="w-4 h-4" />}
                    hint="Search our catalog of handcrafted patio pieces"
                  />
                </div>

                {/* Filled State */}
                <div className="space-y-2">
                  <Input
                    label="Custom Material Specification"
                    value={sampleInputValue}
                    onChange={(e) => setSampleInputValue(e.target.value)}
                    hint="Changes take effect immediately"
                    rightIcon={<Check className="w-4 h-4 text-primary-container" />}
                  />
                </div>

                {/* Error State */}
                <div className="space-y-2">
                  <Input
                    label="Delivery Postal Code"
                    value={errorInputValue}
                    onChange={(e) => setErrorInputValue(e.target.value)}
                    error="Please enter a valid 5-digit postal code for freight estimation"
                  />
                </div>

                {/* Disabled State */}
                <div className="space-y-2">
                  <Input
                    label="Member Discount Tier"
                    value="Architectural Trade Partner (15% Off)"
                    disabled
                    hint="Managed by your concierge account representative"
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Section 6: Elevation & Surface Layers */}
        {(activeTab === "all" || activeTab === "elevation") && (
          <section id="elevation" className="space-y-8 scroll-mt-24">
            <div className="border-b border-border-subtle pb-4">
              <div className="flex items-center gap-2 mb-1">
                <Compass className="w-5 h-5 text-primary-container" />
                <h3 className="font-headline-md font-serif text-espresso-rich">
                  Warm Ambient Elevation & Depth
                </h3>
              </div>
              <p className="text-sm text-neutral-mineral">
                Subtle warm espresso shadows evoking natural afternoon sun on veranda surfaces instead of artificial cool gray drop-shadows.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Ambient Default */}
              <div className="bg-surface-card p-8 rounded-DEFAULT border border-border-subtle shadow-ambient space-y-4 relative">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-lg font-semibold text-espresso-rich">
                    Ambient Shadow (Resting State)
                  </h4>
                  <Badge variant="botanical">box-shadow: 0 10px 30px -4px</Badge>
                </div>
                <p className="text-xs text-neutral-mineral leading-relaxed">
                  Formula: <code className="font-mono text-[11px] block mt-1 p-2 bg-canvas-linen rounded border border-border-subtle">
                    0 10px 30px -4px rgba(37, 27, 23, 0.05),<br />
                    0 4px 12px -2px rgba(37, 27, 23, 0.03)
                  </code>
                </p>
                <div className="p-4 bg-canvas-linen rounded border border-border-subtle/70 text-xs text-neutral-mineral">
                  Layered on linen canvas to isolate product cards and interactive components with an organic touch.
                </div>
              </div>

              {/* Floating Elevated */}
              <div className="bg-surface-card p-8 rounded-DEFAULT border border-border-subtle shadow-floating space-y-4 relative transition-transform hover:-translate-y-1 duration-300">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-lg font-semibold text-espresso-rich">
                    Floating Depth (Interactive & Modal)
                  </h4>
                  <Badge variant="terracotta">box-shadow: 0 20px 40px -6px</Badge>
                </div>
                <p className="text-xs text-neutral-mineral leading-relaxed">
                  Formula: <code className="font-mono text-[11px] block mt-1 p-2 bg-canvas-linen rounded border border-border-subtle">
                    0 20px 40px -6px rgba(37, 27, 23, 0.09),<br />
                    0 8px 16px -4px rgba(37, 27, 23, 0.04)
                  </code>
                </p>
                <div className="p-4 bg-canvas-linen rounded border border-border-subtle/70 text-xs text-neutral-mineral">
                  Applied to dropdown menus, floating action buttons, elevated cart drawers, and hover states.
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border-subtle bg-surface-cream/50 py-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-mineral">
          <div className="flex items-center gap-2">
            <span className="font-serif font-semibold text-espresso-rich">
              Western Living
            </span>
            <span>—</span>
            <span>Design Token Architecture strictly compliant with design/design.md</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Playfair Display</span>
            <span>•</span>
            <span>Plus Jakarta Sans</span>
            <span>•</span>
            <span>Tailwind CSS v4</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

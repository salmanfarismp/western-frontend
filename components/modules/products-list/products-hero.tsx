import React from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import type { ProductCategory } from "@/types/home";
import type { ProductCategoryRow } from "@/types/database";

interface ProductsHeroProps {
  activeCategory: ProductCategory;
  categories?: ProductCategoryRow[];
  totalModels?: number;
}

interface CategoryEditorial {
  eyebrow: string;
  title: string;
  description: string;
}

function getCategoryEditorial(category: string, activeRow?: ProductCategoryRow): CategoryEditorial {
  const cat = category.toLowerCase();

  if (cat.includes("single")) {
    return {
      eyebrow: "Single Cocoon Silhouettes",
      title: "Solitary Reading Sanctuaries & Single Egg Swings",
      description:
        "Ergonomically contoured hanging nest chairs hand-strung with high-density UV polyethylene wicker. Engineered for apartment balconies, cozy veranda corners, and tranquil garden reading nooks up to 350 lbs.",
    };
  }

  if (cat.includes("double")) {
    return {
      eyebrow: "Two-Person Veranda Cocoons",
      title: "Double Loveseat Swings & Twilight Loungers",
      description:
        "Generously proportioned two-person cocoons featuring dual suspension points, marine alloy frames, and deep all-weather Olefin cushions. Designed for shared evenings up to 550 lbs.",
    };
  }

  if (cat.includes("swing-bed") || cat.includes("bed") || cat.includes("daybed") || cat.includes("three")) {
    return {
      eyebrow: "Architectural Teak Sanctuary Beds",
      title: "Three-Seater Swings & Solid Teak Daybeds",
      description:
        "Full 78-inch daybed porch swings handcrafted from Indonesian FSC-certified Grade-A teak with traditional mortise-and-tenon joinery. Includes four-point marine rigging hardware rated to 800 lbs.",
    };
  }

  if (cat.includes("accessories") || cat.includes("stands")) {
    return {
      eyebrow: "Structural Rigging & Essentials",
      title: "Heavy-Duty Stands, Silencer Springs & Hardware",
      description:
        "Rust-inhibited powder-coated structural steel cantilever stands, silicone-damped zero-squeak springs, nautical ropes, and tailored all-weather protective covers.",
    };
  }

  return {
    eyebrow: activeRow?.nick_name || "Curated Sanctuary Collection",
    title: activeRow?.name ? `${activeRow.name} Collection` : "Fine-Crafted Outdoor Swings & Porch Daybeds",
    description:
      activeRow?.nick_name ||
      "Fine crafted outdoor nests engineered with marine-grade hardware, hand-woven UV resin fibers, and kiln-dried FSC teak for years of unhurried mornings.",
  };
}

export function ProductsHero({
  activeCategory,
  categories,
  totalModels = 28,
}: ProductsHeroProps) {
  const activeRow = categories?.find(
    (c) =>
      c.slug === activeCategory ||
      (activeCategory && c.slug && activeCategory.includes(c.slug)) ||
      String(c.id) === activeCategory,
  );

  const editorial = getCategoryEditorial(activeCategory, activeRow);

  const filterTabs = [
    { label: "All Swings", href: "/collections", value: "all" },
    ...(categories && categories.length > 0
      ? categories.map((c) => ({
          label: c.nick_name || c.name || "Category",
          href: `/collections?category=${c.slug || c.id}`,
          value: (c.slug || String(c.id)) as ProductCategory,
        }))
      : [
          { label: "Single Swings", href: "/collections?category=single-swing-chair", value: "single-swing-chair" as ProductCategory },
          { label: "Double Swings", href: "/collections?category=double-swing-chair", value: "double-swing-chair" as ProductCategory },
          { label: "Three Seater Swings", href: "/collections?category=swing-bed", value: "swing-bed" as ProductCategory },
          { label: "Accessories", href: "/collections?category=swing-chair-accessories", value: "swing-chair-accessories" as ProductCategory },
        ]),
  ];

  return (
    <section
      aria-labelledby="collection-hero-heading"
      className="relative w-full bg-surface-container-low overflow-hidden px-4 sm:px-6 lg:px-8 py-7 sm:py-9 border-b border-border-subtle/50"
    >
      {/* Ambient background glows */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-sand-tint/25 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full bg-moss-light/15 blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Headline & Editorial Intro + Stat Badge */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 sm:gap-6">
          <div className="max-w-2xl">
            {/* Eyebrow Label */}
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-block w-6 h-[1.5px] bg-primary" />
              <span className="font-sans text-[11px] uppercase tracking-widest text-primary font-bold">
                {editorial.eyebrow}
              </span>
            </div>

            {/* H1 Heading */}
            <h1
              id="collection-hero-heading"
              className="font-serif text-3xl sm:text-4xl lg:text-[42px] text-espresso-rich font-semibold tracking-tight leading-tight"
            >
              {editorial.title}
            </h1>

            {/* Subtitle Description */}
            <p className="font-sans text-sm sm:text-base text-on-surface-variant mt-2 max-w-xl leading-relaxed">
              {editorial.description}
            </p>
          </div>

          {/* Right Stat & Warranty Badge */}
          <div className="flex items-center gap-4 bg-surface-card/85 backdrop-blur-md px-5 py-3 rounded-xl shadow-sm border border-border-subtle/60 self-start md:self-auto shrink-0">
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold text-primary leading-none">
                {totalModels}
              </span>
              <span className="font-sans text-[10px] uppercase tracking-wider text-neutral-mineral font-semibold mt-1">
                Models Available
              </span>
            </div>
            <div className="w-[1px] h-8 bg-border-subtle" />
            <div className="flex items-center gap-1.5 text-moss-deep">
              <ShieldCheck className="w-5 h-5 text-moss-deep shrink-0" />
              <span className="font-sans text-xs sm:text-sm font-semibold tracking-tight">
                1-Yr All-Weather Warranty
              </span>
            </div>
          </div>
        </div>

        {/* Crawlable Semantic Category Filter Navigation */}
        <nav
          aria-label="Category Navigation"
          className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto py-2 mt-5 sm:mt-7 scrollbar-none whitespace-nowrap"
        >
          {filterTabs.map((filter) => {
            const isActive =
              activeCategory === filter.value ||
              (activeCategory && filter.value !== "all" && (activeCategory.includes(filter.value) || filter.value.includes(activeCategory)));

            return (
              <Link
                key={filter.value}
                href={filter.href}
                scroll={false}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-[13px] transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-primary text-on-primary shadow-sm font-semibold"
                    : "bg-surface-card hover:bg-surface-container text-espresso-rich font-medium border border-border-subtle/70 hover:border-primary/40"
                }`}
              >
                {filter.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </section>
  );
}

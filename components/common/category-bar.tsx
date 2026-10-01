import Link from "next/link";
import type { ProductCategory } from "@/types/home";
import type { ProductCategoryRow } from "@/types/database";

interface CategoryBarProps {
  activeCategory?: ProductCategory;
  categories?: ProductCategoryRow[];
}

export function CategoryBar({ activeCategory, categories }: CategoryBarProps) {
  const dynamicLinks = categories && categories.length > 0
    ? [
        { label: "All Swings", href: "/collections", category: "all" },
        ...categories.map((c) => ({
          label: c.name || "Category",
          href: `/collections?category=${c.slug}`,
          category: c.slug || String(c.id),
        })),
      ]
    : [
        { label: "All Swings", href: "/collections?category=all", category: "all" },
        { label: "Single Swings", href: "/collections?category=single-swing-chair", category: "single-swing-chair" },
        { label: "Double Swings", href: "/collections?category=double-swing-chair", category: "double-swing-chair" },
        { label: "Three Seater Swings", href: "/collections?category=swing-bed", category: "swing-bed" },
        { label: "Accessories", href: "/collections?category=swing-chair-accessories", category: "swing-chair-accessories" },
      ];

  const navLinks: { label: string; href: string; category?: ProductCategory }[] = [
    ...dynamicLinks,
    { label: "Inspiration & Lookbook", href: "/#lookbook" },
    { label: "About Us", href: "/#footer" },
  ];

  return (
    <div className="w-full h-11 border-b border-border-subtle hidden md:block bg-surface-bright/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <nav className="flex items-center justify-center space-x-8 h-full">
          {navLinks.map((link) => {
            const isActive = activeCategory && link.category === activeCategory;

            return (
              <Link
                key={link.label}
                href={link.href}
                className={`h-full flex items-center text-xs uppercase tracking-[0.06em] transition-all border-b-2 ${
                  isActive
                    ? "font-bold text-primary-container border-primary-container"
                    : "font-semibold text-espresso-rich hover:text-primary-container border-transparent hover:border-primary-container"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

import Link from "next/link";
import type { ProductCategory } from "@/types/home";

interface CategoryBarProps {
  activeCategory?: ProductCategory;
}

export function CategoryBar({ activeCategory }: CategoryBarProps) {
  const navLinks: { label: string; href: string; category?: ProductCategory }[] = [
    { label: "All Swings", href: "/collections?category=all", category: "all" },
    { label: "Single Swings", href: "/collections?category=single", category: "single" },
    { label: "Double Swings", href: "/collections?category=double", category: "double" },
    { label: "Three Seater Swings", href: "/collections?category=daybed", category: "daybed" },
    { label: "Accessories", href: "/collections?category=stands", category: "stands" },
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

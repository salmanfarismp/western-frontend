"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingBag, Menu, X, CircleUserRound } from "lucide-react";
import { useCart } from "@/context/cart-context";

interface NavbarProps {
  cartCount?: number;
  onCartClick?: () => void;
  onSearch?: (query: string) => void;
  showSearch?: boolean;
}

export function Navbar({
  cartCount: propCartCount,
  onCartClick: propOnCartClick,
  onSearch,
  showSearch,
}: NavbarProps) {
  const { cartCount: liveCartCount, openCart } = useCart();
  const cartCount = propCartCount !== undefined ? propCartCount : liveCartCount;
  const onCartClick = propOnCartClick || openCart;

  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) onSearch(searchQuery);
  };

  const navLinks = [
    { label: "All Swings", href: "/collections?category=all" },
    { label: "Single Swings", href: "/collections?category=single" },
    { label: "Double Swings", href: "/collections?category=double" },
    { label: "Three Seater Swings", href: "/collections?category=swingbed" },
    { label: "Accessories", href: "/collections?category=stands" },
    { label: "Inspiration & Lookbook", href: "/#lookbook" },
    { label: "About Us", href: "/#footer" },
  ];

  return (
    <header className="sticky top-0 left-0 w-full z-40 bg-surface-card/95 backdrop-blur-md border-b border-border-subtle/60  transition-all">
      {/* Main Top Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 sm:h-20 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 -ml-2 text-espresso-rich hover:bg-surface-cream rounded-md transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>

            <Link href="/" className="flex items-center gap-2.5 group">
              <Image
                src="/icon.svg"
                alt="Westernswings Icon"
                width={36}
                height={36}
                className="h-9 w-9 object-contain shrink-0 transition-transform"
                priority
              />
              <span className="font-serif text-xl sm:text-2xl font-semibold tracking-tight text-espresso-rich  transition-colors">
                Westernswings
              </span>
            </Link>
          </div>
          {showSearch && (
            <form
              onSubmit={handleSearchSubmit}
              className="hidden lg:flex flex-1 max-w-md mx-6"
            >
              <div className="relative w-full">
                <Search className="w-4 h-4 text-neutral-mineral absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search hand-woven porch & garden swings..."
                  className="w-full  pl-10 pr-4 py-2 rounded-lg border border-border-subtle text-sm text-espresso-rich placeholder:text-neutral-mineral/70 focus:outline-none focus:ring-1 focus:ring-primary-container focus:border-primary-container transition-all shadow-xs"
                />
              </div>
            </form>
          )}
          {/* Desktop Search Bar */}

          {/* User & Cart Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Design System Link for Convenience */}

            {/* Cart Trigger */}
            <button
              onClick={onCartClick}
              aria-label="Shopping Cart"
              className="relative p-2.5 text-espresso-rich hover:bg-surface-cream rounded-full transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5 text-espresso-rich" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-primary-container text-surface-card text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-surface-card">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Profile Avatar */}
            <div className="w-8 h-8 rounded-full  flex items-center justify-center font-medium text-xs text-espresso-rich">
              <CircleUserRound className="w-5 h-5 text-espresso-rich" />
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Subnavigation Menu with definite height h-11 */}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border-subtle bg-surface-card px-4 pt-3 pb-6 space-y-4 shadow-xl animate-fadeIn">
          {/* Mobile Search */}
          <div className="relative w-full">
            <Search className="w-4 h-4 text-neutral-mineral absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              placeholder="Search hand-woven swings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-canvas-linen pl-9 pr-3 py-2 text-sm rounded-DEFAULT border border-border-subtle text-espresso-rich"
            />
          </div>

          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 text-sm font-medium text-espresso-rich hover:bg-surface-cream rounded-md transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

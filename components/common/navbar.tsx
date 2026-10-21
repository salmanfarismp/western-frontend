"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Search,
  ShoppingBag,
  Menu,
  X,
  CircleUserRound,
  LogOut,
  User as UserIcon,
  Package,
  Loader2,
  ArrowRight,
} from "lucide-react";
import { useCart } from "@/context/cart-context";
import { useAuth } from "@/context/auth-context";

interface SearchResultItem {
  id: string;
  slug?: string;
  name: string;
  category: string;
  subtitle?: string;
  price: number;
  originalPrice?: number;
  image: string;
  alt: string;
  badge?: {
    text: string;
    variant: "botanical" | "terracotta" | "material" | "outline";
  };
}

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
  const router = useRouter();
  const { cartCount: liveCartCount, openCart } = useCart();
  const { user, displayName, avatarUrl, openAuthModal, signOut } = useAuth();
  const cartCount = propCartCount !== undefined ? propCartCount : liveCartCount;
  const onCartClick = propOnCartClick || openCart;

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResultItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const userMenuRef = useRef<HTMLDivElement>(null);
  const desktopSearchRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);

  // Close user dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (userMenuRef.current && !userMenuRef.current.contains(target)) {
        setUserMenuOpen(false);
      }
      if (
        desktopSearchRef.current &&
        !desktopSearchRef.current.contains(target) &&
        mobileSearchRef.current &&
        !mobileSearchRef.current.contains(target)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle Escape key to close dropdown or mobile search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsDropdownOpen(false);
        setMobileSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Focus mobile input when toggled open
  useEffect(() => {
    if (mobileSearchOpen) {
      setTimeout(() => mobileInputRef.current?.focus(), 80);
    }
  }, [mobileSearchOpen]);

  // Live Autocomplete search with debounce
  useEffect(() => {
    const query = searchQuery.trim();
    if (!query) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}&limit=5`);
        if (res.ok) {
          const data = await res.json();
          setSearchResults(data.products || []);
          setIsDropdownOpen(true);
        }
      } catch (err) {
        console.error("Autocomplete search error:", err);
      } finally {
        setIsSearching(false);
      }
    }, 280);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSearchSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const query = searchQuery.trim();
      if (!query) return;

      setIsDropdownOpen(false);
      setMobileSearchOpen(false);

      if (onSearch) {
        onSearch(query);
      } else {
        router.push(`/collections?search=${encodeURIComponent(query)}`);
      }
    },
    [searchQuery, onSearch, router]
  );

  const handleSelectProduct = () => {
    setIsDropdownOpen(false);
    setMobileSearchOpen(false);
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
    <header className="sticky top-0 left-0 w-full z-40 bg-surface-card/95 backdrop-blur-md border-b border-border-subtle/60 transition-all">
      {/* Main Top Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 sm:h-20 flex items-center justify-between gap-4">
          {/* Brand Logo & Mobile Menu Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                setMobileSearchOpen(false);
              }}
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
              <span className="font-serif text-xl sm:text-2xl font-semibold tracking-tight text-espresso-rich transition-colors">
                Westernswings
              </span>
            </Link>
          </div>

          {/* Desktop Search Bar with Live Autocomplete Dropdown */}
          {showSearch && (
            <div
              ref={desktopSearchRef}
              className="hidden lg:flex flex-1 max-w-md mx-6 relative"
            >
              <form onSubmit={handleSearchSubmit} className="relative w-full">
                <Search className="w-4 h-4 text-neutral-mineral absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (!isDropdownOpen && e.target.value.trim()) {
                      setIsDropdownOpen(true);
                    }
                  }}
                  onFocus={() => {
                    if (searchQuery.trim()) setIsDropdownOpen(true);
                  }}
                  placeholder="Search hand-woven porch & garden swings..."
                  className="w-full pl-10 pr-9 py-2 rounded-xl border border-border-subtle text-sm text-espresso-rich placeholder:text-neutral-mineral/70 focus:outline-none focus:ring-2 focus:ring-primary-container/30 focus:border-primary-container transition-all shadow-xs bg-surface-card"
                />
                {isSearching ? (
                  <Loader2 className="w-4 h-4 text-primary-container animate-spin absolute right-3.5 top-1/2 -translate-y-1/2" />
                ) : searchQuery ? (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setSearchResults([]);
                      setIsDropdownOpen(false);
                    }}
                    className="p-1 rounded-full text-neutral-mineral hover:text-espresso-rich hover:bg-surface-cream absolute right-2.5 top-1/2 -translate-y-1/2 transition-colors cursor-pointer"
                    aria-label="Clear search input"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                ) : null}
              </form>

              {/* Autocomplete Dropdown */}
              {isDropdownOpen && searchQuery.trim().length > 0 && (
                <div className="absolute top-full mt-2 w-full bg-surface-card rounded-2xl border border-border-subtle shadow-2xl p-2.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                  {isSearching && searchResults.length === 0 ? (
                    <div className="p-6 text-center text-xs text-neutral-mineral flex items-center justify-center gap-2">
                      <Loader2 className="w-4 h-4 text-primary-container animate-spin" />
                      <span>Searching...</span>
                    </div>
                  ) : searchResults.length > 0 ? (
                    <div className="space-y-1.5">
                      <div className="px-2.5 py-1 text-[11px] font-semibold text-neutral-mineral uppercase tracking-wider flex items-center justify-between">
                        <span>Matching Swings</span>
                        <span>{searchResults.length} found</span>
                      </div>
                      <div className="divide-y divide-border-subtle/50 max-h-80 overflow-y-auto">
                        {searchResults.map((product) => (
                          <Link
                            key={product.id}
                            href={`/product/${product.slug || product.id}`}
                            onClick={handleSelectProduct}
                            className="flex items-center gap-3 p-2 rounded-xl hover:bg-surface-cream transition-colors group cursor-pointer"
                          >
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-surface-cream border border-border-subtle shrink-0">
                              <Image
                                src={product.image}
                                alt={product.alt || product.name}
                                fill
                                sizes="48px"
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold text-espresso-rich group-hover:text-primary transition-colors truncate">
                                {product.name}
                              </p>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-[10px] font-medium text-neutral-mineral capitalize">
                                  {product.category.replace(/-/g, " ")}
                                </span>
                                <span className="text-[10px] text-border-subtle">•</span>
                                <span className="text-xs font-bold text-espresso-rich">
                                  ₹{product.price.toLocaleString("en-IN")}
                                </span>
                                {product.originalPrice && product.originalPrice > product.price && (
                                  <span className="text-[10px] text-neutral-mineral/70 line-through">
                                    ₹{product.originalPrice.toLocaleString("en-IN")}
                                  </span>
                                )}
                              </div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-neutral-mineral opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0" />
                          </Link>
                        ))}
                      </div>

                      <div className="pt-2 border-t border-border-subtle/80">
                        <button
                          type="button"
                          onClick={handleSearchSubmit}
                          className="w-full py-2 px-3 text-xs font-semibold text-primary hover:bg-surface-cream rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <span>View all results for &ldquo;{searchQuery.trim()}&rdquo;</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-6 text-center space-y-1.5">
                      <p className="text-xs font-semibold text-espresso-rich">
                        No swings found for &ldquo;{searchQuery.trim()}&rdquo;
                      </p>
                      <p className="text-[11px] text-neutral-mineral">
                        Try checking your spelling or searching by category like &ldquo;single&rdquo;, &ldquo;double&rdquo;, or &ldquo;daybed&rdquo;.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* User & Cart Actions */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Mobile Search Toggle Button */}
            {showSearch && (
              <button
                onClick={() => {
                  setMobileSearchOpen(!mobileSearchOpen);
                  setMobileMenuOpen(false);
                }}
                aria-label="Search Swings"
                className={`lg:hidden p-2 text-espresso-rich rounded-full transition-colors cursor-pointer ${
                  mobileSearchOpen ? "bg-surface-cream text-primary" : "hover:bg-surface-cream"
                }`}
              >
                <Search className="w-5 h-5" />
              </button>
            )}

            {/* Cart Trigger */}
            <button
              onClick={onCartClick}
              aria-label="Shopping Cart"
              className="relative p-2 text-espresso-rich hover:bg-surface-cream rounded-full transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5 text-espresso-rich" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-primary-container text-surface-card text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-surface-card">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Profile */}
            <div className="relative" ref={userMenuRef}>
              <button
                type="button"
                onClick={() => {
                  if (user) {
                    setUserMenuOpen((prev) => !prev);
                  } else {
                    openAuthModal({
                      title: "Sign In to Westernswings",
                      description: "Sign in to view your orders!",
                    });
                  }
                }}
                aria-label="User Account"
                className="relative p-2 text-espresso-rich hover:bg-surface-cream rounded-full transition-colors cursor-pointer flex items-center justify-center"
              >
                <CircleUserRound className="w-5 h-5 text-espresso-rich" />
              </button>

              {/* User Dropdown Menu */}
              {userMenuOpen && user && (
                <div className="absolute right-0 mt-2 w-64 bg-surface-card rounded-2xl border border-border-subtle shadow-xl p-3 z-50 space-y-2 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-2 border-b border-border-subtle/80 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full overflow-hidden bg-surface-cream border border-border-subtle shrink-0 flex items-center justify-center">
                      {avatarUrl ? (
                        <Image
                          src={avatarUrl}
                          alt={displayName}
                          width={36}
                          height={36}
                          className="w-full h-full object-cover"
                          unoptimized
                        />
                      ) : (
                        <UserIcon className="w-5 h-5 text-espresso-rich" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-espresso-rich truncate">
                        {displayName}
                      </p>
                      <p className="text-[11px] text-neutral-mineral truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <div className="pt-1 space-y-1">
                    <Link
                      href="/orders"
                      onClick={() => setUserMenuOpen(false)}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-espresso-rich hover:bg-surface-cream rounded-xl transition-colors cursor-pointer"
                    >
                      <Package className="w-4 h-4 text-primary-container" />
                      <span>My Orders & Deliveries</span>
                    </Link>

                    <button
                      type="button"
                      onClick={async () => {
                        setUserMenuOpen(false);
                        await signOut();
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50/80 rounded-xl transition-colors cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Expandable Mobile Search Bar with Dropdown (Directly beneath Navbar) */}
      {showSearch && mobileSearchOpen && (
        <div
          ref={mobileSearchRef}
          className="lg:hidden border-t border-border-subtle/80 bg-surface-card px-4 py-3 shadow-lg animate-in slide-in-from-top-2 duration-200"
        >
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <Search className="w-4 h-4 text-neutral-mineral absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              ref={mobileInputRef}
              type="search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (!isDropdownOpen && e.target.value.trim()) {
                  setIsDropdownOpen(true);
                }
              }}
              placeholder="Search hand-woven swings..."
              className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-border-subtle text-sm text-espresso-rich placeholder:text-neutral-mineral/70 focus:outline-none focus:ring-2 focus:ring-primary-container/30 focus:border-primary-container transition-all shadow-xs bg-surface-cream/50"
            />
            {isSearching ? (
              <Loader2 className="w-4 h-4 text-primary-container animate-spin absolute right-3.5 top-1/2 -translate-y-1/2" />
            ) : searchQuery ? (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSearchResults([]);
                  setIsDropdownOpen(false);
                }}
                className="p-1 rounded-full text-neutral-mineral hover:text-espresso-rich hover:bg-surface-cream absolute right-2.5 top-1/2 -translate-y-1/2 transition-colors cursor-pointer"
                aria-label="Clear search input"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            ) : null}
          </form>

          {/* Mobile Autocomplete Results */}
          {isDropdownOpen && searchQuery.trim().length > 0 && (
            <div className="mt-2 bg-surface-card rounded-2xl border border-border-subtle shadow-xl p-2.5 space-y-1.5 animate-in fade-in duration-150">
              {isSearching && searchResults.length === 0 ? (
                <div className="p-4 text-center text-xs text-neutral-mineral flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 text-primary-container animate-spin" />
                  <span>Searching...</span>
                </div>
              ) : searchResults.length > 0 ? (
                <>
                  <div className="px-2 py-1 text-[10px] font-semibold text-neutral-mineral uppercase tracking-wider flex items-center justify-between">
                    <span>Results</span>
                    <span>{searchResults.length} found</span>
                  </div>
                  <div className="divide-y divide-border-subtle/50 max-h-64 overflow-y-auto">
                    {searchResults.map((product) => (
                      <Link
                        key={product.id}
                        href={`/product/${product.slug || product.id}`}
                        onClick={handleSelectProduct}
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-surface-cream transition-colors group cursor-pointer"
                      >
                        <div className="relative w-11 h-11 rounded-lg overflow-hidden bg-surface-cream border border-border-subtle shrink-0">
                          <Image
                            src={product.image}
                            alt={product.alt || product.name}
                            fill
                            sizes="44px"
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-espresso-rich truncate">
                            {product.name}
                          </p>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="text-[10px] text-neutral-mineral capitalize">
                              {product.category.replace(/-/g, " ")}
                            </span>
                            <span className="text-[10px] text-border-subtle">•</span>
                            <span className="text-xs font-bold text-espresso-rich">
                              ₹{product.price.toLocaleString("en-IN")}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="pt-2 border-t border-border-subtle/80">
                    <button
                      type="button"
                      onClick={handleSearchSubmit}
                      className="w-full py-2 px-3 text-xs font-semibold text-primary hover:bg-surface-cream rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>View all results for &ldquo;{searchQuery.trim()}&rdquo;</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </>
              ) : (
                <div className="p-4 text-center text-xs text-neutral-mineral">
                  No swings found matching &ldquo;{searchQuery.trim()}&rdquo;
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border-subtle bg-surface-card px-4 pt-3 pb-6 space-y-4 shadow-xl animate-fadeIn">
          {/* Mobile User Status */}
          {user ? (
            <div className="space-y-2">
              <div className="p-3 bg-surface-cream/60 rounded-xl border border-border-subtle/80 flex items-center justify-between">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-surface-card border border-border-subtle shrink-0 flex items-center justify-center">
                    {avatarUrl ? (
                      <Image
                        src={avatarUrl}
                        alt={displayName}
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                        unoptimized
                      />
                    ) : (
                      <CircleUserRound className="w-5 h-5 text-espresso-rich" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-espresso-rich truncate">
                      {displayName}
                    </p>
                    <p className="text-[10px] text-neutral-mineral truncate">
                      {user.email}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={async () => {
                    setMobileMenuOpen(false);
                    await signOut();
                  }}
                  className="text-xs font-semibold text-red-600 hover:text-red-700 px-2 py-1 rounded-md cursor-pointer"
                >
                  Sign Out
                </button>
              </div>

              <Link
                href="/orders"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2.5 text-xs font-semibold text-espresso-rich bg-surface-cream/40 rounded-xl border border-border-subtle hover:bg-surface-cream transition-colors"
              >
                <Package className="w-4 h-4 text-primary-container" />
                <span>My Orders & Deliveries</span>
              </Link>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                openAuthModal({
                  title: "Sign In to Westernswings",
                  description:
                    "Sign in with Google to view your orders and track deliveries.",
                  nextUrl: "/orders",
                });
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-surface-cream text-espresso-rich border border-border-subtle text-xs font-semibold hover:bg-surface-cream/80 transition-colors"
            >
              <CircleUserRound className="w-4 h-4 text-primary-container" />
              <span>Sign In / My Orders</span>
            </button>
          )}

          {/* Navigation Links */}
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

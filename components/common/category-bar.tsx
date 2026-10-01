import Link from "next/link";

export default function CategoryBar() {
  const navLinks = [
    { label: "Single Swings", href: "#products" },
    { label: "Double Swings", href: "#products" },
    { label: "Three Seater Swings", href: "#products" },
    { label: "Accessories", href: "#products" },
    { label: "Inspiration & Lookbook", href: "#lookbook" },
    { label: "About Us", href: "#story" },
  ];

  return (
    <div className="w-full h-11 border-b border-border-subtle  hidden md:block bg-surface-bright/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <nav className="flex items-center justify-center space-x-8 h-full">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="h-full flex items-center text-xs uppercase tracking-[0.06em] font-semibold text-espresso-rich hover:text-primary-container border-b-2 border-transparent hover:border-primary-container transition-all"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}

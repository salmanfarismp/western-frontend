import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone } from "lucide-react";

export function Footer() {
  const paymentMethods = ["Visa", "Mastercard", "Amex", "Apple Pay"];

  return (
    <footer className="w-full bg-surface-cream border-t border-border-subtle pt-12 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Main Footer Row */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-10 border-b border-border-subtle/80">
          {/* Brand Info */}
          <div className="max-w-xl space-y-3">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <Image
                src="/icon.svg"
                alt="Westernswings Icon"
                width={32}
                height={32}
                className="h-8 w-8 object-contain shrink-0 transition-transform group-hover:scale-105"
              />
              <span className="font-serif text-2xl font-semibold tracking-tight text-espresso-rich">
                Westernswings
              </span>
            </Link>
            <p className="font-sans text-sm text-neutral-mineral leading-relaxed">
              Fine crafted outdoor nests engineered with marine-grade hardware,
              hand-woven UV resin fibers, and kiln-dried FSC teak for years of
              unhurried mornings.
            </p>
          </div>

          {/* Location & Telephone Contact */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3 text-sm">
            <div className="flex items-center gap-2 text-neutral-mineral">
              <MapPin className="w-4 h-4 text-primary-container shrink-0" />
              <span>Ayisha Complex, Panamaram, Wayanad-670721, Kerala</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-primary-container shrink-0" />
              <a
                href="tel:+916238473506"
                className="font-semibold text-espresso-rich hover:text-primary-container transition-colors"
              >
                +91 6238473506
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Disclosures & Payment Methods */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-mineral text-center md:text-left">
          <p>© 2026 Westernswings. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-2">
            <span className="uppercase tracking-wider font-semibold text-[10px] text-neutral-mineral/80 mr-1">
              Secure Checkout:
            </span>
            {paymentMethods.map((method) => (
              <span
                key={method}
                className="bg-surface-card text-espresso-rich font-semibold px-2.5 py-1 rounded border border-border-subtle shadow-2xs text-[11px]"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

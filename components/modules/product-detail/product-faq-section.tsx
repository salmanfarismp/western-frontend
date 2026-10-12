import React from "react";
import { getProductFaqs } from "@/lib/seo/product-schema";
import type { ProductDetailData } from "@/lib/data/product-detail-data";
import type { FaqItem } from "@/types/faq";
import { HelpCircle, ChevronDown } from "lucide-react";

interface ProductFaqSectionProps {
  product: ProductDetailData;
  faqs?: FaqItem[];
}

export function ProductFaqSection({ product, faqs: customFaqs }: ProductFaqSectionProps) {
  const faqs = customFaqs && customFaqs.length > 0 ? customFaqs : getProductFaqs(product);

  return (
    <section
      id="product-faq"
      aria-labelledby="product-faq-heading"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-14 w-full"
    >
      <div className="bg-surface-card rounded-2xl border border-border-subtle/80 p-5 sm:p-7 lg:p-10 shadow-ambient">
        {/* Section Heading */}
        <div className="mb-8 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-moss-deep text-xs font-semibold uppercase tracking-wider mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Specifications &amp; Installation FAQ</span>
          </div>
          <h2
            id="product-faq-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-serif text-espresso-rich tracking-tight font-normal"
          >
            Frequently Asked Questions
          </h2>
          <p className="font-sans text-xs sm:text-sm text-neutral-mineral mt-2 leading-relaxed">
            Direct specifications regarding {product.name} suspension hardware, weight limits, and weather resilience.
          </p>
        </div>

        {/* Semantic Q&A Accordion (SSR Accessible Details/Summary) */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={faq.id ?? index}
              className="group bg-surface-cream/50 rounded-xl border border-border-subtle p-5 sm:p-6 transition-all shadow-2xs open:shadow-ambient open:border-primary-container/40"
            >
              <summary className="flex items-center justify-between cursor-pointer list-none font-serif text-base sm:text-lg font-semibold text-espresso-rich group-hover:text-primary-container transition-colors select-none gap-4">
                <span>{faq.question}</span>
                <span className="shrink-0 w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-espresso-rich group-open:rotate-180 transition-transform duration-300">
                  <ChevronDown className="w-4 h-4" />
                </span>
              </summary>
              <div className="mt-4 pt-4 border-t border-border-subtle/50 text-neutral-mineral font-sans text-sm sm:text-base leading-relaxed">
                <p>{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>

        {/* Custom Order / Concierge Assistance */}
        <div className="mt-8 pt-6 border-t border-border-subtle/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h3 className="font-serif text-base font-semibold text-espresso-rich">
              Need custom hanging chain length or rafter mounting advice?
            </h3>
            <p className="font-sans text-xs text-neutral-mineral mt-0.5">
              Our Wayanad craftsmen can customize rope lengths and hardware kits for unique porch heights.
            </p>
          </div>
          <a
            href={`https://wa.me/916238473506?text=${encodeURIComponent(
              `Hello Westernswings, I have a technical question regarding ${product.name}.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-5 py-2.5 rounded-full bg-espresso-rich text-canvas-linen hover:bg-espresso-rich/90 text-xs font-semibold tracking-wide transition-all shadow-sm"
          >
            Chat with Craftsman
          </a>
        </div>
      </div>
    </section>
  );
}

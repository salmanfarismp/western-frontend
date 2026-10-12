import React from "react";
import type { FaqItem } from "@/types/faq";
import { getFaqs } from "@/lib/api/faq";
import { HelpCircle, ChevronDown } from "lucide-react";

export interface FaqSectionProps {
  faqs?: FaqItem[];
  badge?: string;
  title?: string;
  subtitle?: string;
  id?: string;
  className?: string;
}

export async function FaqSection({
  faqs: initialFaqs,
  badge = "Buyer Guide & Specifications",
  title = "Frequently Asked Questions",
  subtitle = "Direct answers regarding our materials engineering, weight capacities, rafter installation, and weatherproofing standards.",
  id = "faq",
  className = "",
}: FaqSectionProps) {
  const faqs = initialFaqs ?? (await getFaqs());

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`w-full bg-surface-cream py-14 sm:py-20 border-t border-border-subtle ${className}`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-moss-deep text-xs font-semibold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{badge}</span>
          </div>
          <h2
            id={`${id}-heading`}
            className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-espresso-rich tracking-tight"
          >
            {title}
          </h2>
          <p className="font-sans text-sm sm:text-base text-neutral-mineral mt-2.5 max-w-xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Semantic Q&A Accordion (SSR Accessible Details/Summary) */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={faq.id ?? index}
              className="group bg-surface-card rounded-xl border border-border-subtle p-5 sm:p-6 transition-all shadow-ambient open:shadow-floating open:border-primary-container/40"
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

        {/* Direct Contact Prompt for Custom & Commercial Queries */}
        <div className="mt-10 p-6 rounded-xl bg-surface-card border border-border-subtle/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h3 className="font-serif text-base sm:text-lg font-semibold text-espresso-rich">
              Need custom measurements or ceiling rafter guidance?
            </h3>
            <p className="font-sans text-xs sm:text-sm text-neutral-mineral mt-0.5">
              Our Wayanad craftsmen and installation consultants are ready to assist.
            </p>
          </div>
          <a
            href="https://wa.me/916238473506?text=Hello%20Westernswings%2C%20I%20have%20a%20question%20about%20outdoor%20swings."
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-5 py-2.5 rounded-full bg-espresso-rich text-canvas-linen hover:bg-espresso-rich/90 text-xs font-semibold tracking-wide transition-all shadow-sm"
          >
            Chat with Concierge
          </a>
        </div>
      </div>
    </section>
  );
}

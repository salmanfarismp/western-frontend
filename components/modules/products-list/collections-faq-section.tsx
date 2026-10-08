import React from "react";
import { COLLECTIONS_FAQS } from "@/lib/seo/collections-schema";
import { HelpCircle, ChevronDown } from "lucide-react";

export function CollectionsFaqSection() {
  return (
    <section
      id="collections-faq"
      aria-labelledby="collections-faq-heading"
      className="w-full bg-surface-cream py-14 sm:py-18 border-t border-border-subtle"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-moss-deep text-xs font-semibold uppercase tracking-wider mb-2.5">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Porch &amp; Veranda Buying Guide</span>
          </div>
          <h2
            id="collections-faq-heading"
            className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-espresso-rich tracking-tight"
          >
            Swing Sizing, Mounting &amp; Care Advice
          </h2>
          <p className="font-sans text-sm sm:text-base text-neutral-mineral mt-2 max-w-xl mx-auto leading-relaxed">
            Essential specifications to consider before purchasing your handcrafted outdoor swing or suspension stand.
          </p>
        </div>

        {/* Semantic Q&A Accordion (SSR Accessible Details/Summary) */}
        <div className="space-y-4">
          {COLLECTIONS_FAQS.map((faq, index) => (
            <details
              key={index}
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

        {/* Support Strip */}
        <div className="mt-10 p-6 rounded-xl bg-surface-card border border-border-subtle/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h3 className="font-serif text-base sm:text-lg font-semibold text-espresso-rich">
              Unsure about weight ratings or mounting hardware?
            </h3>
            <p className="font-sans text-xs sm:text-sm text-neutral-mineral mt-0.5">
              Contact our Wayanad installation consultants for personalized veranda recommendations.
            </p>
          </div>
          <a
            href="https://wa.me/916238473506?text=Hello%20Westernswings%2C%20I%20have%20questions%20about%20selecting%20an%20outdoor%20swing."
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-5 py-2.5 rounded-full bg-espresso-rich text-canvas-linen hover:bg-espresso-rich/90 text-xs font-semibold tracking-wide transition-all shadow-sm"
          >
            Ask a Specialist
          </a>
        </div>
      </div>
    </section>
  );
}

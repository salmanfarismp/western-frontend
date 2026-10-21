import React from "react";
import type { FaqItem } from "@/types/faq";
import { FaqSection } from "@/components/common/faq-section";

export interface CollectionsFaqSectionProps {
  faqs?: FaqItem[];
}

export function CollectionsFaqSection({ faqs }: CollectionsFaqSectionProps = {}) {
  return (
    <FaqSection
      id="collections-faq"
      faqs={faqs}
      badge="Porch & Veranda Buying Guide"
      title="Swing Sizing, Mounting & Care Advice"
      subtitle="Essential specifications to consider before purchasing your swing chairs or suspension stand."
    />
  );
}

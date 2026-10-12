import { siteConfig } from "@/lib/config/site";
import type { Product } from "@/types/home";
import type { ProductCategoryRow } from "@/types/database";

export interface CollectionsFaqItem {
  question: string;
  answer: string;
}

export const COLLECTIONS_FAQS: CollectionsFaqItem[] = [
  {
    question: "How do I choose between a single cocoon egg chair and a double loveseat swing?",
    answer:
      "Single egg chairs are designed for compact balconies, reading nooks, and solitary relaxation, measuring roughly 95-105cm wide and supporting up to 350 lbs (160 kg). Double loveseat swings offer an expansive 130-150cm seating width for two adults, supporting up to 550 lbs (250 kg) with dual suspension points.",
  },
  {
    question: "Can Westernswings outdoor swings be suspended directly from ceiling rafters or concrete ceilings?",
    answer:
      "Yes. Every swing arrives with hardware compatible with structural wooden rafters, steel pergola beams, or concrete ceiling drop-in anchor bolts.Dampened silencer springs prevent squeaks and absorb dynamic weight shock smoothly.",
  },
  {
    question: "What is the difference between hanging chains and nautical suspension ropes?",
    answer:
      "Galvanized marine chains offer industrial tensile endurance with quick-link height adjustability. High-tensile nautical ropes provide a softer, tactile organic look with UV light inhibitors to eliminate fraying and weather rot.",
  },
  {
    question: "Are freestanding arched stands stable outdoors during high winds?",
    answer:
      "Yes. Our freestanding cantilever stands feature heavy-gauge tubular structural steel and a wide circular footprint. Engineered with a low center of gravity and tested to over 600 lbs dynamic capacity, they remain rock-steady on patios, pool decks, and lawns.",
  },
  {
    question: "How do I clean and care for all-weather PE wicker and Olefin cushions?",
    answer:
      "PE wicker can be rinsed with a garden hose and wiped down with mild soap. The quick-dry Olefin cushion covers feature hidden zippers that remove easily for gentle cold-water washing, while the foam interior resists water retention and mildew.",
  },
];

interface CollectionsStructuredDataParams {
  categorySlug?: string;
  categoryRow?: ProductCategoryRow | null;
  products: Product[];
}

export function generateCollectionsStructuredData({
  categorySlug,
  categoryRow,
  products,
}: CollectionsStructuredDataParams) {
  const isFiltered = categorySlug && categorySlug !== "all";
  const categoryName =
    categoryRow?.name ||
    (isFiltered
      ? categorySlug
          .replace(/-/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase())
      : "All Outdoor Swings");
  const collectionUrl = isFiltered
    ? `${siteConfig.url}/collections?category=${encodeURIComponent(categorySlug)}`
    : `${siteConfig.url}/collections`;

  const collectionDescription =
    categoryRow?.nick_name ||
    "Curated collection of fine handcrafted outdoor swings, hanging cocoon egg chairs, and luxury teak patio daybeds.";

  // 1. CollectionPage Schema
  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${collectionUrl}/#collection`,
    url: collectionUrl,
    name: `${categoryName} | Westernswings Collection`,
    description: collectionDescription,
    isPartOf: {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      name: siteConfig.name,
      url: siteConfig.url,
    },
    breadcrumb: {
      "@id": `${collectionUrl}/#breadcrumbs`,
    },
  };

  // 2. BreadcrumbList Schema
  const breadcrumbElements: Array<{
    "@type": string;
    position: number;
    name: string;
    item: string;
  }> = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: siteConfig.url,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Collections",
      item: `${siteConfig.url}/collections`,
    },
  ];

  if (isFiltered) {
    breadcrumbElements.push({
      "@type": "ListItem",
      position: 3,
      name: categoryName,
      item: collectionUrl,
    });
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${collectionUrl}/#breadcrumbs`,
    itemListElement: breadcrumbElements,
  };

  // 3. ItemList Schema for Products
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${collectionUrl}/#itemlist`,
    name: `${categoryName} Catalog`,
    description: collectionDescription,
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => {
      const productSlug = product.slug || product.id;
      const productUrl = `${siteConfig.url}/product/${productSlug}`;

      return {
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          "@id": productUrl,
          url: productUrl,
          name: product.name,
          description: product.description || product.subtitle,
          image: product.image || siteConfig.ogImage,
          brand: {
            "@type": "Brand",
            name: siteConfig.name,
          },
          offers: {
            "@type": "Offer",
            url: productUrl,
            priceCurrency: siteConfig.currency,
            price: product.price,
            priceValidUntil: "2027-12-31",
            availability: "https://schema.org/InStock",
            itemCondition: "https://schema.org/NewCondition",
            seller: {
              "@id": `${siteConfig.url}/#organization`,
            },
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: product.rating || 5.0,
            reviewCount: product.reviewsCount || 80,
            bestRating: 5,
            worstRating: 1,
          },
        },
      };
    }),
  };

  // 4. FAQPage Schema for Buying Guide
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${collectionUrl}/#faq`,
    mainEntity: COLLECTIONS_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return [collectionPageSchema, breadcrumbSchema, itemListSchema, faqSchema];
}

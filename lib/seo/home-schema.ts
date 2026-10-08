import { siteConfig } from "@/lib/config/site";
import type { Product } from "@/types/home";

export interface HomeFaqItem {
  question: string;
  answer: string;
}

export const HOME_FAQS: HomeFaqItem[] = [
  {
    question: "Are Westernswings outdoor swings truly weatherproof in heavy rain and coastal sun?",
    answer:
      "Yes. Every Westernswings piece is engineered for 365-day outdoor exposure. We utilize high-density polyethylene (PE) UV-stabilized rattan rated for 3,000+ hours of direct sun, aerospace-grade powder-coated steel with dual-layer zinc rust primer, and breathable Olefin cushions that shed moisture and drain in under 20 minutes.",
  },
  {
    question: "What are the weight capacities for single, double, and daybed swings?",
    answer:
      "Single Cocoon Egg Swings support up to 350 lbs (160 kg). Double Loveseat Swings support up to 550 lbs (250 kg). Our solid teak three-seater Sanctuary Daybeds support up to 800 lbs (360 kg) with four-point marine rigging hardware.",
  },
  {
    question: "What mounting hardware and suspension accessories are included?",
    answer:
      "Each order arrives complete with high-tensile nautical suspension ropes or galvanized marine chains, silicone-damped zero-squeak springs, stainless-steel carabiners/shackles, and deep Olefin tufted cushions. Freestanding arched stands can also be selected.",
  },
  {
    question: "Do you offer white-glove delivery and porch installation?",
    answer:
      "Yes. We provide complimentary white-glove delivery across Kerala and insured shipping across India. Our team delivers directly to your veranda and can inspect ceiling rafters and assemble freestanding stands.",
  },
  {
    question: "Where is Westernswings furniture handcrafted?",
    answer:
      "Westernswings is based in Wayanad, Kerala (Ayisha Complex, Panamaram). Our collections combine regional artisanal handweaving, mortise-and-tenon FSC teak wood joinery, and modern structural engineering.",
  },
  {
    question: "How do I maintain the all-weather wicker, teak, and cushions?",
    answer:
      "Rinse synthetic rattan with fresh water and mild soap. Cushion slipcovers unzip for gentle cold machine washing. Solid teak develops a natural silvery patina or can be treated with natural teak oil once a year to maintain its golden hue.",
  },
];

export function generateHomeStructuredData(products: Product[]) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "FurnitureStore",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: `${siteConfig.url}/icon.svg`,
    image: siteConfig.ogImage,
    description: siteConfig.description,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    priceRange: "₹₹₹",
    currenciesAccepted: "INR",
    paymentAccepted: "Cash, Credit Card, UPI, Net Banking",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.address.streetAddress,
      addressLocality: siteConfig.contact.address.addressLocality,
      addressRegion: siteConfig.contact.address.addressRegion,
      postalCode: siteConfig.contact.address.postalCode,
      addressCountry: siteConfig.contact.address.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.contact.geo.latitude,
      longitude: siteConfig.contact.geo.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "09:00",
        closes: "20:00",
      },
    ],
    sameAs: [
      siteConfig.social.instagram,
      siteConfig.social.facebook,
      siteConfig.social.pinterest,
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.tagline,
    publisher: {
      "@id": `${siteConfig.url}/#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/collections?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${siteConfig.url}/#featured-products`,
    name: "Westernswings Signature Masterpieces",
    description: "Curated handcrafted luxury outdoor swings and patio daybeds",
    numberOfItems: products.length,
    itemListElement: products.slice(0, 8).map((product, index) => {
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
          image: product.image,
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
            reviewCount: product.reviewsCount || 100,
            bestRating: 5,
            worstRating: 1,
          },
        },
      };
    }),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${siteConfig.url}/#faq`,
    mainEntity: HOME_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return [organizationSchema, websiteSchema, itemListSchema, faqSchema];
}

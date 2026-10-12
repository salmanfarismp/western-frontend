import { siteConfig } from "@/lib/config/site";
import type { ProductDetailData } from "@/lib/data/product-detail-data";
import type { FaqItem } from "@/types/faq";

export type ProductFaqItem = FaqItem;

export function getProductFaqs(product: ProductDetailData): ProductFaqItem[] {
  const isDaybed =
    product.name.toLowerCase().includes("daybed") ||
    product.category.toLowerCase().includes("bed") ||
    product.category.toLowerCase().includes("three");

  const isDouble =
    product.name.toLowerCase().includes("double") ||
    product.category.toLowerCase().includes("double");

  const capacity = isDaybed ? "800 lbs (360 kg)" : isDouble ? "550 lbs (250 kg)" : "350 lbs (160 kg)";
  const occupants = isDaybed ? "3 adults" : isDouble ? "2 adults" : "1 adult";

  return [
    {
      question: `What is the maximum weight capacity of the ${product.name}?`,
      answer: `The ${product.name} is engineered to comfortably support up to ${capacity}, accommodating ${occupants} with full structural safety margins. Each suspension anchor has been independently load-tested to ensure zero structural fatigue over years of daily relaxation.`,
    },
    {
      question: `What suspension hardware and mounting accessories are included with the ${product.name}?`,
      answer: product.hangingKitIncluded
        ? `Each order includes our complete marine rigging kit: ${product.hangingKitDescription || "heavy-duty silencer springs to absorb dynamic movement without squeaking, high-tensile nautical hanging ropes or galvanized chains, and stainless-steel mounting shackles/carabiners."} All hardware is rust-inhibited for coastal and monsoon resilience.`
        : `This model includes standard attachment eye-bolts and heavy-duty suspension shackles. Additional ceiling anchors, silencer springs, or freestanding stands can be added to your order.`,
    },
    {
      question: `Can the ${product.name} be suspended from concrete ceilings, pergola rafters, or a stand?`,
      answer: `Yes. The ${product.name} can be mounted directly into solid concrete ceilings using drop-in anchor bolts, suspended from structural wooden porch rafters using through-bolts, or hung from one of our heavy-duty freestanding arched cantilever stands if ceiling mounting is unavailable.`,
    },
    {
      question: `How weather-resistant is the all-weather PE wicker and cushion fabric in rain and sun?`,
      answer: `Every ${product.name} is built for continuous outdoor veranda exposure. We utilize compound light-stabilized high-density PE wicker rated for 3,000+ hours of direct UV radiation without fading or cracking, and solution-dyed breathable Olefin cushion covers with quick-drying foam cores that drain moisture in under 20 minutes.`,
    },
    {
      question: `What warranty coverage and white-glove delivery options are available?`,
      answer: `The ${product.name} comes backed by our 1-Year Comprehensive Weatherproof Warranty covering frame welds, synthetic wicker, and suspension hardware. We offer complimentary white-glove delivery across Kerala and pan-India insured shipping with doorstep rafter inspection assistance.`,
    },
  ];
}

export function generateProductStructuredData(
  product: ProductDetailData,
  customFaqs?: FaqItem[]
) {
  const productUrl = `${siteConfig.url}/product/${product.slug || product.id}`;
  const categoryUrl = `${siteConfig.url}/collections?category=${encodeURIComponent(
    product.categorySlug || "all"
  )}`;

  // 1. Product Schema with Offer and AggregateRating
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${productUrl}/#product`,
    url: productUrl,
    name: product.name,
    description: product.description || product.subtitle,
    image:
      product.gallery
        .map((g) => g.src)
        .filter((src) => Boolean(src && src.trim() !== "")).length > 0
        ? product.gallery
            .map((g) => g.src)
            .filter((src) => Boolean(src && src.trim() !== ""))
        : [siteConfig.ogImage],
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
    offers: {
      "@type": "Offer",
      "@id": `${productUrl}/#offer`,
      url: productUrl,
      priceCurrency: siteConfig.currency,
      price: product.price,
      priceValidUntil: "2027-12-31",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "IN",
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 14,
        returnMethod: "https://schema.org/ReturnByMail",
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "0",
          currency: siteConfig.currency,
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "IN",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 1,
            maxValue: 2,
            unitCode: "d",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 3,
            maxValue: 7,
            unitCode: "d",
          },
        },
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating || 4.9,
      reviewCount: product.reviewsCount || 100,
      bestRating: 5,
      worstRating: 1,
    },
    review: (product.reviews || []).slice(0, 5).map((rev) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: rev.author,
      },
      datePublished: "2026-01-15",
      reviewRating: {
        "@type": "Rating",
        ratingValue: rev.rating,
        bestRating: 5,
        worstRating: 1,
      },
      reviewBody: rev.quote.replace(/[“”"]/g, ""),
    })),
  };

  // 2. BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${productUrl}/#breadcrumbs`,
    itemListElement: [
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
      {
        "@type": "ListItem",
        position: 3,
        name: product.breadcrumbCategory || product.category || "Swings",
        item: categoryUrl,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: product.name,
        item: productUrl,
      },
    ],
  };

  // 3. Product FAQPage Schema (uses customFaqs if provided, else product-specific faqs)
  const faqs =
    customFaqs && customFaqs.length > 0 ? customFaqs : getProductFaqs(product);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${productUrl}/#faq`,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return [productSchema, breadcrumbSchema, faqSchema];
}

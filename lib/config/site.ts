export const siteConfig = {
  name: "Westernswings",
  legalName: "Westernswings",
  tagline: "Fine Crafted Swing chairs",
  description:
    "Fine-crafted swing chairs from Wayanad, Kerala.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://westernswings.com",
  ogImage: "https://westernswings.com/og-image.jpg",
  contact: {
    phone: "+91 6238473506",
    phoneDisplay: "+91 6238473506",
    whatsapp: "https://wa.me/916238473506",
    email: "contact@westernswings.com",
    address: {
      streetAddress: "Ayisha Complex, Panamaram",
      addressLocality: "Wayanad",
      addressRegion: "Kerala",
      postalCode: "670721",
      addressCountry: "IN",
    },
    geo: {
      latitude: "11.7456",
      longitude: "76.0711",
    },
  },
  social: {
    instagram: "https://instagram.com/westernswings",
    facebook: "https://facebook.com/westernswings",
    pinterest: "https://pinterest.com/westernswings",
  },
  currency: "INR",
  keywords: [
    "outdoor swings",
    "luxury porch swings",
    "hanging egg chair India",
    "solid teak wood daybed",
    "all-weather wicker patio chair",
    "terrace cocoon swing",
    "balcony swing chair Kerala",
    "waterproof outdoor furniture",
    "Westernswings",
    "Wayanad teak furniture",
  ],
};

export type SiteConfig = typeof siteConfig;

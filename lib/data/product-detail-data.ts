export interface ProductGalleryItem {
  id: string;
  src: string;
  alt: string;
  label?: string;
}

export interface ToneOption {
  id: string;
  name: string;
  colorHex: string;
  materialLabel: string;
}

export interface LogisticsItem {
  icon: string;
  title: string;
  description: string;
}

export interface LogisticsSection {
  title: string;
  subtitle: string;
  tag: string;
  items: LogisticsItem[];
}

export interface ProductReviewItem {
  id: string;
  author: string;
  location: string;
  timeAgo: string;
  rating: number;
  setupTag?: string;
  quote: string;
  image?: string;
  verified: boolean;
}

export interface ProductDetailData {
  id: string;
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  categoryId?: number;
  breadcrumbCategory: string;
  badges: Array<{
    text: string;
    variant: "espresso" | "terracotta" | "primary" | "surface";
  }>;
  inventoryStatus: string;
  rating: number;
  reviewsCount: number;
  subtitle: string;
  description: string;
  price: number;
  originalPrice: number;
  savings: number;
  tones: ToneOption[];
  hangingKitIncluded: boolean;
  hangingKitDescription: string;
  gallery: ProductGalleryItem[];
  shippingLogistics: LogisticsSection;
  careLogistics: LogisticsSection;
  isActive?: boolean;
  reviews: ProductReviewItem[];
}

export const SAVANNAH_DOUBLE_COCOON: ProductDetailData = {
  id: "the-savannah-double-cocoon",
  slug: "savannah-double-cocoon",
  name: "The Savannah Double Cocoon Hanging Swing Chair",
  category: "Double Swings",
  categorySlug: "double",
  breadcrumbCategory: "Double Swings",
  badges: [
    { text: "Artisanal Benchmark", variant: "espresso" },
    { text: "Handwoven Exclusive", variant: "terracotta" },
  ],
  inventoryStatus: "Ready to Ship in 48 Hours",
  rating: 4.9,
  reviewsCount: 142,
  subtitle:
    "A cocooning architectural retreat sculpted for two. Interwoven with UV-inhibited all-weather wicker over an anti-corrosive reinforced aluminum skeletal chassis.",
  description:
    "Sculpted to bring tactile serenity and effortless leisure to your veranda, patio, or living space. Engineered with thick all-weather synthetic PE wicker hand-strung by master artisans over a powder-coated alloy frame, complemented by all-weather cushions and marine-grade suspension hardware.",
  price: 48999,
  originalPrice: 57900,
  savings: 8901,
  tones: [
    {
      id: "natural-sand",
      name: "Natural Sand",
      colorHex: "#E8DEC8",
      materialLabel: "Handwoven PE Wicker",
    },
    {
      id: "espresso",
      name: "Espresso",
      colorHex: "#251B17",
      materialLabel: "Handwoven PE Wicker",
    },
  ],
  hangingKitIncluded: true,
  hangingKitDescription: "Grade-316 stainless carabiners & chains",
  gallery: [
    {
      id: "img-0",
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAUKJ87pYgRsfc1RHe81RKNDJeQGfHFTrm6qbunS2cuI6EmXJZMufi2c4aFMtGtdRfS_3MMrT70_QTjJyXq9HoBfZM_G2XXK5XNBUdYZplwwVSDcuU1eSvIAIGPxwPSFKTlpzxrXP93WuFfCNjPd7QtkifIAsp3Ny-g928TEQ7GZytTAGbfBrAM49zLQhf728cOWYJ9sFbcTZ1xMIgTcy7K8q9rEIp2XYqaSPbVeFSxM3GQ8TVTWDhdEA",
      alt: "Luxury double-seated organic egg cocoon swing chair hung in a sunlit architectural veranda with limestone flagstones, lush potted ficus, soft warm linen cushioning, and premium thick wicker weave under natural diffused morning light",
      label: "Hero Lifestyle",
    },
    {
      id: "img-1",
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAmNtk3H2XXE7NOOiKr0K37zrLjCpWB37HJ_0AwB0nEHnpPGtEZEbqMNu-GRvxWEcLEfbEOnfD5cFzvX0KQ09dRQd-SDX0NBBsBvRzM19gthNeYTCpVp_nCQ-wggl4hJceWOY6EAb9Fl-5-oPK0eJgPJ7B9ZL1aPwir_99bycGjnq7wVcADkFn_kEhmAyu1IGfjyJvAHxGP2_LrTQ2gn24vt-Ygt-RYvnLtXN0NgMi7WW_vtdh3Kt4CWA",
      alt: "Front straight angle view of the Savannah double cocoon outdoor swing chair with neutral cushions",
      label: "Front Elevation",
    },
    {
      id: "img-2",
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBFcHxcF7xsuNBp9SadWQWALkNB43GsGEWALvtf3mDIcD12Bx9kOl5N8WNCIT2rcTwTdArAC07phvO5jVT93pZBJguy4wcB-udH7Ut4I0A0V65WVkrNQKXYpi68GTQtuJ0mmn_htiyJHxA7Jei3h0Pyv8XegrJmd4RTXHlc0vb6tdqvKDAPri-7VGECqCtmrTSQA01tKatpGKlqqpHqjexsHdLTq2HonqyQUifE4aiAvUNDmf3QQFbrEA",
      alt: "Angled lifestyle styling of the double swing chair with terracotta throw",
      label: "Veranda Styling",
    },
    {
      id: "img-3",
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAy4XBdJUD0uN0w20sDrBpE-Wc_ULnExLBvVIaLWJbul5LRdskZH_u9g5ImEFWgn6wiEo_qP6-rX0RAL3Lp2UT1A64ySMB_-evb4i0xNGrPreEYA5nSZV5YV06CHD4BfR4pRNMCIwwEQjuZwbb1gdA61x1QEmZ29VoHY0-KEAXoCok9aR9yjYa9exnPid7-gx8r2RLs29_MWtHkVSsz-ZdZ2fBR7vG7GW3ntm-r8A8Zefp6eb7dnc_KvQ",
      alt: "Extreme macro tactile close-up photograph of wicker intertwined with organic teak ribs",
      label: "Tactile Weave",
    },
    {
      id: "img-4",
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuC1bBRkWk4TtFaRLIK0dR_xpiiQHteyybATmQ_YK-LVzNjxpD_prflo0j-wywdV8kT8GjUOZ3TuMO5jyKavzC1WB-AMNerzICWFg6tTLNrxAt6BP9M0DGD1_avxz28hdqwjI9Cb8VM9dF5tuFnW2v3QRAIUEh8SsOorYkupJehw2FP94lVxOWieeOevPkTncCLAfTKZOgc6Jvytl2qu0bO9txTgUjybWeeSUp_6ChJhmdmOOrN7zDAOuw",
      alt: "Architectural dimensional specification graphic showing double cocoon swing chair footprint measurements",
      label: "Dimensions",
    },
  ],
  shippingLogistics: {
    title: "Shipping & Doorstep Delivery",
    subtitle: "White-glove personalized transit direct from Wayanad",
    tag: "Delivery & Transit",
    items: [
      {
        icon: "clock",
        title: "Dispatched within 48 Hours",
        description:
          "Carefully packaged and routed directly from our Wayanad workshop hub.",
      },
      {
        icon: "wrench",
        title: "Doorstep Assembly Included",
        description:
          "Our certified delivery team will unbox, place, and safely test your swing.",
      },
      {
        icon: "message",
        title: "Real-time WhatsApp / SMS updates",
        description: "Live driver dispatch updates straight to your mobile number.",
      },
    ],
  },
  careLogistics: {
    title: "Care & Coastal Climate Care",
    subtitle: "Engineered for heavy monsoon rains and humid air",
    tag: "Maintenance Guide",
    items: [
      {
        icon: "sparkles",
        title: "UV-Resistant Resin Wicker",
        description:
          "Simply wipe down with a gentle damp cloth or spray lightly with fresh water every season.",
      },
      {
        icon: "droplet",
        title: "Sunbrella® Cushion Care",
        description:
          "100% solution-dyed, quick-dry hydrophobic foam core with concealed marine-grade zippered covers.",
      },
      {
        icon: "shield",
        title: "Rustproof Aviation Frame",
        description:
          "Dual electro-coated alloy stand and Grade-A teak ribs tailored to resist heavy monsoon weathering.",
      },
      {
        icon: "cloud",
        title: "Monsoon Advice",
        description:
          "For prolonged heavy seasonal downpours, use our custom storm shield cover or store cushions in shaded veranda.",
      },
    ],
  },
  reviews: [
    {
      id: "rev-1",
      author: "Maya & Rahul Nambiar",
      location: "Kochi, Kerala",
      timeAgo: "3 days ago",
      rating: 5.0,
      setupTag: "Veranda Setup",
      quote:
        "“We hung this from the RCC beam on our first-floor veranda overlooking our coconut grove. Both of us can stretch out with our evening chai without touching elbows. The suspension is utterly silent.”",
      image:
        "https://lh3.googleusercontent.com/aida/AEtjO1VDA8NSTaPgapNTZBVnBDSyKfxZiZC9SvEmtCaD4CADfE3wwCUAej5rvtVB7ouU82y-mmGrPCmsq5sXalk9_0QZT8lVssadH-ZVjnXbR17w0Pa5gkgH6wdR2naEO_8iCUD2ymtCQGEIPJ0h8oQvd-WXvTjsJPzfy-eMafNym1HTGRhTPUW1R0kqKQeS5hpFbX0g6r9afWls9wCeeStKdnMG4mr9qrOdY_nxjuUgmp-DiArZ12tPuFaN9PQ",
      verified: true,
    },
    {
      id: "rev-2",
      author: "Thomas Kurian",
      location: "Alappuzha",
      timeAgo: "3 weeks ago",
      rating: 5.0,
      setupTag: "Backwater Balcony",
      quote:
        "“Living right next to the backwaters, humidity destroys regular cane. The synthetic wicker and solution-dyed cushions dried remarkably fast right after a torrential storm. Punctual doorstep installation.”",
      image:
        "https://lh3.googleusercontent.com/aida/AEtjO1WcpO5vfU8PcaODoXJqYic2yuWqm6VMPkjkaPjKI-Gu-E24FDWQM2_vra7xOXUfeAgm_rtcSMBHgM3OokRAR4kZ3bqlfc3K5VCs_k1kIwYhPM22dYLqv2UM3x6R_-WBO0o85VWRVdonXHAu8whmb0uHgARmjcuQ9PTrKjxCWLiMRcWtOm7YavcpSMDIG4Q1Zv2AMgeje1XsWuQAXw1YPCdHDbL801yys7-II4CBmhtWTRTvlr9yjYijQcMg",
      verified: true,
    },
    {
      id: "rev-3",
      author: "Ananya & Deepu Pillai",
      location: "Kozhikode",
      timeAgo: "1 year ago",
      rating: 5.0,
      setupTag: "Hill View Patio",
      quote:
        "“Scandi aesthetic, exceptional deep seating foam, and spotless white-glove delivery. The tactile weave is extraordinarily thick and looks like high-end Scandinavian resort furniture. The dual-density cushion retains its loft without bottoming out.”",
      verified: true,
    },
  ],
};

export function getProductDetailBySlug(slug: string): ProductDetailData {
  // If slug matches savannah or is requested directly, return the full detail
  if (
    !slug ||
    slug === "savannah-double-cocoon" ||
    slug === "the-savannah-double-cocoon" ||
    slug === "default"
  ) {
    return SAVANNAH_DOUBLE_COCOON;
  }

  // We can return the detailed model tailored to any specific product or default to Savannah
  return {
    ...SAVANNAH_DOUBLE_COCOON,
    slug,
  };
}

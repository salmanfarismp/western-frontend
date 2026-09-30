import type {
  Product,
  CategorySilhouette,
  CraftPillar,
  MetricHighlight,
  CustomerReview,
  InstagramPost,
} from "@/types/home";

export const HOME_CATEGORIES: CategorySilhouette[] = [
  {
    id: "single-egg",
    name: "Single Egg Swings",
    description: "Cozy reading nooks designed for solitary reflection and afternoon escapes.",
    countLabel: "12 Designs Available",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBaL6-WdMS8a6aC4HStrdttbhG5UylW_NXGaxPG6zRA_VsNa-6mHDkm0CUuKB4O1pnJdk8XpHu67SzYf302ZnfJp2F5mS3WGQWlHAn1i02fkgHItJakFVBmxoagjx6Fimgv2M2wvqu6KHU1wm9bUhdWj2Y_iohn2L0kLLPjmHqnxOD4m1e0fAtQW1xPrmd_pexFWHI69nQgRP8zsxe1KAZ2DTU_6VcsMGpUUcG4P2lfqiCvJ2NgGLReeg",
    alt: "Single bohemian modern egg swing suspended in lush veranda",
    href: "#products",
  },
  {
    id: "double-loveseat",
    name: "Double Loveseat Swings",
    description: "Generously proportioned two-person swings to watch twilight deepen together.",
    countLabel: "8 Designs Available",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCadFqKbycPsr4Ryn9JufbpNSKeLif2jg11B45jg3MO_U8OV-Wp5SKjAdzr9_G2TRB2BiCbHrJsw_sjOxfcVhg2jn8HtZoqItLTIjwKWgtaCT9xUu_ciL-iUaPoqak_i1dGmNgArqSWgDSLvkYDC9k9mcMfJIH7mu7uhjam-lY4Oe7E-hFIAL91cARNNPnjcu7nM4PihQqcUw6nmjtbVO7uml2EA6vDfEpiv4skGOJFqA6rvC-4-lUBKQ",
    alt: "Double wide luxury outdoor swing chair overlooking sunset",
    href: "#products",
  },
  {
    id: "three-seater",
    name: "Three-Seater Swings",
    description: "Sprawling family daybeds and statement pieces for grand backyard porches.",
    countLabel: "6 Designs Available",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBnNQOqjEhZdCQcrEGyy7Nf5KgrZeIxwMSjHCUx0Mz31-KhDlADOwJn_Qzp8R_kpT9zER0VTLJVwnbkTb5Qk2LxRLRzccmyl0zAfSaqSbyW4EcauuKvCXxkRxsbAsxlxSlY4PJIjGDNhYFe53Y3EjU1HM_Bm3a-OLkl-SANR77UXYQEDAxpBs_WnRNLld1ptLp9q37utRN38FZ4RBKabuzuLuRhrhRy63byzPIY9FEztEkOeRNNHcrDtg",
    alt: "Grand architectural three-seater teak daybed porch swing",
    href: "#products",
  },
  {
    id: "stands-accessories",
    name: "Stands & Accessories",
    description: "Freestanding heavy-duty arched stands, silencer suspension springs, and all-weather covers.",
    countLabel: "24 Essentials",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAduwsBZ-26pwsXl-A_Q8Ft3D7ywGf03Ibffq98QzYdOcw9wTgGnOLNkbtnumOZ2C3yT-MR0k169eYEXmvnhOmJvYYs6xk83LPRKNy-ykDKFmyrJV_Brdtq5A5xPSKLAxuRkt4P5CCbBcyekKEfa1cnRCDcaNDf8Q7qCQvxTvSg0BV1fncVB-AVtRKLFdev9wdNlW3l_fXhbATF6D20S1PlWkh-kzyG_2Hu6Z26QqgbYouVhsQODHgmUg",
    alt: "Marine-grade powder-coated matte espresso metal stand and suspension hardware",
    href: "#products",
  },
];

export const HOME_PRODUCTS: Product[] = [
  {
    id: "sonora-teak-pod",
    name: "The Sonora Teak Pod Swing",
    category: "single",
    subtitle: "Single nest chair crafted with open-weave resilient PE rattan.",
    description:
      "Single nest chair hand-strung with high-density UV polyethylene wicker over a powder-coated aluminum frame, lined with deep Olefin weatherproof cushions.",
    price: 28999,
    originalPrice: 34500,
    rating: 5.0,
    reviewsCount: 184,
    badge: {
      text: "Best Seller",
      variant: "outline",
    },
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuChEM7qXnNuwRHniN6XT3MZw9vZxWo0E2a27Cpd9GRToXwQL1yEqP46pMEp1KB_b79yl6HOcpJBaxRtNyoZQsQDSukDKoVVA_uu58IsNg6Bq7rFKMixvF4Y3smDEHROzVxdGHEDl36C85aPB-_8FD_d7ezu3SLiy4fyrNRQz1GUI5CGafv3LP7c477qmVnQsTnohqSQ1tEcZcv19Jtwtq1BkxxmDRfzikjlTmztRwd-9wwJ2_H9P7ms3Q",
    alt: "Artisanal bohemian hand-strung rattan single pod swing chair with thick ivory cushion",
    tones: [
      { name: "Sand Linen", hex: "#D4C3A3" },
      { name: "Forest Sage", hex: "#4A5A4A" },
      { name: "Espresso Wicker", hex: "#251B17" },
    ],
    specs: "Handwoven PE rattan shell with 360-degree all-weather resilience. Accommodates up to 350 lbs comfortably.",
    hardware: [
      "1x Heavy-Duty Dampened Spring",
      "10ft Adjustable Nautical Hanging Rope",
      "Olefin Quick-Dry Tufted Cushion",
    ],
  },
  {
    id: "carmel-double-loveseat",
    name: "The Carmel Double Loveseat",
    category: "double",
    subtitle: "Spacious 2-person cocoon with extra-deep Olefin quick-dry cushioning.",
    description:
      "Spacious two-person cocoon handcrafted with intricately woven driftwood grey all-weather rattan, featuring oversized ivory cushions and dual suspension hooks.",
    price: 48999,
    originalPrice: 57900,
    rating: 5.0,
    reviewsCount: 312,
    badge: {
      text: "Award Winner",
      variant: "terracotta",
    },
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAoh2WwGKtCcOtkR69Qvc0wAy44k-yf4HhrAJP_eVE6O70xoxKuV1q-ijwrQTboYynjZDDtbeZ1C0srawVB_E6LPTpnm4Xwnust3BDJCg8Jmpu8lu5JiwBA0k6WdyEUzZxJ9SB4yYFR3m5LE1Q128rRmfQ1k5q751OQJhjE-4qKWdDV9ffQM9LpfcI_-Fcqni10wDeqIo0lldj4Ys0wdqMyCToDWofdSuR5s6SYfqYnmqn5iTglQQHHYw",
    alt: "Contemporary double egg swing with driftwood grey rattan and oversized cushions",
    tones: [
      { name: "Oatmeal Dune", hex: "#E5E0D8" },
      { name: "Weathered Cedar", hex: "#695B56" },
      { name: "Spanish Moss", hex: "#475546" },
    ],
    specs: "Handwoven resin core with 360-degree all-weather resilience. Accommodates two adults up to 550 lbs comfortably.",
    hardware: [
      "2x Heavy-Duty Dampened Springs",
      "10ft Adjustable Nautical Hanging Ropes",
      "Olefin Quick-Dry Tufted Cushions",
    ],
  },
  {
    id: "montauk-teak-daybed",
    name: "The Montauk Teak Sanctuary Daybed",
    category: "daybed",
    subtitle: "78-inch full daybed crafted from mortise-and-tenon Indonesian teak.",
    description:
      "Expansive 78-inch solid grade-A Indonesian teak porch daybed with mortise-and-tenon joinery, matte black marine hardware, and tufted waterproof mattress.",
    price: 74999,
    originalPrice: 87500,
    rating: 5.0,
    reviewsCount: 96,
    badge: {
      text: "Solid Teak",
      variant: "material",
    },
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuChaeqA_IhCNKKDS3Byt_47p3nsbq6PdtRT7qYNPikkS6k7cq1r9zTY9nFR77nSFxmXMGpmSpnbM3Ac4S07AFC0DDgNahVDBY_I2styh6wXz7WpjnQHMIw87J_TLk0428emC6bnY3fLGjm3DhfdShy9ssRHAwu25rkLmryTXz9ge0cN4WE9XzWYLnIHCCpyELjzHW1OrCK3HP8eYCwUBDd-KyIrtcBVb82Ey1P5qNKa2-T7mfh-zIceug",
    alt: "Expansive solid grade A teak wood three person porch swing daybed",
    tones: [
      { name: "Natural Teak", hex: "#B8966E" },
      { name: "Bleached Teak", hex: "#E5DFD3" },
      { name: "Charcoal Teak", hex: "#3B342F" },
    ],
    specs: "FSC certified sustainable Indonesian teak with natural oil protection. Accommodates 3 adults up to 800 lbs.",
    hardware: [
      "4x Stainless Steel Marine Rigging Shackles",
      "Heavy-Duty Galvanized Chains with Protective Sleeve",
      "Full Tufted Sunbrella® Mattress & 2 Bolster Pillows",
    ],
  },
];

export const HERO_FEATURED = {
  title: "The Solstice Cocoon Egg",
  subtitle: "Natural Rattan & Marine-Grade Alloy",
  price: "₹48,999",
  badge: "Featured Architecture",
  rating: "4.96 / 5.0",
  image:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCoUzEwIbQrrQbZNVx4ujkDX_eASU2tNz2DOW-iTF9yq94-MhyHvTYj268AGzkCl-HZpZlkWxKE4rs4POQ20n4boCZfryIsat540-RZOUcb10YOcMYVtXLj9R8ZRaiF6l5v7n6gUTjQVstulp1piCDMAUEs3nnJ00aTQSD1RAng5umEI1GyeZk-lBzufq6mnBXadU1PLRYYsct0LFSM8zlZgqp2FREQyqxF7-UY-uyp6VZrQzeF4_5zFw",
  alt: "Sun-drenched patio veranda with luxury single egg swing suspended from architectural beam",
};

export const CRAFT_PILLARS: CraftPillar[] = [
  {
    id: "steel",
    title: "Marine-Grade Powder Steel",
    description:
      "Each freestanding frame and suspension arch features dual-layer zinc-rich primer and electrostatic automotive powder coating, tested against 2,000+ hours of saline ocean mist without oxidizing.",
    icon: "steel",
    metricPercentage: 100,
    metricLabel: "Tested to 850 lbs dynamic load capacity",
  },
  {
    id: "rattan",
    title: "Handwoven UV Rattan",
    description:
      "Infused with compound light-stabilizers, our high-density polyethylene wicker replicates the tactile nuance of wild peeled cane while remaining impervious to splintering, cracking, or bleaching under direct sun.",
    icon: "rattan",
    metricPercentage: 95,
    metricLabel: "UV Rating: UPF 50+ / 3,000 Hours Guaranteed",
  },
  {
    id: "cushion",
    title: "Water-Repellent Olefin Cushions",
    description:
      "Deep channeled foam inserts clad in solution-dyed breathable Olefin fabric shed rain beads instantly, resist mold and mildew spore adhesion, and un-zip effortlessly for seasonal machine refreshment.",
    icon: "cushion",
    metricPercentage: 98,
    metricLabel: "Fast-Dry Core drains water in under 20 mins",
  },
];

export const CRAFT_METRICS: MetricHighlight[] = [
  {
    value: "100%",
    label: "FSC Certified Teak",
    subtext: "Sustainably Managed Reserves",
  },
  {
    value: "600+",
    label: "Lbs Load Tested",
    subtext: "Aircraft Swivel Bearings",
  },
  {
    value: "14-Day",
    label: "White Glove Delivery",
    subtext: "Delivered to Exact Porch Hook",
  },
  {
    value: "0%",
    label: "Zero Squeak Tech",
    subtext: "Silicone Damper Spring Bushings",
  },
];

export const CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    id: "rev-1",
    author: "Elena & Marcus Thorne",
    location: "Napa Valley",
    productPurchased: "The Carmel Double Loveseat",
    rating: 5,
    quote:
      "“The Carmel double swing became our household’s evening center point instantly. My husband and I sit with a glass of Pinot every single twilight. The suspension is utterly silent.”",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCBgHiWmjJjMaLljHAUaFr5I3TX_4J_mSENOKFtGeRMv2I4TMKIIg_lyx6akzm-Vx0IR7n44p8B-sIm6W8JrXRrDebt2wor2XftwcCLIYPk-Ctgbx5oBDuIlrk97TviC-QNqiJ4-Ukaic0yT11FJDi5T2i0VdEU9G2lYp2ujzpKA5bOkVArxx-cHTZXrQe0YZg5YbYJ_uz0E_-N4HnZ_Fquz99VN1LDAaBH33SnQjblq4sTHYRW3xhA8A",
    alt: "Customer porch in Napa Valley featuring Carmel double loveseat swing",
    verified: true,
  },
  {
    id: "rev-2",
    author: "Devon Vance",
    location: "Austin, TX",
    productPurchased: "The Carmel Double Loveseat",
    rating: 5,
    quote:
      "“I spent months looking for a cocoon chair that didn't feel like flimsy plastic. Westernswings delivered on solid craftsmanship. The stand is heavy, elegant, and rock steady.”",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDVgSN-VhRuuS1lhQtgYpHWNULAl4h5-nSanoS3ZTKdwNqR7IFJ8lVRmA9tvLWhBVcEJnVPZeYph4Q369eYs-XbzB-h57_JdYAgy3FXxL2sKfgcY5Zwh5SjTt99Dluu4qPJmyX_WLeZ3FtUs1mR3guYeK7xIuG0jkMfvkzZ7avg0ennKYkkgNnOTl4qkZAe3GzPi4FaNPMvjb06zMzPWKJWytvnh0VY-bzK5kE7yWw53Iy9axNjH0UiZA",
    alt: "Modern balcony with single rattan egg swing and city skyline view",
    verified: true,
  },
  {
    id: "rev-3",
    author: "Claire Fontaine",
    location: "Charleston",
    productPurchased: "The Montauk Teak Daybed",
    rating: 5,
    quote:
      "“White glove delivery took less than 35 minutes to inspect our porch rafter and safely mount the Montauk Daybed. True luxury service. Our grandchildren fall asleep on it effortlessly.”",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBb4rG50lit24obnWmQhnDv9t8e7HNjAW3tlvmnc5bpB2oskIZ9jxnqMESBPjS01r7LBajjW_7vrylEQ54Id9KglmBAod6wEYC4_I2TVEGeu_sltLBuRadgJ0yf-T_rgy9mCoyT9pfrge97nNucXYp_DyDT461wk1JbwxWx4LUU5fBf4LCyGaz16K5R55xpQCMcCu980oDer0AQ8kdZQ2rqaIfu45AECHvo6uSkuS93HYjQRGD9JfmVoQ",
    alt: "Classic wraparound porch with Montauk Teak Daybed swing and hydrangeas",
    verified: true,
  },
];

export const LOOKBOOK_POSTS: InstagramPost[] = [
  {
    id: "post-1",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCFyW3lhUH_YYM0AQoximBWBtDfjVEtuI6yHDR2rgs8uvYgSt1mUj4cKp8U2768XrUfO-kc2HD-e9KN4gc1N3PPGiUH3zv8X-kgTZyzEw5aV2ECr061MgJClamyNkOdeRZwcYnGHXhE-zqKi95DACWvKFPz8MFEAwUIkeFc6g3vNgT8KrH2dihtU_cEUc6rALeik6Q_HP_U3fCXgTd_AshduvCkcmvehpC2zVAFyoxH6zzrv2kYf8Au5Q",
    alt: "Sunlit morning coffee mug held on the edge of a teak porch swing",
    link: "https://instagram.com",
  },
  {
    id: "post-2",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAzGiew06JXKmArTyH_r-NcsTNqUCXbBwRIqABR3IJ13X8O6ViTWy1pcGacGX2NoR6k59mA0UpKKBo7JaPRSrdZ322psbhHYWp6HY2cYYcjH1C_9YA7NmYYQEUX_6vfzVuvG4S8yvAdH3Cddb0tE8_TlvFZDanJWmCBwldTjmPa82A3hHU9z_6_wM1TWw3jSe4nDuHLIaCS5fh_c-jJhl6sAvoV8_B6JgXYSEezabcKrjnJHhoD0yI1Qw",
    alt: "Golden hour poolside lounge in Palm Springs with double egg swing",
    link: "https://instagram.com",
  },
  {
    id: "post-3",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDjICvkAPLgAINkNv6HlxiXAvw6_zaiXUD7XquN-I8yt-9fek453zR8w9EMgX2SI3CKV2r-jkqKF10y4UcwL1NVXLrZOiWpFdWnXhOw3ZpEoDBubs-z58J2itXKUtP82f4zBlwT5HnGpl9DWGX0ZCWvok6NCyj8SacEchA6jtMuYDmd8JAntqkRh86aoEP8-F0vgAicaq4VampB6rCUV_VPz1xrUnoEU9gzfgazYxQUEbsLA5oJ7A92dQ",
    alt: "Woman reading book curled inside an egg cocoon swing",
    link: "https://instagram.com",
  },
  {
    id: "post-4",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC3BJRRiDf7gaSFwHuK8mYixYDIbKqdyFoHVHYhf4WvnIr_Pyxm_XClma16DxfS3o3q7mbiPItbljyL1VwULneFX0eqmRacZRyWq0L2wCVpzDkbmYBSrtB0gm5ViDwNAOF1MArqwVT7vOLYenlriUVffdyv5AIlaHybTholy4X8vWfFShb4_MX0OANRc0sbpJR0menaJaA00iqxea-8exWv7ZTm_NEKLhKp3lRazp9wuqTWczfUgG5nIQ",
    alt: "Overhead view of outdoor patio table with daybed swing softly floating",
    link: "https://instagram.com",
  },
];

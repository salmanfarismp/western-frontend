import type { Product, ProductCategory } from "@/types/home";

export interface CategoryFilterItem {
  label: string;
  value: ProductCategory;
  count: number;
}

export const PRODUCTS_LIST_FILTERS: CategoryFilterItem[] = [
  { label: "All Swings", value: "all", count: 28 },
  { label: "Single Cocoon", value: "single", count: 12 },
  { label: "Double Loveseat", value: "double", count: 8 },
  { label: "Swing bed", value: "swingbed", count: 5 },
  { label: "Stands & Accessories", value: "stands", count: 3 },
];

export const PRODUCTS_LIST_ITEMS: Product[] = [
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
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD5OI4lZ4_xveJdncKwXAsrSx7LlFDfy9x7eQ8jgqVDe0OS0BhXHD5shGW-wIkOhb4wvAl3FjHPEHRFvpYqBc7XqcBBieNGnMMTcRGghegufxhS37gDbvpOHyyFv8YOhX4NNLcDR9p9Et_3tTxyZ5nbaUz7m5cqgiyF33FPjHudRw2jaXbOe5xXZJwBeA68tj-sqofFwNQci-UM98g5-9ODbrISjZQ9eTgts8iTwI4B1N_pi8u4gQMaBw",
    alt: "The Sonora Teak Pod Swing",
    tones: [
      { name: "Sand Linen", hex: "#D4C3A3" },
      { name: "Forest Sage", hex: "#4A5A4A" },
      { name: "Espresso Wicker", hex: "#251B17" },
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
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC4vvKhKCCNWxDIsezlyoDpV_YrBQl9QM1IP-9K-ilwNl6HNf13F3pZyffnkqctZcY6JmS3mDQML2JPmfLw1x43boL6YMAv4xIF_09CSCDcpu7DXWmSnWgGmbnhgZGBofP2SzsIDFJQx-8bpDbrKpeLHXYNBGv0BH0O00SVScNfRGPFZNL4RYlj2sFELfIeg_lCaeEOjUU5lhGU8o0hochYmf1udtouiUKIIpDZbP7U1Ab6siz_py7z1Q",
    alt: "The Carmel Double Loveseat",
    tones: [
      { name: "Oatmeal Dune", hex: "#E5E0D8" },
      { name: "Weathered Cedar", hex: "#695B56" },
      { name: "Spanish Moss", hex: "#475546" },
    ],
  },
  {
    id: "montauk-teak-daybed",
    name: "The Montauk Teak Sanctuary Daybed",
    category: "swingbed",
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
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAQIH2g573KR3a3ecAkmg-ciM_iJZJSWqeZMAN7WkNxYxlbTXSMSx_e1NPSXkLBwZbs6KN3MfNT0KbGNDnznCXJx6tEXb-mcGpfNXESKs45PR-5oxyZEqbp1wkG5BCeGluOYrQ0y6VtV67TTV6Yq4e7_GreflNWKAxMTeYWkYFd1DwOXlHmcbYxNykD7pSYMbQhSMgj8u-_IIEhSiwnwjCjODijAlghzr_Tlt3owa9d-_ZJ6KvBledRIA",
    alt: "The Montauk Teak Sanctuary Daybed",
    tones: [
      { name: "Natural Teak", hex: "#B8966E" },
      { name: "Bleached Teak", hex: "#E5DFD3" },
      { name: "Charcoal Teak", hex: "#3B342F" },
    ],
  },
  {
    id: "aspen-woven-nest",
    name: "The Aspen Woven Nest Single Chair",
    category: "single",
    subtitle: "Free-standing spherical lounger complete with an all-weather matte espresso alloy stand.",
    description:
      "Free-standing spherical lounger complete with an all-weather matte espresso alloy stand.",
    price: 24999,
    originalPrice: 29000,
    rating: 5.0,
    reviewsCount: 64,
    badge: {
      text: "Stand Included",
      variant: "botanical",
    },
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB1E7fouBNcOrrmtSDaLZdZoKulEaX5FsLfuPnoapH7pLMErAdjqLK-UVb_ekRV1Aon43XxMKzuazasuib8aDFiD8sdfFefGNra5IERJUlHyf-J3D72b-R-Cr6Jvs_TxnGcVhfJP_BegCKAcVBTH7BTaQE-1HEJZVvnWJRiA8iaBov_igN0xmifF0PozFobJJr-AXcGXdYrDkqsvDa8bxaQ7r8tWEUJNcBv8_KUIXtde7WnaRUSSHEqXg",
    alt: "The Aspen Woven Nest Single Chair",
    tones: [
      { name: "Linen Cream", hex: "#FAF8F5" },
      { name: "Charcoal", hex: "#31302C" },
    ],
  },
  {
    id: "carmel-rattan-pod",
    name: "The Carmel Rattan Hanging Pod",
    category: "single",
    subtitle: "Sculptural open-frame design with wrap-around lumbar cushioning and braided fringe.",
    description:
      "Sculptural open-frame design with wrap-around lumbar cushioning and braided fringe.",
    price: 36500,
    originalPrice: 42000,
    rating: 5.0,
    reviewsCount: 52,
    badge: {
      text: "Hand-Braided",
      variant: "terracotta",
    },
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAkqyoChq8pdVewUvy-INew8xGRdo4suZgP2WGuRCElPXHJqeL5kRqBC1tBhMIF6hLGd5hu2YzefVx_jLVIyi0S655ERwskd24sv-B9VHVtG7W3WygUDJFN7BlvWWhcT18VeljmQinKTrfGp_jOZ9AtEoZcft5V9w8dmA4zE-tdejZMGczs4MVuRHx5OmVhKPAD-zWVIkZblOPI4a3G7X6Sr_gJkAXG3Vk14npqltSm1SDLOhwqYsWsiw",
    alt: "The Carmel Rattan Hanging Pod",
    tones: [
      { name: "Linen Cream", hex: "#FAF8F5" },
      { name: "Terracotta", hex: "#D99377" },
    ],
  },
  {
    id: "cantilever-arc-stand",
    name: "Heavy-Duty Cantilever Arc Stand",
    category: "stands",
    subtitle: "Rust-inhibited powder-coated structural steel engineered for full 360-degree silent rotation.",
    description:
      "Rust-inhibited powder-coated structural steel engineered for full 360-degree silent rotation.",
    price: 16499,
    originalPrice: 19000,
    rating: 5.0,
    reviewsCount: 118,
    badge: {
      text: "Hardware Grade",
      variant: "material",
    },
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCrSc3G0CnKoN6DZm6pE0zEq3-5gZ1bzk1K39BtJyRXSLKjdV71l1SjLVlN5SORo85AecvPeRYjbvvEN_ynzDhiLQfXyOhYWZ0yABVbLHaWlHz8_e6bHBHxOKGzReRavPFUL8Cu6zj4nkUcYc9due7G62J4elz30nWXfepYp7w5FslEo9YiMEva2oUKvnEfjUtXrizt3bUgnLEVtPiGdvW5P6sGPE__mHiD5xZQANHujER7fQkdwXTBZQ",
    alt: "Heavy-Duty Cantilever Arc Stand",
    tones: [
      { name: "Oil Rubbed Bronze", hex: "#251B17" },
      { name: "Brushed Silver", hex: "#C4C8C0" },
    ],
  },
];

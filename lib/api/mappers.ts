import type { CategorySilhouette, Product } from "@/types/home";
import type {
  ProductDetailData,
  ProductGalleryItem,
  ToneOption,
} from "@/lib/data/product-detail-data";
import type {
  ProductCategoryRow,
  ProductJoined,
  BadgeRow,
} from "@/types/database";
import { resolveMediaUrl, FALLBACK_IMAGE_URL } from "@/lib/utils/media";

export function mapCategoryRowToSilhouette(
  row: ProductCategoryRow,
): CategorySilhouette {
  return {
    id: String(row.id),
    name: row.name || "Swings",
    description: row.nick_name || row.name || "Handcrafted luxury comfort",
    countLabel: "Curated Selection",
    image: resolveMediaUrl(row.img_url) || FALLBACK_IMAGE_URL,
    alt: row.name || "Handcrafted Swing Category",
    href: `/collections?category=${row.slug || row.id}`,
  };
}

function resolveBadge(
  badgeId: number | null,
  badgesMap?: Map<number, BadgeRow>,
): { text: string; variant: "botanical" | "terracotta" | "material" | "outline" } | undefined {
  if (!badgeId) return undefined;

  if (badgesMap && badgesMap.has(badgeId)) {
    const badge = badgesMap.get(badgeId)!;
    const variant =
      badge.theme === "accent"
        ? "terracotta"
        : badge.theme === "secondary"
        ? "botanical"
        : "outline";
    return { text: badge.name, variant };
  }

  // Standard preset map
  switch (badgeId) {
    case 1:
      return { text: "Best Seller", variant: "outline" };
    case 2:
      return { text: "Handcrafted", variant: "botanical" };
    case 3:
      return { text: "Featured", variant: "terracotta" };
    case 4:
      return { text: "STAND INCLUDED", variant: "outline" };
    case 5:
      return { text: "POPULAR", variant: "botanical" };
    case 6:
      return { text: "New", variant: "terracotta" };
    default:
      return { text: "Curated", variant: "outline" };
  }
}

export function mapProductJoinedToProduct(
  row: ProductJoined,
  badgesMap?: Map<number, BadgeRow>,
): Product {
  const images = [...(row.ProductImage || [])]
    .filter((img) => Boolean(img.img_url))
    .sort((a, b) => {
      if (a.is_primary) return -1;
      if (b.is_primary) return 1;
      return (a.display_order ?? 0) - (b.display_order ?? 0);
    });

  const primaryImage = images[0];
  const imageUrl = primaryImage ? resolveMediaUrl(primaryImage.img_url) : FALLBACK_IMAGE_URL;
  const imageAlt = primaryImage?.alt || row.name;

  const tones = (row.ProductColor || [])
    .filter((pc) => pc.Color)
    .map((pc) => {
      const hex = pc.Color!.hashcode.startsWith("#")
        ? pc.Color!.hashcode
        : `#${pc.Color!.hashcode}`;
      return {
        name: pc.Color!.name,
        hex,
      };
    });

  return {
    id: row.id,
    slug: row.slug || row.id,
    name: row.name,
    category: row.ProductCategory?.slug || String(row.category || "all"),
    subtitle: row.subtitle || "",
    description: row.description || "",
    price: row.price,
    originalPrice: row.original_price ?? undefined,
    rating: row.computed_rating ?? 5.0,
    reviewsCount: Number(row.computed_review_count ?? 0),
    badge: resolveBadge(row.badge, badgesMap),
    image: imageUrl,
    alt: imageAlt,
    tones,
    specs: `${row.name} - Hand-crafted with all-weather resilience and ergonomic support.`,
    hardware: [
      "Heavy-Duty Dampened Spring",
      "Adjustable Hanging Carabiners & Chains",
      "All-Weather Tufted Cushion",
    ],
  };
}

export function mapProductJoinedToDetail(
  row: ProductJoined,
  badgesMap?: Map<number, BadgeRow>,
): ProductDetailData {
  const images = [...(row.ProductImage || [])]
    .filter((img) => Boolean(img.img_url))
    .sort((a, b) => {
      if (a.is_primary && !b.is_primary) return -1;
      if (!a.is_primary && b.is_primary) return 1;
      return (a.display_order ?? 0) - (b.display_order ?? 0);
    });

  const gallery: ProductGalleryItem[] = images.map((img, idx) => ({
    id: `img-${img.id || idx}`,
    src: resolveMediaUrl(img.img_url),
    alt: img.alt || `${row.name} - View ${idx + 1}`,
    label: img.is_primary ? "Primary View" : `View ${idx + 1}`,
  })).filter((item) => Boolean(item.src));

  if (gallery.length === 0) {
    gallery.push({
      id: "img-fallback",
      src: FALLBACK_IMAGE_URL,
      alt: `${row.name} - Westernswings Handcrafted`,
      label: "Primary View",
    });
  }

  const tones: ToneOption[] = (row.ProductColor || [])
    .filter((pc) => pc.Color)
    .map((pc) => {
      const hex = pc.Color!.hashcode.startsWith("#")
        ? pc.Color!.hashcode
        : `#${pc.Color!.hashcode}`;
      return {
        id: `color-${pc.Color!.id}`,
        name: pc.Color!.name,
        colorHex: hex,
        materialLabel: "All-Weather Wicker",
      };
    });

  const badgeObj = resolveBadge(row.badge, badgesMap);
  const badges: ProductDetailData["badges"] = badgeObj
    ? [
        {
          text: badgeObj.text,
          variant:
            badgeObj.variant === "terracotta"
              ? "terracotta"
              : badgeObj.variant === "botanical"
              ? "primary"
              : "espresso",
        },
      ]
    : [];

  const price = row.price;
  const originalPrice = row.original_price ?? price;
  const savings = originalPrice > price ? originalPrice - price : 0;

  return {
    id: row.id,
    slug: row.slug || row.id,
    name: row.name,
    category: row.ProductCategory?.name || "Handcrafted Swings",
    categorySlug: row.ProductCategory?.slug || "all",
    categoryId: row.category ?? undefined,
    breadcrumbCategory: row.ProductCategory?.name || "Swings",
    badges,
    inventoryStatus: "Ready to Ship in 48 Hours",
    rating: row.computed_rating ?? 5.0,
    reviewsCount: Number(row.computed_review_count ?? 0),
    subtitle: row.subtitle || "",
    description: row.description || "",
    price,
    originalPrice,
    savings,
    tones,
    hangingKitIncluded: row.hangingKitIncluded,
    hangingKitDescription: "Grade-316 stainless carabiners & chains included",
    gallery,
    shippingLogistics: {
      title: "Shipping & Doorstep Delivery",
      subtitle: "White-glove personalized delivery across India",
      tag: "Delivery & Transit",
      items: [
        {
          icon: "truck",
          title: "Complimentary Direct Freight",
          description:
            "Safely packaged and dispatched straight from our artisanal workshop.",
        },
        {
          icon: "shield",
          title: "Insured Transit Guarantee",
          description:
            "Every shipment is 100% insured against transit handling or damages.",
        },
      ],
    },
    careLogistics: {
      title: "Material Resilience & Care Guide",
      subtitle: "All-weather endurance engineered for outdoor elements",
      tag: "Craft & Care",
      items: [
        {
          icon: "sun",
          title: "UV-Resistant Polyethylene Wicker",
          description:
            "Formulated to resist fading, brittleness, and heat weathering under direct sunlight.",
        },
        {
          icon: "droplet",
          title: "Quick-Dry Hydrophobic Cushioning",
          description:
            "High-density foam with water-resistant Olefin upholstery.",
        },
      ],
    },
    reviews: [
      {
        id: "rev-1",
        author: "Meera K.",
        location: "Bengaluru, KA",
        timeAgo: "2 weeks ago",
        rating: 5,
        setupTag: "Balcony Sanctuary",
        quote:
          "The build quality is exceptional. It transformed our veranda into our absolute favorite spot in the house.",
        verified: true,
      },
      {
        id: "rev-2",
        author: "Rahul S.",
        location: "Mumbai, MH",
        timeAgo: "1 month ago",
        rating: 5,
        setupTag: "Garden Patio",
        quote:
          "Extremely comfortable and sturdy. Delivery was prompt and seamless.",
        verified: true,
      },
    ],
  };
}

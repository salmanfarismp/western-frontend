import { supabase } from "./client";
import type { HeroSectionJoined, ProductJoined } from "@/types/database";
import type { HeroSectionData, HeroFeaturedProduct } from "@/types/home";
import { mapProductJoinedToProduct } from "./mappers";
import { getBadgesMap } from "./products";
import { HERO_FEATURED } from "@/lib/data/home-data";

export const DEFAULT_HERO_TITLE = "Crafted for Quiet Moments & Gentle Breezes";
export const DEFAULT_HERO_SUBTITLE =
  "Surrender to the slow rhythm of the afternoon. When the sun hangs low and golden light spills across the deck, the WesternSwing Chair is waiting to welcome you home. Crafted with rugged, timeless elegance and engineered for a perfectly effortless sway, it invites you to kick off your boots, breathe in the open air, and let the motion set your pace.";

export async function getHeroSection(): Promise<HeroSectionData> {
  try {
    const { data, error } = await supabase
      .from("HeroSection")
      .select(`
        *,
        Product (
          *,
          ProductCategory (*),
          ProductImage (*),
          ProductColor (*, Color (*))
        )
      `)
      .eq("id", 1)
      .maybeSingle();

    if (error || !data) {
      if (error) {
        console.error("Failed to fetch HeroSection from database:", error);
      }
      return {
        title: DEFAULT_HERO_TITLE,
        subtitle: DEFAULT_HERO_SUBTITLE,
        featuredProduct: {
          id: HERO_FEATURED.slug,
          slug: HERO_FEATURED.slug,
          title: HERO_FEATURED.title,
          subtitle: HERO_FEATURED.subtitle,
          price: HERO_FEATURED.price,
          badge: HERO_FEATURED.badge,
          rating: HERO_FEATURED.rating,
          image: HERO_FEATURED.image,
          alt: HERO_FEATURED.alt,
        },
      };
    }

    const row = data as unknown as HeroSectionJoined;
    const title = row.title?.trim() || DEFAULT_HERO_TITLE;
    const subtitle = row.subtitle?.trim() || DEFAULT_HERO_SUBTITLE;

    let featuredProduct: HeroFeaturedProduct | null = null;

    if (row.Product && row.Product.is_active) {
      const badgesMap = await getBadgesMap();
      const product = mapProductJoinedToProduct(row.Product as ProductJoined, badgesMap);
      featuredProduct = {
        id: product.id,
        slug: product.slug || product.id,
        title: product.name,
        subtitle: product.subtitle || "Handcrafted Luxury",
        price: `₹${product.price.toLocaleString("en-IN")}`,
        badge: product.badge?.text || "Featured Architecture",
        rating: `${product.rating.toFixed(1)} / 5.0`,
        image: product.image,
        alt: product.alt || product.name,
      };
    } else {
      featuredProduct = {
        id: HERO_FEATURED.slug,
        slug: HERO_FEATURED.slug,
        title: HERO_FEATURED.title,
        subtitle: HERO_FEATURED.subtitle,
        price: HERO_FEATURED.price,
        badge: HERO_FEATURED.badge,
        rating: HERO_FEATURED.rating,
        image: HERO_FEATURED.image,
        alt: HERO_FEATURED.alt,
      };
    }

    return {
      title,
      subtitle,
      featuredProduct,
    };
  } catch (err) {
    console.error("Unexpected error in getHeroSection:", err);
    return {
      title: DEFAULT_HERO_TITLE,
      subtitle: DEFAULT_HERO_SUBTITLE,
      featuredProduct: {
        id: HERO_FEATURED.slug,
        slug: HERO_FEATURED.slug,
        title: HERO_FEATURED.title,
        subtitle: HERO_FEATURED.subtitle,
        price: HERO_FEATURED.price,
        badge: HERO_FEATURED.badge,
        rating: HERO_FEATURED.rating,
        image: HERO_FEATURED.image,
        alt: HERO_FEATURED.alt,
      },
    };
  }
}

import { supabase } from "./client";
import type { LifeStyleImageRow } from "@/types/database";
import { LOOKBOOK_POSTS } from "@/lib/data/home-data";
import { resolveMediaUrl, FALLBACK_IMAGE_URL } from "@/lib/utils/media";

/**
 * Fallback images from static lookbook posts if the database table is empty or unreachable.
 */
export const DEFAULT_LIFESTYLE_IMAGES: string[] = LOOKBOOK_POSTS.map(
  (post) => post.image
);

/**
 * Fetch raw LifeStyleImage rows from Supabase, sorted by idx (if present) or created_at/id.
 */
export async function getLifestyleImageRows(): Promise<LifeStyleImageRow[]> {
  try {
    const { data, error } = await supabase
      .from("LifeStyleImage")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error("Failed to fetch LifeStyleImage records:", error);
      return [];
    }

    const rows = (data as LifeStyleImageRow[]) || [];

    // Sort by idx ascending if present, otherwise keep id ordering
    return rows.sort((a, b) => {
      if (a.idx != null && b.idx != null) {
        return a.idx - b.idx;
      }
      return a.id - b.id;
    });
  } catch (err) {
    console.error("Unexpected error fetching LifeStyleImage rows:", err);
    return [];
  }
}

/**
 * Fetch lifestyle image URLs for the homepage lookbook gallery.
 * Resolves storage paths (e.g. 'lifestyle/ly5.jpeg') via resolveMediaUrl.
 * Gracefully falls back to default lookbook images if database yields no records.
 */
export async function getLifestyleImages(): Promise<string[]> {
  try {
    const rows = await getLifestyleImageRows();
    const urls = rows
      .map((row) => (row.img_url ? resolveMediaUrl(row.img_url) : null))
      .filter(
        (url): url is string =>
          Boolean(url && url.trim().length > 0 && url !== FALLBACK_IMAGE_URL)
      );

    if (urls.length > 0) {
      return urls;
    }

    return DEFAULT_LIFESTYLE_IMAGES;
  } catch (err) {
    console.error("Unexpected error in getLifestyleImages:", err);
    return DEFAULT_LIFESTYLE_IMAGES;
  }
}

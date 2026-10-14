import { supabase } from "./client";
import type { ReviewRow, ReviewJoined } from "@/types/database";
import type { CustomerReview } from "@/types/home";
import type { ProductReviewItem } from "@/lib/data/product-detail-data";
import { resolveMediaUrl } from "@/lib/utils/media";

/**
 * Format a timestamp into a human-readable relative time string.
 */
export function formatRelativeTime(dateString: string | null | undefined): string {
  if (!dateString) return "Recently";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Recently";

  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "Just now";
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays} ${diffInDays === 1 ? "day" : "days"} ago`;
  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 5) return `${diffInWeeks} ${diffInWeeks === 1 ? "week" : "weeks"} ago`;
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) return `${diffInMonths} ${diffInMonths === 1 ? "month" : "months"} ago`;
  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears} ${diffInYears === 1 ? "year" : "years"} ago`;
}

/**
 * Fetch all active highlighted customer reviews for display on the home page.
 * Returns an empty array if no active highlighted reviews exist.
 */
export async function getHighlightedReviews(): Promise<CustomerReview[]> {
  try {
    const { data, error } = await supabase
      .from("Review")
      .select(`
        *,
        Product (
          id,
          name,
          slug
        )
      `)
      .eq("is_active", true)
      .eq("highlighted", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Failed to fetch highlighted reviews from Supabase:", error);
      return [];
    }

    const rows = (data as unknown as ReviewJoined[]) || [];
    return rows.map((row) => ({
      id: String(row.id),
      author: row.name?.trim() || "Verified Customer",
      location: row.location?.trim() || undefined,
      quote: row.message?.trim() || "",
      rating: Number(row.rating ?? 5),
      productPurchased: row.Product?.name || "Westernswings Handcrafted Piece",
      image: resolveMediaUrl(row.img_url),
      alt: row.name ? `Customer review by ${row.name}` : "Customer review",
      verified: Boolean(row.is_verified),
    }));
  } catch (err) {
    console.error("Unexpected error in getHighlightedReviews:", err);
    return [];
  }
}

/**
 * Fetch all active reviews for a specific product.
 * Returns an empty array if no active reviews exist for this product.
 */
export async function getProductReviews(productId: string): Promise<ProductReviewItem[]> {
  try {
    const { data, error } = await supabase
      .from("Review")
      .select("*")
      .eq("product_id", productId)
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(`Failed to fetch reviews for product (${productId}):`, error);
      return [];
    }

    const rows = (data as ReviewRow[]) || [];
    return rows.map((row) => ({
      id: String(row.id),
      author: row.name?.trim() || "Verified Buyer",
      location: row.location?.trim() || "Verified Buyer",
      timeAgo: formatRelativeTime(row.created_at),
      rating: Number(row.rating ?? 5),
      quote: row.message?.trim() || "",
      image: row.img_url ? resolveMediaUrl(row.img_url) : undefined,
      verified: Boolean(row.is_verified),
      replay: row.replay?.trim() || null,
    }));
  } catch (err) {
    console.error(`Unexpected error in getProductReviews (${productId}):`, err);
    return [];
  }
}

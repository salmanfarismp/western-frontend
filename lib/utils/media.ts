const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://wclcgdtqhdamtjbydyeo.supabase.co";
const STORAGE_BUCKET = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || "production";

export const FALLBACK_IMAGE_URL = "/assets/general-img-square.png";

/**
 * Resolves an image path from Supabase storage, external URL, or relative path.
 * Defaults to FALLBACK_IMAGE_URL (/assets/general-img-square.png) when no path is provided.
 */
export function resolveMediaUrl(path: string | null | undefined): string {
  if (!path || path.trim() === "") return FALLBACK_IMAGE_URL;
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `${SUPABASE_URL}/storage/v1/object/public/${STORAGE_BUCKET}/${cleanPath}`;
}

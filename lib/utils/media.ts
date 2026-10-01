const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://wclcgdtqhdamtjbydyeo.supabase.co";
const STORAGE_BUCKET = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || "production";

/**
 * Resolves an image path from Supabase storage, external URL, or relative path.
 * Strict resolution without fallbacks to local dummy assets.
 */
export function resolveMediaUrl(path: string | null | undefined): string {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `${SUPABASE_URL}/storage/v1/object/public/${STORAGE_BUCKET}/${cleanPath}`;
}

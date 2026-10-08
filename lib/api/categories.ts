import { supabase } from "./client";
import type { ProductCategoryRow } from "@/types/database";
import type { CategorySilhouette } from "@/types/home";
import { mapCategoryRowToSilhouette } from "./mappers";

export async function getCategories(): Promise<ProductCategoryRow[]> {
  const { data, error } = await supabase
    .from("ProductCategory")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }

  return data || [];
}

export async function getCategorySilhouettes(): Promise<CategorySilhouette[]> {
  const categories = await getCategories();
  return categories.map(mapCategoryRowToSilhouette);
}

const CATEGORY_SLUG_ALIASES: Record<string, string> = {
  single: "single-swing-chair",
  double: "double-swing-chair",
  swingbed: "swing-bed",
  daybed: "swing-bed",
  stands: "swing-chair-accessories",
  accessories: "swing-chair-accessories",
};

export async function getCategoryBySlug(
  slug: string,
): Promise<ProductCategoryRow | null> {
  if (!slug || slug === "all") return null;

  const normalizedSlug = CATEGORY_SLUG_ALIASES[slug.toLowerCase()] || slug;

  // 1. Try exact slug match
  const { data, error } = await supabase
    .from("ProductCategory")
    .select("*")
    .eq("slug", normalizedSlug)
    .maybeSingle();

  if (!error && data) {
    return data;
  }

  // 2. Fallback: If slug is numeric, match by ID
  if (/^\d+$/.test(slug)) {
    const { data: byId } = await supabase
      .from("ProductCategory")
      .select("*")
      .eq("id", parseInt(slug, 10))
      .maybeSingle();

    if (byId) return byId;
  }

  // 3. Fallback: Prefix / substring match across existing categories
  const allCategories = await getCategories();
  const matched = allCategories.find((cat) => {
    if (!cat.slug) return false;
    const catSlug = cat.slug.toLowerCase();
    const query = slug.toLowerCase();
    return catSlug.includes(query) || query.includes(catSlug);
  });

  return matched || null;
}

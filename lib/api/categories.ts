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

export async function getCategoryBySlug(
  slug: string,
): Promise<ProductCategoryRow | null> {
  const { data, error } = await supabase
    .from("ProductCategory")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error(`Failed to fetch category with slug ${slug}:`, error);
    return null;
  }

  return data;
}

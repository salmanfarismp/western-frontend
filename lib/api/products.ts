import { supabase } from "./client";
import type { ProductJoined, BadgeRow } from "@/types/database";
import type { Product } from "@/types/home";
import type { ProductDetailData } from "@/lib/data/product-detail-data";
import { mapProductJoinedToProduct, mapProductJoinedToDetail } from "./mappers";
import { getCategoryBySlug } from "./categories";

let cachedBadges: Map<number, BadgeRow> | null = null;

async function getBadgesMap(): Promise<Map<number, BadgeRow>> {
  if (cachedBadges) return cachedBadges;
  const { data, error } = await supabase.from("Badge").select("*");
  const map = new Map<number, BadgeRow>();
  if (!error && data) {
    data.forEach((b: BadgeRow) => map.set(b.id, b));
    cachedBadges = map;
  }
  return map;
}

export interface GetProductsParams {
  categorySlug?: string;
  categoryId?: number;
  limit?: number;
}

export async function getProducts(params?: GetProductsParams): Promise<Product[]> {
  let query = supabase
    .from("Product")
    .select(`
      *,
      ProductCategory(*),
      ProductImage(*),
      ProductColor(*, Color(*))
    `)
    .order("created_at", { ascending: false });

  if (params?.categoryId) {
    query = query.eq("category", params.categoryId);
  } else if (params?.categorySlug && params.categorySlug !== "all") {
    const category = await getCategoryBySlug(params.categorySlug);
    if (category) {
      query = query.eq("category", category.id);
    }
  }

  if (params?.limit) {
    query = query.limit(params.limit);
  }

  const [productsRes, badgesMap] = await Promise.all([
    query,
    getBadgesMap(),
  ]);

  if (productsRes.error) {
    console.error("Failed to fetch products:", productsRes.error);
    return [];
  }

  const rows = (productsRes.data as unknown as ProductJoined[]) || [];
  return rows.map((row) => mapProductJoinedToProduct(row, badgesMap));
}

export async function getProductBySlug(slug: string): Promise<ProductDetailData | null> {
  const selectQuery = `
    *,
    ProductCategory(*),
    ProductImage(*),
    ProductColor(*, Color(*))
  `;

  // First try fetching by slug
  let { data, error } = await supabase
    .from("Product")
    .select(selectQuery)
    .eq("slug", slug)
    .maybeSingle();

  // If not found by slug and slug is a valid UUID, fallback to lookup by id
  if (!data && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slug)) {
    const idRes = await supabase
      .from("Product")
      .select(selectQuery)
      .eq("id", slug)
      .maybeSingle();
    data = idRes.data;
    error = idRes.error;
  }

  if (error || !data) {
    if (slug === "savannah-double-cocoon" || slug === "the-savannah-double-cocoon" || slug === "the-solstice-cocoon-egg") {
      const { SAVANNAH_DOUBLE_COCOON } = await import("@/lib/data/product-detail-data");
      return SAVANNAH_DOUBLE_COCOON;
    }
    if (error) console.error(`Failed to fetch product (${slug}):`, error);
    return null;
  }

  const badgesMap = await getBadgesMap();
  return mapProductJoinedToDetail(data as unknown as ProductJoined, badgesMap);
}

export async function getSimilarProducts(
  categoryId: number,
  excludeProductId: string,
  limit: number = 4,
): Promise<Product[]> {
  const [productsRes, badgesMap] = await Promise.all([
    supabase
      .from("Product")
      .select(`
        *,
        ProductCategory(*),
        ProductImage(*),
        ProductColor(*, Color(*))
      `)
      .eq("category", categoryId)
      .neq("id", excludeProductId)
      .limit(limit),
    getBadgesMap(),
  ]);

  if (productsRes.error) {
    console.error("Failed to fetch similar products:", productsRes.error);
    return [];
  }

  const rows = (productsRes.data as unknown as ProductJoined[]) || [];
  return rows.map((row) => mapProductJoinedToProduct(row, badgesMap));
}

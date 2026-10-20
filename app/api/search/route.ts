import { NextRequest, NextResponse } from "next/server";
import { getProducts } from "@/lib/api/products";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") || "";
    const limit = Math.min(
      Math.max(parseInt(searchParams.get("limit") || "5", 10), 1),
      20
    );

    if (!query.trim()) {
      return NextResponse.json({ products: [] });
    }

    const products = await getProducts({
      search: query,
      limit,
    });

    const results = products.map((p) => ({
      id: p.id,
      slug: p.slug,
      name: p.name,
      category: p.category,
      subtitle: p.subtitle,
      price: p.price,
      originalPrice: p.originalPrice,
      image: p.image,
      alt: p.alt,
      badge: p.badge,
    }));

    return NextResponse.json({
      products: results,
      total: results.length,
    });
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json(
      { error: "Failed to perform search", products: [] },
      { status: 500 }
    );
  }
}

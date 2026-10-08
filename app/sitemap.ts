import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config/site";
import { getCategories } from "@/lib/api/categories";
import { getProducts } from "@/lib/api/products";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts({ limit: 50 }),
  ]);

  const now = new Date();

  // Core static pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${siteConfig.url}/collections`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  // Category collection routes
  const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${siteConfig.url}/collections?category=${cat.slug || cat.id}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Product detail routes
  const productRoutes: MetadataRoute.Sitemap = products.map((prod) => ({
    url: `${siteConfig.url}/product/${prod.slug || prod.id}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}

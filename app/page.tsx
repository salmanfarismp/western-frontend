import { HomeView } from "@/components/modules/home";
import { getCategories, getCategorySilhouettes } from "@/lib/api/categories";
import { getProducts } from "@/lib/api/products";

export const revalidate = 60; // revalidate every 60 seconds

export default async function HomePage() {
  const [categories, categorySilhouettes, products] = await Promise.all([
    getCategories(),
    getCategorySilhouettes(),
    getProducts({ limit: 16 }),
  ]);

  return (
    <HomeView
      categories={categories}
      categorySilhouettes={categorySilhouettes}
      products={products}
    />
  );
}

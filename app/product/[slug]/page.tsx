import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailView } from "@/components/modules/product-detail";
import { getProductBySlug, getSimilarProducts } from "@/lib/api/products";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60; // revalidate every 60 seconds

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found | Westernswings",
      description: "The requested swing chair could not be found.",
    };
  }

  return {
    title: `${product.name} | Westernswings Sanctuary Living`,
    description: product.subtitle || product.description,
    openGraph: {
      title: `${product.name} | Westernswings`,
      description: product.subtitle || product.description,
      images: [
        {
          url: product.gallery[0]?.src || "",
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Fetch similar products in the same category
  const similarProducts = product.categoryId
    ? await getSimilarProducts(product.categoryId, product.id, 4)
    : [];

  return (
    <ProductDetailView
      product={product}
      similarProducts={similarProducts}
    />
  );
}

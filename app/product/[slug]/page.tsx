import type { Metadata } from "next";
import { ProductDetailView } from "@/components/modules/product-detail";
import { getProductDetailBySlug } from "@/lib/data/product-detail-data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductDetailBySlug(slug);

  return {
    title: `${product.name} | Westernswings Sanctuary Living`,
    description: product.subtitle,
    openGraph: {
      title: `${product.name} | Westernswings`,
      description: product.subtitle,
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
  const product = getProductDetailBySlug(slug);

  return <ProductDetailView product={product} />;
}

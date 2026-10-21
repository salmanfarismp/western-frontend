import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailView } from "@/components/modules/product-detail";
import { getProductBySlug, getProducts, getSimilarProducts } from "@/lib/api/products";
import { getFaqs } from "@/lib/api/faq";
import { siteConfig } from "@/lib/config/site";
import { generateProductStructuredData } from "@/lib/seo/product-schema";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60; // revalidate every 60 seconds

export async function generateStaticParams() {
  const products = await getProducts({ limit: 50 });
  return products.map((p) => ({
    slug: p.slug || p.id,
  }));
}

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

  const title = `${product.name} | Luxury Outdoor Swing chairs`;
  const description =
    product.description ||
    product.subtitle ||
    "Fine crafted outdoor swing engineered with marine-grade hardware, hand-woven UV resin fibers, and kiln-dried FSC teak for years of unhurried mornings.";

  const canonicalUrl = `${siteConfig.url}/product/${product.slug || product.id}`;
  const primaryImage = product.gallery[0]?.src || siteConfig.ogImage;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${title} | Westernswings`,
      description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      images: [
        {
          url: primaryImage,
          width: 1200,
          height: 630,
          alt: `${product.name} Swing Chair`,
        },
      ],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Westernswings`,
      description,
      images: [primaryImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Fetch similar products in the same category and unified FAQs in parallel
  const [similarProducts, faqs] = await Promise.all([
    product.categoryId
      ? getSimilarProducts(product.categoryId, product.id, 4)
      : Promise.resolve([]),
    getFaqs(),
  ]);

  const structuredData = generateProductStructuredData(product, faqs);

  return (
    <>
      {/* Schema.org JSON-LD Structured Data: Product + Offer + Breadcrumbs + Product FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <ProductDetailView
        product={product}
        similarProducts={similarProducts}
        faqs={faqs}
      />
    </>
  );
}

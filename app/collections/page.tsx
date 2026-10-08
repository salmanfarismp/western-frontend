import type { Metadata } from "next";
import {
  AnnouncementBar,
  Navbar,
  Footer,
  WhatsAppButton,
} from "@/components/common";
import { LookbookGallery } from "@/components/modules/home";
import {
  ProductsHero,
  ProductsGrid,
  CollectionsFaqSection,
} from "@/components/modules/products-list";
import { getCategories, getCategoryBySlug } from "@/lib/api/categories";
import { getProducts } from "@/lib/api/products";
import { siteConfig } from "@/lib/config/site";
import { generateCollectionsStructuredData } from "@/lib/seo/collections-schema";
import type { ProductCategory } from "@/types/home";

export const revalidate = 60; // ISR cache revalidation every 60 seconds

interface CollectionsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({
  searchParams,
}: CollectionsPageProps): Promise<Metadata> {
  const resolvedParams = await searchParams;
  const categoryParam =
    typeof resolvedParams.category === "string" ? resolvedParams.category : "all";

  const categoryRow =
    categoryParam !== "all" ? await getCategoryBySlug(categoryParam) : null;

  const isFiltered = categoryParam !== "all";
  const categoryName =
    categoryRow?.name ||
    (isFiltered
      ? categoryParam
          .replace(/-/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase())
      : "All Swings");

  const title = isFiltered
    ? `${categoryName} | Luxury Outdoor Swings Collection`
    : "All Outdoor Swings & Patio Daybeds | Handcrafted Collection";

  const description =
    categoryRow?.nick_name ||
    "Explore our complete range of handcrafted outdoor egg chairs, two-person loveseats, and solid teak porch daybeds engineered for slow, tranquil living.";

  const canonicalUrl = isFiltered
    ? `${siteConfig.url}/collections?category=${encodeURIComponent(categoryParam)}`
    : `${siteConfig.url}/collections`;

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
          url: categoryRow?.img_url || siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: `${categoryName} Westernswings Luxury Outdoor Furniture`,
        },
      ],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Westernswings`,
      description,
      images: [categoryRow?.img_url || siteConfig.ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
      },
    },
  };
}

export default async function CollectionsPage({
  searchParams,
}: CollectionsPageProps) {
  const resolvedParams = await searchParams;
  const categoryParam =
    (typeof resolvedParams.category === "string"
      ? resolvedParams.category
      : "all") as ProductCategory;

  const [categories, categoryRow, products] = await Promise.all([
    getCategories(),
    categoryParam !== "all" ? getCategoryBySlug(categoryParam) : null,
    getProducts({
      categorySlug: categoryParam === "all" ? undefined : categoryParam,
    }),
  ]);

  const structuredData = generateCollectionsStructuredData({
    categorySlug: categoryParam,
    categoryRow,
    products,
  });

  return (
    <div className="min-h-screen bg-canvas-linen text-espresso-rich flex flex-col selection:bg-sand-tint selection:text-espresso-rich">
      {/* Schema.org JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      {/* Top Announcements */}
      <AnnouncementBar />

      {/* Main Navigation Header (Client Island) */}
      <Navbar cartCount={3} showSearch={false} />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {/* Curated Collection Hero & Category Filter Navigation (SSR with Semantic Links) */}
        <ProductsHero
          activeCategory={categoryParam}
          categories={categories}
          totalModels={products.length}
        />

        {/* Product Grid (Pre-rendered on Server, Instant HTML) */}
        <ProductsGrid products={products} />

        {/* Sizing, Mounting & Care Guide FAQ (SSR Semantic Q&A for AEO) */}
        <CollectionsFaqSection />

        {/* Community & Instagram Lookbook 3D Gallery (Client Island) */}
        <LookbookGallery />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Concierge Action */}
      <WhatsAppButton />
    </div>
  );
}

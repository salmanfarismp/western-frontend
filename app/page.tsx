import type { Metadata } from "next";
import { HomeView } from "@/components/modules/home";
import { getCategories, getCategorySilhouettes } from "@/lib/api/categories";
import { getProducts } from "@/lib/api/products";
import { getHeroSection } from "@/lib/api/hero";
import { getLifestyleImages } from "@/lib/api/lifestyle";
import { siteConfig } from "@/lib/config/site";
import { generateHomeStructuredData } from "@/lib/seo/home-schema";

export const revalidate = 60; // revalidate ISR cache every 60 seconds

export const metadata: Metadata = {
  title: "Westernswings™ | Fine-crafted Swing Chairs",
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: "Westernswings™ | Fine-crafted Swing Chairs",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Westernswings Fine-crafted Swing chairs in Wayanad, Kerala",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Westernswings™ | Fine-crafted Swing Chairs",
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function HomePage() {
  const [categories, categorySilhouettes, products, heroData, lifestyleImages] =
    await Promise.all([
      getCategories(),
      getCategorySilhouettes(),
      getProducts({ limit: 4 }),
      getHeroSection(),
      getLifestyleImages(),
    ]);

  const structuredData = generateHomeStructuredData(products);

  return (
    <>
      {/* Schema.org JSON-LD Structured Data for Search & Answer Engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <HomeView
        categories={categories}
        categorySilhouettes={categorySilhouettes}
        products={products}
        heroData={heroData}
        lifestyleImages={lifestyleImages}
      />
    </>
  );
}

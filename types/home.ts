export type ProductCategory = "all" | "single" | "double" | "daybed" | "stands";

export interface ProductTone {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  subtitle: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  badge?: {
    text: string;
    variant: "botanical" | "terracotta" | "material" | "outline";
  };
  image: string;
  alt: string;
  tones: ProductTone[];
  specs?: string;
  hardware?: string[];
}

export interface CategorySilhouette {
  id: string;
  name: string;
  description: string;
  countLabel: string;
  image: string;
  alt: string;
  href: string;
}

export interface CraftPillar {
  id: string;
  title: string;
  description: string;
  icon: "steel" | "rattan" | "cushion";
  metricPercentage: number;
  metricLabel: string;
}

export interface MetricHighlight {
  value: string;
  label: string;
  subtext: string;
}

export interface CustomerReview {
  id: string;
  author: string;
  quote: string;
  location?: string;
  rating: number;
  productPurchased: string;
  image: string;
  alt: string;
  verified: boolean;
}

export interface InstagramPost {
  id: string;
  image: string;
  alt: string;
  link: string;
  title?: string;
}

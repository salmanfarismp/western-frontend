export interface ProductCategoryRow {
  id: number;
  created_at: string;
  name: string | null;
  slug: string | null;
  nick_name: string | null;
  img_url: string | null;
}

export interface ProductRow {
  id: string;
  created_at: string;
  name: string;
  slug: string;
  category: number | null;
  subtitle: string | null;
  description: string | null;
  price: number;
  original_price: number | null;
  computed_rating: number | null;
  computed_review_count: number | null;
  badge: number | null;
  hangingKitIncluded: boolean;
  is_active: boolean;
}

export interface ProductImageRow {
  id: number;
  created_at: string;
  product_id: string;
  img_url: string;
  alt: string | null;
  display_order: number | null;
  is_primary: boolean | null;
}

export interface ColorRow {
  id: number;
  created_at: string;
  name: string;
  hashcode: string;
}

export interface ProductColorRow {
  id: number;
  created_at: string;
  product_id: string | null;
  color_id: number | null;
  Color?: ColorRow | null;
}

export interface BadgeRow {
  id: number;
  created_at: string;
  name: string;
  theme: string;
}

export interface ProductJoined extends ProductRow {
  ProductCategory?: ProductCategoryRow | null;
  ProductImage?: ProductImageRow[];
  ProductColor?: ProductColorRow[];
}

export interface HeroSectionRow {
  id: number;
  created_at: string;
  product: string | null;
  title: string | null;
  subtitle: string | null;
}

export interface HeroSectionJoined extends HeroSectionRow {
  Product?: ProductJoined | null;
}

export interface LifeStyleImageRow {
  id: number;
  idx?: number | null;
  created_at: string;
  img_url: string | null;
}

export interface FaqRow {
  id: number;
  created_at: string;
  question: string | null;
  answer: string | null;
  is_active: boolean | null;
}

export interface ReviewRow {
  id: number;
  created_at: string;
  name: string | null;
  location: string | null;
  message: string | null;
  product_id: string | null;
  rating: number | null;
  img_url: string | null;
  is_verified: boolean | null;
  highlighted: boolean | null;
  is_active: boolean | null;
  replay: string | null;
}

export interface ReviewJoined extends ReviewRow {
  Product?: {
    id: string;
    name: string;
    slug?: string | null;
  } | null;
}

export interface CartRow {
  id: number;
  created_at: string;
  device_id: string | null;
  profile: number | null;
}

export interface CartItemRow {
  id: number;
  created_at: string;
  product: string;
  quantity: number;
  cart: number;
}

export interface CartItemJoined extends CartItemRow {
  Product?: ProductJoined | null;
}


import type { CartRow } from "./database";

export interface FormattedCartItem {
  id: number; // CartItem row id
  productId: string; // Product uuid
  name: string;
  subtitle: string;
  slug: string;
  price: number;
  originalPrice: number | null;
  image: string;
  quantity: number;
  lineTotal: number;
  isAvailable: boolean;
}

export interface CartData {
  cart: CartRow | null;
  items: FormattedCartItem[];
  cartCount: number;
  subtotal: number;
  originalSubtotal: number;
  savings: number;
}

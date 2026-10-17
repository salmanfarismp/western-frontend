import { supabase } from "./client";
import type { CartRow, CartItemJoined } from "@/types/database";
import type { CartData, FormattedCartItem } from "@/types/cart";
import { resolveMediaUrl, FALLBACK_IMAGE_URL } from "@/lib/utils/media";

const EMPTY_CART: CartData = {
  cart: null,
  items: [],
  cartCount: 0,
  subtotal: 0,
  originalSubtotal: 0,
  savings: 0,
};

function formatCartItems(rawItems: CartItemJoined[]): FormattedCartItem[] {
  return rawItems
    .filter((item) => item.Product != null)
    .map((item) => {
      const product = item.Product!;
      const primaryImg =
        product.ProductImage?.find((img) => img.is_primary)?.img_url ||
        product.ProductImage?.sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0))[0]?.img_url;

      const price = Number(product.price) || 0;
      const originalPrice = product.original_price ? Number(product.original_price) : null;
      const qty = Number(item.quantity) || 1;
      const lineTotal = price * qty;

      return {
        id: item.id,
        productId: product.id,
        name: product.name,
        subtitle: product.subtitle || "",
        slug: product.slug || product.id,
        price,
        originalPrice,
        image: resolveMediaUrl(primaryImg || FALLBACK_IMAGE_URL),
        quantity: qty,
        lineTotal,
        isAvailable: Boolean(product.is_active),
      };
    });
}

function computeSummary(cart: CartRow | null, items: FormattedCartItem[]): CartData {
  let cartCount = 0;
  let subtotal = 0;
  let originalSubtotal = 0;

  for (const item of items) {
    cartCount += item.quantity;
    subtotal += item.lineTotal;
    originalSubtotal += (item.originalPrice ?? item.price) * item.quantity;
  }

  const savings = Math.max(0, originalSubtotal - subtotal);

  return {
    cart,
    items,
    cartCount,
    subtotal,
    originalSubtotal,
    savings,
  };
}

export async function getOrCreateCart(deviceId: string): Promise<CartRow | null> {
  if (!deviceId) return null;

  try {
    // 1. Try to find existing active cart for this device
    const { data, error } = await supabase
      .from("Cart")
      .select("*")
      .eq("device_id", deviceId)
      .is("profile", null)
      .order("id", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!error && data) {
      return data as CartRow;
    }

    // 2. If not found, create a new cart
    const { data: newCart, error: insertError } = await supabase
      .from("Cart")
      .insert({ device_id: deviceId })
      .select("*")
      .single();

    if (insertError) {
      console.error("Failed to create new cart:", insertError);
      return null;
    }

    return newCart as CartRow;
  } catch (err) {
    console.error("Error in getOrCreateCart:", err);
    return null;
  }
}

export async function fetchCartWithItems(deviceId: string): Promise<CartData> {
  if (!deviceId) return EMPTY_CART;

  try {
    const cart = await getOrCreateCart(deviceId);
    if (!cart) return EMPTY_CART;

    const { data, error } = await supabase
      .from("CartItem")
      .select(`
        *,
        Product (
          *,
          ProductCategory (*),
          ProductImage (*),
          ProductColor (*, Color (*))
        )
      `)
      .eq("cart", cart.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Failed to fetch cart items:", error);
      return computeSummary(cart, []);
    }

    const items = formatCartItems((data as unknown as CartItemJoined[]) || []);
    return computeSummary(cart, items);
  } catch (err) {
    console.error("Error in fetchCartWithItems:", err);
    return EMPTY_CART;
  }
}

export async function addItemToCart(
  deviceId: string,
  productId: string,
  quantity: number = 1
): Promise<CartData> {
  if (!deviceId || !productId || quantity <= 0) {
    return fetchCartWithItems(deviceId);
  }

  try {
    const cart = await getOrCreateCart(deviceId);
    if (!cart) return EMPTY_CART;

    // Check if the item already exists in this cart
    const { data: existingItem, error: checkError } = await supabase
      .from("CartItem")
      .select("id, quantity")
      .eq("cart", cart.id)
      .eq("product", productId)
      .maybeSingle();

    if (checkError && checkError.code !== "PGRST116") {
      console.error("Error checking existing cart item:", checkError);
    }

    if (existingItem) {
      const newQty = Number(existingItem.quantity) + quantity;
      const { error: updateError } = await supabase
        .from("CartItem")
        .update({ quantity: newQty })
        .eq("id", existingItem.id);

      if (updateError) {
        console.error("Failed to update cart item quantity:", updateError);
      }
    } else {
      const { error: insertError } = await supabase
        .from("CartItem")
        .insert({
          cart: cart.id,
          product: productId,
          quantity,
        });

      if (insertError) {
        console.error("Failed to insert cart item:", insertError);
      }
    }

    return await fetchCartWithItems(deviceId);
  } catch (err) {
    console.error("Error in addItemToCart:", err);
    return fetchCartWithItems(deviceId);
  }
}

export async function updateCartItemQty(
  deviceId: string,
  cartItemId: number,
  quantity: number
): Promise<CartData> {
  if (quantity <= 0) {
    return removeCartItem(deviceId, cartItemId);
  }

  try {
    const { error } = await supabase
      .from("CartItem")
      .update({ quantity })
      .eq("id", cartItemId);

    if (error) {
      console.error("Failed to update cart item quantity:", error);
    }

    return await fetchCartWithItems(deviceId);
  } catch (err) {
    console.error("Error in updateCartItemQty:", err);
    return fetchCartWithItems(deviceId);
  }
}

export async function removeCartItem(
  deviceId: string,
  cartItemId: number
): Promise<CartData> {
  try {
    const { error } = await supabase
      .from("CartItem")
      .delete()
      .eq("id", cartItemId);

    if (error) {
      console.error("Failed to remove cart item:", error);
    }

    return await fetchCartWithItems(deviceId);
  } catch (err) {
    console.error("Error in removeCartItem:", err);
    return fetchCartWithItems(deviceId);
  }
}

export async function clearCart(deviceId: string): Promise<CartData> {
  try {
    const cart = await getOrCreateCart(deviceId);
    if (!cart) return EMPTY_CART;

    const { error } = await supabase
      .from("CartItem")
      .delete()
      .eq("cart", cart.id);

    if (error) {
      console.error("Failed to clear cart:", error);
    }

    return await fetchCartWithItems(deviceId);
  } catch (err) {
    console.error("Error in clearCart:", err);
    return fetchCartWithItems(deviceId);
  }
}

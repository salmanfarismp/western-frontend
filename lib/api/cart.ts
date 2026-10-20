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

export async function getOrCreateCart(
  deviceId: string,
  profileId?: string | null
): Promise<CartRow | null> {
  if (!deviceId && !profileId) return null;

  try {
    // 1. If user is authenticated (profileId provided):
    if (profileId) {
      // Find existing active cart for this profile
      const { data: userCart, error: userCartErr } = await supabase
        .from("Cart")
        .select("*")
        .eq("profile_id", profileId)
        .order("id", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (userCartErr) {
        console.error("Error fetching user cart:", userCartErr);
      }

      // Check if there is an unattached guest cart for this device
      let guestCart: CartRow | null = null;
      if (deviceId) {
        const { data: gCart } = await supabase
          .from("Cart")
          .select("*")
          .eq("device_id", deviceId)
          .is("profile_id", null)
          .order("id", { ascending: false })
          .limit(1)
          .maybeSingle();
        guestCart = gCart as CartRow | null;
      }

      if (userCart) {
        // If there was also a guest cart with items, migrate them into the user cart
        if (guestCart && guestCart.id !== userCart.id) {
          const { data: guestItems } = await supabase
            .from("CartItem")
            .select("*")
            .eq("cart", guestCart.id);

          if (guestItems && guestItems.length > 0) {
            for (const gItem of guestItems) {
              const { data: existingInUser } = await supabase
                .from("CartItem")
                .select("id, quantity")
                .eq("cart", userCart.id)
                .eq("product", gItem.product)
                .maybeSingle();

              if (existingInUser) {
                await supabase
                  .from("CartItem")
                  .update({ quantity: Number(existingInUser.quantity) + Number(gItem.quantity) })
                  .eq("id", existingInUser.id);
              } else {
                await supabase
                  .from("CartItem")
                  .insert({
                    cart: userCart.id,
                    product: gItem.product,
                    quantity: gItem.quantity,
                  });
              }
            }
          }
          // Clean up old guest cart
          await supabase.from("CartItem").delete().eq("cart", guestCart.id);
          await supabase.from("Cart").delete().eq("id", guestCart.id);
        }
        return userCart as CartRow;
      }

      // If user does not have an existing cart, but has a guest cart: claim it!
      if (guestCart) {
        const { data: claimedCart, error: claimErr } = await supabase
          .from("Cart")
          .update({ profile_id: profileId })
          .eq("id", guestCart.id)
          .select("*")
          .single();

        if (!claimErr && claimedCart) {
          return claimedCart as CartRow;
        }
      }

      // If neither exists, create a new cart linked to profile_id
      const { data: newCart, error: insertError } = await supabase
        .from("Cart")
        .insert({
          profile_id: profileId,
          device_id: deviceId || null,
        })
        .select("*")
        .single();

      if (insertError) {
        console.error("Failed to create new user cart:", insertError);
        return null;
      }

      return newCart as CartRow;
    }

    // 2. Guest user (no profileId): find cart by device_id where profile_id is NULL
    const { data: guestCart, error: guestErr } = await supabase
      .from("Cart")
      .select("*")
      .eq("device_id", deviceId)
      .is("profile_id", null)
      .order("id", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!guestErr && guestCart) {
      return guestCart as CartRow;
    }

    // Create a new guest cart
    const { data: newGuestCart, error: insertError } = await supabase
      .from("Cart")
      .insert({
        device_id: deviceId,
        profile_id: null,
      })
      .select("*")
      .single();

    if (insertError) {
      console.error("Failed to create new guest cart:", insertError);
      return null;
    }

    return newGuestCart as CartRow;
  } catch (err) {
    console.error("Error in getOrCreateCart:", err);
    return null;
  }
}

export async function fetchCartWithItems(
  deviceId: string,
  profileId?: string | null
): Promise<CartData> {
  if (!deviceId && !profileId) return EMPTY_CART;

  try {
    const cart = await getOrCreateCart(deviceId, profileId);
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
  quantity: number = 1,
  profileId?: string | null
): Promise<CartData> {
  if ((!deviceId && !profileId) || !productId || quantity <= 0) {
    return fetchCartWithItems(deviceId, profileId);
  }

  try {
    const cart = await getOrCreateCart(deviceId, profileId);
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

    return await fetchCartWithItems(deviceId, profileId);
  } catch (err) {
    console.error("Error in addItemToCart:", err);
    return fetchCartWithItems(deviceId, profileId);
  }
}

export async function updateCartItemQty(
  deviceId: string,
  cartItemId: number,
  quantity: number,
  profileId?: string | null
): Promise<CartData> {
  if (quantity <= 0) {
    return removeCartItem(deviceId, cartItemId, profileId);
  }

  try {
    const { error } = await supabase
      .from("CartItem")
      .update({ quantity })
      .eq("id", cartItemId);

    if (error) {
      console.error("Failed to update cart item quantity:", error);
    }

    return await fetchCartWithItems(deviceId, profileId);
  } catch (err) {
    console.error("Error in updateCartItemQty:", err);
    return fetchCartWithItems(deviceId, profileId);
  }
}

export async function removeCartItem(
  deviceId: string,
  cartItemId: number,
  profileId?: string | null
): Promise<CartData> {
  try {
    const { error } = await supabase
      .from("CartItem")
      .delete()
      .eq("id", cartItemId);

    if (error) {
      console.error("Failed to remove cart item:", error);
    }

    return await fetchCartWithItems(deviceId, profileId);
  } catch (err) {
    console.error("Error in removeCartItem:", err);
    return fetchCartWithItems(deviceId, profileId);
  }
}

export async function clearCart(
  deviceId: string,
  profileId?: string | null
): Promise<CartData> {
  try {
    const cart = await getOrCreateCart(deviceId, profileId);
    if (!cart) return EMPTY_CART;

    const { error } = await supabase
      .from("CartItem")
      .delete()
      .eq("cart", cart.id);

    if (error) {
      console.error("Failed to clear cart:", error);
    }

    return await fetchCartWithItems(deviceId, profileId);
  } catch (err) {
    console.error("Error in clearCart:", err);
    return fetchCartWithItems(deviceId, profileId);
  }
}

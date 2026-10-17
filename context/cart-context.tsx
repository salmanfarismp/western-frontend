"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useTransition,
} from "react";
import type { FormattedCartItem, CartData } from "@/types/cart";
import {
  fetchCartWithItems,
  addItemToCart,
  updateCartItemQty,
  removeCartItem,
  clearCart as clearCartApi,
} from "@/lib/api/cart";
import { getDeviceId } from "@/lib/utils/device-id";

interface CartContextValue {
  items: FormattedCartItem[];
  cartCount: number;
  subtotal: number;
  originalSubtotal: number;
  savings: number;
  isLoading: boolean;
  isUpdating: boolean;
  isSidebarOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (productId: string, quantity?: number) => Promise<boolean>;
  updateQuantity: (cartItemId: number, quantity: number) => Promise<void>;
  removeItem: (cartItemId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartData, setCartData] = useState<CartData>({
    cart: null,
    items: [],
    cartCount: 0,
    subtotal: 0,
    originalSubtotal: 0,
    savings: 0,
  });
  const [deviceId] = useState<string>(() => (typeof window !== "undefined" ? getDeviceId() : ""));
  const [isLoading, setIsLoading] = useState<boolean>(() => Boolean(typeof window !== "undefined" && getDeviceId()));
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [, startTransition] = useTransition();

  // Fetch existing cart on mount
  useEffect(() => {
    let isCancelled = false;
    const id = deviceId || getDeviceId();

    if (id) {
      fetchCartWithItems(id)
        .then((data) => {
          if (!isCancelled) {
            setCartData(data);
          }
        })
        .catch((err) => {
          console.error("Failed to load initial cart:", err);
        })
        .finally(() => {
          if (!isCancelled) {
            setIsLoading(false);
          }
        });
    }

    return () => {
      isCancelled = true;
    };
  }, [deviceId]);

  const openCart = useCallback(() => setIsSidebarOpen(true), []);
  const closeCart = useCallback(() => setIsSidebarOpen(false), []);
  const toggleCart = useCallback(() => setIsSidebarOpen((prev) => !prev), []);

  const refreshCart = useCallback(async () => {
    const id = deviceId || getDeviceId();
    if (!id) return;
    try {
      const data = await fetchCartWithItems(id);
      setCartData(data);
    } catch (err) {
      console.error("Error refreshing cart:", err);
    }
  }, [deviceId]);

  const addToCart = useCallback(
    async (productId: string, quantity: number = 1): Promise<boolean> => {
      const id = deviceId || getDeviceId();
      if (!id || !productId) return false;

      setIsUpdating(true);
      try {
        const updated = await addItemToCart(id, productId, quantity);
        startTransition(() => {
          setCartData(updated);
          setIsSidebarOpen(true);
        });
        return true;
      } catch (err) {
        console.error("Failed to add item to cart:", err);
        return false;
      } finally {
        setIsUpdating(false);
      }
    },
    [deviceId]
  );

  const updateQuantity = useCallback(
    async (cartItemId: number, quantity: number) => {
      const id = deviceId || getDeviceId();
      if (!id) return;

      setIsUpdating(true);
      try {
        const updated = await updateCartItemQty(id, cartItemId, quantity);
        startTransition(() => {
          setCartData(updated);
        });
      } catch (err) {
        console.error("Failed to update cart quantity:", err);
      } finally {
        setIsUpdating(false);
      }
    },
    [deviceId]
  );

  const removeItem = useCallback(
    async (cartItemId: number) => {
      const id = deviceId || getDeviceId();
      if (!id) return;

      setIsUpdating(true);
      try {
        const updated = await removeCartItem(id, cartItemId);
        startTransition(() => {
          setCartData(updated);
        });
      } catch (err) {
        console.error("Failed to remove item from cart:", err);
      } finally {
        setIsUpdating(false);
      }
    },
    [deviceId]
  );

  const clearCart = useCallback(async () => {
    const id = deviceId || getDeviceId();
    if (!id) return;

    setIsUpdating(true);
    try {
      const updated = await clearCartApi(id);
      startTransition(() => {
        setCartData(updated);
      });
    } catch (err) {
      console.error("Failed to clear cart:", err);
    } finally {
      setIsUpdating(false);
    }
  }, [deviceId]);

  return (
    <CartContext.Provider
      value={{
        items: cartData.items,
        cartCount: cartData.cartCount,
        subtotal: cartData.subtotal,
        originalSubtotal: cartData.originalSubtotal,
        savings: cartData.savings,
        isLoading,
        isUpdating,
        isSidebarOpen,
        openCart,
        closeCart,
        toggleCart,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

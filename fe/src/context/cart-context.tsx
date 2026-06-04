"use client";

import React, { createContext, useContext, useState } from "react";

export interface CartItem {
  id: number;
  name: string;
  basePrice: string;
  quantity: number;
  spiceLevel: string;
  specialInstructions: string;
  totalPrice: string;

  // 👇 OPTIONAL CATEGORY
  category?: string;
}

interface CartContextType {
  cart: CartItem[];

  addToCart: (item: CartItem) => void;

  removeFromCart: (id: number) => void;

  updateQuantity: (
    id: number,
    type: "increase" | "decrease"
  ) => void;

  updateCartItem: (
    id: number,
    updates: Partial<CartItem>
  ) => void;

  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // ✅ ADD TO CART WITH MERGING
  const addToCart = (newItem: CartItem) => {
    setCart((prev) => {
      // CHECK IF SAME ITEM EXISTS
      const existingItem = prev.find(
        (item) =>
          item.name === newItem.name &&
          item.category === newItem.category &&
          item.spiceLevel === newItem.spiceLevel &&
          item.specialInstructions ===
            newItem.specialInstructions
      );

      // IF SAME ITEM EXISTS
      if (existingItem) {
        return prev.map((item) => {
          if (item.id === existingItem.id) {
            const currentPrice =
              parseInt(
                item.totalPrice.replace(/[^0-9]/g, "")
              ) || 0;

            const addedPrice =
              parseInt(
                newItem.totalPrice.replace(/[^0-9]/g, "")
              ) || 0;

            return {
              ...item,

              // ADD QUANTITY
              quantity:
                item.quantity +
                (newItem.quantity || 1),

              // UPDATE TOTAL PRICE
              totalPrice: `Nu. ${
                currentPrice + addedPrice
              }`,
            };
          }

          return item;
        });
      }

      // OTHERWISE ADD NEW ITEM
      return [
        ...prev,
        {
          ...newItem,
          quantity: newItem.quantity || 1,
        },
      ];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const updateQuantity = (
    id: number,
    type: "increase" | "decrease"
  ) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;

        const newQuantity =
          type === "increase"
            ? item.quantity + 1
            : Math.max(1, item.quantity - 1);

        const basePrice =
          parseInt(
            item.basePrice.replace(/[^0-9]/g, "")
          ) || 0;

        return {
          ...item,
          quantity: newQuantity,
          totalPrice: `Nu. ${
            basePrice * newQuantity
          }`,
        };
      })
    );
  };

  // UPDATE CART ITEM
  const updateCartItem = (
    id: number,
    updates: Partial<CartItem>
  ) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              ...updates,
            }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        updateCartItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}
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
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, type: "increase" | "decrease") => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => [...prev, item]);
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
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
          parseInt(item.basePrice.replace(/[^0-9]/g, "")) || 0;

        return {
          ...item,
          quantity: newQuantity,
          totalPrice: `Nu. ${basePrice * newQuantity}`,
        };
      })
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
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}


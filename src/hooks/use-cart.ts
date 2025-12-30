"use client";

import { useContext } from "react";
import { CartContext } from "@/context/cart-context";
import type { Product } from "@/lib/types";

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }

  const { state, dispatch } = context;

  const addItem = (product: Product) => {
    dispatch({ type: "ADD_ITEM", payload: product });
  };

  const removeItem = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: { id } });
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };
  
  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return {
    cartItems: state.items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  };
};

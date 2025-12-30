"use client";

import { useContext } from "react";
import { WishlistContext } from "@/context/wishlist-context";
import type { Product } from "@/lib/types";

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }

  const { state, dispatch } = context;

  const addItem = (product: Product) => {
    dispatch({ type: "ADD_ITEM", payload: product });
  };

  const removeItem = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: { id } });
  };

  const clearWishlist = () => {
    dispatch({ type: "CLEAR_WISHLIST" });
  };

  const isInWishlist = (id: string) => {
    return state.items.some((item) => item.id === id);
  };
  
  const totalItems = state.items.length;

  return {
    wishlistItems: state.items,
    addItem,
    removeItem,
    clearWishlist,
    isInWishlist,
    totalItems,
  };
};

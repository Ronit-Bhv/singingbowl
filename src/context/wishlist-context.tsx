"use client";

import type { ReactNode } from "react";
import { createContext, useReducer, useEffect } from "react";
import type { Product, WishlistItem } from "@/lib/types";

type WishlistState = {
  items: WishlistItem[];
};

type WishlistAction =
  | { type: "ADD_ITEM"; payload: Product }
  | { type: "REMOVE_ITEM"; payload: { id: string } }
  | { type: "CLEAR_WISHLIST" }
  | { type: "SET_WISHLIST"; payload: WishlistItem[] };

const wishlistReducer = (state: WishlistState, action: WishlistAction): WishlistState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        return state; // Item already in wishlist
      }
      return {
        ...state,
        items: [
          ...state.items,
          {
            id: action.payload.id,
            name: action.payload.name,
            price: action.payload.price,
            imageUrl: action.payload.imageUrl,
            slug: action.payload.slug,
          },
        ],
      };
    }
    case "REMOVE_ITEM": {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };
    }
    case "CLEAR_WISHLIST": {
      return { ...state, items: [] };
    }
    case "SET_WISHLIST": {
      return { ...state, items: action.payload };
    }
    default:
      return state;
  }
};

type WishlistContextType = {
  state: WishlistState;
  dispatch: React.Dispatch<WishlistAction>;
};

export const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(wishlistReducer, { items: [] });

  useEffect(() => {
    try {
      const storedWishlist = localStorage.getItem("resonant-harmony-wishlist");
      if (storedWishlist) {
        dispatch({ type: "SET_WISHLIST", payload: JSON.parse(storedWishlist) });
      }
    } catch (error) {
      console.error("Failed to parse wishlist from localStorage", error);
    }
  }, []);

  useEffect(() => {
    if (state.items.length > 0 || localStorage.getItem("resonant-harmony-wishlist")) {
      localStorage.setItem("resonant-harmony-wishlist", JSON.stringify(state.items));
    }
  }, [state.items]);

  return (
    <WishlistContext.Provider value={{ state, dispatch }}>
      {children}
    </WishlistContext.Provider>
  );
}

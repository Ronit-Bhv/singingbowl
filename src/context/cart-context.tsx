"use client";

import type { ReactNode } from "react";
import { createContext, useReducer, useEffect } from "react";
import type { Product, CartItem } from "@/lib/types";

type CartState = {
  items: CartItem[];
};

type CartAction =
  | { type: "ADD_ITEM"; payload: Product }
  | { type: "REMOVE_ITEM"; payload: { id: string } }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "SET_CART"; payload: CartItem[] };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
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
            quantity: 1,
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
    case "UPDATE_QUANTITY": {
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((item) => item.id !== action.payload.id),
        };
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    }
    case "CLEAR_CART": {
      return { ...state, items: [] };
    }
    case "SET_CART": {
      return { ...state, items: action.payload };
    }
    default:
      return state;
  }
};

type CartContextType = {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
};

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("resonant-harmony-cart");
      if (storedCart) {
        dispatch({ type: "SET_CART", payload: JSON.parse(storedCart) });
      }
    } catch (error) {
      console.error("Failed to parse cart from localStorage", error);
    }
  }, []);

  useEffect(() => {
    if (state.items.length > 0 || localStorage.getItem("resonant-harmony-cart")) {
      localStorage.setItem("resonant-harmony-cart", JSON.stringify(state.items));
    }
  }, [state.items]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

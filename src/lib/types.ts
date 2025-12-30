export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  imageUrl: string;
  imageHint: string;
  audioUrl: string;
};

export type CartItem = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
};

export type WishlistItem = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  slug: string;
};

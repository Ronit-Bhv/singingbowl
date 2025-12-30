export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  imageUrl: string;
  imageHint: string;
  audioUrl: string;
  tag: string;
};

export const PRODUCT_TAGS = [
  { value: "singing-bowl", label: "Singing Bowl" },
  { value: "beads", label: "Beads" },
  { value: "bells", label: "Bells" },
  { value: "incense", label: "Incense" },
  { value: "meditation-cushion", label: "Meditation Cushion" },
  { value: "accessories", label: "Accessories" },
] as const;

export type ProductTag = (typeof PRODUCT_TAGS)[number]["value"];

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

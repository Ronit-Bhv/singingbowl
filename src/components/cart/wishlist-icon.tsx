"use client";

import { Heart } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useWishlist } from "@/hooks/use-wishlist";

export function WishlistIcon() {
  const { totalItems } = useWishlist();

  return (
    <Button variant="ghost" size="icon" className="relative" asChild>
      <Link href="/wishlist">
        <Heart className="h-5 w-5" />
        <span className="sr-only">Open wishlist</span>
        {totalItems > 0 && (
          <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
            {totalItems}
          </span>
        )}
      </Link>
    </Button>
  );
}

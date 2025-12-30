"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2, Heart, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

import { useWishlist } from "@/hooks/use-wishlist";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export function WishlistView() {
  const { wishlistItems, removeItem } = useWishlist();
  const { addItem } = useCart();
  const { toast } = useToast();
  const router = useRouter();

  const handleAddToCart = (item: any) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      imageUrl: item.imageUrl,
      slug: item.slug,
      description: "",
      imageHint: "",
      audioUrl: "",
    });
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
      duration: 3000,
    });
  };

  const handleRemove = (id: string, name: string) => {
    removeItem(id);
    toast({
      title: "Removed from wishlist",
      description: `${name} has been removed from your wishlist.`,
      duration: 3000,
    });
  };

  return (
    <div className="flex h-full flex-col">
      {wishlistItems.length > 0 ? (
        <>
          <ScrollArea className="flex-grow">
            <div className="pr-4">
              {wishlistItems.map((item) => (
                <div key={item.id} className="flex items-start gap-4 py-4 border-b last:border-b-0">
                  <Link href={`/products/${item.slug}`}>
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      width={100}
                      height={75}
                      className="rounded-md object-cover hover:opacity-80 transition-opacity"
                    />
                  </Link>
                  <div className="flex-grow">
                    <Link href={`/products/${item.slug}`}>
                      <p className="font-medium hover:text-primary transition-colors">{item.name}</p>
                    </Link>
                    <p className="text-lg font-semibold text-foreground mt-1">
                      ${item.price.toFixed(2)}
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAddToCart(item)}
                        className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                      >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                  <div className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => handleRemove(item.id, item.name)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="mt-auto border-t pt-4">
            <p className="text-sm text-muted-foreground mb-4">
              {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} in your wishlist
            </p>
            <div className="flex justify-center text-center text-sm text-muted-foreground">
              <p>
                <Link href="/" className="font-medium text-primary hover:text-primary/80">
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </Link>
              </p>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <Heart className="h-16 w-16 text-muted-foreground/50" />
          <h3 className="mt-4 text-lg font-medium">Your wishlist is empty</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Save your favorite singing bowls for later.
          </p>
          <Button asChild className="mt-6">
            <Link href="/">Browse Products</Link>
          </Button>
        </div>
      )}
    </div>
  );
}

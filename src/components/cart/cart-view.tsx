"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, Frown } from "lucide-react";
import { useRouter } from "next/navigation";

import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export function CartView({ onClose }: { onClose?: () => void }) {
  const { cartItems, updateQuantity, removeItem, totalPrice, totalItems } = useCart();
  const router = useRouter();

  const handleCheckout = () => {
    onClose?.();
    router.push("/checkout");
  };

  return (
    <div className="flex h-full flex-col">
      {cartItems.length > 0 ? (
        <>
          <ScrollArea className="flex-grow">
            <div className="pr-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-start gap-4 py-4">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    width={80}
                    height={60}
                    className="rounded-md object-cover"
                  />
                  <div className="flex-grow">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      ${item.price.toFixed(2)}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-6 text-center text-sm">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="mt-2 h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="mt-auto border-t pt-4">
            <div className="flex justify-between text-base font-medium text-foreground">
              <p>Subtotal</p>
              <p>${totalPrice.toFixed(2)}</p>
            </div>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="mt-6">
              <Button onClick={handleCheckout} className="w-full" size="lg">
                Checkout
              </Button>
            </div>
            <div className="mt-4 flex justify-center text-center text-sm text-muted-foreground">
              <p>
                or{" "}
                <Link href="/" className="font-medium text-primary hover:text-primary/80" onClick={() => onClose?.()}>
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </Link>
              </p>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <Frown className="h-16 w-16 text-muted-foreground/50" />
          <h3 className="mt-4 text-lg font-medium">Your cart is empty</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Add some beautiful singing bowls to get started.
          </p>
          <Button asChild className="mt-6" onClick={() => onClose?.()}>
            <Link href="/">Browse Products</Link>
          </Button>
        </div>
      )}
    </div>
  );
}

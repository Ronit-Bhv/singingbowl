"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { CartView } from "@/components/cart/cart-view";
import { useCart } from "@/hooks/use-cart";

export function CartIcon() {
  const { totalItems } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          <span className="sr-only">Open cart</span>
          {totalItems > 0 && (
            <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
              {totalItems}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col sm:max-w-lg bg-background">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>
        <CartView onClose={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  );
}

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CreditCard, Loader2, Lock } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  email: z.string().email(),
  shippingName: z.string().min(2),
  shippingAddress: z.string().min(5),
  shippingCity: z.string().min(2),
  shippingState: z.string().min(2),
  shippingZip: z.string().min(5),
  cardName: z.string().min(2),
  cardNumber: z.string().min(16).max(16),
  cardExpiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/),
  cardCvc: z.string().min(3).max(4),
});

export default function CheckoutPage() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      shippingName: "",
      shippingAddress: "",
      shippingCity: "",
      shippingState: "",
      shippingZip: "",
      cardName: "",
      cardNumber: "",
      cardExpiry: "",
      cardCvc: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    // Simulate payment processing
    setTimeout(() => {
      clearCart();
      toast({
        title: "Order Placed!",
        description: "Thank you for your purchase.",
      });
      router.push("/order-confirmation");
      setIsLoading(false);
    }, 2000);
  };
  
  if (cartItems.length === 0 && !isLoading) {
    return (
      <div className="container text-center py-20">
        <h1 className="text-2xl font-bold">Your cart is empty.</h1>
        <p className="text-muted-foreground">You can't checkout without any items.</p>
        <Button onClick={() => router.push('/')} className="mt-4">Go Shopping</Button>
      </div>
    )
  }

  const shippingCost = 5.00;
  const taxes = totalPrice * 0.08;
  const grandTotal = totalPrice + shippingCost + taxes;

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-x-12 lg:grid-cols-2">
        <div className="lg:order-last">
          <h2 className="text-xl font-medium text-foreground">Order summary</h2>
          <div className="mt-4 rounded-lg border border-border bg-card text-card-foreground shadow-sm">
            <ul role="list" className="divide-y divide-border">
              {cartItems.map((product) => (
                <li key={product.id} className="flex px-4 py-6 sm:px-6">
                  <div className="flex-shrink-0">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      width={80}
                      height={60}
                      className="w-20 rounded-md object-cover"
                    />
                  </div>
                  <div className="ml-6 flex flex-1 flex-col">
                    <div className="flex">
                      <div className="min-w-0 flex-1">
                        <h4 className="text-sm font-medium">{product.name}</h4>
                        <p className="mt-1 text-sm text-muted-foreground">Qty: {product.quantity}</p>
                      </div>
                    </div>
                    <div className="flex flex-1 items-end justify-between pt-2">
                      <p className="mt-1 text-sm font-medium text-foreground">
                        ${(product.price * product.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <dl className="space-y-4 border-t border-border px-4 py-6 sm:px-6">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-muted-foreground">Subtotal</dt>
                <dd className="text-sm font-medium text-foreground">${totalPrice.toFixed(2)}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-sm text-muted-foreground">Shipping</dt>
                <dd className="text-sm font-medium text-foreground">${shippingCost.toFixed(2)}</dd>
              </div>
               <div className="flex items-center justify-between">
                <dt className="text-sm text-muted-foreground">Taxes</dt>
                <dd className="text-sm font-medium text-foreground">${taxes.toFixed(2)}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-border pt-4">
                <dt className="text-base font-medium text-foreground">Total</dt>
                <dd className="text-base font-medium text-foreground">${grandTotal.toFixed(2)}</dd>
              </div>
            </dl>
          </div>
        </div>
        <div className="mt-10 lg:mt-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div>
                <h2 className="text-lg font-medium">Contact information</h2>
                <div className="mt-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email address</FormLabel>
                        <FormControl><Input type="email" placeholder="you@example.com" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <div className="mt-10 border-t border-border pt-10">
                <h2 className="text-lg font-medium">Shipping information</h2>
                 <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  <FormField control={form.control} name="shippingName" render={({ field }) => (<FormItem className="sm:col-span-2"><FormLabel>Full name</FormLabel><FormControl><Input placeholder="John Doe" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="shippingAddress" render={({ field }) => (<FormItem className="sm:col-span-2"><FormLabel>Address</FormLabel><FormControl><Input placeholder="123 Main St" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="shippingCity" render={({ field }) => (<FormItem><FormLabel>City</FormLabel><FormControl><Input placeholder="Anytown" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="shippingState" render={({ field }) => (<FormItem><FormLabel>State / Province</FormLabel><FormControl><Input placeholder="CA" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="shippingZip" render={({ field }) => (<FormItem><FormLabel>Postal code</FormLabel><FormControl><Input placeholder="12345" {...field} /></FormControl><FormMessage /></FormItem>)} />
                </div>
              </div>

               <div className="mt-10 border-t border-border pt-10">
                <h2 className="text-lg font-medium">Payment details</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Enter your payment information below. All transactions are secure.
                </p>
                <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-4 sm:gap-x-4">
                   <FormField control={form.control} name="cardName" render={({ field }) => (<FormItem className="sm:col-span-4"><FormLabel>Name on card</FormLabel><FormControl><Input placeholder="John Doe" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="cardNumber" render={({ field }) => (<FormItem className="sm:col-span-4"><FormLabel>Card number</FormLabel><FormControl><div className="relative"><Input placeholder="0000 0000 0000 0000" {...field} /><CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" /></div></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="cardExpiry" render={({ field }) => (<FormItem className="sm:col-span-2"><FormLabel>Expiration date (MM/YY)</FormLabel><FormControl><Input placeholder="01/25" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="cardCvc" render={({ field }) => (<FormItem className="sm:col-span-2"><FormLabel>CVC</FormLabel><FormControl><Input placeholder="123" {...field} /></FormControl><FormMessage /></FormItem>)} />
                </div>
              </div>

               <div className="mt-10 border-t border-border pt-6">
                <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Lock className="mr-2 h-4 w-4" />}
                    Pay ${grandTotal.toFixed(2)}
                </Button>
               </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

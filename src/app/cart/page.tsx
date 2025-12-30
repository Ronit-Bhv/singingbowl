import { CartView } from "@/components/cart/cart-view";

export default function CartPage() {
  return (
    <div className="container py-8 md:py-12">
      <h1 className="text-3xl md:text-4xl font-bold font-headline mb-8">Your Shopping Cart</h1>
      <div className="bg-card p-6 rounded-lg shadow-sm border">
        <CartView />
      </div>
    </div>
  );
}

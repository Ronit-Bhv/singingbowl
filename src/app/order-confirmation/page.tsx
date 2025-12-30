import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function OrderConfirmationPage() {
  return (
    <div className="container flex min-h-[calc(100vh-10rem)] items-center justify-center text-center">
      <div className="bg-card p-8 sm:p-12 rounded-xl shadow-lg border max-w-lg w-full">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 className="h-10 w-10 text-green-600" />
        </div>
        <h1 className="mt-6 text-3xl font-bold font-headline tracking-tight text-foreground">
          Thank you for your order!
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Your journey to harmony has begun. We've received your order and will begin processing it right away. A confirmation email is on its way to you.
        </p>
        <div className="mt-8">
          <Button asChild size="lg">
            <Link href="/">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

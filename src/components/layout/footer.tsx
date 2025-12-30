import { Logo } from "@/components/icons/logo";
import { Twitter, Instagram, Facebook } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-start gap-4">
            <Link href="/" className="flex items-center space-x-2">
              <Logo className="h-6 w-6 text-primary" />
              <span className="font-bold font-headline">Resonant Harmony</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Find your inner peace with our collection of fine singing bowls.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 col-span-1 md:col-span-2 gap-8 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Shop</h4>
              <ul className="space-y-2">
                <li><Link href="/#products" className="text-muted-foreground hover:text-foreground">All Products</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">New Arrivals</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">Best Sellers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">About Us</h4>
              <ul className="space-y-2">
                <li><Link href="/#about" className="text-muted-foreground hover:text-foreground">Our Story</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">Contact</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">FAQ</Link></li>
              </ul>
            </div>
             <div>
              <h4 className="font-semibold mb-2">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">Privacy Policy</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">Terms of Service</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">Shipping Policy</Link></li>
              </ul>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Follow Us</h4>
            <p className="text-sm text-muted-foreground mb-4">Stay connected for updates and inspiration.</p>
            <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" asChild><Link href="#"><Twitter className="h-4 w-4" /></Link></Button>
                <Button variant="outline" size="icon" asChild><Link href="#"><Instagram className="h-4 w-4" /></Link></Button>
                <Button variant="outline" size="icon" asChild><Link href="#"><Facebook className="h-4 w-4" /></Link></Button>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 flex flex-col sm:flex-row items-center justify-between text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Resonant Harmony. All rights reserved.</p>
           <p></p>
        </div>
      </div>
    </footer>
  );
}

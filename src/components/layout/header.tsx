"use client";

import Link from "next/link";
import { LogOut, Menu, User, Shield } from "lucide-react";
import { Logo } from "@/components/icons/logo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CartIcon } from "@/components/cart/cart-icon";
import { WishlistIcon } from "@/components/cart/wishlist-icon";
import { SearchDialog } from "@/components/layout/search-dialog";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { useAuth } from "@/hooks/use-auth";
import { Skeleton } from "@/components/ui/skeleton";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#products", label: "Products" },
  { href: "/#about", label: "About" },
];

export function Header() {
  const { user, logout, loading } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block font-headline">
              Resonant Harmony
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors text-foreground/60 hover:text-foreground/80"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <Link href="/" className="mr-6 flex items-center space-x-2 mb-6">
              <Logo className="h-6 w-6 text-primary" />
              <span className="font-bold font-headline">Resonant Harmony</span>
            </Link>
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        
        <div className="flex flex-1 items-center justify-end space-x-2">
          <ThemeToggle />
          <SearchDialog />
          <WishlistIcon />
          <CartIcon />
          {loading ? (
            <Skeleton className="h-8 w-20 rounded-md" />
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" className="relative h-8 w-8 rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Admin</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/admin">
                    <Shield className="mr-2 h-4 w-4" />
                    <span>Admin Panel</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : null}
        </div>
      </div>
    </header>
  );
}

// Minimal Avatar component to avoid creating another file for this one-off use
function Avatar({ children }: { children: React.ReactNode }) {
  return <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full items-center justify-center bg-muted">{children}</div>;
}
function AvatarImage({ src, alt }: { src: string; alt: string }) {
  return <img src={src} alt={alt} className="aspect-square h-full w-full" />;
}
function AvatarFallback({ children }: { children: React.ReactNode }) {
  return <div className="flex h-full w-full items-center justify-center rounded-full bg-muted">{children}</div>;
}

import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { LayoutContent } from "@/components/layout/layout-content";
import { CartProvider } from "@/context/cart-context";
import { WishlistProvider } from "@/context/wishlist-context";
import { AuthProvider } from "@/context/auth-context";
import { ThemeProvider } from "@/context/theme-context";
import { AdminProvider } from "@/context/admin-context";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Resonant Harmony",
  description: "Find your inner peace with our collection of fine singing bowls.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("min-h-screen bg-background font-body antialiased")}>
        <ThemeProvider>
          <AuthProvider>
            <AdminProvider>
              <CartProvider>
                <WishlistProvider>
                  <LayoutContent>{children}</LayoutContent>
                  <Toaster />
                </WishlistProvider>
              </CartProvider>
            </AdminProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

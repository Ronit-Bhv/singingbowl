"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { LayoutDashboard, Package, Users, LogOut, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const adminNavItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/", label: "Home", icon: Home },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!loading && !user && mounted) {
      router.push("/login");
    }
  }, [user, loading, router, mounted]);

  if (loading || !mounted) {
    return (
      <div className="flex h-screen">
        <div className="w-64 border-r bg-muted/10 p-6">
          <Skeleton className="h-8 w-32 mb-8" />
          <div className="space-y-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
        <div className="flex-1 p-8">
          <Skeleton className="h-12 w-48 mb-6" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-muted/10">
        <div className="flex flex-col h-full">
          <div className="p-6 border-b">
            <h1 className="text-2xl font-bold font-headline">Admin Panel</h1>
            <p className="text-sm text-muted-foreground mt-1">{user.email}</p>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            {adminNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="p-4 border-t">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => {
                logout();
                router.push("/");
              }}
            >
              <LogOut className="mr-2 h-5 w-5" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto p-8">{children}</div>
      </main>
    </div>
  );
}

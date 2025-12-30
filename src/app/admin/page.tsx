"use client";

import { useAdmin } from "@/hooks/use-admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, DollarSign, ShoppingCart } from "lucide-react";

export default function AdminPage() {
  const { products, totalRevenue, totalOrdersCount } = useAdmin();

  const stats = [
    {
      title: "Total Products",
      value: products.length,
      icon: Package,
      description: "Active products in catalog",
    },
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      description: "All-time revenue",
    },
    {
      title: "Total Orders",
      value: totalOrdersCount,
      icon: ShoppingCart,
      description: "All-time orders",
    },
  ];

  // Sort products by createdAt (newest first) for recent products
  const recentProducts = [...products]
    .sort((a, b) => {
      const dateA = (a as any).createdAt ? new Date((a as any).createdAt).getTime() : 0;
      const dateB = (b as any).createdAt ? new Date((b as any).createdAt).getTime() : 0;
      return dateB - dateA;
    })
    .slice(0, 5);

  return (
    <div>
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold font-headline">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome to the admin panel. Manage your products and customers.
        </p>
      </div>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-6 sm:mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProducts.length === 0 ? (
                <p className="text-muted-foreground text-sm">No products yet.</p>
              ) : (
                recentProducts.map((product) => (
                  <div key={product.id} className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="font-medium truncate">{product.name}</p>
                      <p className="text-sm text-muted-foreground">${product.price}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

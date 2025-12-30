"use client";

import { useAdmin } from "@/hooks/use-admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Users, DollarSign, ShoppingCart } from "lucide-react";

export default function AdminPage() {
  const { products, customers } = useAdmin();

  const stats = [
    {
      title: "Total Products",
      value: products.length,
      icon: Package,
      description: "Active products in catalog",
    },
    {
      title: "Total Customers",
      value: customers.length,
      icon: Users,
      description: "Registered customers",
    },
    {
      title: "Total Revenue",
      value: `$${customers.reduce((sum, c) => sum + c.totalSpent, 0).toFixed(2)}`,
      icon: DollarSign,
      description: "All-time revenue",
    },
    {
      title: "Total Orders",
      value: customers.reduce((sum, c) => sum + c.totalOrders, 0),
      icon: ShoppingCart,
      description: "All-time orders",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-headline">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome to the admin panel. Manage your products and customers.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {products.slice(0, 5).map((product) => (
                <div key={product.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">${product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {customers
                .sort((a, b) => b.totalSpent - a.totalSpent)
                .slice(0, 5)
                .map((customer) => (
                  <div key={customer.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{customer.name}</p>
                      <p className="text-sm text-muted-foreground">{customer.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${customer.totalSpent.toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground">
                        {customer.totalOrders} orders
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

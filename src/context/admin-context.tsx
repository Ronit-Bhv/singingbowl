"use client";

import type { ReactNode } from "react";
import { createContext, useState, useEffect, useCallback, useMemo } from "react";
import type { Product } from "@/lib/types";

export type Order = {
  id: string;
  items: {
    productId: string;
    productName: string;
    price: number;
    quantity: number;
  }[];
  total: number;
  customerEmail: string;
  customerName: string;
  createdAt: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  totalOrders: number;
  totalSpent: number;
};

type AdminContextType = {
  products: Product[];
  customers: Customer[];
  orders: Order[];
  loading: boolean;
  addProduct: (product: Omit<Product, "id">) => Promise<void>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  deleteCustomer: (id: string) => void;
  addOrder: (order: Omit<Order, "id" | "createdAt">) => void;
  refreshProducts: () => Promise<void>;
  totalRevenue: number;
  totalOrdersCount: number;
};

export const AdminContext = createContext<AdminContextType | undefined>(undefined);

const mockCustomers: Customer[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    joinDate: "2024-01-15",
    totalOrders: 5,
    totalSpent: 499.95,
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    joinDate: "2024-02-20",
    totalOrders: 3,
    totalSpent: 329.97,
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    joinDate: "2024-03-10",
    totalOrders: 8,
    totalSpent: 899.92,
  },
];

export function AdminProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/products");
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();

    // Load customers from localStorage
    const storedCustomers = localStorage.getItem("admin-customers");
    if (storedCustomers) {
      setCustomers(JSON.parse(storedCustomers));
    } else {
      localStorage.setItem("admin-customers", JSON.stringify(mockCustomers));
    }

    // Load orders from localStorage
    const storedOrders = localStorage.getItem("admin-orders");
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    }
  }, [fetchProducts]);

  const addProduct = useCallback(async (product: Omit<Product, "id">) => {
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      
      if (response.ok) {
        const newProduct = await response.json();
        setProducts((prev) => [...prev, newProduct]);
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  }, []);

  const updateProduct = useCallback(async (id: string, productUpdates: Partial<Product>) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productUpdates),
      });
      
      if (response.ok) {
        const updatedProduct = await response.json();
        setProducts((prev) =>
          prev.map((p) => (p.id === id ? updatedProduct : p))
        );
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  }, []);

  const deleteProduct = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });
      
      if (response.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  }, []);

  const deleteCustomer = useCallback((id: string) => {
    setCustomers((prev) => {
      const updatedCustomers = prev.filter((c) => c.id !== id);
      localStorage.setItem("admin-customers", JSON.stringify(updatedCustomers));
      return updatedCustomers;
    });
  }, []);

  const refreshProducts = useCallback(async () => {
    await fetchProducts();
  }, [fetchProducts]);

  const addOrder = useCallback((order: Omit<Order, "id" | "createdAt">) => {
    const newOrder: Order = {
      ...order,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setOrders((prev) => {
      const updatedOrders = [newOrder, ...prev];
      localStorage.setItem("admin-orders", JSON.stringify(updatedOrders));
      return updatedOrders;
    });
  }, []);

  const totalRevenue = useMemo(() => {
    return orders.reduce((sum, order) => sum + order.total, 0);
  }, [orders]);

  const totalOrdersCount = useMemo(() => {
    return orders.length;
  }, [orders]);

  const value = useMemo(
    () => ({
      products,
      customers,
      orders,
      loading,
      addProduct,
      updateProduct,
      deleteProduct,
      deleteCustomer,
      addOrder,
      refreshProducts,
      totalRevenue,
      totalOrdersCount,
    }),
    [products, customers, orders, loading, addProduct, updateProduct, deleteProduct, deleteCustomer, addOrder, refreshProducts, totalRevenue, totalOrdersCount]
  );

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
}

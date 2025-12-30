"use client";

import type { ReactNode } from "react";
import { createContext, useState, useEffect } from "react";
import type { Product } from "@/lib/types";
import { products as initialProducts } from "@/lib/products";

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
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  deleteCustomer: (id: string) => void;
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

  useEffect(() => {
    // Load products from localStorage or use initial products
    const storedProducts = localStorage.getItem("admin-products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      setProducts(initialProducts);
      localStorage.setItem("admin-products", JSON.stringify(initialProducts));
    }

    // Load customers from localStorage
    const storedCustomers = localStorage.getItem("admin-customers");
    if (storedCustomers) {
      setCustomers(JSON.parse(storedCustomers));
    } else {
      localStorage.setItem("admin-customers", JSON.stringify(mockCustomers));
    }
  }, []);

  const addProduct = (product: Omit<Product, "id">) => {
    const newProduct = {
      ...product,
      id: Date.now().toString(),
    };
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    localStorage.setItem("admin-products", JSON.stringify(updatedProducts));
  };

  const updateProduct = (id: string, productUpdates: Partial<Product>) => {
    const updatedProducts = products.map((p) =>
      p.id === id ? { ...p, ...productUpdates } : p
    );
    setProducts(updatedProducts);
    localStorage.setItem("admin-products", JSON.stringify(updatedProducts));
  };

  const deleteProduct = (id: string) => {
    const updatedProducts = products.filter((p) => p.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem("admin-products", JSON.stringify(updatedProducts));
  };

  const deleteCustomer = (id: string) => {
    const updatedCustomers = customers.filter((c) => c.id !== id);
    setCustomers(updatedCustomers);
    localStorage.setItem("admin-customers", JSON.stringify(updatedCustomers));
  };

  return (
    <AdminContext.Provider
      value={{
        products,
        customers,
        addProduct,
        updateProduct,
        deleteProduct,
        deleteCustomer,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

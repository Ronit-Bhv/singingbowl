"use client";

import { useState } from "react";
import { useAdmin } from "@/hooks/use-admin";
import type { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductForm } from "@/components/admin/product-form";
import { Pencil, Trash2, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ProductsPage() {
  const { products, deleteProduct } = useAdmin();
  const { toast } = useToast();
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsFormOpen(true);
  };

  const handleAdd = () => {
    setSelectedProduct(undefined);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteProduct(id);
    setProductToDelete(null);
    toast({
      title: "Success",
      description: "Product deleted successfully",
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold font-headline">Products</h1>
          <p className="text-muted-foreground mt-2">
            Manage your product catalog
          </p>
        </div>
        <Button onClick={handleAdd}>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Products ({products.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground">
                    No products found. Add your first product to get started.
                  </TableCell>
                </TableRow>
              ) : (
                products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell className="text-muted-foreground">{product.slug}</TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(product)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => setProductToDelete(product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <ProductForm
        product={selectedProduct}
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
      />

      <AlertDialog open={!!productToDelete} onOpenChange={() => setProductToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the product
              from your catalog.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => productToDelete && handleDelete(productToDelete)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

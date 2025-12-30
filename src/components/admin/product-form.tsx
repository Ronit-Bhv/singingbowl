"use client";

import { useState } from "react";
import { useAdmin } from "@/hooks/use-admin";
import type { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

type ProductFormProps = {
  product?: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ProductForm({ product, open, onOpenChange }: ProductFormProps) {
  const { addProduct, updateProduct } = useAdmin();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: product?.name || "",
    slug: product?.slug || "",
    description: product?.description || "",
    price: product?.price?.toString() || "",
    imageUrl: product?.imageUrl || "",
    imageHint: product?.imageHint || "",
    audioUrl: product?.audioUrl || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.slug || !formData.price) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const productData = {
      name: formData.name,
      slug: formData.slug,
      description: formData.description,
      price: parseFloat(formData.price),
      imageUrl: formData.imageUrl || "https://picsum.photos/seed/placeholder/600/400",
      imageHint: formData.imageHint || "singing bowl",
      audioUrl: formData.audioUrl || "",
    };

    if (product) {
      updateProduct(product.id, productData);
      toast({
        title: "Success",
        description: "Product updated successfully",
      });
    } else {
      addProduct(productData);
      toast({
        title: "Success",
        description: "Product added successfully",
      });
    }

    onOpenChange(false);
    setFormData({
      name: "",
      slug: "",
      description: "",
      price: "",
      imageUrl: "",
      imageHint: "",
      audioUrl: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{product ? "Edit Product" : "Add New Product"}</DialogTitle>
          <DialogDescription>
            {product
              ? "Update the product details below"
              : "Fill in the details to add a new product"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">
                Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Zen Harmony Bowl"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="slug">
                Slug <span className="text-red-500">*</span>
              </Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="zen-harmony-bowl"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="A beautifully crafted singing bowl..."
                rows={4}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="price">
                Price <span className="text-red-500">*</span>
              </Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="99.99"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="imageHint">Image Hint</Label>
              <Input
                id="imageHint"
                value={formData.imageHint}
                onChange={(e) => setFormData({ ...formData, imageHint: e.target.value })}
                placeholder="singing bowl"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="audioUrl">Audio URL</Label>
              <Input
                id="audioUrl"
                value={formData.audioUrl}
                onChange={(e) => setFormData({ ...formData, audioUrl: e.target.value })}
                placeholder="https://example.com/audio.mp3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">{product ? "Update" : "Add"} Product</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/products/product-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        searchQuery === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];

      return matchesSearch && matchesPrice;
    });
  }, [searchQuery, priceRange]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setPriceRange([0, 300]);
  };

  const hasActiveFilters = searchQuery !== "" || priceRange[0] !== 0 || priceRange[1] !== 300;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Search className="h-5 w-5" />
          <span className="sr-only">Search products</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <DialogTitle>Search Products</DialogTitle>
        </DialogHeader>
        
        <div className="px-6 py-4 space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search singing bowls by name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Filters Toggle */}
          <Collapsible open={showFilters} onOpenChange={setShowFilters}>
            <div className="flex items-center justify-between">
              <CollapsibleTrigger asChild>
                <Button variant="outline" size="sm">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Advanced Filters
                </Button>
              </CollapsibleTrigger>
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearFilters}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Clear All
                </Button>
              )}
            </div>

            <CollapsibleContent className="mt-4 space-y-4">
              {/* Price Range Filter */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Price Range</Label>
                  <Badge variant="secondary">
                    ${priceRange[0]} - ${priceRange[1]}
                  </Badge>
                </div>
                <Slider
                  min={0}
                  max={300}
                  step={10}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>$0</span>
                  <span>$300</span>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Results Count */}
          <div className="flex items-center justify-between py-2">
            <p className="text-sm text-muted-foreground">
              {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"} found
            </p>
          </div>
        </div>

        {/* Results */}
        <ScrollArea className="flex-1 px-6 pb-6 max-h-[50vh]">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredProducts.map((product) => (
                <div key={product.id} onClick={() => setOpen(false)}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Search className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-medium">No products found</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

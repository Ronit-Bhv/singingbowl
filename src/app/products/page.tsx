import { products } from '@/lib/products';
import { ProductCard } from '@/components/products/product-card';
import { Button } from '@/components/ui/button';
import { Filter, SlidersHorizontal } from 'lucide-react';

export default function ProductsPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/20 py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tight">
              Our Collection
            </h1>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground">
              Explore our curated selection of authentic singing bowls, each one carefully chosen for its unique resonance and healing properties.
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid Section */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container">
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-semibold">
                All Products
              </h2>
              <span className="text-muted-foreground">
                ({products.length} items)
              </span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Sort
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Empty State - If no products */}
          {products.length === 0 && (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">No products found.</p>
            </div>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 md:py-16 bg-secondary/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-headline font-bold mb-4">
              Find Your Perfect Bowl
            </h2>
            <p className="text-muted-foreground mb-6">
              Each singing bowl in our collection is unique, with its own voice and character. 
              Whether you're seeking deep meditation, sound healing, or simply a moment of peace, 
              there's a bowl here waiting to resonate with you.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-background p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-2">Hand-Selected</h3>
                <p className="text-sm text-muted-foreground">
                  Every bowl is personally tested for tonal quality and resonance
                </p>
              </div>
              <div className="bg-background p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-2">Authentic Craft</h3>
                <p className="text-sm text-muted-foreground">
                  Traditional techniques passed down through generations
                </p>
              </div>
              <div className="bg-background p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-2">Free Shipping</h3>
                <p className="text-sm text-muted-foreground">
                  Complimentary delivery on all orders over $100
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

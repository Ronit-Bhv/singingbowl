"use client";

import Image from "next/image";
import { notFound } from "next/navigation";
import { ShoppingCart, CheckCircle, Heart, Play, Pause } from "lucide-react";
import { useState, useRef, use, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/use-wishlist";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/products/product-card";

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { addItem } = useCart();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();
  const { toast } = useToast();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  const { slug } = use(params);

  useEffect(() => {
    async function fetchData() {
      try {
        const [productRes, allProductsRes] = await Promise.all([
          fetch(`/api/products/${slug}`),
          fetch("/api/products"),
        ]);
        
        if (productRes.ok) {
          const productData = await productRes.json();
          setProduct(productData);
        }
        
        if (allProductsRes.ok) {
          const allProductsData = await allProductsRes.json();
          setAllProducts(allProductsData);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <div className="container py-8 md:py-12">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
          <Skeleton className="aspect-[4/3] w-full rounded-lg" />
          <div className="space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-8 w-1/4" />
            <Skeleton className="h-24 w-full" />
            <div className="flex gap-3">
              <Skeleton className="h-12 w-40" />
              <Skeleton className="h-12 w-40" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    notFound();
  }

  const handleAddToCart = (product: Product) => {
    addItem(product);
    toast({
      title: "Added to cart",
      description: `${product.name} is now in your cart.`,
      duration: 3000,
    });
  };

  const handleToggleWishlist = (product: Product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast({
        title: "Removed from wishlist",
        description: `${product.name} has been removed from your wishlist.`,
        duration: 3000,
      });
    } else {
      addToWishlist(product);
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist.`,
        duration: 3000,
      });
    }
  };

  const handlePlayPause = () => {
    if (!audioRef.current) {
      if (product.audioUrl) {
        audioRef.current = new Audio(product.audioUrl);
        audioRef.current.addEventListener("ended", () => {
          setIsPlaying(false);
        });
      } else {
        toast({
          title: "Audio unavailable",
          description: "This product doesn't have an audio sample.",
          variant: "destructive",
        });
        return;
      }
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // Get recommended products (exclude current product)
  const recommendedProducts = allProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 4);
  
  return (
    <div className="container py-8 md:py-12">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
        <div className="overflow-hidden rounded-lg border">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={800}
            height={600}
            className="w-full object-cover aspect-[4/3]"
            data-ai-hint={product.imageHint}
          />
        </div>
        
        <div>
          <h1 className="text-3xl md:text-4xl font-bold font-headline">{product.name}</h1>
          
          <div className="mt-4 flex items-center gap-4">
             <p className="text-3xl font-bold text-foreground">${product.price.toFixed(2)}</p>
             {/* <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />)}
                <span className="text-sm text-muted-foreground ml-2">(34 reviews)</span>
             </div> */}
          </div>
          
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            {product.description}
          </p>

          <div className="mt-5 space-y-5">
              <Button 
                size="lg" 
                variant="secondary"
                className="w-half"
                onClick={handlePlayPause}
              >
                {isPlaying ? (
                  <>
                    <Pause className="mr-2 h-5 w-5" />
                    Pause Sound
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-5 w-5" />
                    Play Sound
                  </>
                )}
              </Button>
              <div className="flex flex-wrap gap-3">
                <Button size="lg" className="flex-1 sm:flex-initial" onClick={() => handleAddToCart(product)}>
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="flex-1 sm:flex-initial border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  onClick={() => handleToggleWishlist(product)}
                >
                  <Heart className={`mr-2 h-5 w-5 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                  {isInWishlist(product.id) ? 'In Wishlist' : 'Add to Wishlist'}
                </Button>
              </div>
          </div>
          
          <Separator className="my-8" />
          
          <div className="space-y-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Hand-hammered by skilled artisans</span>
            </div>
             <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Made from a traditional 7-metal alloy</span>
            </div>
             <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Includes a wooden mallet and cushion</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Products Section */}
      {recommendedProducts.length > 0 && (
        <div className="mt-16">
          <Separator className="mb-8" />
          <h2 className="text-2xl md:text-3xl font-bold font-headline mb-8">
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedProducts.map((recommendedProduct) => (
              <ProductCard key={recommendedProduct.id} product={recommendedProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

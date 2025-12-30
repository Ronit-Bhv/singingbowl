"use client";

import { Leaf, Waves, Heart, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { Product } from '@/lib/types';
import { ProductCard } from '@/components/products/product-card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Skeleton } from '@/components/ui/skeleton';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  const meditationImage = PlaceHolderImages.find(p => p.id === 'meditation-woman');

  useEffect(() => {
    async function fetchProducts() {
      try {
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
    }
    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col">
      <section className="relative h-[70vh] md:h-[90vh] w-full flex items-center justify-center text-center text-white overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://r2.fivemanage.com/s1eqtVnkFslLnri1MNmBV/Incense_Smoke_Video_Generation-ezgif.com-video-to-gif-converter.gif"
            alt="Meditative background with singing bowls"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-7xl font-headline font-bold tracking-tight">
              Soundscapes for the Soul
            </h1>
            <p className="mt-4 md:mt-6 max-w-xl mx-auto text-lg md:text-xl text-white/80">
              Discover authentic, hand-crafted singing bowls to begin your journey to inner peace and resonance.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="#products">
                  Explore The Collection <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto bg-transparent text-white border-white hover:bg-white hover:text-black">
                <Link href="#about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="products" className="py-16 md:py-24 lg:py-32">
        <div className="container">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-headline font-bold tracking-tight">
              Featured Collection
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Each bowl is a unique instrument of healing, hand-selected for its tonal purity and resonant beauty.
            </p>
          </div>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-square w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.slice(0, 6).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          <div className="mt-12 text-center">
            <Button asChild size="lg" variant="outline" className="border-primary hover:bg-primary/10">
              <Link href="/products">
                Show More Products
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="about" className="py-16 md:py-24 lg:py-32 bg-secondary">
        <div className="container grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="rounded-lg overflow-hidden aspect-square">
              {meditationImage && 
                <Image 
                    src={meditationImage.imageUrl}
                    alt="Woman meditating with a singing bowl"
                    width={600}
                    height={600}
                    className="object-cover w-full h-full"
                    data-ai-hint={meditationImage.imageHint}
                />
              }
            </div>
            <div>
              <h2 className="text-3xl md:text-5xl font-headline font-bold tracking-tight">About Resonant Harmony</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                We believe in the power of sound to heal, calm, and connect. Resonant Harmony was born from a passion for the ancient tradition of singing bowls and a desire to share their transformative benefits with the world.
              </p>
              <div className="mt-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 text-primary p-3 rounded-full flex-shrink-0">
                    <Leaf className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Ethically Sourced</h4>
                    <p className="text-muted-foreground">Our bowls are crafted by skilled artisans using traditional methods and ethically sourced materials.</p>
                  </div>
                </div>
                 <div className="flex items-start gap-4">
                  <div className="bg-primary/10 text-primary p-3 rounded-full flex-shrink-0">
                    <Waves className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Pure Resonance</h4>
                    <p className="text-muted-foreground">We personally test every bowl to ensure it possesses a clear, beautiful, and lasting resonance.</p>
                  </div>
                </div>
                 <div className="flex items-start gap-4">
                  <div className="bg-primary/10 text-primary p-3 rounded-full flex-shrink-0">
                    <Heart className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Mindful Mission</h4>
                    <p className="text-muted-foreground">We are dedicated to promoting mindfulness and well-being through the power of sound vibration.</p>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </section>
    </div>
  );
}

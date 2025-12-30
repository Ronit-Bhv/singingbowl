"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Play, Pause, Heart } from "lucide-react";
import { useState, useRef, useEffect } from "react";

import type { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCart } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/use-wishlist";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

type ProductCardProps = {
  product: Product;
};

const playingAudio: { current: HTMLAudioElement | null; id: string | null } = { current: null, id: null };

// Global event emitter to sync play/pause state across cards
const audioEventEmitter = new (class extends EventTarget {
  dispatchUpdate(id: string, isPlaying: boolean) {
    this.dispatchEvent(new CustomEvent('audiostatechange', { detail: { id, isPlaying } }));
  }
})();


export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();
  const { toast } = useToast();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const inWishlist = isInWishlist(product.id);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const audio = new Audio(product.audioUrl);
      audio.onended = () => {
        setIsPlaying(false);
        if (playingAudio.current === audio) {
          playingAudio.current = null;
          playingAudio.id = null;
        }
      };
      audioRef.current = audio;
    }

    const handleAudioStateChange = (event: Event) => {
      const { id, isPlaying } = (event as CustomEvent).detail;
      if (product.id !== id && isPlaying) {
        setIsPlaying(false);
      }
    };
    
    audioEventEmitter.addEventListener('audiostatechange', handleAudioStateChange);

    return () => {
      audioRef.current?.pause();
      audioEventEmitter.removeEventListener('audiostatechange', handleAudioStateChange);
    };
  }, [product.audioUrl, product.id]);
  
  const handlePlayPause = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      playingAudio.current = null;
      playingAudio.id = null;
    } else {
      if (playingAudio.current) {
        playingAudio.current.pause();
        audioEventEmitter.dispatchUpdate(playingAudio.id!, false);
      }
      audio.currentTime = 0;
      audio.play().catch(err => console.error("Audio play failed:", err));
      setIsPlaying(true);
      playingAudio.current = audio;
      playingAudio.id = product.id;
      audioEventEmitter.dispatchUpdate(product.id, true);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added.`,
      duration: 3000,
    });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
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

  return (
    <Card className="flex flex-col overflow-hidden h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-card border-border group">
       <Link href={`/products/${product.slug}`} aria-label={`View details for ${product.name}`} className="flex flex-col h-full">
        <CardHeader className="p-0 relative">
          <div className="aspect-[4/3] overflow-hidden">
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={600}
              height={400}
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
              data-ai-hint={product.imageHint}
            />
          </div>
          <Button 
            variant="secondary"
            size="icon"
            className="absolute top-3 right-3 rounded-full h-10 w-10 z-10 text-foreground/80 hover:text-foreground hover:bg-secondary/90"
            onClick={handleToggleWishlist}
            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={`h-5 w-5 ${inWishlist ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>
          <Button 
            variant="secondary"
            size="icon"
            className="absolute bottom-3 right-3 rounded-full h-10 w-10 z-10 text-foreground/80 hover:text-foreground hover:bg-secondary/90"
            onClick={handlePlayPause}
            aria-label={isPlaying ? "Pause audio preview" : "Play audio preview"}
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 fill-current" />}
          </Button>
        </CardHeader>
        <CardContent className="p-4 flex-grow flex flex-col">
            <CardTitle className="text-lg font-headline group-hover:text-primary transition-colors">
              {product.name}
            </CardTitle>
          <CardDescription className="mt-2 text-sm line-clamp-2 text-muted-foreground flex-grow">
            {product.description}
          </CardDescription>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          <p className="text-xl font-semibold text-foreground">
            ${product.price.toFixed(2)}
          </p>
          <Button onClick={handleAddToCart} size="sm" variant="outline" className="transition-colors hover:bg-primary hover:text-primary-foreground border-primary text-primary">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </CardFooter>
      </Link>
    </Card>
  );
}

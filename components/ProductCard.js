"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { formatZAR } from "@/lib/format";
import { useCartStore } from "@/store/useCartStore";
import StarRating from "./StarRating";

export default function ProductCard({ product, initialWishlisted = false }) {
  const addItem = useCartStore((s) => s.addItem);
  const [wishlisted, setWishlisted] = useState(initialWishlisted);
  const [pending, setPending] = useState(false);

  async function toggleWishlist(e) {
    e.preventDefault();
    if (pending) return;
    setPending(true);
    try {
      const res = await fetch("/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product._id }),
      });
      if (res.status === 401) {
        window.location.href = "/account/login?next=/wishlist";
        return;
      }
      const data = await res.json();
      setWishlisted(data.inWishlist);
    } finally {
      setPending(false);
    }
  }

  function handleAddToCart(e) {
    e.preventDefault();
    addItem({
      productId: product._id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images?.[0] || "",
    });
  }

  return (
    <div className="group relative border border-border rounded-lg overflow-hidden bg-surface flex flex-col">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="aspect-square bg-gold-light relative overflow-hidden">
          {product.images?.[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted text-sm">No image</div>
          )}
        </div>
      </Link>

      <button
        onClick={toggleWishlist}
        disabled={pending}
        aria-label="Toggle wishlist"
        className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-sm ${
          wishlisted ? "bg-gold text-white" : "bg-white/90 text-foreground"
        }`}
      >
        &hearts;
      </button>

      <div className="p-4 flex flex-col gap-1 flex-1">
        {product.category?.name && (
          <span className="text-xs uppercase tracking-wide text-muted">{product.category.name}</span>
        )}
        <Link href={`/product/${product.slug}`} className="font-medium leading-snug hover:text-gold">
          {product.name}
        </Link>
        <StarRating value={product.ratingAvg} count={product.ratingCount} />
        <div className="mt-auto pt-2 flex items-center justify-between gap-2">
          <span className="font-serif text-lg">{formatZAR(product.price)}</span>
          <button onClick={handleAddToCart} className="btn-gold text-xs px-3 py-2 rounded whitespace-nowrap">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

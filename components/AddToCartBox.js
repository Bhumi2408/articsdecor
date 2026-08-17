"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";

export default function AddToCartBox({ product, initialWishlisted = false }) {
  const router = useRouter();
  const addItem = useCartStore((s) => s.addItem);
  const [qty, setQty] = useState(1);
  const [wishlisted, setWishlisted] = useState(initialWishlisted);
  const [pending, setPending] = useState(false);
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    addItem(
      {
        productId: product._id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        image: product.images?.[0] || "",
      },
      qty
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  async function toggleWishlist() {
    if (pending) return;
    setPending(true);
    try {
      const res = await fetch("/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product._id }),
      });
      if (res.status === 401) {
        router.push("/account/login?next=/wishlist");
        return;
      }
      const data = await res.json();
      setWishlisted(data.inWishlist);
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="flex items-center border border-border rounded">
          <button
            className="w-9 h-9 flex items-center justify-center"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
          >
            −
          </button>
          <span className="w-10 text-center">{qty}</span>
          <button className="w-9 h-9 flex items-center justify-center" onClick={() => setQty((q) => q + 1)}>
            +
          </button>
        </div>

        <button onClick={handleAddToCart} className="btn-gold px-6 py-2 rounded text-sm flex-1">
          {added ? "Added to cart" : "Add to cart"}
        </button>
      </div>

      <div className="flex gap-3 text-sm">
        <button onClick={toggleWishlist} className="btn-outline-gold px-4 py-2 rounded flex-1">
          {wishlisted ? "♥ In Wishlist" : "♡ Add to Wishlist"}
        </button>
      </div>
    </div>
  );
}

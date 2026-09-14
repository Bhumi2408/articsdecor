"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";

/* Match the toast library used in layout.js — see ProductForm for the note */
import { toast } from "sonner";

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

const HeartIcon = ({ filled, ...p }) => (
  <svg {...iconProps} fill={filled ? "currentColor" : "none"} {...p}>
    <path d="M12 20s-7-4.4-7-9.3A3.9 3.9 0 0 1 12 8a3.9 3.9 0 0 1 7 2.7C19 15.6 12 20 12 20z" />
  </svg>
);

export default function AddToCartBox({ product, initialWishlisted }) {
  const router = useRouter();
  const addItem = useCartStore((s) => s.addItem);
  const wishlisted = useWishlistStore((s) => s.isWishlisted(product._id));
  const toggleWishlistStore = useWishlistStore((s) => s.toggle);
  const seedWishlist = useWishlistStore((s) => s.seed);

  const [qty, setQty] = useState(1);
  const [pending, setPending] = useState(false);

  // Seed the shared store with the server-known state for this product so
  // the button is correct on first paint, same as ProductCard.
  useEffect(() => {
    if (typeof initialWishlisted === "boolean") {
      seedWishlist(product._id, initialWishlisted);
    }
  }, [product._id, initialWishlisted, seedWishlist]);

  const inStock = product.stock > 0;
  const max = Math.max(1, product.stock || 1);

  function handleAddToCart() {
    if (!inStock) return;

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

    toast.success(`${product.name} added to cart`);
  }

  async function toggleWishlist() {
    if (pending) return;
    setPending(true);
    toggleWishlistStore(product._id);

    try {
      const res = await fetch("/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product._id }),
      });

      if (res.status === 401) {
        toggleWishlistStore(product._id);
        router.push("/account/login?next=/wishlist");
        return;
      }

      if (!res.ok) {
        toggleWishlistStore(product._id);
        toast.error("Could not update your wishlist.");
        return;
      }

      const data = await res.json();
      toast.success(data.inWishlist ? "Saved to wishlist" : "Removed from wishlist");
    } catch {
      toggleWishlistStore(product._id);
      toast.error("Could not reach the server. Check your connection.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-3 sm:flex-row">
        {/* quantity */}
        <div className="flex h-[54px] shrink-0 items-center rounded-[4px] border border-[#132c47]/15 bg-white">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            disabled={qty <= 1}
            aria-label="Decrease quantity"
            className="grid h-full w-12 place-items-center text-[18px] text-[#66717c] transition-colors hover:text-[#770800] disabled:opacity-30"
          >
            &minus;
          </button>
          <span
            aria-live="polite"
            className="w-10 text-center text-[15px] font-medium tabular-nums text-[#132c47]"
          >
            {qty}
          </span>
          <button
            type="button"
            onClick={() => setQty((q) => Math.min(max, q + 1))}
            disabled={qty >= max}
            aria-label="Increase quantity"
            className="grid h-full w-12 place-items-center text-[18px] text-[#66717c] transition-colors hover:text-[#770800] disabled:opacity-30"
          >
            +
          </button>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={!inStock}
          className="h-[54px] flex-1 rounded-[4px] bg-[#132c47] px-8 text-[10px] font-bold uppercase tracking-[0.22em] text-white transition-colors hover:bg-[#770800] disabled:cursor-not-allowed disabled:bg-[#132c47]/35"
        >
          {inStock ? "Add to cart" : "Out of stock"}
        </button>
      </div>

      <button
        type="button"
        onClick={toggleWishlist}
        disabled={pending}
        aria-pressed={wishlisted}
        className={`flex h-[52px] w-full items-center justify-center gap-2.5 rounded-[4px] border text-[10px] font-bold uppercase tracking-[0.22em] transition-colors disabled:opacity-60 ${
          wishlisted
            ? "border-[#770800] text-[#770800]"
            : "border-[#132c47]/15 text-[#66717c] hover:border-[#770800] hover:text-[#770800]"
        }`}
      >
        <HeartIcon filled={wishlisted} className="h-[17px] w-[17px]" />
        {wishlisted ? "In wishlist" : "Add to wishlist"}
      </button>
    </div>
  );
}
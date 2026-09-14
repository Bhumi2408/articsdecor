"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { formatINR } from "@/lib/format";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { Heart } from "lucide-react";
import { toast } from "sonner";

/* mat se bahar nikalne wali motion — sab jagah yahi timing */
const REVEAL = "duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]";

export default function ProductCard({ product }) {
  const addItem = useCartStore((s) => s.addItem);
  const wishlisted = useWishlistStore((s) => s.isWishlisted(product._id));
  const toggleWishlistStore = useWishlistStore((s) => s.toggle);

  const [pending, setPending] = useState(false);

  async function toggleWishlist(e) {
    e.preventDefault();
    e.stopPropagation();
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
        window.location.href = "/account/login?next=/wishlist";
        return;
      }

      if (!res.ok) toggleWishlistStore(product._id);
    } catch (error) {
      toggleWishlistStore(product._id);
      console.error(error);
    } finally {
      setPending(false);
    }
  }

function handleAddToCart(e) {
  e.preventDefault();
  e.stopPropagation();

  addItem({
    productId: product._id,
    slug: product.slug,
    name: product.name,
    price: product.price,
    image: product.images?.[0] || "",
  });

  toast.success("Added to your bag", {
    description: product.name,
  });
}

  const href = `/product/${product.slug}`;
  const hoverImage = product.images?.[1];

  return (
    <article className="group flex h-full w-full flex-col">

      {/* ================= FRAMED IMAGE =================
          Image cream mat ke andar 86% par baithti hai. Hover par scale 100
          ho kar mat ko dhak leti hai — jaise frame se bahar nikal rahi ho.
          Padding ki jagah transform use kiya hai taaki GPU par chale.
      ================================================= */}
      <Link href={href} className="relative block aspect-[3/2] w-full overflow-hidden bg-[#EAE3D5]">
        {product.images?.[0] ? (
          <div className={`absolute inset-0 scale-[0.86] overflow-hidden transition-transform group-hover:scale-100 ${REVEAL}`}>
            <Image
              src={product.images[0]}
              alt={product.imageAlt || product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1400px) 28vw, 20vw"
              className="object-cover"
            />

            {/* doosri image ho to hover par cross-fade — dusra angle ya
                room shot dikh jaata hai */}
            {hoverImage && (
              <Image
                src={hoverImage}
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1400px) 28vw, 20vw"
                className="object-cover opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100"
              />
            )}
          </div>
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-[var(--ad-ink-soft)]">
            No image
          </div>
        )}
      </Link>

      {/* ================= DETAILS ================= */}
      <div className="flex flex-1 flex-col">

        {/* rule — hover par gold left se draw hoti hai */}
        <div className="relative mt-5 h-px w-full bg-[var(--ad-line)]">
          <span
            aria-hidden="true"
            className={`absolute inset-0 origin-left scale-x-0 bg-[var(--ad-gold)] transition-transform group-hover:scale-x-100 ${REVEAL}`}
          />
        </div>

        {/* category */}
        <div className="mt-4 h-[13px]">
          {product.category?.name && (
            <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[var(--ad-ink-soft)]">
              {product.category.name}
            </span>
          )}
        </div>

        {/* naam aur price ek hi line par — catalogue entry jaisa,
            stacked list jaisa nahi */}
        <div className="mt-2 flex items-start justify-between gap-4">
          <Link href={href} className="min-w-0">
            <h3 className="line-clamp-2 text-[16px] font-medium leading-[1.4] text-[var(--ad-ink)] transition-colors duration-300 group-hover:text-[var(--ad-gold)]">
              {product.name}
            </h3>
          </Link>

          <span className="shrink-0 text-[16px] font-semibold leading-[1.4] text-[var(--ad-ink)]">
         
            {formatINR(product.price)}
          </span>
        </div>

        {/* action row — dono actions ek saath, image par koi floating
            button nahi. Touch devices par bhi dono hamesha available. */}
        <div className="mt-auto flex items-center justify-between pt-5">
          <button
            onClick={handleAddToCart}
            className="group/add relative text-[10px] font-semibold cursor-pointer uppercase tracking-[0.2em] text-[var(--ad-ink)] transition-colors duration-300 hover:text-[var(--ad-gold)]"
          >
            Add to bag
            <span aria-hidden="true" className="absolute -bottom-1.5 left-0 h-px w-full bg-[var(--ad-line)]" />
            <span
              aria-hidden="true"
              className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-[var(--ad-gold)] transition-transform duration-500 ease-out group-hover/add:scale-x-100"
            />
          </button>

          <button
            onClick={toggleWishlist}
            disabled={pending}
            aria-pressed={wishlisted}
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            className={
              "grid h-7 w-7 shrink-0 place-items-center transition-colors duration-300 disabled:opacity-50 cursor-pointer" +
              (wishlisted
                ? "text-[var(--ad-gold)]"
                : "text-[var(--ad-ink-soft)] hover:text-[var(--ad-gold)]")
            }
          >
            <Heart className="h-[17px] w-[17px] cursor-pointer" strokeWidth={1.6} fill={wishlisted ? "currentColor" : "none"} />
          </button>
        </div>
      </div>
    </article>
  );
}

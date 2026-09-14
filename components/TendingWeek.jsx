// components/TrendingWeek.jsx
"use client";

import { useRef, useEffect, useState } from "react";
import ProductCard from "./ProductCard";

export default function TrendingWeek({ products = [] }) {
  const trendingProducts = products
    .filter((p) => p.featured === true && p.hiddenFromStore !== true)
    .slice(-12);

  const scrollRef = useRef(null);
  const [paused, setPaused] = useState(false);

  const loopProducts = [
    ...trendingProducts,
    ...trendingProducts,
  ];

  useEffect(() => {
    if (paused || trendingProducts.length === 0) return;

    const el = scrollRef.current;
    if (!el) return;

    const interval = setInterval(() => {
      const cardWidth = el.firstChild?.offsetWidth || 300;
      const gap = 24;
      const singleSetWidth = el.scrollWidth / 2;

      el.scrollBy({
        left: cardWidth + gap,
        behavior: "smooth",
      });

      setTimeout(() => {
        if (el.scrollLeft >= singleSetWidth) {
          el.scrollLeft -= singleSetWidth;
        }
      }, 500);
    }, 2500);

    return () => clearInterval(interval);
  }, [paused, trendingProducts.length]);

  if (trendingProducts.length === 0) return null;

  return (
    <section className="bg-surface pt-14 pb-5">
      <div className="px-[14px]">

        <h2 className="mb-3 text-center font-serif text-4xl">
          Featured Products
        </h2>

        <div
          ref={scrollRef}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="
            mt-10
            flex
            gap-6
            overflow-x-auto
            scroll-smooth
            text-left
            pb-2

            [-ms-overflow-style:none]
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
          "
        >
          {loopProducts.map((p, i) => (
            <div
              key={`${p._id}-${i}`}
              className="
                w-[45%]
                shrink-0
                sm:w-[30%]
                md:w-[23%]
                lg:w-[16%]
              "
            >
              <ProductCard
                product={p}
                initialWishlisted={p.initialWishlisted}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
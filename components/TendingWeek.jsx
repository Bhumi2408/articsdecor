// components/TrendingWeek.jsx
"use client";

import { useRef, useEffect, useState } from "react";
import ProductCard from "./ProductCard";

export default function TrendingWeek({ products = [] }) {
  const trendingProducts = products.slice(-12); // last 12 products
  const scrollRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const loopProducts = [...trendingProducts, ...trendingProducts]; // duplicate for seamless loop

  useEffect(() => {
    if (paused || trendingProducts.length === 0) return;
    const el = scrollRef.current;
    if (!el) return;

    const interval = setInterval(() => {
      const cardWidth = el.firstChild?.offsetWidth || 300;
      const gap = 16;
      const singleSetWidth = el.scrollWidth / 2;

      el.scrollBy({ left: cardWidth + gap, behavior: "smooth" });

      setTimeout(() => {
        if (el.scrollLeft >= singleSetWidth) {
          el.scrollLeft = el.scrollLeft - singleSetWidth;
        }
      }, 500);
    }, 2500);

    return () => clearInterval(interval);
  }, [paused, trendingProducts.length]);

  if (trendingProducts.length === 0) return null;

  return (
    <section className="bg-surface py-16">
      <div className="text-center px-[14px]">
        <h2 className="font-serif text-4xl mb-3">Trending Products of The Week</h2>
        <p className="text-muted text-sm md:text-base mb-10">
          Our jewelry is made by the finest artists and carefully selected to reflect your style and personality
        </p>

        <div
          ref={scrollRef}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="flex gap-6 overflow-x-auto scroll-smooth text-left scrollbar-hide"
        >
          {loopProducts.map((p, i) => (
            <div
              key={`${p._id}-${i}`}
              className="shrink-0 w-[45%] sm:w-[30%] md:w-[23%] lg:w-[16%]"
            >
              <ProductCard product={p} initialWishlisted={p.initialWishlisted} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
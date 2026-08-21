// components/BestSellersSection.jsx
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ProductCard from "./ProductCard";

export default function BestSellersSection({ products = [] }) {
  const scrollRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const [loop, setLoop] = useState(false); // duplicate karna hai ya nahi

  /* ek set screen se bada hai tabhi duplicate karo, warna wahi products dobara dikhte hain */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || products.length === 0) return;

    const measure = () => {
      const cards = el.querySelectorAll("[data-card]");
      const first = cards[0];
      const last = cards[products.length - 1];
      if (!first || !last) return;
      const singleSetWidth = last.offsetLeft + last.offsetWidth - first.offsetLeft;
      setLoop(singleSetWidth > el.clientWidth + 8);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [products.length]);

  const advance = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const cards = el.querySelectorAll("[data-card]");
    if (cards.length < 2) return;

    const step = cards[1].offsetLeft - cards[0].offsetLeft; // gap included
    const setWidth = cards[products.length]
      ? cards[products.length].offsetLeft - cards[0].offsetLeft
      : 0;
    if (!setWidth) return;

    // aadhe tak pahunche to bina animation ke chupke se wapas
    if (el.scrollLeft >= setWidth - 4) {
      el.style.scrollBehavior = "auto";
      el.scrollLeft -= setWidth;
      void el.offsetWidth; // reflow
      el.style.scrollBehavior = "";
    }
    el.scrollBy({ left: step, behavior: "smooth" });
  }, [products.length]);

  useEffect(() => {
    if (!loop || paused) return;
    const id = setInterval(() => {
      if (!document.hidden) advance();
    }, 2500);
    return () => clearInterval(id);
  }, [loop, paused, advance]);

  if (products.length === 0) return null;

  const loopProducts = loop ? [...products, ...products] : products;

  return (
    <section className="bg-surface py-16">
      <div className="text-center px-[14px]">
        <h2 className="font-serif text-4xl mb-3">Our Best Sellers</h2>
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
              data-card
              aria-hidden={i >= products.length}
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
// components/TrendingWeek.jsx
"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import ProductCard from "./ProductCard";

/* pixels per second — lower is calmer */
const SPEED = 45;

export default function TrendingWeek({ products = [], limit = 10 }) {
  const trendingProducts = products
    .filter((p) => p.featured === true && p.hiddenFromStore !== true)
    .slice(0, limit);

  const scrollRef = useRef(null);
  const setWidthRef = useRef(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const count = trendingProducts.length;

  /* Two copies of the list. The wrap point is measured from the DOM rather
     than guessed, so the reset lands on a pixel-identical frame and the jump
     is invisible. */
  const loop = [...trendingProducts, ...trendingProducts];

  const measure = useCallback(() => {
    const el = scrollRef.current;
    if (!el || el.children.length <= count) return;
    const first = el.children[0];
    const secondCopyStart = el.children[count];
    /* distance from the first card to the first card of the second copy —
       includes the gaps, which scrollWidth / 2 does not */
    setWidthRef.current = secondCopyStart.offsetLeft - first.offsetLeft;
  }, [count]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!count) return;

    measure();

    const el = scrollRef.current;
    if (!el) return;

    const observer = new ResizeObserver(measure);
    observer.observe(el);
    window.addEventListener("resize", measure);

    /* images change the layout once they load */
    const images = el.querySelectorAll("img");
    images.forEach((img) => img.addEventListener("load", measure));

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
      images.forEach((img) => img.removeEventListener("load", measure));
    };
  }, [count, measure]);

  useEffect(() => {
    if (!count || paused || reduceMotion) return;

    const el = scrollRef.current;
    if (!el) return;

    let frame;
    let last = performance.now();

    const step = (now) => {
      const delta = (now - last) / 1000;
      last = now;

      const setWidth = setWidthRef.current;
      if (setWidth > 0) {
        el.scrollLeft += SPEED * delta;

        /* Instant wrap. Because the second copy is identical to the first,
           subtracting exactly one set's width leaves the pixels unchanged —
           no snap-back, no visible seam. */
        if (el.scrollLeft >= setWidth) el.scrollLeft -= setWidth;
      }

      frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [paused, reduceMotion, count]);

  /* keep manual scrolling inside the loop too */
  const handleScroll = () => {
    const el = scrollRef.current;
    const setWidth = setWidthRef.current;
    if (!el || setWidth <= 0) return;
    if (el.scrollLeft <= 0) el.scrollLeft += setWidth;
    else if (el.scrollLeft >= setWidth * 2) el.scrollLeft -= setWidth;
  };

  if (!count) return null;

  return (
    <section className="bg-surface pb-5 pt-14">
      <div className="px-[14px]">
        <h2 className="mb-3 text-center font-serif text-4xl">Featured Products</h2>

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
          aria-label="Featured products"
          className="
            mt-10
            flex
            gap-6
            overflow-x-auto
            pb-2
            text-left
            [-ms-overflow-style:none]
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
          "
        >
          {loop.map((p, i) => (
            <div
              key={`${p._id}-${i}`}
              /* the second copy is decoration — don't read it out twice */
              aria-hidden={i >= count || undefined}
              className="w-[220px] shrink-0 sm:w-[250px] lg:w-[270px]"
            >
              <ProductCard product={p} initialWishlisted={p.initialWishlisted} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
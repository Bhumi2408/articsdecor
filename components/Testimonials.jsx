// components/Testimonials.jsx
"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const HEADING = "What Our Clients Say";
const SUBHEADING = "Adorn Yourself in Glamour: Find Your Perfect Piece Today";
const STAR_COLOR = "#dd8752";
const AUTOPLAY_MS = 4500;


const TESTIMONIALS = [
  {
    title: "A Pendant To Cherish",
    text: "I did my research before buying, and Lute Diamonds stood out for their attention to detail. My pendant feels personal and timeless, exactly what I was looking for.",
    name: "Clara Weton",
    role: "Fresh Design",
    avatar: "/home/test1.jpeg",
    rating: 5,
  },
  {
    title: "Beautifully Handcrafted",
    text: "I've bought both a ring and a pendant from Lute Diamonds, and each piece feels made with real care. The detailing is exceptional, and the quality speaks for itself.",
    name: "Seraton Suth",
    role: "Fresh Design",
    avatar: "/home/test2.jpeg",
    rating: 5,
  },
  {
    title: "A Ring Worth Treasuring",
    text: "I bought a ring from Lute Diamonds for a special occasion, and the craftsmanship exceeded my expectations. The setting is flawless, and it looks even more stunning in person.",
    name: "Alex Rony",
    role: "Fresh Design",
    avatar: "/home/test3.jpg",
    rating: 5,
  },
  {
    title: "Elegant Earrings",
    text: "These earrings from Lute Diamonds have become my everyday go-to. Lightweight, beautifully finished, and the sparkle catches everyone's eye. Compared a few brands, and this quality is unmatched.",
    name: "Rose Ether",
    role: "Fresh Design",
    avatar: "/home/test4.jpeg",
    rating: 5,
  },
];

/* seamless loop ke liye list do baar */
const LOOP = [...TESTIMONIALS, ...TESTIMONIALS];

function Star({ className = "", color = "currentColor" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill={color} aria-hidden="true">
      <path d="m12 2.6 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.5 6.1 20.6l1.2-6.5-4.8-4.6 6.6-.9z" />
    </svg>
  );
}

export default function Testimonials() {
  const trackRef = useRef(null);
  const [paused, setPaused] = useState(false);

  /* ek card ka exact step (gap included) */
  const getStep = () => {
    const el = trackRef.current;
    if (!el) return 0;
    const cards = el.querySelectorAll("[data-card]");
    if (cards.length < 2) return cards[0]?.offsetWidth || 0;
    return cards[1].offsetLeft - cards[0].offsetLeft;
  };

  /* ek poore set ki exact width — scrollWidth padding bhi jodta hai isliye usse nahi lete */
  const getLoopWidth = () => {
    const el = trackRef.current;
    if (!el) return 0;
    const cards = el.querySelectorAll("[data-card]");
    const first = cards[0];
    const mid = cards[TESTIMONIALS.length];
    if (!first || !mid) return 0;
    return mid.offsetLeft - first.offsetLeft;
  };

  /* ek card aage — aadhe pe pahunchte hi chupke se wapas, taki loop seamless lage */
  const advance = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const half = getLoopWidth();
    if (!half) return;

    if (el.scrollLeft >= half - 4) {
      el.style.scrollBehavior = "auto";
      el.scrollLeft -= half;
      void el.offsetWidth; // reflow
      el.style.scrollBehavior = "";
    }
    el.scrollBy({ left: getStep(), behavior: "smooth" });
  }, []);

  /* autoplay */
  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      if (!document.hidden) advance();
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, advance]);

  return (
    <section
      className="w-full bg-white py-14 md:py-16"
      aria-roledescription="carousel"
      aria-label="Client testimonials"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      <style>{`
        .tm-track { scrollbar-width: none; -ms-overflow-style: none; }
        .tm-track::-webkit-scrollbar { display: none; }
      `}</style>

      {/* heading */}
      <div className="px-[15px] text-center">
        <h2 className="text-[32px] font-medium leading-tight tracking-[-0.02em] text-[#141414] md:text-[36px]">
          {HEADING}
        </h2>
        <p className="mx-auto mt-4 max-w-[720px] text-sm font-medium text-[#5A5A5A] md:text-[15px]">
          {SUBHEADING}
        </p>
      </div>

      {/* cards */}
      <div
        ref={trackRef}
        className="tm-track mt-12 flex snap-x snap-mandatory items-stretch gap-6 overflow-x-auto scroll-smooth scroll-pl-[15px] scroll-pr-[15px] px-[15px] pb-2"
      >
        {LOOP.map((t, i) => (
          <article
            key={`${t.name}-${i}`}
            data-card
            aria-hidden={i >= TESTIMONIALS.length}
            className="flex w-[85%] shrink-0 snap-start flex-col rounded-2xl bg-[#F5F5F5] p-8 sm:w-[calc((100%-1.5rem)/2)] md:p-10 lg:w-[calc((100%-4.5rem)/4)]"
          >
            <div className="flex items-center gap-1.5" aria-label={`${t.rating} out of 5 stars`}>
              {Array.from({ length: t.rating }).map((_, s) => (
                <Star key={s} className="h-[18px] w-[18px]" color={STAR_COLOR} />
              ))}
            </div>

            <h3 className="mt-6 text-lg font-medium leading-snug text-[#141414]">
              &ldquo; {t.title} &rdquo;
            </h3>

            <p className="mt-4 text-[15.5px] leading-[1.75] text-[#3A3A3A]">{t.text}</p>

            {/* mt-auto = author hamesha card ke bottom pe */}
            <div className="mt-auto flex items-center gap-4 pt-8">
              <img
                src={t.avatar}
                alt={t.name}
                loading="lazy"
                className="h-16 w-16 shrink-0 rounded-full object-cover"
              />
              <div>
                <p className="text-[18px] font-medium text-[#141414]">{t.name}</p>
                <p className="mt-0.5 text-[15px] text-[#6B6B6B]">{t.role}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
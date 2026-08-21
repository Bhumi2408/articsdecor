"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

/* 👇 apni images public folder me daal ke path change kar lena */
const SLIDES = [
  {
    image: "/home/hero1.jpeg",
    eyebrow: "Luxury Rings",
    title: "Timeless Rings Made\nto Celebrate Moments",
    text: "Discover timeless rings crafted with exceptional artistry, sparkling brilliance, and elegant designs made to celebrate every moment.",
    ctaLabel: "Shop Now",
    ctaHref: "/shop",
  },
  {
    image: "/home/hero2.jpeg",
    eyebrow: "Luxury Pendants",
    title: "Elegant Pendants That\nSparkle with Every Moment",
    text: "Discover beautifully crafted pendants designed to add timeless elegance, radiant brilliance, and effortless sophistication to every look.",
    ctaLabel: "Shop Now",
    ctaHref: "/shop",
  },
  {
    image: "/home/hero3.jpeg",
    eyebrow: "Luxury Earrings",
    title: "Earrings Crafted for\nEvery Occasion",
    text: "Explore handpicked earrings that balance modern design with classic brilliance, finished to catch the light from every angle.",
    ctaLabel: "Shop Now",
    ctaHref: "/shop",
  },
];

const PARALLAX = 16; // image kitna "pull" hoga (%)
const AUTOPLAY_MS = 6000;
const SLIDE_MS = 900; // slide transition duration
const ZOOM_FROM = 1.34; // slide aate hi image itni zoomed hoti hai
const ZOOM_TO = 1.2; // hold ke dauran yahan tak zoom out hoti hai
const ZOOM_MS = AUTOPLAY_MS + 1400; // zoom out kitni der me pura hoga
const EASE = "cubic-bezier(0.22, 0.61, 0.36, 1)";

export default function HeroSlider() {
  const total = SLIDES.length;
  const renderSlides = total > 1 ? [...SLIDES, SLIDES[0]] : SLIDES;

  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [paused, setPaused] = useState(false);
  const [width, setWidth] = useState(1);

  const rootRef = useRef(null);
  const trackRef = useRef(null);
  const startX = useRef(0);

  const activeIndex = index % total;

  /* container width (parallax maths ke liye) */
  useEffect(() => {
    const measure = () => setWidth(rootRef.current?.offsetWidth || 1);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  /* index kabhi bhi clone se aage na jaaye */
  const next = useCallback(() => {
    setAnimate(true);
    setIndex((i) => Math.min(i + 1, total));
  }, [total]);

  const prev = useCallback(() => {
    if (index <= 0) {
      // clone position pe bina animation ke jump, phir peeche slide
      setAnimate(false);
      setIndex(total);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          setAnimate(true);
          setIndex(total - 1);
        })
      );
    } else {
      setAnimate(true);
      setIndex((i) => i - 1);
    }
  }, [index, total]);

  const goTo = (i) => {
    setAnimate(true);
    setIndex(i);
  };

  /* infinite loop reset — timer se, taki transitionend miss hone pe bhi kaam kare */
  useEffect(() => {
    if (index !== total || total < 2) return;
    const t = setTimeout(() => {
      setAnimate(false);
      setIndex(0);
    }, SLIDE_MS + 60);
    return () => clearTimeout(t);
  }, [index, total]);

  /* fast path: transition khatam hote hi reset */
  const handleTransitionEnd = (e) => {
    if (e.target !== trackRef.current) return;
    if (index === total) {
      setAnimate(false);
      setIndex(0);
    }
  };

  /* autoplay — tab hidden ho to band */
  useEffect(() => {
    if (paused || dragging || total < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let id = null;
    const start = () => {
      stop();
      id = setInterval(next, AUTOPLAY_MS);
    };
    const stop = () => {
      if (id) clearInterval(id);
      id = null;
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    if (!document.hidden) start();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [paused, dragging, next, total]);

  /* keyboard */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    const el = rootRef.current;
    el?.addEventListener("keydown", onKey);
    return () => el?.removeEventListener("keydown", onKey);
  }, [next, prev]);

  /* drag / swipe */
  const onPointerDown = (e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    startX.current = e.clientX;
    setDragging(true);
    setAnimate(false);
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!dragging) return;
    const delta = e.clientX - startX.current;
    const atEdge = (index === 0 && delta > 0) || (index === total && delta < 0);
    setDragX(atEdge ? delta * 0.35 : delta); // edge pe rubber-band
  };

  const endDrag = () => {
    if (!dragging) return;
    const moved = dragX / width;
    setDragging(false);
    setAnimate(true);
    setDragX(0);
    if (moved < -0.14) next();
    else if (moved > 0.14) prev();
  };

  const pos = index - dragX / width; // 0..total, parallax ke liye
  const transition = animate ? `transform ${SLIDE_MS}ms ${EASE}` : "none";

  return (
    <section
      ref={rootRef}
      tabIndex={-1}
      aria-roledescription="carousel"
      aria-label="Featured collections"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => {
        setPaused(false);
        endDrag();
      }}
      className="relative h-[62vh] min-h-[350px] w-full touch-pan-y select-none overflow-hidden bg-[#1A1208] sm:h-[70vh] sm:min-h-[520px] md:h-[85vh] md:min-h-[750px]"
    >
      <style>{`
        @keyframes luteHeroUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .lute-hero-up { animation: luteHeroUp .85s ${EASE} both; }

        @keyframes luteZoomOut {
          from { transform: scale(${ZOOM_FROM}); }
          to   { transform: scale(${ZOOM_TO}); }
        }
        .lute-hero-zoom { animation: luteZoomOut ${ZOOM_MS}ms ease-out both; }

        @media (prefers-reduced-motion: reduce) {
          .lute-hero-up, .lute-hero-zoom { animation: none; }
        }
      `}</style>

      {/* ---------- image track (pull / parallax) ---------- */}
      <div
        ref={trackRef}
        onTransitionEnd={handleTransitionEnd}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        style={{
          transform: `translate3d(calc(${-index * 100}% + ${dragX}px), 0, 0)`,
          transition,
          willChange: "transform",
        }}
        className={`flex h-full w-full ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
      >
        {renderSlides.map((slide, i) => (
          <div key={`${slide.image}-${i}`} className="relative h-full w-full shrink-0 overflow-hidden">
            <div
              style={{
                transform: `translate3d(${(pos - i) * PARALLAX}%, 0, 0)`,
                transition,
                willChange: "transform",
              }}
              className="absolute inset-0"
            >
              <img
                src={slide.image}
                alt=""
                draggable={false}
                decoding="async"
                className={`h-full w-full scale-[1.2] object-cover ${i === index ? "lute-hero-zoom" : ""}`}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#58371d]/70 via-black/40 to-black/5" />
          </div>
        ))}
      </div>

      {/* ---------- content (fade up on every slide) ---------- */}
      <div className="pointer-events-none absolute inset-0 flex items-center">
        <div key={activeIndex} className="w-full px-5 sm:px-8 lg:px-[30px]">
          <p
            className="lute-hero-up text-[10px] font-semibold uppercase tracking-[0.1em] text-white sm:text-[12px] md:text-[14px]"
            style={{ animationDelay: "0ms" }}
          >
            {SLIDES[activeIndex].eyebrow}
          </p>

          <h1
            className="lute-hero-up mt-3 sm:mt-5 max-w-[1050px] whitespace-pre-line text-[26px] font-medium leading-[1.12] tracking-[-0.02em] text-white xs:text-[30px] sm:text-[38px] lg:text-[52px] xl:text-[70px]"
            style={{ animationDelay: "90ms" }}
          >
            {SLIDES[activeIndex].title}
          </h1>

          <p
            className="lute-hero-up mt-3 sm:mt-6 max-w-[500px] sm:max-w-[690px] text-[13px] leading-[1.55] text-white/90 sm:text-[15px] md:text-[17px]"
            style={{ animationDelay: "190ms" }}
          >
            {SLIDES[activeIndex].text}
          </p>

          <div className="lute-hero-up mt-5 sm:mt-9" style={{ animationDelay: "290ms" }}>
            <Link
              href={SLIDES[activeIndex].ctaHref}
              className="pointer-events-auto inline-flex items-center rounded-[10px] border border-white/85 px-5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-white hover:text-[#1B1B1B] sm:px-8 sm:py-4 sm:text-[15px]"
            >
              {SLIDES[activeIndex].ctaLabel}
            </Link>
          </div>
        </div>
      </div>

      {/* ---------- dots ---------- */}
      {total > 1 && (
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 sm:bottom-6 sm:gap-2.5">
          {SLIDES.map((s, i) => (
            <button
              key={s.image}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === activeIndex}
              className={`h-2 w-2 rounded-full border transition-all sm:h-2.5 sm:w-2.5 ${
                i === activeIndex
                  ? "border-[#C9A227] bg-[#C9A227]"
                  : "border-[#C9A227]/70 bg-transparent hover:bg-[#C9A227]/40"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
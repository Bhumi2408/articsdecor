// components/HandmadeSection.jsx
"use client";

import { useEffect, useRef, useState } from "react";

export default function HandmadeJewllerySection({
  image,
  tag,
  title,
  description,
  buttonText = "Explore More",
  buttonLink = "#",
}) {
  const sectionRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  /* section screen pe aate hi entry animation chale */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setMounted(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const enter = (delay) => ({
    className: `transition-all duration-700 ease-out ${
      mounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
    }`,
    style: { transitionDelay: `${delay}ms` },
  });

  return (
    <section
      ref={sectionRef}
      className="hm-sec group relative h-[500px] w-full overflow-hidden bg-white md:h-[700px]"
    >
      <style>{`
        /* hover pe text thoda left slide — ek-ek karke */
        .hm-item {
          transition: transform 550ms cubic-bezier(0.22, 0.61, 0.36, 1);
          will-change: transform;
        }
        .hm-sec:hover .hm-item { transform: translateX(-24px); }
        .hm-sec:hover .hm-1 { transition-delay: 0ms; }
        .hm-sec:hover .hm-2 { transition-delay: 80ms; }
        .hm-sec:hover .hm-3 { transition-delay: 160ms; }
        .hm-sec:hover .hm-4 { transition-delay: 240ms; }
        /* wapas aate waqt sab ek saath, bina lag ke */
        .hm-item { transition-delay: 0ms; }

        @media (hover: none) {
          .hm-sec:hover .hm-item { transform: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hm-item { transition: none; }
          .hm-sec:hover .hm-item { transform: none; }
        }
      `}</style>

      {/* Full-section background image */}
      <img
        src={image}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
      />

      {/* Content overlay - right side */}
      <div className="relative z-10 grid h-full grid-cols-1 md:grid-cols-2">
        <div />
        <div className="flex flex-col justify-center px-8 md:px-16">
          <div {...enter(150)}>
            <span className="hm-item hm-1 block text-xs font-semibold uppercase tracking-widest text-gray-500">
              {tag}
            </span>
          </div>

          <div {...enter(300)}>
            <h2 className="hm-item hm-2 mt-3 text-3xl font-medium leading-tight text-gray-900 md:text-4xl">
              {title}
            </h2>
          </div>

          <div {...enter(450)}>
            <p className="hm-item hm-3 mt-3 max-w-md text-[15px] font-medium leading-6 text-gray-600">
              {description}
            </p>
          </div>

          {buttonText && (
            <div {...enter(600)}>
              <a
                href={buttonLink}
                className="hm-item hm-4 relative mt-5 inline-block w-fit overflow-hidden rounded-md bg-black px-5 py-3 text-sm font-medium text-white
                  before:absolute before:inset-y-0 before:left-0 before:z-0 before:w-0 before:bg-[#DBAF36] before:content-['']
                  before:transition-[width] before:duration-500 before:ease-out hover:before:w-full"
              >
                <span className="relative z-10">{buttonText}</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
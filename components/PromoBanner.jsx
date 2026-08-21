// components/PromoBanner.jsx
"use client";

import { useEffect, useState } from "react";

export default function PromoBanner({ items }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="grid grid-cols-1 md:grid-cols-2">
      {items.map((item, i) => (
        <div
          key={i}
          className="relative h-[320px] md:h-[520px] overflow-hidden group"
        >
          {/* Image */}
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          />

          {/* Overlay content */}
          <div className="absolute inset-0 flex flex-col max-w-[85%] sm:max-w-sm md:max-w-96 justify-center md:justify-start py-6 sm:py-10 md:py-20 px-5 sm:px-8 md:px-14">
            <span
              className={`text-white text-[10px] sm:text-xs font-semibold tracking-wide uppercase transition-all duration-500 ease-out group-hover:translate-x-3 md:group-hover:translate-x-7 ${
                mounted
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-5"
              }`}
              style={{ transitionDelay: "150ms" }}
            >
              {item.tag}
            </span>

            <h2
              className={`text-white text-xl sm:text-2xl md:text-4xl font-semibold mt-1.5 sm:mt-2 leading-tight transition-all duration-500 ease-out group-hover:translate-x-3 md:group-hover:translate-x-7 ${
                mounted
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-5"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              {item.title}
            </h2>

            <p
              className={`text-white/90 text-xs sm:text-sm md:text-base mt-2 sm:mt-3 max-w-xs transition-all duration-500 ease-out group-hover:translate-x-3 md:group-hover:translate-x-7 ${
                mounted
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-5"
              }`}
              style={{ transitionDelay: "450ms" }}
            >
              {item.description}
            </p>

            {item.buttonText && (
              <a
                href={item.buttonLink || "#"}
                className={`relative mt-3 sm:mt-4 md:mt-5 inline-block w-fit overflow-hidden rounded-md
    bg-white text-black text-xs sm:text-sm font-medium px-4 sm:px-5 py-2 sm:py-2.5
    transition-all duration-500 ease-out
    group-hover:translate-x-3 md:group-hover:translate-x-7
    before:absolute before:inset-y-0 before:left-0 before:w-0
    before:bg-[#DBAF36]
    before:transition-all before:duration-500 before:ease-out
    hover:before:w-full
    ${mounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-5"}
  `}
                style={{ transitionDelay: "600ms" }}
              >
                <span className="relative z-10 transition-colors duration-300 hover:text-white">
                  {item.buttonText}
                </span>
              </a>
            )}
          </div>
        </div>
      ))}
    </section>
  );
}
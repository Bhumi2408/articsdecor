// components/HeroSection.jsx
"use client";

import Link from "next/link";

export default function CuratedYou() {
  return (
    <section className="relative w-full h-[500px] md:h-[500px]">
      {/* Background image */}
      <img
        src="/home/curated-banner.jpeg"
        alt="about-us"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Overlay content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <p className="text-white/90 text-sm max-w-2xl uppercase font-semibold leading-relaxed">
          Curated For You
        </p>
        <h1 className="text-white text-3xl md:text-4xl mt-2 font-medium max-w-2xl leading-tight">
          Shop The Latest Trends
        </h1>

        <p className="text-white/90 text-sm md:text-base max-w-2xl mt-3 font-medium leading-relaxed">
          Exceptional Handcrafted Design to Enhance the Magnificent Glow
        </p>

        <Link
          href="/shop"
          className="hm-item hm-4 relative mt-5 inline-block w-fit overflow-hidden rounded-md bg-white px-5 py-3 text-sm font-medium text-black
                  before:absolute before:inset-y-0 before:left-0 before:z-0 before:w-0 before:bg-[#DBAF36] before:content-['']
                  before:transition-[width] before:duration-500 before:ease-out hover:before:w-full hover:text-white"
        >
          <span className="relative z-10">Shop Now</span>
        </Link>
      </div>
    </section>
  );
}

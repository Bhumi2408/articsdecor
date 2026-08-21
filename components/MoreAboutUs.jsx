// components/HeroSection.jsx
"use client";

import Link from "next/link";

export default function MoreAboutUs() {
  return (
    <section className="relative w-full h-[500px] md:h-[700px]">
      {/* Background image */}
      <img
        src="/home/about-us.jpeg"
        alt="about-us"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Overlay content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-white text-3xl md:text-4xl font-medium max-w-2xl leading-tight">
          Jewellery From The World's Finest Designers
        </h1>

        <p className="text-white/90 text-sm md:text-base max-w-2xl mt-6 font-semibold leading-relaxed">
          We believe in the power of jewellery — to tell a story, celebrate a
          moment, create or continue a tradition. There's a wonder in wearing
          something made from the earth. Each Lute Diamonds piece is crafted
          with ethically sourced precious metals to reflect our commitment to
          human rights and environmental sustainability.
        </p>

        <Link
          href="/about"
          className="text-white text-sm font-bold mt-8 underline underline-offset-4"
        >
          More About Us
        </Link>
      </div>
    </section>
  );
}

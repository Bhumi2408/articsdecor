"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";

// Drop the hero video file at public/home/hero-video.mp4 (poster image is
// shown while it loads / if it fails to load).
const VIDEO_SRC = "/artics-video.mp4";
const POSTER_SRC = "/home/banner-1s.jpeg";

export default function HeroSlider() {
  return (
    <section className="relative h-[100svh] max-h-[400px] md:max-h-[700px] min-h-[420px] w-full overflow-hidden bg-black">
      <video
        autoPlay
        muted
        loop
        playsInline
        poster={POSTER_SRC}
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>

      {/* light overlay so the video stays legible under any future copy */}
      <div className="absolute inset-0 bg-black/15" />

      {/* bouncing "Shop Now" scroll cue */}
      <Link
        href="/shop"
        className="group absolute inset-x-0 bottom-8 mx-auto flex w-fit flex-col items-center gap-2 text-white sm:bottom-10"
      >
        <span className="text-[11px] font-semibold uppercase tracking-[0.3em]">
          Shop Now
        </span>
        <ChevronDown
          className="h-6 w-6 animate-bounce transition-transform group-hover:translate-y-0.5"
          strokeWidth={1.8}
        />
      </Link>
    </section>
  );
}

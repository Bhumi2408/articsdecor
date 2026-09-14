"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative, Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/pagination";

const slides = [
  {
    desktop: "/home/banner-1s.jpeg",
    mobile: "/home/mobile-banner-1.png",
    alt: "Outdoor wicker sofa set by Artics Decorr",
  },
  {
    desktop: "/home/banner-2s.jpeg",
    mobile: "/home/mobile-banner2.jpeg",
    alt: "Poolside lounger collection",
  },
  {
    desktop: "/home/banner-3.jpeg",
    mobile: "/home/mobile-banner-3.png",
    alt: "Garden dining set in weatherproof wicker",
  },
  {
    desktop: "/home/banner-4.jpeg",
    mobile: "/home/mobile-banner-4.png",
    alt: "Outdoor daybed with canopy",
  },
];

export default function HeroSlider() {
  return (
    <section className="relative w-full bg-black">
      <Swiper
        modules={[EffectCreative, Autoplay, Pagination]}
        effect="creative"
        loop
        grabCursor
        speed={1000}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        creativeEffect={{
          limitProgress: 1,
          perspective: false,
          prev: {
            translate: ["-22%", 0, 0],
            opacity: 1,
            scale: 1,
          },
          next: {
            translate: ["100%", 0, 0],
            opacity: 1,
            scale: 1,
          },
        }}
        style={{
          "--swiper-pagination-color": "#BE8C2C",
          "--swiper-pagination-bullet-inactive-color": "#ffffff",
          "--swiper-pagination-bullet-inactive-opacity": "0.5",
          "--swiper-pagination-bullet-size": "9px",
          "--swiper-pagination-bullet-horizontal-gap": "5px",
          "--swiper-pagination-bottom": "24px",
        }}
        className="
          hero-slider
          h-[570px]
          w-full
          sm:h-[380px]
          lg:h-[670px]
        "
      >
        {slides.map((slide, i) => (
          <SwiperSlide
            key={slide.desktop}
            className="relative overflow-hidden bg-black"
          >
            {/* DESKTOP IMAGE */}
            <div className="absolute inset-0 hidden sm:block">
              <Image
                src={slide.desktop}
                alt={slide.alt}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
              />
            </div>

            {/* MOBILE IMAGE */}
            <div className="absolute inset-0 block sm:hidden">
              <Image
                src={slide.mobile}
                alt={slide.alt}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
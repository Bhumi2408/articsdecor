"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const materials = [
  {
    title: "SUNBRELLA FABRIC\nCOLLECTION",
    description:
      "A premier selection of durable and stylish fabrics designed for exceptional performance in indoor and outdoor furniture.",
    image: "/home/material1.png",
    hoverImage: "/home/material2.png",
    href: "/materials",
  },
  {
    title: "GERMAN REHAU WICKER\nCOLLECTIONS",
    description:
      "Exquisite and meticulously crafted wicker furniture showcasing the finest quality materials and German precision engineering for unrivaled elegance and durability.",
    image: "/home/material3.png",
    hoverImage: "/home/material4.png",
    href: "/materials",
  },
];

function MaterialCard({ item }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="
        group
        grid
        grid-cols-1
        items-center
        gap-8
        lg:grid-cols-[1.05fr_1fr]
        lg:gap-9
        xl:gap-10
      "
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* IMAGE */}
      <Link
        href={item.href}
        className="
          relative
          block
          h-[300px]
          w-full
          overflow-hidden
          rounded-tl-[8px]
          rounded-bl-[8px]
          bg-[#f3f3f3]
        "
      >
        {/* ORIGINAL IMAGE */}
        <Image
          src={item.image}
          alt={item.title.replace("\n", " ")}
          fill
          sizes="(max-width: 1024px) 100vw, 45vw"
          className={`
            object-cover
            transition-all
            duration-700
            ease-[cubic-bezier(0.22,1,0.36,1)]
            ${
              hovered
                ? "scale-[1.04] opacity-0"
                : "scale-100 opacity-100"
            }
          `}
        />

        {/* HOVER IMAGE */}
        <Image
          src={item.hoverImage}
          alt={`${item.title.replace("\n", " ")} alternate`}
          fill
          sizes="(max-width: 1024px) 100vw, 45vw"
          className={`
            object-cover
            transition-all
            duration-700
            ease-[cubic-bezier(0.22,1,0.36,1)]
            ${
              hovered
                ? "scale-100 opacity-100"
                : "scale-[1.04] opacity-0"
            }
          `}
        />

        {/* SUBTLE HOVER OVERLAY */}
        <div
          className={`
            absolute inset-0
            bg-black/0
            transition-all
            duration-500
            group-hover:bg-black/5
          `}
        />
      </Link>

      {/* CONTENT */}
      <div className="flex flex-col items-start">

        <h2
          className="
            whitespace-pre-line
            font-baloo
            text-[26px]
            font-bold
            uppercase
            leading-[1.12]
            tracking-[0.2px]
            text-black
            sm:text-[29px]
            lg:text-[27px]
          "
        >
          {item.title}
        </h2>

        <p
          className="
            mt-3
            max-w-[560px]
            font-sans
            text-[16px]
            font-medium
            leading-[1.5]
            text-[#111]
            sm:text-[17px]
            lg:text-[16px]
            xl:text-[17px]
          "
        >
          {item.description}
        </p>

        <Link
          href={item.href}
          className="
            mt-4
            inline-flex
            min-w-[165px]
            items-center
            justify-center
            bg-black
            px-7
            py-4
            text-[14px]
            font-bold
            uppercase
            tracking-wide
            text-white
            transition-all
            duration-300
            hover:bg-[#172b41]
            hover:shadow-lg
          "
        >
          Shop Now
        </Link>

      </div>
    </div>
  );
}

export default function MaterialCollections() {
  return (
    <section
      className="
        w-full
        bg-white
        px-5
        py-6
        sm:px-8
        md:px-10
        lg:px-14
        xl:px-16
        2xl:px-[45px]
      "
    >
      <div className="mx-auto max-w-[1800px]">

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-14 xl:gap-16">

          {materials.map((item) => (
            <MaterialCard
              key={item.title}
              item={item}
            />
          ))}

        </div>

      </div>
    </section>
  );
}
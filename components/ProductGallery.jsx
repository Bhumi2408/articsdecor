"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

const LeftIcon = (p) => (
  <svg {...iconProps} {...p}>
    <path d="M14 6l-6 6 6 6" />
  </svg>
);

const RightIcon = (p) => (
  <svg {...iconProps} {...p}>
    <path d="M10 6l6 6-6 6" />
  </svg>
);

export default function ProductGallery({ images = [], name, primaryImageAlt = "" }) {
  const [active, setActive] = useState(0);
  const startX = useRef(null);

  const hasImages = images.length > 0;
  const many = images.length > 1;

  useEffect(() => {
    setActive(0);
  }, [images]);

  const go = (dir) => {
    if (!images.length) return;
    setActive((i) => (i + dir + images.length) % images.length);
  };

  return (
    <div className="flex flex-col gap-4 md:flex-row md:gap-5">
      <style>{`
        .pg-rail {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .pg-rail::-webkit-scrollbar {
          display: none;
        }

        .pg-main-image {
          animation: pgImageIn .35s ease-out;
        }

        @keyframes pgImageIn {
          from {
            opacity: .7;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>

      {/* THUMBNAILS */}
      {many && (
        <div
          className="
            pg-rail
            order-2
            flex
            shrink-0
            gap-3
            overflow-x-auto
            pb-1
            md:order-1
            md:max-h-[680px]
            md:w-[82px]
            md:flex-col
            md:overflow-y-auto
            md:pb-0
          "
        >
          {images.map((img, i) => (
            <button
              key={img + i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show image ${i + 1}`}
              aria-current={i === active}
              className={`
                relative
                aspect-square
                w-[68px]
                shrink-0
                overflow-hidden
                rounded-[4px]
                bg-[#e9e3d8]
                transition-all
                duration-300
                md:w-full
                ${
                  i === active
                    ? "ring-1 ring-[#770800] ring-offset-[3px] ring-offset-[#f5f3ee]"
                    : "opacity-55 hover:opacity-100"
                }
              `}
            >
              <Image
                src={img}
                alt=""
                fill
                sizes="82px"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </button>
          ))}
        </div>
      )}

      {/* MAIN IMAGE */}
      <div
        className="
          group
          relative
          order-1
          min-w-0
          flex-1
          overflow-hidden
          rounded-[4px]
          bg-[#e9e3d8]
          md:order-2
        "
        onKeyDown={(e) => {
          if (!many) return;

          if (e.key === "ArrowRight") go(1);
          if (e.key === "ArrowLeft") go(-1);
        }}
        onTouchStart={(e) => {
          startX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (!many || startX.current === null) return;

          const dx =
            e.changedTouches[0].clientX - startX.current;

          if (dx < -40) go(1);
          if (dx > 40) go(-1);

          startX.current = null;
        }}
        tabIndex={many ? 0 : -1}
        role={many ? "group" : undefined}
        aria-label={many ? `${name} images` : undefined}
      >
        <div className="relative aspect-square w-full">
          {hasImages ? (
            <Image
              key={images[active]}
              src={images[active]}
              alt={active === 0 && primaryImageAlt ? primaryImageAlt : `${name} — image ${active + 1}`}
              fill
              sizes="(max-width: 1024px) 100vw, 700px"
              className="
                pg-main-image
                object-cover
                transition-transform
                duration-[1000ms]
                ease-out
                group-hover:scale-[1.025]
              "
              priority
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-[#9aa0a5]">
              No image
            </div>
          )}

          {many && (
            <>
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous image"
                className="
                  absolute
                  left-4
                  top-1/2
                  grid
                  h-11
                  w-11
                  -translate-y-1/2
                  place-items-center
                  rounded-full
                  bg-[#fffdfa]/90
                  text-[#132c47]
                  shadow-sm
                  backdrop-blur-md
                  transition
                  hover:bg-white
                  hover:text-[#770800]
                  md:left-5
                  md:opacity-0
                  md:group-hover:opacity-100
                "
              >
                <LeftIcon className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next image"
                className="
                  absolute
                  right-4
                  top-1/2
                  grid
                  h-11
                  w-11
                  -translate-y-1/2
                  place-items-center
                  rounded-full
                  bg-[#fffdfa]/90
                  text-[#132c47]
                  shadow-sm
                  backdrop-blur-md
                  transition
                  hover:bg-white
                  hover:text-[#770800]
                  md:right-5
                  md:opacity-0
                  md:group-hover:opacity-100
                "
              >
                <RightIcon className="h-5 w-5" />
              </button>

              <span
                className="
                  absolute
                  bottom-4
                  right-4
                  rounded-full
                  bg-[#132c47]/85
                  px-3
                  py-1.5
                  text-[10px]
                  font-medium
                  tracking-[0.08em]
                  text-white
                  backdrop-blur-md
                "
              >
                {active + 1} / {images.length}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

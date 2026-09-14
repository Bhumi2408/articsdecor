"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const clients = [
  {
    name: "westin",
    image: "/client/c1.png",
  },
  {
    name: "vivanta",
    image: "/client/c2.png",
  },
  {
    name: "clarks",
    image: "/client/c3.jpg",
  },
  {
    name: "courtyard",
    image: "/client/c4.png",
  },
  {
    name: "marriot",
    image: "/client/c5.png",
  },
  {
    name: "brijrama",
    image: "/client/c6.jpg",
  },
  {
    name: "tata",
    image: "/client/c7.jpg",
  },
  {
    name: "tcs",
    image: "/client/c8.jpg",
  },
  {
    name: "kent ro",
    image: "/client/c9.png",
  },
  {
    name: "bramha corp",
    image: "/client/c10.jpg",
  },
  {
    name: "tbh",
    image: "/client/c11.jpg",
  },
  {
    name: "panshsil",
    image: "/client/c12.png",
  },
  {
    name: "kasturi",
    image: "/client/c13.png",
  },
  {
    name: "meridien",
    image: "/client/c14.png",
  },
  {
    name: "mama buoi",
    image: "/client/c15.jpg",
  },
  {
    name: "erica",
    image: "/client/c16.jpg",
  },
  {
    name: "national defence academy",
    image: "/client/c17.jpg",
  },
  {
    name: "speciality restaurants",
    image: "/client/c18.jpg",
  },
  {
    name: "hilton garden",
    image: "/client/c19.png",
  },
  {
    name: "sheraton",
    image: "/client/c20.jpg",
  },
  {
    name: "radisson",
    image: "/client/c21.jpg",
  },
  {
    name: "palm grove",
    image: "/client/c22.jpg",
  },
  {
    name: "conrad",
    image: "/client/c23.jpg",
  },
  {
    name: "sarovar",
    image: "/client/c24.png",
  },
  {
    name: "beyond design",
    image: "/client/c25.jpg",
  },
  {
    name: "kirloskar",
    image: "/client/c26.png",
  },
  {
    name: "encore",
    image: "/client/c27.png",
  },
  {
    name: "tata trust",
    image: "/client/c28.jpg",
  },
  {
    name: "pondy bay",
    image: "/client/c29.jpg",
  },
  {
    name: "the punarnava",
    image: "/client/c30.jpg",
  },
  {
    name: "artistry",
    image: "/client/c31.png",
  },
  {
    name: "snk",
    image: "/client/c32.png",
  },
  {
    name: "aditya birla",
    image: "/client/c33.png",
  },
  {
    name: "sukhwani",
    image: "/client/c34.jpg",
  },
  {
    name: "anp",
    image: "/client/c35.png",
  },
  {
    name: "jet synthesys",
    image: "/client/c36.png",
  },
  {
    name: "vatsyayana",
    image: "/client/c37.png",
  },
  {
    name: "reliance",
    image: "/client/c38.png",
  },
  {
    name: "madari",
    image: "/client/c39.png",
  },
  {
    name: "schlumberger",
    image: "/client/c40.png",
  },
  {
    name: "larsen",
    image: "/client/c41.jpg",
  },
  {
    name: "rahul",
    image: "/client/c42.jpg",
  },
  {
    name: "radisson",
    image: "/client/c43.png",
  },
];

export default function OurClients() {
  const trackRef = useRef(null);
  const animationRef = useRef(null);
  const positionRef = useRef(0);
  const pausedRef = useRef(false);

  // Duplicate set = seamless infinite loop
  const loopClients = [...clients, ...clients];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let lastTime = performance.now();

    const speed = 0.045;

    const animate = (time) => {
      const delta = time - lastTime;
      lastTime = time;

      if (!pausedRef.current) {
        positionRef.current += speed * delta;

        const halfWidth = track.scrollWidth / 2;

        if (positionRef.current >= halfWidth) {
          positionRef.current -= halfWidth;
        }

        track.style.transform = `translate3d(-${positionRef.current}px, 0, 0)`;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <section className="w-full overflow-hidden bg-[#f9f8f8] py-10 md:py-12">
      {/* ================= HEADING ================= */}
      <div className="px-6 text-center md:px-10">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--ad-gold)]">
          Trusted By
        </p>

        <h2 className="text-[32px] font-semibold leading-tight tracking-[-0.025em] text-[var(--ad-ink)] md:text-[42px]">
          Our Clients
        </h2>

        <div className="mx-auto mt-5 h-px w-12 bg-[var(--ad-gold)]" />
      </div>

      {/* ================= CAROUSEL ================= */}
      <div
        className="relative mt-12 w-full overflow-hidden"
        onMouseEnter={() => {
          pausedRef.current = true;
        }}
        onMouseLeave={() => {
          pausedRef.current = false;
        }}
      >
        {/* Left fade */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-white to-transparent md:w-28" />

        {/* Right fade */}
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-white to-transparent md:w-28" />

        <div
          ref={trackRef}
          className="flex w-max gap-5 will-change-transform md:gap-6"
        >
          {loopClients.map((client, index) => (
            <div
              key={`${client.name}-${index}`}
              className="
                group
                relative
                flex
                h-[150px]
                w-[220px]
                shrink-0
                items-center
                justify-center
                overflow-hidden
                rounded-xl
                border
                border-[#e5e5e5]
                bg-white
                transition-all
                duration-500
                hover:border-[var(--ad-gold)]
                md:h-[170px]
                md:w-[250px]
              "
            >
              {/* Logo only */}
              <div
                className="
                  relative
                  h-[105px]
                  w-[170px]
                  transition-transform
                  duration-[700ms]
                  ease-[cubic-bezier(0.16,1,0.3,1)]
                  group-hover:scale-[0.88]
                  md:h-[120px]
                  md:w-[195px]
                "
              >
                <Image
                  src={client.image}
                  alt={client.name}
                  fill
                  sizes="250px"
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
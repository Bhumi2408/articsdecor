"use client";

import Image from "next/image";
import Link from "next/link";

/* flip ki timing globals.css ke .category-flip-inner se match honi chahiye */
const FLIP = "duration-[800ms] ease-[cubic-bezier(0.76,0,0.24,1)]";

/* Shop Now ka gold fill — baaki site se match karta hai */
const FILL =
  "absolute inset-0 origin-center scale-x-0 bg-[var(--ad-gold)] " +
  "transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]";

/* align optional hai. Na do to index ke hisaab se apne aap
   ek upar, ek neeche ho jaayega. */
const categories = [
  { title: "Wicker Sofa Set", front: "/products/p1.png", back: "/products/p2.png", href: "/product-category/wicker-sofa-set" },
  { title: "Poolside Lounger", front: "/products/p20.png", back: "/products/p21.png", href: "/product-category//pool-furniture-manufacturer" },
  { title: "Service Trolley", front: "/products/p22.png", back: "/products/p23.png", href: "/product-category/service-trolley" },
  { title: "Garden Planters", front: "/products/p24.png", back: "/products/p25.png", href: "/product-category/garden-planters" },
  { title: "Rectangular Gazebo", front: "/products/p26.png", back: "/products/p27.png", href: "/product-category/rectangular-gazebo" },
  { title: "Bar Chair", front: "/products/p11.png", back: "/products/p12.png", href: "/product-category/bar-chair" },
  { title: "Outdoor Daybeds", front: "/products/p6.png", back: "/products/p7.png", href: "/product-category/cane-furniture" },
  { title: "Outdoor Dining Set", front: "/products/p8.png", back: "/products/p9.png", href: "/product-category/outdoor-dining-set" },
  { title: "Outdoor Umbrella", front: "/products/p28s.png", back: "/products/p29.png", href: "/product-category/outdoor-umbrella" },
  { title: "Dining Chair And Table", front: "/products/p30.png", back: "/products/p31.png", href: "/product-category/dining-chair-and-table" },
  { title: "Wicker Table And Chair Set", front: "/products/p32.png", back: "/products/p33.png", href: "/product-category/wicker-table-and-chair-set" },
  { title: "Swinger", front: "/products/p3.png", back: "/products/p4.png", href: "/product-category/swinger" },
  { title: "Wooden Bench", front: "/products/p34.png", back: "/products/p35.png", href: "/product-category/wooden-bench" },
  { title: "Pool Side Wicker Drawer Counter", front: "/products/p36.png", back: "/products/p37.png", href: "/product-category/pool-side-wicker-drawer-counter" },
];

function CategoryCard({ item, index }) {
  const alignTop = (item.align || (index % 2 === 0 ? "top" : "bottom")) === "top";

  const contentBox = `absolute inset-0 flex flex-col p-6 sm:p-8 lg:p-10 ${
    alignTop ? "justify-start" : "justify-end"
  }`;

  /* gradient usi taraf se aaye jis taraf title hai */
  const scrim = `absolute inset-0 ${
    alignTop ? "bg-gradient-to-b" : "bg-gradient-to-t"
  } from-black/65 via-black/10 to-transparent`;

  const heading =
    "text-[22px] font-bold leading-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)] sm:text-[24px] lg:text-[26px]";

  return (
    <Link href={item.href} className="group block">
      <div className="category-flip-card h-[350px] w-full">
        <div className="category-flip-inner relative h-full w-full">

          {/* ---------------- FRONT ---------------- */}
          <div className="category-flip-face absolute inset-0 overflow-hidden">
            <Image
              src={item.front}
              alt={item.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover"
            />

            <div className={scrim} />

            <div className={contentBox}>
              <h3 className={heading}>{item.title}</h3>
            </div>

            {/* flip ke beech face ko dark karti shading */}
            <div
              aria-hidden="true"
              className={`absolute inset-0 bg-gradient-to-r from-black/15 to-black/75 opacity-0 transition-opacity group-hover:opacity-100 ${FLIP}`}
            />
          </div>

          {/* ---------------- BACK — doosri image ---------------- */}
          <div className="category-flip-face category-flip-back absolute inset-0 overflow-hidden">
            <Image
              src={item.back}
              alt=""
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-black/35" />

            <div className={contentBox}>
              <h3 className={heading}>{item.title}</h3>

              <span className="group/btn relative mt-5 inline-flex w-fit overflow-hidden rounded-md bg-white shadow-md transition-transform duration-300 hover:-translate-y-0.5">
                <span aria-hidden="true" className={`${FILL} group-hover/btn:scale-x-100`} />
                <span className="relative px-6 py-2.5 text-[13px] font-medium text-[#222] transition-colors duration-300 group-hover/btn:text-white">
                  Shop Now
                </span>
              </span>
            </div>

            {/* mirror shading. pointer-events-none taaki button clickable rahe */}
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute inset-0 bg-gradient-to-l from-black/15 to-black/75 opacity-100 transition-opacity group-hover:opacity-0 ${FLIP}`}
            />
          </div>

        </div>
      </div>
    </Link>
  );
}

export default function CategoryGrid() {
  return (
    <section className="w-full bg-white px-6 py-16 md:px-10 lg:px-16 xl:px-[5%]">
      <div className="mx-auto max-w-[1800px]">
        <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((item, index) => (
            <CategoryCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
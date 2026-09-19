"use client";

import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    title: "Wicker Sofa Set",
    frontImage: "/products/p1.png",
    backImage: "/products/p2.png",
    href: "/product-category/wicker-sofa-set",
  },
  {
    title: "Swinger",
    frontImage: "/products/p3.png",
    backImage: "/products/p4.png",
    href: "/product-category/swinger",
  },
  {
    title: "Outdoor Daybeds",
    frontImage: "/products/p6.png",
    backImage: "/products/p7.png",
    href: "/product-category/cane-furniture",
  },
  {
    title: "Outdoor Dining Set",
    frontImage: "/products/p8.png",
    backImage: "/products/p9.png",
    href: "/product-category/outdoor-dining-set",
  },
  {
    title: "Bar Chair",
    frontImage: "/products/p11.png",
    backImage: "/products/p12.png",
    href: "/product-category/bar-chair",
  },
];

/* flip ki duration/easing globals.css ke .category-flip-inner se match honi
   chahiye, warna shading flip se aage-peeche chalegi */
const FLIP = "duration-[800ms] ease-[cubic-bezier(0.76,0,0.24,1)]";

/* dono buttons ka fill — center se bahar ki taraf khulta hai */
const FILL =
  "absolute inset-0 origin-center scale-x-0 bg-[var(--ad-gold)] " +
  "transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]";

export default function CategoryFlipSection() {
  return (
    <section className="w-full bg-white px-6 pb-10 pt-20 md:px-10 lg:px-16">
      <div className="mx-auto max-w-[1600px]">

        {/* CARDS */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((category) => (
            <Link key={category.title} href={category.href} className="group block">
              <div className="category-flip-card h-[350px] w-full rounded-xl sm:h-[280px] lg:h-[340px]">
                <div className="category-flip-inner relative h-full w-full">

                  {/* ---------------- FRONT ---------------- */}
                  <div className="category-flip-face absolute inset-0 overflow-hidden rounded-xl">
                    <Image
                      src={category.frontImage}
                      alt={category.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                      className="object-cover"
                    />

                    {/* title padhne ke liye gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />

                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <h3 className="text-center text-xl font-semibold text-white drop-shadow-lg">
                        {category.title}
                      </h3>
                    </div>

                    {/* shading — right kinaara peeche jaata hai isliye wahan
                        zyada dark. Flat kaali parat se zyada natural lagta hai. */}
                    <div
                      aria-hidden="true"
                      className={`absolute inset-0 bg-gradient-to-r from-black/15 to-black/75 opacity-0 transition-opacity group-hover:opacity-100 ${FLIP}`}
                    />
                  </div>

                  {/* ---------------- BACK ---------------- */}
                  <div className="category-flip-face category-flip-back absolute inset-0 overflow-hidden rounded-xl">
                    <Image
                      src={category.backImage}
                      alt={`${category.title} alternate view`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                      className="object-cover"
                    />

                    <div className="absolute inset-0 bg-black/40" />

                    <div className="absolute inset-0 flex flex-col items-center justify-center p-5">
                      <h3 className="mb-5 text-center text-xl font-semibold text-white drop-shadow-lg">
                        {category.title}
                      </h3>

                      <span className="group/btn relative inline-flex overflow-hidden rounded-md bg-white shadow-md transition-transform duration-300 hover:-translate-y-0.5">
                        <span aria-hidden="true" className={`${FILL} group-hover/btn:scale-x-100`} />
                        <span className="relative px-7 py-3 text-sm font-medium text-[#222] transition-colors duration-300 group-hover/btn:text-white">
                          Shop Now
                        </span>
                      </span>
                    </div>

                    {/* back face ki shading — mirror direction.
                        pointer-events-none taaki button clickable rahe */}
                    <div
                      aria-hidden="true"
                      className={`pointer-events-none absolute inset-0 bg-gradient-to-l from-black/15 to-black/75 opacity-100 transition-opacity group-hover:opacity-0 ${FLIP}`}
                    />
                  </div>

                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* ---------------- EXPLORE MORE ---------------- */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/products"
            className="group/cta relative inline-flex overflow-hidden border border-[#666] transition-colors duration-300 hover:border-[var(--ad-gold)]"
          >
            <span aria-hidden="true" className={`${FILL} group-hover/cta:scale-x-100`} />
            <span className="relative px-8 py-4 text-sm font-semibold uppercase tracking-wide text-[#555] transition-colors duration-300 group-hover/cta:text-white">
              Explore More
            </span>
          </Link>
        </div>

      </div>
    </section>
  );
}
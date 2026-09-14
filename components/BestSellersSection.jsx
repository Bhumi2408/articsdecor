"use client";

import Link from "next/link";
import ProductCard from "./ProductCard";

export default function BestSellerSection({ products = [] }) {
  /*
   * Sirf Featured products homepage par show honge.
   *
   * hiddenFromStore true hone par product direct URL se accessible
   * rahega, lekin homepage par nahi dikhega.
   */
  const bestSellingProducts = products
    .filter(
      (product) =>
        product.featured === true &&
        product.hiddenFromStore !== true
    )
    .slice(0, 10);

  /*
   * Agar koi Featured product nahi hai to section hi hide rahega.
   */
  if (!bestSellingProducts.length) {
    return null;
  }

  return (
    <section className="w-full bg-white px-5 py-10 sm:px-8 md:px-10 lg:px-14 xl:px-16">
      <div className="mx-auto max-w-[1700px]">

        {/* HEADER */}
        <div className="mb-12 text-center">
          <span className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.3em] text-[#8b5e3c]">
            Our Collection
          </span>

          <h2 className="font-serif text-3xl font-semibold tracking-tight text-[#102f4f] sm:text-4xl md:text-[42px]">
            Best Selling Products
          </h2>

          <div className="mx-auto mt-5 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#d8d1ca]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#8b5e3c]" />
            <span className="h-px w-10 bg-[#d8d1ca]" />
          </div>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#6d6d6d] sm:text-[15px]">
            Discover the furniture pieces our customers love most, thoughtfully
            designed to bring comfort and style to every space.
          </p>
        </div>

        {/* PRODUCTS */}
        <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          {bestSellingProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>

        {/* VIEW ALL */}
        <div className="mt-14 flex justify-center">
          <Link
            href="/products"
            className="
              group/cta
              relative
              inline-flex
              items-center
              gap-3
              overflow-hidden
              border
              border-[#102f4f]
              px-8
              py-3.5
              text-xs
              font-semibold
              uppercase
              tracking-[0.16em]
              text-[#102f4f]
              transition-colors
              duration-300
            "
          >
            <span
              aria-hidden="true"
              className="
                absolute
                inset-0
                origin-center
                scale-x-0
                bg-[#102f4f]
                transition-transform
                duration-500
                ease-[cubic-bezier(0.65,0,0.35,1)]
                group-hover/cta:scale-x-100
              "
            />

            <span className="relative z-10 transition-colors duration-300 group-hover/cta:text-white">
              View All Products
            </span>

            <span
              className="
                relative
                z-10
                text-base
                transition-all
                duration-300
                group-hover/cta:translate-x-1
                group-hover/cta:text-white
              "
            >
              →
            </span>
          </Link>
        </div>

      </div>
    </section>
  );
}
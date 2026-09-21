"use client";

import Image from "next/image";
import Link from "next/link";

export default function MissionVision() {
  return (
    <section className="w-full overflow-hidden bg-[#f8f8f6] py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-[1500px] px-5 md:px-8 lg:px-12">

        

        <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.05fr_1fr] lg:gap-10">

         

          <CategoryImageCard
            image="/products/p15.png"
            title="BAR CHAIR"
            href="/products"
          />


       

          <div className="flex h-full flex-col justify-center px-2 text-center md:px-8 lg:px-10">

            {/* small label */}
            <div className="mb-5 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-[#770800]" />

              <span className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#770800]">
                What We Stand For
              </span>

              <span className="h-px w-8 bg-[#770800]" />
            </div>


            {/* ================= MISSION ================= */}

            <div className="group">

              <h2
                className="
                  font-serif
                  text-[34px]
                  font-normal
                  italic
                  leading-none
                  text-[#102f4f]
                  md:text-[35px]
                "
              >
                Our Mission
              </h2>

              <div className="mx-auto mt-3 h-px w-8 bg-[#770800] transition-all duration-500 group-hover:w-16" />

              <p
                className="
                  mx-auto
                  mt-3
                  max-w-[500px]
                  text-[14px]
                  leading-[1.9]
                  text-[#4d5963]
                  md:text-[15px]
                "
              >
                To be unceasingly committed to bring urban design furniture
                at genuine prices to our customers and at the same time
                catering the outdoor market with our global designs.
              </p>

            </div>


            {/* divider */}
            <div className="mx-auto my-5 h-px w-full max-w-[260px] bg-[#dedbd5]" />


            {/* ================= VISION ================= */}

            <div className="group">

              <h2
                className="
                  font-serif
                  text-[34px]
                  font-normal
                  italic
                  leading-none
                  text-[#102f4f]
                  md:text-[35px]
                "
              >
                Our Vision
              </h2>

              <div className="mx-auto mt-3 h-px w-8 bg-[#770800] transition-all duration-500 group-hover:w-16" />

              <p
                className="
                  mx-auto
                  mt-3
                  max-w-[500px]
                  text-[14px]
                  leading-[1.9]
                  text-[#4d5963]
                  md:text-[15px]
                "
              >
                To provide our customers the utmost quality seamlessly
                blended with unique innovative ensured with warranty to
                the products.
              </p>

            </div>


            {/* divider */}
            <div className="mx-auto my-5 h-px w-full max-w-[260px] bg-[#dedbd5]" />


            {/* ================= VALUES ================= */}

            <div className="group">

              <h2
                className="
                  font-serif
                  text-[34px]
                  font-normal
                  italic
                  leading-none
                  text-[#102f4f]
                  md:text-[35px]
                "
              >
                Our Values
              </h2>

              <div className="mx-auto mt-3 h-px w-8 bg-[#770800] transition-all duration-500 group-hover:w-16" />

              <p
                className="
                  mx-auto
                  mt-3
                  max-w-[500px]
                  text-[14px]
                  leading-[1.9]
                  text-[#4d5963]
                  md:text-[15px]
                "
              >
                Quality Excellence, Global Designs, Customer Satisfaction,
                Leadership, Teamwork.
              </p>

            </div>

          </div>


          {/* =================================================
              RIGHT IMAGE — SWINGER
          ================================================== */}

          <CategoryImageCard
            image="/products/p19.png"
            title="SWINGER"
            href="/products"
          />

        </div>
      </div>
    </section>
  );
}


/* =============================================================
   IMAGE CARD
============================================================= */

function CategoryImageCard({ image, title, href }) {
  return (
    <Link
      href={href}
      className="
        group
        relative
        block
        aspect-[2/2.5]
        w-full
        overflow-hidden
        bg-[#e9e4da]
      "
    >

      {/* =====================================================
          IMAGE
      ====================================================== */}

      <Image
        src={image}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 31vw"
        className="
          object-cover
          transition-transform
          duration-[1200ms]
          ease-[cubic-bezier(0.16,1,0.3,1)]
          group-hover:scale-[1.045]
        "
      />


      {/* =====================================================
          OVERLAY
      ====================================================== */}

      <div
        className="
          absolute
          inset-0
          bg-black/10
          transition-all
          duration-700
          group-hover:bg-black/30
        "
      />


      {/* =====================================================
          BOTTOM CONTENT
      ====================================================== */}

      <div
        className="
          absolute
          inset-x-0
          bottom-0
          z-10
          flex
          flex-col
          items-center
          justify-end
          px-5
          pb-8
          pt-24
          text-center
        "
      >

        {/* TITLE */}

        <h3
          className="
            font-serif
            text-[30px]
            font-medium
            uppercase
            leading-none
            tracking-wide
            text-white
            drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]
            transition-transform
            duration-500
            group-hover:-translate-y-1
            md:text-[36px]
          "
        >
          {title}
        </h3>


        {/* =================================================
            MORE BUTTON
        ================================================== */}

        <span
          className="
            group/button
            relative
            mt-5
            inline-flex
            h-[56px]
            min-w-[130px]
            items-center
            justify-center
            overflow-hidden
            border-2
            border-white
            px-7
            text-[11px]
            font-bold
            uppercase
            tracking-[0.16em]
            text-white
            transition-all
            duration-500
          "
        >

          {/* CENTER → OUTWARD FILL */}

          <span
            aria-hidden="true"
            className="
              absolute
              left-1/2
              top-1/2
              h-0
              w-0
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-[#770800]
              transition-all
              duration-[650ms]
              ease-[cubic-bezier(0.65,0,0.35,1)]
              group-hover/button:h-[220px]
              group-hover/button:w-[220px]
            "
          />

          {/* button text */}

          <span className="relative z-10">
            MORE
          </span>

        </span>

      </div>

    </Link>
  );
}
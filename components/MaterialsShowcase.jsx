import Image from "next/image";
import Link from "next/link";

const materials = [
  {
    title: "German Rehau Wicker Collections",
    shortTitle: "REHAU",
    image: "/home/material5.jpg",
    number: "01",
  },
  {
    title: "Sunbrella Fabric Collection",
    shortTitle: "SUNBRELLA",
    image: "/home/material6.jpg",
    number: "02",
  },
  {
    title: "AGORA Spanish Outdoor Fabrics",
    shortTitle: "AGORA",
    image: "/home/material7.png",
    number: "03",
  },
  {
    title: "Outdoor Furniture Collection",
    shortTitle: "ARTICS DECORR",
    image: "/home/material8.png",
    number: "04",
  },
];

export default function MaterialsShowcase() {
  return (
    <section className="relative overflow-hidden bg-[#f7f8f8] py-20 md:py-28">

      {/* subtle background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-20 h-[420px] w-[420px] rounded-full border border-[#0c3850]/[0.06]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 top-40 h-[300px] w-[300px] rounded-full border border-[#d99722]/[0.10]"
      />

      <div className="relative mx-auto max-w-[1420px] px-5 md:px-8 lg:px-10">

        {/* =====================================================
            HEADER
        ====================================================== */}
        <div className="mb-14 grid items-end gap-8 lg:grid-cols-[1fr_1fr]">

          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-12 bg-[#d99722]" />

              <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#d99722]">
                Our Materials
              </span>
            </div>

            <h2 className="max-w-[650px] text-[38px] font-semibold leading-[1.05] tracking-[-0.035em] text-[#0c3850] md:text-[54px] lg:text-[62px]">
              Materials that
              <span className="block font-normal italic">
                define our craft.
              </span>
            </h2>
          </div>

          <div className="lg:pb-2 lg:pl-16">
            <p className="max-w-[560px] text-[15px] leading-[1.9] text-[#425766] md:text-[16px]">
              Every piece of our furniture begins with the finest, carefully selected materials — from rich, durable woods to plush, long-lasting fabrics. Designed to offer unmatched comfort, exceptional strength, and timeless elegance, our materials are the foundation of quality that you can see, feel, and trust for years to come.
            </p>
          </div>
        </div>


        {/* =====================================================
            FEATURED MATERIALS
        ====================================================== */}
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr_1fr]">

          {/* LEFT FEATURED CARD */}
          <MaterialCard
            material={materials[0]}
            large
          />


            <MaterialCard material={materials[1]} />

            <MaterialCard material={materials[2]} />

        </div>


        {/* =====================================================
            BOTTOM FEATURED BROCHURE
        ====================================================== */}
        <div className="mt-6">
          <div
            className="group relative grid overflow-hidden bg-[#0c3850] lg:grid-cols-[0.9fr_1.1fr]"
          >

            {/* image */}
            <div className="relative min-h-[330px] overflow-hidden md:min-h-[400px] lg:min-h-[430px]">
              <Image
                src={materials[3].image}
                alt={materials[3].title}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="
                  object-cover
                  transition-transform
                  duration-[1000ms]
                  ease-[cubic-bezier(0.16,1,0.3,1)]
                  group-hover:scale-[1.045]
                "
              />

              {/* image overlay */}
              <div className="absolute inset-0 bg-[#0c3850]/10 transition-colors duration-500 group-hover:bg-[#0c3850]/0" />

              {/* number */}
              <div className="absolute left-6 top-6 flex h-10 w-10 items-center justify-center border border-white/60 text-[10px] font-semibold tracking-[0.15em] text-white">
                {materials[3].number}
              </div>
            </div>


            {/* content */}
            <div className="relative flex min-h-[330px] flex-col justify-center px-7 py-12 md:px-12 lg:min-h-[430px] lg:px-16">

              <div className="absolute right-8 top-8 text-[80px] font-light leading-none text-white/[0.035] md:text-[120px]">
                04
              </div>

              <div className="relative">

                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#d99722]">
                  Explore Our Collection
                </span>

                <h3 className="mt-5 max-w-[520px] text-[32px] font-semibold leading-[1.1] text-white md:text-[42px]">
                  {materials[3].title}
                </h3>

                <p className="mt-6 max-w-[500px] text-[14px] leading-[1.9] text-white/65 md:text-[15px]">
                  {materials[3].description}
                </p>

                {/* <div className="mt-9 inline-flex items-center gap-5">

                  <span className="relative overflow-hidden border border-white/50 px-7 py-3.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-white transition-colors duration-500">

                    <span
                      aria-hidden="true"
                      className="
                        absolute inset-0
                        origin-center
                        scale-0
                        bg-[#d99722]
                        transition-transform
                        duration-500
                        ease-[cubic-bezier(0.65,0,0.35,1)]
                        group-hover:scale-100
                      "
                    />

                    <span className="relative z-10">
                      View Collection
                    </span>
                  </span>

                  <span className="text-xl text-[#d99722] transition-transform duration-500 group-hover:translate-x-2">
                    →
                  </span>

                </div> */}

              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}


/* ============================================================
   MATERIAL CARD
============================================================ */

function MaterialCard({ material, large = false }) {
  return (
    <div
      className={`
        group relative block overflow-hidden bg-white
        ${large ? "min-h-[570px] md:min-h-[650px]" : "min-h-[400px] md:min-h-[480px]"}
      `}
    >

      {/* image */}
      <div className="absolute inset-0 overflow-hidden">

        <Image
          src={material.image}
          alt={material.title}
          fill
          sizes={
            large
              ? "(max-width: 1024px) 100vw, 45vw"
              : "(max-width: 640px) 100vw, 50vw"
          }
          className="
            object-cover
            transition-transform
            duration-[1000ms]
            ease-[cubic-bezier(0.16,1,0.3,1)]
            group-hover:scale-[1.055]
          "
        />

        {/* gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#071e2b]/90 via-[#071e2b]/20 to-transparent" />

      </div>


      {/* top number */}
      <div className="absolute left-5 top-5 flex h-9 w-9 items-center justify-center border border-white/60 text-[9px] font-semibold tracking-[0.15em] text-white">
        {material.number}
      </div>


      {/* content */}
      <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">

        <div className="mb-3 flex items-center gap-3">

          <span className="h-px w-8 bg-[#d99722]" />

          <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-white/75">
            {material.shortTitle}
          </span>

        </div>

        <h3
          className={`
            max-w-[420px]
            font-semibold
            leading-[1.12]
            text-white
            ${large ? "text-[22px] md:text-[25px]" : "text-[22px] md:text-[25px]"}
          `}
        >
          {material.title}
        </h3>


      </div>

    </div>
  );
}
import Image from "next/image";

const storyImage =
  "/products/p18.png"; 

export default function StorySection() {
  return (
    <section className="relative overflow-hidden bg-[#f8f8f6] py-20 md:py-28">
      
      {/* subtle background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-20 h-[420px] w-[420px] rounded-full border border-[#d99420]/10"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 bottom-0 h-[300px] w-[300px] rounded-full bg-[#102f4f]/[0.025]"
      />

      <div className="relative mx-auto max-w-[1380px] px-6 md:px-10 lg:px-14">

        {/* ================= TOP LABEL ================= */}
        <div className="mb-4 flex items-center gap-4">
          <span className="h-px w-12 bg-[#770800]" />

          <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#770800]">
            Our Story
          </span>

          <span className="h-px w-16 bg-[#770800]" />
        </div>


        {/* ================= MAIN GRID ================= */}
        <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">

          {/* ================= LEFT CONTENT ================= */}
          <div className="relative">

            <h2 className="max-w-[650px] text-[38px] font-semibold leading-[1.08] tracking-[-0.035em] text-[#102f4f] md:text-[52px] lg:text-[58px]">
              Designed for spaces
              <span className="block font-normal italic text-[#770800]">
                made to be lived in.
              </span>
            </h2>

            <div className="mt-4 h-[2px] w-16 bg-[#770800]" />

            <div className="mt-4 max-w-[650px] space-y-6 text-[15px] leading-[1.9] text-[#4c555d] md:text-[16px]">

              <p>
                <strong className="font-semibold text-[#102f4f]">
                  ARTICS DECORR
                </strong>
                , a leading{" "}
                <strong className="font-semibold italic text-[#770800]">
                  Garden Furniture Manufacturer in India
                </strong>
                , offers a refined selection of indoor and outdoor furniture
                designed to elevate residential, commercial, hospitality, and
                luxury environments. Every piece reflects thoughtful
                craftsmanship, blending style with everyday comfort.
              </p>

              <p>
                Our collection includes lounge sets, dining sets, bar
                furniture, sun loungers, daybeds, planters, and more — ideal
                for patios, terraces, poolside areas, gardens, and indoor
                spaces alike. Each setup is created to make your space feel
                inviting, stylish, and relaxing.
              </p>

              <p>
                We use lightweight yet durable aluminium and stainless-steel
                frames, paired with high-density Sleepwell foam cushions and
                unzippable Sunbrella covers to ensure long-lasting comfort, UV
                protection, and weather resistance. This makes our products
                both elegant and practical for year-round use.
              </p>

              <p>
                Whether it’s a cozy seating corner or a large outdoor hosting
                area,{" "}
                <strong className="font-semibold text-[#102f4f]">
                  ARTICS DÉCOR
                </strong>{" "}
                offers versatile furniture options that maintain durability
                with minimal maintenance. Designed to bring ease, beauty, and
                character to any setting, our furniture enhances the lifestyle
                of every space it enters.
              </p>

            </div>


            {/* ================= HIGHLIGHTS ================= */}
            <div className="mt-10 grid grid-cols-3 border-y border-[#deddd8] py-6">

              <div className="pr-4">
                <p className="text-[22px] font-semibold text-[#102f4f]">
                  01
                </p>

                <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#777]">
                  Thoughtful
                  <span className="block">Design</span>
                </p>
              </div>

              <div className="border-l border-[#deddd8] px-5">
                <p className="text-[22px] font-semibold text-[#102f4f]">
                  02
                </p>

                <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#777]">
                  Built for
                  <span className="block">Outdoors</span>
                </p>
              </div>

              <div className="border-l border-[#deddd8] pl-5">
                <p className="text-[22px] font-semibold text-[#102f4f]">
                  03
                </p>

                <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#777]">
                  Everyday
                  <span className="block">Comfort</span>
                </p>
              </div>

            </div>

          </div>


          {/* ================= RIGHT IMAGE ================= */}
          <div className="relative lg:pl-4">

            {/* gold frame */}
            <div
              aria-hidden="true"
              className="absolute -right-3 -top-3 h-full w-full rounded-[28px] border border-[#d99420]/40 md:-right-5 md:-top-5"
            />

            {/* image */}
            <div className="group relative aspect-[4/4.7] overflow-hidden rounded-[24px] bg-[#e9e4da]">

              <Image
                src={storyImage}
                alt="Artics Decorr outdoor furniture"
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="
                  object-cover
                  transition-transform
                  duration-[1200ms]
                  ease-[cubic-bezier(0.16,1,0.3,1)]
                  group-hover:scale-[1.035]
                "
              />

              {/* image overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#102f4f]/40 via-transparent to-transparent" />


              {/* ================= FLOATING CARD ================= */}
              <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-auto">

                <div className="max-w-[300px] rounded-2xl border border-white/30 bg-[#102f4f]/90 px-6 py-5 shadow-2xl backdrop-blur-md">

                  <div className="flex items-center gap-3">
                    <span className="h-px w-7 bg-[#d99420]" />

                    <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#d99420]">
                      Artics Decorr
                    </span>
                  </div>

                  <p className="mt-3 text-[19px] font-medium leading-snug text-white">
                    Crafted for outdoor living.
                  </p>

                  <p className="mt-2 text-[11px] leading-relaxed text-white/65">
                    Furniture that brings comfort, character and lasting
                    beauty to every space.
                  </p>

                </div>

              </div>

            </div>


            

          </div>

        </div>

      </div>
    </section>
  );
}
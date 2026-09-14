import Image from "next/image";
import Link from "next/link";

const collections = {
  poolside: {
    title: "POOLSIDE\nLOUNGER",
    image: "/products/p10.png",
    href: "/product-category/poolside-lounger",
  },

  wicker: {
    title: "WICKER\nSOFA SET",
    image: "/products/p5.png",
    href: "/product-category/wicker-sofa-set",
  },

  daybed: {
    title: "OUTDOOR\nDAYBED",
    image: "/products/p13.png",
    href: "/product-category/outdoor-daybeds",
  },
};

function CollectionCard({ item, tall = false, small = false }) {
  return (
    <Link
      href={item.href}
      className={`
        group relative block w-full overflow-hidden
        ${
          tall
            ? "h-[620px] lg:h-[500px]"
            : small
            ? "h-[380px] lg:h-[350px]"
            : "h-[420px] lg:h-[445px]"
        }
      `}
    >
      {/* IMAGE */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={item.image}
          alt={item.title.replace("\n", " ")}
          fill
          sizes={
            tall
              ? "(max-width: 1024px) 100vw, 38vw"
              : "(max-width: 1024px) 100vw, 30vw"
          }
          className="
            object-cover
            transition-transform
            duration-[900ms]
            ease-[cubic-bezier(0.22,1,0.36,1)]
            group-hover:scale-[1.08]
          "
        />
      </div>

      {/* OVERLAY */}
      <div
        className="
          absolute inset-0
          bg-black/10
          transition-all duration-700
          group-hover:bg-black/35
        "
      />

      {/* CONTENT */}
      <div
        className="
          absolute inset-0
          flex flex-col
          items-end
          justify-end
          p-8
          sm:p-10
          lg:p-9
          xl:p-10
        "
      >
        <div className="flex w-full flex-col items-end">

          {/* TITLE */}
          <h3
            className="
              whitespace-pre-line
              text-right
              font-serif
              text-[31px]
              font-medium
              uppercase
              leading-[1.02]
              tracking-[-0.5px]
              text-white
              drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]
              sm:text-[34px]
              lg:text-[32px]
              xl:text-[35px]
            "
          >
            {item.title}
          </h3>

          {/* MORE BUTTON */}
          <span
            className="
              group/more
              relative
              mt-6
              inline-flex
              min-w-[128px]
              items-center
              justify-center
              overflow-hidden
              border-2
              border-white
              px-5
              py-3
              text-[14px]
              font-semibold
              uppercase
              text-white
              transition-colors
              duration-300
            "
          >
            {/* WHITE FILL */}
            <span
              aria-hidden="true"
              className="
                absolute
                inset-0
                origin-center
                scale-x-0
                bg-white
                transition-transform
                duration-500
                ease-[cubic-bezier(0.65,0,0.35,1)]
                group-hover/more:scale-x-100
              "
            />

            {/* TEXT */}
            <span
              className="
                relative
                z-10
                transition-colors
                duration-300
                group-hover/more:text-[#102f4f]
              "
            >
              More
            </span>
          </span>

        </div>
      </div>
    </Link>
  );
}

export default function LatestCollection() {
  return (
    <section
      className="
        w-full
        mt-16
        bg-white
        px-5
        py-16
        sm:mt-20
        sm:px-8
        md:px-10
        lg:mt-12
        lg:px-14
        xl:px-16
        2xl:px-[60px]
      "
    >
      <div className="mx-auto max-w-[1800px]">

        <div
          className="
            grid
            grid-cols-1
            gap-6
            lg:grid-cols-[0.8fr_1.2fr]
            lg:gap-14
          "
        >

          {/* ================= LEFT ================= */}
          <div className="lg:h-[650px]">

            <div className="mb-12 lg:mb-14">
              <h2
                className="
                  max-w-[480px]
                  font-serif
                  text-[48px]
                  uppercase
                  leading-[0.95]
                  text-[#172b41]
                  sm:text-[58px]
                  lg:text-[62px]
                "
              >
                Our Latest
                <br />
                Collection
              </h2>
            </div>

            <CollectionCard
              item={collections.poolside}
              tall
            />

          </div>

          {/* ================= RIGHT ================= */}
          <div className="flex flex-col gap-7">

            {/* TOP TWO */}
            <div
              className="
                grid
                grid-cols-1
                items-end
                gap-6
                sm:grid-cols-2
                lg:gap-14
              "
            >

              {/* WICKER */}
              <CollectionCard
                item={collections.wicker}
              />

              {/* DAYBED */}
              <CollectionCard
                item={collections.daybed}
                small
              />

            </div>

            {/* ================= BOTTOM CONTENT ================= */}
            <div
              className="
                flex
                flex-1
                flex-col
                items-start
                justify-start
                pt-0
                lg:pt-1
              "
            >

              <h2
                className="
                  max-w-[650px]
                  font-serif
                  text-[42px]
                  font-normal
                  uppercase
                  leading-[0.92]
                  tracking-[-1px]
                  text-[#172b41]
                  sm:text-[48px]
                  lg:text-[52px]
                  xl:text-[57px]
                "
              >
                Where Quality
                <br />
                Meets Style
              </h2>

              {/* SHOW ALL COLLECTIONS */}
              <Link
                href="/products"
                className="
                  group/all
                  relative
                  mt-7
                  inline-flex
                  items-center
                  justify-center
                  overflow-hidden
                  border-2
                  border-[#172b41]
                  px-8
                  py-4
                  text-[14px]
                  font-semibold
                  uppercase
                  text-[#172b41]
                  transition-colors
                  duration-300
                "
              >
                {/* BLUE FILL */}
                <span
                  aria-hidden="true"
                  className="
                    absolute
                    inset-0
                    origin-center
                    scale-x-0
                    bg-[#172b41]
                    transition-transform
                    duration-500
                    ease-[cubic-bezier(0.65,0,0.35,1)]
                    group-hover/all:scale-x-100
                  "
                />

                {/* TEXT */}
                <span
                  className="
                    relative
                    z-10
                    transition-colors
                    duration-300
                    group-hover/all:text-white
                  "
                >
                  Show All Collections
                </span>

                {/* ARROW */}
                <span
                  className="
                    relative
                    z-10
                    ml-2
                    text-base
                    opacity-0
                    -translate-x-2
                    transition-all
                    duration-300
                    group-hover/all:translate-x-0
                    group-hover/all:opacity-100
                  "
                >
                  →
                </span>
              </Link>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
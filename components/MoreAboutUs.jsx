import Image from "next/image";
import Link from "next/link";

export default function MoreAboutUs() {
  return (
    <section className="w-full bg-white py-8 sm:py-12 lg:py-20">
      <div className="mx-auto w-full max-w-[1500px] px-3 sm:px-6 lg:px-8">
        <div
          className="
            relative
            rounded-[200px]
            bg-[#eeeeee]
            sm:rounded-[300px]
            lg:rounded-[250px]
          "
        >
          <div
            className="
              grid
              grid-cols-1
              items-center
              lg:grid-cols-[48%_52%]
              lg:min-h-[550px]
            "
          >
            {/* IMAGE */}
            <div
              className="
                relative
                order-1
                h-[280px]
                w-full
                sm:h-[360px]
                md:h-[420px]
                lg:h-[550px]
              "
            >
              <Image
                src="/home/about-us.png"
                alt="Artics Decorr Outdoor Furniture"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 48vw"
                className="
                  object-contain
                  object-center
                  lg:object-left
                "
              />
            </div>

            {/* CONTENT */}
            <div
              className="
                order-2
                flex
                items-center
                px-5
                pb-10
                pt-4
                sm:px-10
                sm:pb-14
                sm:pt-5
                lg:px-8
                lg:py-16
                xl:px-14
                2xl:px-20
              "
            >
              <div className="w-full">

                {/* SMALL TITLE */}
                <p
                  className="
                    mb-3
                    text-center
                    text-[14px]
                    font-bold
                    leading-tight
                    text-black
                    sm:mb-4
                    sm:text-[16px]
                    lg:text-left
                  "
                >
                  Discover The Collection
                </p>

                {/* HEADING */}
                <h2
                  className="
                    text-center
                    text-[26px]
                    font-bold
                    leading-[1.15]
                    tracking-[-0.4px]
                    text-black
                    sm:text-[32px]
                    md:text-[36px]
                    lg:text-left
                    lg:text-[38px]
                    xl:text-[42px]
                  "
                >
                  Garden outdoor Furniture Manufacturer in Delhi
                </h2>

                {/* DESCRIPTION */}
                <p
                  className="
                    mt-5
                    text-center
                    font-serif
                    text-[15px]
                    leading-[1.75]
                    text-black
                    sm:mt-6
                    sm:text-[16px]
                    md:text-[17px]
                    lg:text-left
                  "
                >
                  For outdoor furniture in India, Artics Decorr is the name you
                  can count on. We’ve been in the game for a while and have
                  earned the reputation of being a{" "}
                  <span className="font-serif italic text-[#e87519]">
                    premium Outdoor Furniture manufacturer.
                  </span>{" "}
                  We’re on the lookout for materials that won’t let the rain or
                  sun get the better of our products, and so we use
                  high-quality weather-resistant materials that give you the
                  same comfort and joy that you get from a home.
                </p>

                {/* BUTTON */}
                <div className="mt-6 flex justify-center sm:mt-8 lg:justify-start">
                  <Link
                    href="/about-us"
                    className="
                      group
                      relative
                      inline-flex
                      items-center
                      justify-center
                      overflow-hidden
                      border
                      border-[#102f4f]
                      bg-white
                      px-7
                      py-3.5
                      text-[13px]
                      font-semibold
                      uppercase
                      tracking-[0.12em]
                      text-[#102f4f]
                      transition-colors
                      duration-300
                      hover:text-white
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
                        bg-[#102f4f]
                        transition-transform
                        duration-500
                        ease-[cubic-bezier(0.65,0,0.35,1)]
                        group-hover:scale-x-100
                      "
                    />

                    {/* TEXT */}
                    <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5">
                      Know More
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
                        group-hover:translate-x-0
                        group-hover:opacity-100
                      "
                    >
                      →
                    </span>
                  </Link>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
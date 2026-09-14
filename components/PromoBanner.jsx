"use client";

import Image from "next/image";
import Link from "next/link";

const features = [
  {
    image: "/home/icon1.png",
    title: (
      <>
        Free Shipping
        <br />
        Orders 60+
      </>
    ),
    description: (
      <>
        Reliable delivery service
        <br />
        you can trust.
      </>
    ),
  },
  {
    image: "/home/icon2.png",
    title: "Customer Support",
    description: (
      <>
        We prioritize your
        <br />
        satisfaction above
        <br />
        everything.
      </>
    ),
  },
  {
    image: "/home/icon3.png",
    title: (
      <>
        100% Secure
        <br />
        Payments
      </>
    ),
    description: (
      <>
        Your transactions are
        <br />
        protected with top-level
        <br />
        security.
      </>
    ),
  },
  {
    image: "/home/icon4.png",
    title: "Door Delivery",
    description: (
      <>
        We ensure safe and
        <br />
        convenient delivery to
        <br />
        your doorstep.
      </>
    ),
  },
];

export default function PromoBanner() {
  return (
    <section className="w-full">
      {/* =====================================================
          HERO
      ====================================================== */}
      <div className="relative overflow-hidden bg-[#0b352c]">
        <div
          className="
            relative
            mx-auto
            min-h-[510px]
            max-w-[1920px]
            px-7
            py-14
            sm:px-10
            md:px-14
            lg:flex
            lg:items-center
            lg:px-16
            xl:px-20
            2xl:px-[5%]
          "
        >
          {/* ================= LEFT CONTENT ================= */}
          <div className="relative z-10 w-full lg:w-[47%] xl:w-[45%]">
            <p
              className="
                mb-3
                text-[22px]
                font-semibold
                leading-tight
                text-white
                sm:text-[24px]
                lg:text-[26px]
              "
            >
              The All New
            </p>

            <h2
              className="
                text-[30px]
                font-bold
                leading-[1.1]
                text-white
                sm:text-[36px]
                lg:text-[40px]
                xl:text-[44px]
              "
            >
              Wicker Sofa Set
            </h2>

            <p
              className="
                mt-5
                max-w-[690px]
                text-[15px]
                font-medium
                leading-8
                text-white/90
                sm:text-[16px]
              "
            >
              A wicker sofa set is a stylish and durable outdoor furniture
              collection made of woven wicker material. It includes a sofa,
              armchairs, and a coffee table, perfect for relaxing and
              entertaining in your outdoor space.
            </p>

            <Link
              href="/products"
              className="
    group/btn
    relative
    mt-7
    inline-flex
    h-[60px]
    min-w-[150px]
    items-center
    justify-center
    overflow-hidden
    border-2
    border-white
    px-7
    text-[16px]
    font-bold
    uppercase
    text-white
    transition-colors
    duration-300
    hover:text-[#0b352c]
  "
            >
              {/* CENTER FILL EFFECT */}
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
      group-hover/btn:scale-x-100
    "
              />

              {/* TEXT */}
              <span className="relative z-10">Shop Now</span>
            </Link>
          </div>

          {/* ================= RIGHT IMAGE =================
              lg se neeche: text ke neeche normal flow mein.
              lg se upar: right side par absolute, poori height.
          ================================================= */}
          <div
            className="
              relative
              mt-10
              h-[260px]
              w-full
              sm:h-[360px]
              lg:absolute
              lg:inset-y-6
              lg:right-[2%]
              lg:mt-0
              lg:h-auto
              lg:w-[50%]
            "
          >
            <Image
              src="/home/promo.png"
              alt="Wicker Sofa Set"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 52vw"
              className="object-contain object-center"
            />
          </div>
        </div>
      </div>

      {/* =====================================================
          FEATURES
      ====================================================== */}
      <div className="w-full bg-white">
        <div
          className="
            mx-auto
            grid
            max-w-[1920px]
            grid-cols-1
            divide-y
            divide-[#eeeeee]
            px-7
            py-4
            sm:px-10
            md:grid-cols-2
            md:divide-y-0
            lg:grid-cols-4
            lg:px-14
            lg:py-7
            xl:px-20
          "
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="
                flex
                items-center
                gap-6
                py-7
                md:px-2
                lg:py-3
                lg:px-3
                xl:px-4
              "
            >
              <div className="relative h-[70px] w-[90px] shrink-0">
                <Image
                  src={feature.image}
                  alt=""
                  fill
                  sizes="90px"
                  className="object-contain object-center"
                />
              </div>

              {/* TEXT */}
              <div className="min-w-0">
                <h3
                  className="
                    text-[16px]
                    font-bold
                    leading-[1.2]
                    text-[#102f4f]
                  "
                >
                  {feature.title}
                </h3>

                <p
                  className="
                    mt-1.5
                    text-[14px]
                    leading-[1.4]
                    text-[#453d37]
                  "
                >
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

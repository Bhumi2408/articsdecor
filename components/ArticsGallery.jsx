// components/ArticsGallery.jsx
"use client";

import Image from "next/image";

const galleryColumns = [
  [
    {
      image: "/products/p16.png",
      alt: "Outdoor lounge furniture",
      height: "h-[290px]",
    },
    {
      image: "/products/p13.png",
      alt: "Outdoor daybed",
      height: "h-[400px]",
    },
    {
      image: "/products/p17.png",
      alt: "Outdoor sofa",
      height: "h-[255px]",
    },
  ],

  [
    {
      image: "/products/p4.png",
      alt: "Hanging swing chair",
      height: "h-[600px]",
    },
    {
      image: "/products/p15.png",
      alt: "Outdoor bar furniture",
      height: "h-[360px]",
    },
  ],

  [
    {
      image: "/products/p2.png",
      alt: "Outdoor sofa set",
      height: "h-[290px]",
    },
    {
      image: "/products/p12.png",
      alt: "Garden lounge furniture",
      height: "h-[400px]",
    },
    {
      image: "/products/p1.png",
      alt: "Outdoor sectional sofa",
      height: "h-[255px]",
    },
  ],

  [
    {
      image: "/products/p14.png",
      alt: "Outdoor lounge chairs",
      height: "h-[360px]",
    },
    {
      image: "/products/p5.png",
      alt: "Wicker sofa set",
      height: "h-[600px]",
    },
  ],
];

function GalleryImage({ item }) {
  return (
    <div
      className={`
        group relative
        w-full
        ${item.height}
        overflow-hidden
        bg-[#f2f2f0]
      `}
    >
      <Image
        src={item.image}
        alt={item.alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        className="
          object-cover
          transition-transform
          duration-[900ms]
          ease-[cubic-bezier(0.22,1,0.36,1)]
          group-hover:scale-[1.07]
        "
      />

      {/* subtle hover overlay */}
      <div
        className="
          pointer-events-none
          absolute inset-0
          bg-black/0
          transition-all
          duration-700
          group-hover:bg-black/[0.08]
        "
      />
    </div>
  );
}

export default function ArticsGallery() {
  return (
    <section className="w-full bg-white px-5 py-10 sm:px-8 md:px-10 lg:px-[60px]">

      <div className="mx-auto max-w-[1800px]">

        {/* ================= TITLE ================= */}
        <div className="mb-6 text-center">
          <h2
            className="
              font-baloo
              text-[34px]
              font-semibold
              leading-tight
              tracking-[-1px]
              text-[#102f4f]
              sm:text-[35px]
              lg:text-[40px]
            "
          >
            Artics Decorr Highlights
          </h2>
        </div>

        {/* ================= DESKTOP MASONRY ================= */}
        <div
          className="
            hidden
            gap-[14px]
            lg:grid
            lg:grid-cols-4
            xl:gap-[14px]
          "
        >
          {galleryColumns.map((column, columnIndex) => (
            <div
              key={columnIndex}
              className="flex flex-col gap-[14px]"
            >
              {column.map((item, index) => (
                <GalleryImage
                  key={`${columnIndex}-${index}`}
                  item={item}
                />
              ))}
            </div>
          ))}
        </div>

        {/* ================= TABLET ================= */}
        <div
          className="
            hidden
            gap-[14px]
            sm:grid
            sm:grid-cols-2
            lg:hidden
          "
        >
          <div className="flex flex-col gap-[14px]">
            {[
              galleryColumns[0][0],
              galleryColumns[0][1],
              galleryColumns[1][1],
              galleryColumns[2][2],
            ].map((item, index) => (
              <GalleryImage
                key={index}
                item={item}
              />
            ))}
          </div>

          <div className="flex flex-col gap-[14px]">
            {[
              galleryColumns[1][0],
              galleryColumns[2][0],
              galleryColumns[2][1],
              galleryColumns[3][0],
              galleryColumns[3][1],
            ].map((item, index) => (
              <GalleryImage
                key={index}
                item={item}
              />
            ))}
          </div>
        </div>

        {/* ================= MOBILE ================= */}
        <div className="flex flex-col gap-[14px] sm:hidden">
          {galleryColumns
            .flat()
            .map((item, index) => (
              <div
                key={index}
                className="h-[280px]"
              >
                <GalleryImage
                  item={{
                    ...item,
                    height: "h-full",
                  }}
                />
              </div>
            ))}
        </div>

      </div>
    </section>
  );
}
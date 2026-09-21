"use client";

import Image from "next/image";

const clients = [
  {
    name: "Westin Hotels & Resorts",
    image: "/client/c1.png",
  },
  {
    name: "Vivanta Hotels & Resorts",
    image: "/client/c2.png",
  },
  {
    name: "Clarks Resort",
    image: "/client/c3.jpg",
  },
  {
    name: "Courtyard Marriott",
    image: "/client/c4.png",
  },
  {
    name: "Marriott Hotels & Resorts",
    image: "/client/c5.png",
  },
  {
    name: "BrijRama Palace",
    image: "/client/c6.jpg",
  },
];

export default function Clients() {
  return (
    <section className="w-full bg-white pb-10">
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div
          className="
            grid
            grid-cols-2
            gap-4
            md:grid-cols-3
            lg:grid-cols-6
          "
        >
          {clients.map((client) => (
            <div
              key={client.name}
              className="
                group
                relative
                flex
                h-[145px]
                items-center
                justify-center
                overflow-hidden
                rounded-[10px]
                border
                border-[#dedede]
                bg-white
                transition-all
                duration-300
                hover:border-[#cfcfcf]
              "
            >
              <div
                className="
                  relative
                  h-[100px]
                  w-[85%]
                  transition-transform
                  duration-500
                  ease-out
                  group-hover:scale-[0.92]
                "
              >
                <Image
                  src={client.image}
                  alt={client.name}
                  fill
                  sizes="(max-width: 768px) 45vw, (max-width: 1024px) 30vw, 16vw"
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
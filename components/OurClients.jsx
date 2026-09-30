"use client";

import Image from "next/image";

const clients = [
  {
    name: "westin",
    image: "/client/c1.png",
  },
  {
    name: "vivanta",
    image: "/client/c2.png",
  },
  {
    name: "clarks",
    image: "/client/c3.jpg",
  },
  {
    name: "courtyard",
    image: "/client/c4.png",
  },
  {
    name: "marriot",
    image: "/client/c5.png",
  },
  {
    name: "brijrama",
    image: "/client/c6.jpg",
  },
  {
    name: "tata",
    image: "/client/c7.jpg",
  },
  {
    name: "tcs",
    image: "/client/c8.jpg",
  },
  {
    name: "kent ro",
    image: "/client/c9.png",
  },
  {
    name: "bramha corp",
    image: "/client/c10.jpg",
  },
  {
    name: "tbh",
    image: "/client/c11.jpg",
  },
  {
    name: "panshsil",
    image: "/client/c12.png",
  },
  {
    name: "kasturi",
    image: "/client/c13.png",
  },
  {
    name: "meridien",
    image: "/client/c14.png",
  },
  {
    name: "mama buoi",
    image: "/client/c15.jpg",
  },
  {
    name: "erica",
    image: "/client/c16.jpg",
  },
  {
    name: "national defence academy",
    image: "/client/c17.jpg",
  },
  {
    name: "speciality restaurants",
    image: "/client/c18.jpg",
  },
  {
    name: "hilton garden",
    image: "/client/c19.png",
  },
  {
    name: "sheraton",
    image: "/client/c20.jpg",
  },
  {
    name: "radisson",
    image: "/client/c21.jpg",
  },
  {
    name: "palm grove",
    image: "/client/c22.jpg",
  },
  {
    name: "conrad",
    image: "/client/c23.jpg",
  },
  {
    name: "sarovar",
    image: "/client/c24.png",
  },
  {
    name: "beyond design",
    image: "/client/c25.jpg",
  },
  {
    name: "kirloskar",
    image: "/client/c26.png",
  },
  {
    name: "encore",
    image: "/client/c27.png",
  },
  {
    name: "tata trust",
    image: "/client/c28.jpg",
  },
  {
    name: "pondy bay",
    image: "/client/c29.jpg",
  },
  {
    name: "the punarnava",
    image: "/client/c30.jpg",
  },
  {
    name: "artistry",
    image: "/client/c31.png",
  },
  {
    name: "snk",
    image: "/client/c32.png",
  },
  {
    name: "aditya birla",
    image: "/client/c33.png",
  },
  {
    name: "sukhwani",
    image: "/client/c34.jpg",
  },
  {
    name: "anp",
    image: "/client/c35.png",
  },
  {
    name: "jet synthesys",
    image: "/client/c36.png",
  },
  {
    name: "vatsyayana",
    image: "/client/c37.png",
  },
  {
    name: "reliance",
    image: "/client/c38.png",
  },
  {
    name: "madari",
    image: "/client/c39.png",
  },
  {
    name: "schlumberger",
    image: "/client/c40.png",
  },
  {
    name: "larsen",
    image: "/client/c41.jpg",
  },
  {
    name: "rahul",
    image: "/client/c42.jpg",
  },
  {
    name: "radisson",
    image: "/client/c44.png",
  },
  {
    name: "pride",
    image: "/client/c45.png",
  },
  {
    name: "paranjape",
    image: "/client/c46.jpeg",
  },
  {
    name: "madiant",
    image: "/client/c47.png",
  },
  {
    name: "cybage",
    image: "/client/c48.png",
  },
  {
    name: "abil",
    image: "/client/c49.png",
  },
  {
    name: "tajpalace",
    image: "/client/c50.png",
  },
  {
    name: "seleqtions",
    image: "/client/c51.png",
  },
  {
    name: "dayalparadise",
    image: "/client/c52.png",
  },
  {
    name: "dayalgateway",
    image: "/client/c53.png",
  },
  {
    name: "kabri",
    image: "/client/c54.png",
  },
  {
    name: "zuri",
    image: "/client/c55.png",
  },
  {
    name: "parkhotels",
    image: "/client/c56.jpeg",
  },
  {
    name: "lemeriden",
    image: "/client/c57.png",
  },
  {
    name: "meriden",
    image: "/client/c58.jpeg",
  },
  {
    name: "raddisonshimla",
    image: "/client/c59.png",
  },
  {
    name: "vivantaarunachal",
    image: "/client/c60.png",
  },
  {
    name: "thetimesgroup",
    image: "/client/c61.png",
  },
  {
    name: "parkhyderabad",
    image: "/client/c62.jpeg",
  },
  {
    name: "parkvisakhapatnam",
    image: "/client/c63.png",
  },
  {
    name: "hermanmiller",
    image: "/client/c64.png",
  },
  {
    name: "sahara",
    image: "/client/c65.png",
  },
   {
    name: "kolte",
    image: "/client/c66.png",
  },
  {
    name: "ventive",
    image: "/client/c67.png",
  },
  {
    name: "radisson",
    image: "/client/c68.jpeg",
  },
  {
    name: "balmoral",
    image: "/client/c69.png",
  },
  {
    name: "deepak",
    image: "/client/c70.png",
  },
  {
    name: "firmenich",
    image: "/client/c71.png",
  },
  {
    name: "hitech",
    image: "/client/c72.png",
  },
  {
    name: "dhoot",
    image: "/client/c73.png",
  },
  {
    name: "rubabdar",
    image: "/client/c74.png",
  },
  {
    name: "kumar",
    image: "/client/c75.png",
  },
  {
    name: "LT",
    image: "/client/c76.png",
  },
  {
    name: "lemontree",
    image: "/client/c77.png",
  },
  {
    name: "madhuban",
    image: "/client/c78.png",
  },
  {
    name: "radisson-bay",
    image: "/client/c79.png",
  },
  {
    name: "royal",
    image: "/client/c80.png",
  },
   {
    name: "sheraton",
    image: "/client/c81.png",
  },
  {
    name: "adityasingapore",
    image: "/client/c82.png",
  },
  {
    name: "soaltee",
    image: "/client/c83.png",
  },
  {
    name: "tcs",
    image: "/client/c84.png",
  },
  {
    name: "unnati",
    image: "/client/c85.png",
  },
  {
    name: "wolters",
    image: "/client/c86.png",
  },
  {
    name: "zydus",
    image: "/client/c87.png",
  },
  {
    name: "sumadhura",
    image: "/client/c88.png",
  },
  {
    name: "somaya",
    image: "/client/c89.png",
  },
  {
    name: "schaeffler",
    image: "/client/c90.png",
  },
  {
    name: "pride",
    image: "/client/c91.png",
  },
  {
    name: "meridenspa",
    image: "/client/c92.png",
  },
  {
    name: "avinash",
    image: "/client/c93.png",
  },
  {
    name: "dassault",
    image: "/client/c94.png",
  },
  {
    name: "leisure",
    image: "/client/c95.png",
  },
  {
    name: "radissonnashik",
    image: "/client/c96.png",
  },
  {
    name: "tatatrusts",
    image: "/client/c97.png",
  },
  {
    name: "m3m",
    image: "/client/c98.png",
  },
];

// Split the client list into three roughly equal groups, one per marquee row.
function splitIntoThirds(list) {
  const size = Math.ceil(list.length / 3);
  return [
    list.slice(0, size),
    list.slice(size, size * 2),
    list.slice(size * 2),
  ];
}

const [ROW_1, ROW_2, ROW_3] = splitIntoThirds(clients);

const ROWS = [
  { items: ROW_1, direction: "ltr", duration: 80 },
  { items: ROW_2, direction: "rtl", duration: 86 },
  { items: ROW_3, direction: "ltr", duration: 76 },
];

function ClientLogo({ client }) {
  return (
    <div
      className="
        group
        relative
        flex
        h-[120px]
        w-[180px]
        shrink-0
        items-center
        justify-center
        overflow-hidden
        rounded-xl
        border
        border-[#e5e5e5]
        bg-white
        transition-all
        duration-500
        hover:border-[var(--ad-gold)]
        md:h-[145px]
        md:w-[215px]
      "
    >
      <div
        className="
          relative
          h-[85px]
          w-[140px]
          transition-transform
          duration-[700ms]
          ease-[cubic-bezier(0.16,1,0.3,1)]
          group-hover:scale-[0.88]
          md:h-[102px]
          md:w-[165px]
        "
      >
        <Image
          src={client.image}
          alt={client.name}
          fill
          sizes="215px"
          className="object-contain"
        />
      </div>
    </div>
  );
}

function MarqueeRow({ items, direction, duration }) {
  // Duplicated set = seamless infinite loop via a 50%-width CSS translate.
  const loopItems = [...items, ...items];

  return (
    <div className="marquee-row relative w-full overflow-hidden">
      {/* Left fade */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-white to-transparent md:w-28" />

      {/* Right fade */}
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-white to-transparent md:w-28" />

      <div
        className={`marquee-track marquee-${direction} flex w-max gap-5 px-10 md:gap-6`}
        style={{ animationDuration: `${duration}s`, animationTimingFunction: "linear", animationIterationCount: "infinite" }}
      >
        {loopItems.map((client, index) => (
          <ClientLogo key={`${client.name}-${index}`} client={client} />
        ))}
      </div>
    </div>
  );
}

export default function OurClients() {
  return (
    <section className="w-full overflow-hidden bg-[#f9f8f8] py-10 md:py-12">
      {/* ================= HEADING ================= */}
      <div className="px-6 text-center md:px-10">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--ad-gold)]">
          Trusted By
        </p>

        <h2 className="text-[32px] font-semibold leading-tight tracking-[-0.025em] text-[var(--ad-ink)] md:text-[42px]">
          Our Clients
        </h2>

        <div className="mx-auto mt-5 h-px w-12 bg-[var(--ad-gold)]" />
      </div>

      {/* ================= MARQUEE ROWS ================= */}
      <div className="mt-12 flex flex-col gap-5 md:gap-6">
        {ROWS.map((row, i) => (
          <MarqueeRow key={i} {...row} />
        ))}
      </div>
    </section>
  );
}
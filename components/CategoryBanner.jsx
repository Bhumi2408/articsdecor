// components/CategoryBanner.jsx
"use client";

export default function CategoryBanner({ items }) {
  return (
    <section className="grid md:grid-cols-4">
      {items.map((item, i) => (
        <div key={i} className="group relative h-[420px] md:h-[520px] overflow-hidden">
          {/* Background image */}
          <img
            src={item.image}
            alt={item.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />

          {/* Triangle overlay image - top for odd index, bottom for even index */}
          <img
            src={i % 2 === 1 ? "/home/triangle-1.svg" : "/home/triangle.svg"}
            alt=""
            className={`absolute left-0 w-full pointer-events-none opacity-20 ${
              i % 2 === 1 ? "bottom-0" : "top-0"
            }`}
          />

          {/* Dark wash for text readability */}
          <div className="absolute inset-0 bg-black/20" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-end text-center px-6 pb-12">
            <h3 className="text-white text-xl md:text-2xl font-medium">
              {item.title}
            </h3>

            <span className="text-white text-xs font-semibold tracking-widest uppercase mt-2 transition-all duration-300 group-hover:opacity-0 group-hover:h-0 group-hover:mt-0">
              {item.category}
            </span>

            <div className="max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100 group-hover:mt-3 transition-all duration-500 ease-out overflow-hidden">
              {item.description && (
                <p className="text-white/90 text-[15px] font-medium max-w-xs mx-auto mb-4">
                  {item.description}
                </p>
              )}
              {item.buttonText && (
                <a
                  href={item.buttonLink || "#"}
                  className="text-white text-sm font-semibold underline underline-offset-4"
                >
                  {item.buttonText}
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
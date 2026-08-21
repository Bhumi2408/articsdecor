// components/FinishingTouchSection.jsx
export default function FinishingTouchSection({ heading, subheading, items }) {
  return (
    <section className="bg-white py-16">
      <div className="px-5 text-center">
        <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-3">
          {heading}
        </h2>
        <p className="text-gray-600 text-sm md:text-base mb-10 max-w-2xl mx-auto">
          {subheading}
        </p>

        <div className="grid md:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <div key={i}>
              {/* Image with category overlay */}
              <div className="group relative h-[300px] md:h-[460px] rounded-lg overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />

                {/* Triangle overlay - alternate top/bottom */}
                <img
                  src={i % 2 === 1 ? "/home/triangle-1.svg" : "/home/triangle.svg"}
                  alt=""
                  className={`absolute left-0 w-full pointer-events-none opacity-20 ${
                    i % 2 === 1 ? "bottom-0" : "top-0"
                  }`}
                />

                <div className="absolute inset-0 bg-black/20" />

                <span className="absolute bottom-5 left-0 right-0 text-center text-white text-xs font-semibold tracking-widest uppercase">
                  {item.category}
                </span>
              </div>

              {/* Content below image */}
              <div className="text-center mt-5">
                <h3 className="text-[22px] font-medium text-gray-900">{item.title}</h3>
                <p className="text-gray-600 text-[15px] mt-2 leading-relaxed">
                  {item.description}
                </p>
                <a
                  href={item.buttonLink || "#"}
                  className="inline-block text-sm font-semibold text-gray-900 underline underline-offset-4 mt-4"
                >
                  See More Products
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
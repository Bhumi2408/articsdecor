// components/SignatureSparkleSection.jsx
"use client";

export default function SignatureSparkleSection() {
  return (
    <section className="group relative w-full h-[500px] md:h-[600px] overflow-hidden bg-[#f3e9db]">
      {/* Background image */}
      <img
        src="/sparkle-banner.jpeg"
        alt="Discover Your Signature Sparkle"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
      />

      {/* Content overlay - left side */}
      <div className="relative z-10 h-full flex flex-col justify-center max-w-xl px-8 md:px-16">
        <span
          className="text-gray-900 text-xs font-semibold tracking-widest uppercase transition-transform duration-500 ease-out group-hover:translate-x-5"
          style={{ transitionDelay: "150ms" }}
        >
          Lute Diamonds Collection
        </span>

        <h2
          className="text-gray-900 text-4xl md:text-5xl font-medium mt-3 leading-tight transition-transform duration-500 ease-out group-hover:translate-x-5"
          style={{ transitionDelay: "300ms" }}
        >
          Discover Your Signature Sparkle
        </h2>

        <p
          className="text-gray-700 text-base mt-6 font-medium leading-relaxed transition-transform duration-500 ease-out group-hover:translate-x-5"
          style={{ transitionDelay: "450ms" }}
        >
          Introducing the new Lute Diamonds Collection – a showcase of
          exceptional craftsmanship and timeless elegance. Each design is
          meticulously handcrafted to enhance the natural brilliance of every
          diamond, creating jewellery that radiates sophistication and
          individuality.
        </p>

        <a
          href="/shop"
          className="relative mt-8 inline-block w-fit overflow-hidden rounded-md bg-white px-7 py-3.5 text-sm font-semibold text-black
                    before:absolute before:inset-y-0 before:left-0 before:z-0 before:w-0 before:bg-[#DBAF36] before:content-['']
                    before:transition-[width] before:duration-500 before:ease-out hover:before:w-full hover:text-white
                    transition-transform duration-500 ease-out group-hover:translate-x-5"
          style={{ transitionDelay: "600ms" }}
        >
          <span className="relative z-10">Shop Now</span>
        </a>
      </div>
    </section>
  );
}
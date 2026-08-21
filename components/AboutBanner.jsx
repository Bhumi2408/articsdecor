// components/CEOIntroSection.jsx
export default function AboutBanner() {
  return (
    <section className="relative w-full h-[500px] md:h-[650px]">
      <img
        src="/about-banner.jpeg"
        alt="About Banner"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 h-full flex flex-col justify-center text-center max-w-2xl px-6 md:px-16 text-center md:text-left mx-auto md:mx-0">
        <h1 className="text-white text-3xl md:text-5xl font-medium leading-tight text-center">
          Introducing the New Era of <span className="text-amber-400">Lute Diamonds</span>
        </h1>

        <p className="text-white/90 text-sm md:text-[15px] mt-6 leading-relaxed text-center">
          Lute Diamonds unites timeless craftsmanship with modern innovation, creating jewellery that embodies love, heritage, and elegance. Through our global platform, we connect customers worldwide with exquisite diamond pieces designed to inspire and shine across generations.
        </p>

        <div className="mt-10 text-center">
          <p className="text-amber-400 text-2xl md:text-4xl font-medium">Itumeleng Lute</p>
          <p className="text-white text-sm font-semibold mt-1">-Chief Executive Officer (CEO)</p>
        </div>
      </div>
    </section>
  );
}
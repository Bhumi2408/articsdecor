import Image from "next/image";
import Link from "next/link";

export default function AboutBanner() {
  return (
    <section className="relative h-[430px] w-full overflow-hidden md:h-[500px]">
      {/* Background Image */}
      <Image
        src="/products/p17.png"
        alt="Artics Decorr outdoor furniture"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center px-6 text-center">
        <div className="max-w-3xl text-white">

          {/* Small label */}
          <span className="mb-5 inline-block text-[11px] font-semibold uppercase tracking-[0.35em] text-white/80">
            Discover Artics Decorr
          </span>

          {/* Heading */}
          <h1 className="font-[var(--font-baloo2)] text-5xl font-bold leading-tight tracking-tight md:text-6xl">
            About Us
          </h1>

          {/* Line */}
          <div className="mx-auto mt-6 h-[2px] w-16 bg-[var(--ad-gold)]" />

          {/* Description */}
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/85 md:text-base">
            Creating beautiful outdoor spaces with premium wicker furniture,
            thoughtful design and timeless comfort.
          </p>

        </div>
      </div>
    </section>
  );
}
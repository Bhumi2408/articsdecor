// components/Breadcrumbs.jsx

import Link from "next/link";

export default function Breadcrumbs({
  title,
  items = [],
  image = "/shop-banner.jpg",
}) {
  return (
    <section className="relative flex h-[230px] w-full items-center justify-center overflow-hidden md:h-[400px]">
      
    
      <img
        src={image}
        alt=""
        aria-hidden="true"
        className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
          origin-bottom
          scale-[1.02]
        "
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#071f18]/55" />

      {/* Subtle center glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/45" />

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 px-6 text-center">

        {/* Small eyebrow */}
        <div className="mb-4 flex items-center justify-center gap-3">
          <span className="h-px w-7 bg-[#E0A63F]" />

          <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-white/80">
            Artics Decorr
          </span>

          <span className="h-px w-7 bg-[#E0A63F]" />
        </div>

        {/* Page title */}
        <h1
          className="
            text-3xl
            font-semibold
            leading-tight
            tracking-[-0.02em]
            text-white
            md:text-[44px]
          "
        >
          {title}
        </h1>

        {/* ================= BREADCRUMB ================= */}
        <nav
          aria-label="Breadcrumb"
          className="mt-5"
        >
          <ol className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[10px] font-medium uppercase tracking-[0.16em] md:text-[11px]">

            {/* Home */}
            <li>
              <Link
                href="/"
                className="
                  text-white/70
                  transition-colors
                  duration-300
                  hover:text-[var(--ad-gold)]
                "
              >
                Home
              </Link>
            </li>

            {items.map((item, index) => (
              <li
                key={`${item.label}-${index}`}
                className="flex items-center gap-3"
              >
                {/* Divider */}
                <span
                  aria-hidden="true"
                  className="text-[#E0A63F]"
                >
                  /
                </span>

                {item.href ? (
                  <Link
                    href={item.href}
                    className="
                      text-white/70
                      transition-colors
                      duration-300
                      hover:text-[var(--ad-gold)]
                    "
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="font-semibold text-white">
                    {item.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>

      {/* Bottom gold accent */}
      <div className="absolute bottom-0 left-1/2 h-[2px] w-16 -translate-x-1/2 bg-[var(--ad-gold)]" />
    </section>
  );
}
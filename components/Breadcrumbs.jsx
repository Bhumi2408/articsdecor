// components/Breadcrumbs.jsx
import Link from "next/link";

export default function Breadcrumbs({ title, items = [] }) {
  return (
    <div className="relative w-full h-[220px] md:h-[280px] flex items-center justify-center text-center overflow-hidden">
      <img
        src="/shop-banner.jpg"
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10 px-6">
        <h1 className="text-white text-3xl md:text-4xl font-semibold mb-3">{title}</h1>
        <nav className="text-xs md:text-sm text-white/90 tracking-wide uppercase">
          <ol className="flex items-center justify-center gap-2">
            <li>
              <Link href="/" className="hover:text-gold">
                Home Page
              </Link>
            </li>
            {items.map((item, i) => (
              <li key={i} className="flex items-center gap-2">
                <span>&gt;</span>
                {item.href ? (
                  <Link href={item.href} className="hover:text-gold">
                    {item.label}
                  </Link>
                ) : (
                  <span className="font-semibold">{item.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  );
}
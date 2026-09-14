import Link from "next/link";

export default function Pagination({ page, pages, buildHref }) {
  if (pages <= 1) return null;

  const items = Array.from({ length: pages }, (_, i) => i + 1);

  return (
    <nav className="flex items-center justify-center gap-2 py-10 text-sm">
      {items.map((p) => (
        <Link
          key={p}
          href={buildHref(p)}
          className={`w-9 h-9 flex items-center justify-center rounded border ${
            p === page ? "bg-[#770800] text-white border-[#770800]" : "border-border hover:border-[#770800]"
          }`}
        >
          {p}
        </Link>
      ))}
    </nav>
  );
}

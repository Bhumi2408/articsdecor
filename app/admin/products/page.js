// app/admin/products/page.jsx
import Link from "next/link";
import Image from "next/image";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { formatINR } from "@/lib/format";
import DeleteProductButton from "@/components/admin/DeleteProductButton";

// Uses searchParams so this already renders dynamically, but make it
// explicit so it can't silently regress to a frozen static page later.
export const dynamic = "force-dynamic";

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

const PlusIcon = (p) => (
  <svg {...iconProps} {...p}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);
const TagIcon = (p) => (
  <svg {...iconProps} {...p}>
    <path d="M3.5 10.5V4.5h6l10 10-6 6z" />
    <circle cx="7.5" cy="8.5" r="1.3" />
  </svg>
);
const SearchIcon = (p) => (
  <svg {...iconProps} {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);
const EyeIcon = (p) => (
  <svg {...iconProps} {...p}>
    <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

/* stock ke hisaab se pill */
function stockStyle(stock) {
  if (stock <= 0) return "bg-red-50 text-red-700";
  if (stock <= 5) return "bg-amber-50 text-amber-700";
  return "bg-emerald-50 text-emerald-700";
}
function stockLabel(stock) {
  if (stock <= 0) return "Out of stock";
  return `${stock} in stock`;
}

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export default async function AdminProductsPage({ searchParams }) {
  const sp = await searchParams;
  const search = (sp.search || "").trim();

  await connectDB();
  const query = search ? { name: { $regex: escapeRegex(search), $options: "i" } } : {};
  const products = await Product.find(query)
    .populate("category", "name")
    .sort({ createdAt: -1 })
    .lean();

  return (
    <div className="pb-12">
      {/* ---------- header ---------- */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-[26px] font-medium leading-tight tracking-[-0.01em] text-[#141414] sm:text-[30px]">
            Products
          </h1>
          <p className="mt-2 text-[15px] text-[#6B6B6B]">
            {products.length === 0
              ? "Nothing to show."
              : `${products.length} product${products.length > 1 ? "s" : ""}`}
            {search && ` matching “${search}”`}
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-1.5 rounded-lg bg-[#141414] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#BF9A3A]"
        >
          <PlusIcon className="h-4 w-4" />
          Add Product
        </Link>
      </div>

      {/* ---------- search ---------- */}
      <form method="GET" className="mt-6 flex flex-wrap items-center gap-3">
        <div className="relative w-full sm:w-80">
          <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#9A9A9A]" />
          <input
            type="search"
            name="search"
            placeholder="Search products..."
            defaultValue={search}
            className="w-full rounded-lg border border-black/10 bg-white py-2.5 pl-11 pr-3.5 text-[14.5px] text-[#141414] outline-none transition-all placeholder:text-[#A5A5A5] focus:border-[#BF9A3A] focus:ring-2 focus:ring-[#BF9A3A]/20"
          />
        </div>
        <button
          type="submit"
          className="rounded-lg border border-black/10 px-4 py-2.5 text-[14px] font-medium text-[#5A5A5A] transition-colors hover:border-[#BF9A3A] hover:text-[#BF9A3A]"
        >
          Search
        </button>
        {search && (
          <Link
            href="/admin/products"
            className="text-[14px] font-medium text-[#6B6B6B] transition-colors hover:text-[#BF9A3A]"
          >
            Clear
          </Link>
        )}
      </form>

      {products.length === 0 ? (
        /* ---------- empty ---------- */
        <div className="mt-6 rounded-2xl border border-dashed border-black/15 bg-[#FAF8F4] px-6 py-16 text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#F1E8D5] text-[#BF9A3A]">
            <TagIcon className="h-7 w-7" />
          </span>
          <p className="mt-5 text-[17px] font-medium text-[#141414]">
            {search ? `No products match “${search}”` : "No products yet"}
          </p>
          <Link
            href={search ? "/admin/products" : "/admin/products/new"}
            className="mt-5 inline-block rounded-lg bg-[#141414] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#BF9A3A]"
          >
            {search ? "Clear search" : "Add your first product"}
          </Link>
        </div>
      ) : (
        <>
          {/* ---------- mobile: cards ---------- */}
          <div className="mt-6 space-y-3 lg:hidden">
            {products.map((p) => (
              <div key={String(p._id)} className="rounded-2xl border border-black/10 bg-white p-4">
                <div className="flex items-start gap-4">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-[#F1ECE2]">
                    {p.images?.[0] && (
                      <Image src={p.images[0]} alt="" fill sizes="64px" className="object-cover" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-[15px] font-medium leading-snug text-[#141414]">{p.name}</p>
                    <p className="mt-1 text-[13px] text-[#8A8A8A]">{p.category?.name || "No category"}</p>
                    <p className="mt-1.5 text-[15px] font-medium text-[#141414]">
                      {formatINR(p.price)}
                    </p>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-[11.5px] font-medium ${stockStyle(p.stock)}`}
                  >
                    {p.stock <= 0 ? "Out" : p.stock}
                  </span>
                </div>

                <div className="mt-4 flex items-center gap-2 border-t border-black/[0.07] pt-3">
                  {p.slug && (
                    <Link
                      href={`/product/${p.slug}`}
                      target="_blank"
                      className="rounded-lg border border-black/10 px-3 py-1.5 text-[13px] font-medium text-[#5A5A5A] transition-colors hover:border-[#BF9A3A] hover:text-[#BF9A3A]"
                    >
                      View
                    </Link>
                  )}
                  <Link
                    href={`/admin/products/${p._id}/edit`}
                    className="rounded-lg border border-black/10 px-3 py-1.5 text-[13px] font-medium text-[#5A5A5A] transition-colors hover:border-[#BF9A3A] hover:text-[#BF9A3A]"
                  >
                    Edit
                  </Link>
                  <span className="ml-auto">
                    <DeleteProductButton id={p._id.toString()} />
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* ---------- desktop: table ---------- */}
          <div className="mt-6 hidden overflow-hidden rounded-2xl border border-black/10 lg:block">
            <table className="w-full text-[14.5px]">
              <thead>
                <tr className="bg-[#FAF8F4] text-left">
                  {["Product", "Category", "Price", "Stock", "Actions"].map((h, i) => (
                    <th
                      key={h}
                      className={`px-5 py-3.5 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#8A8A8A] ${
                        i === 4 ? "text-right" : ""
                      }`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.07]">
                {products.map((p) => (
                  <tr key={String(p._id)} className="transition-colors hover:bg-[#FCFAF6]">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-[#F1ECE2]">
                          {p.images?.[0] && (
                            <Image src={p.images[0]} alt="" fill sizes="44px" className="object-cover" />
                          )}
                        </div>
                        <Link
                          href={`/admin/products/${p._id}/edit`}
                          className="font-medium text-[#141414] transition-colors hover:text-[#BF9A3A]"
                        >
                          {p.name}
                        </Link>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-[#5A5A5A]">{p.category?.name || "—"}</td>
                    <td className="whitespace-nowrap px-5 py-4 font-medium text-[#141414]">
                      {formatINR(p.price)}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-block whitespace-nowrap rounded-full px-2.5 py-1 text-[12.5px] font-medium ${stockStyle(p.stock)}`}
                      >
                        {stockLabel(p.stock)}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-4">
                        {p.slug && (
                          <Link
                            href={`/product/${p.slug}`}
                            target="_blank"
                            title="View on site"
                            className="text-[#8A8A8A] transition-colors hover:text-[#BF9A3A]"
                          >
                            <EyeIcon className="h-[18px] w-[18px]" />
                          </Link>
                        )}
                        <Link
                          href={`/admin/products/${p._id}/edit`}
                          className="font-medium text-[#BF9A3A] transition-colors hover:text-[#A8862C]"
                        >
                          Edit
                        </Link>
                        <DeleteProductButton id={p._id.toString()} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
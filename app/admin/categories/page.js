// app/admin/categories/page.jsx
import Link from "next/link";
import Image from "next/image";
import { connectDB } from "@/lib/db";
import Category from "@/models/Category";
import Product from "@/models/Product";
import CategoryForm from "@/components/admin/CategoryForm";
import DeleteCategoryButton from "@/components/admin/DeleteCategoryButton";

// No cookies()/searchParams usage here, so Next.js would otherwise
// statically render this page once at build time and freeze the list —
// force it to re-query the database on every request.
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

const LayersIcon = (p) => (
  <svg {...iconProps} {...p}>
    <path d="M12 3.5 3 8l9 4.5L21 8z" />
    <path d="M3 12.5 12 17l9-4.5M3 16.5 12 21l9-4.5" />
  </svg>
);

export default async function AdminCategoriesPage() {
  await connectDB();
  const categories = await Category.find().sort({ name: 1 }).lean();

  /* har category me kitne products hain */
  const counts = await Promise.all(
    categories.map((c) => Product.countDocuments({ category: c._id }))
  );

  return (
    <div className="pb-12">
      {/* ---------- header ---------- */}
      <div>
        <h1 className="text-[26px] font-medium leading-tight tracking-[-0.01em] text-[#141414] sm:text-[30px]">
          Categories
        </h1>
        <p className="mt-2 text-[15px] text-[#6B6B6B]">
          {categories.length === 0
            ? "Create your first category to organise products."
            : `${categories.length} categor${categories.length > 1 ? "ies" : "y"}`}
        </p>
      </div>

      <div className="mt-6 grid gap-8 xl:grid-cols-[1fr_320px] xl:items-start">
        {/* ---------- list ---------- */}
        <div className="min-w-0">
          {categories.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-black/15 bg-[#FAF8F4] px-6 py-16 text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#F1E8D5] text-[#BF9A3A]">
                <LayersIcon className="h-7 w-7" />
              </span>
              <p className="mt-5 text-[17px] font-medium text-[#141414]">No categories yet</p>
              <p className="mx-auto mt-2 max-w-sm text-[14.5px] leading-relaxed text-[#6B6B6B]">
                Add one using the form and it will show up in the shop filters and the header menu.
              </p>
            </div>
          ) : (
            <>
              {/* mobile: cards */}
              <div className="space-y-3 md:hidden">
                {categories.map((c, i) => (
                  <div key={String(c._id)} className="rounded-2xl border border-black/10 bg-white p-4">
                    <div className="flex items-center gap-4">
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-[#F1ECE2]">
                        {c.image && (
                          <Image src={c.image} alt="" fill sizes="56px" className="object-cover" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[15px] font-medium text-[#141414]">{c.name}</p>
                        <p className="mt-0.5 truncate text-[13px] text-[#8A8A8A]">/{c.slug}</p>
                      </div>
                      <span className="shrink-0 rounded-full bg-black/[0.04] px-2.5 py-1 text-[12px] font-medium text-[#5A5A5A]">
                        {counts[i]}
                      </span>
                    </div>

                    <div className="mt-4 flex items-center gap-3 border-t border-black/[0.07] pt-3">
                      <Link
                        href={`/admin/categories/${c._id}/edit`}
                        className="rounded-lg border border-black/10 px-3 py-1.5 text-[13px] font-medium text-[#5A5A5A] transition-colors hover:border-[#BF9A3A] hover:text-[#BF9A3A]"
                      >
                        Edit
                      </Link>
                      <span className="ml-auto">
                        <DeleteCategoryButton id={c._id.toString()} />
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* desktop: table */}
              <div className="hidden overflow-hidden rounded-2xl border border-black/10 md:block">
                <table className="w-full text-[14.5px]">
                  <thead>
                    <tr className="bg-[#FAF8F4] text-left">
                      <th className="w-[80px] px-5 py-3.5 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#8A8A8A]">
                        Image
                      </th>
                      <th className="px-5 py-3.5 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#8A8A8A]">
                        Name
                      </th>
                      <th className="px-5 py-3.5 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#8A8A8A]">
                        Slug
                      </th>
                      <th className="px-5 py-3.5 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#8A8A8A]">
                        Products
                      </th>
                      <th className="px-5 py-3.5 text-right text-[12px] font-semibold uppercase tracking-[0.08em] text-[#8A8A8A]">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/[0.07]">
                    {categories.map((c, i) => (
                      <tr key={String(c._id)} className="transition-colors hover:bg-[#FCFAF6]">
                        <td className="px-5 py-4">
                          <div className="relative h-10 w-10 overflow-hidden rounded-lg bg-[#F1ECE2]">
                            {c.image && (
                              <Image src={c.image} alt="" fill sizes="40px" className="object-cover" />
                            )}
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <Link
                            href={`/admin/categories/${c._id}/edit`}
                            className="font-medium text-[#141414] transition-colors hover:text-[#BF9A3A]"
                          >
                            {c.name}
                          </Link>
                        </td>
                        <td className="px-5 py-4">
                          <code className="rounded bg-black/[0.04] px-2 py-1 text-[13px] text-[#5A5A5A]">
                            /{c.slug}
                          </code>
                        </td>
                        <td className="px-5 py-4">
                          <span
                            className={`inline-block rounded-full px-2.5 py-1 text-[12.5px] font-medium ${
                              counts[i] === 0
                                ? "bg-amber-50 text-amber-700"
                                : "bg-black/[0.04] text-[#5A5A5A]"
                            }`}
                          >
                            {counts[i]}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center justify-end gap-4">
                            <Link
                              href={`/admin/categories/${c._id}/edit`}
                              className="font-medium text-[#BF9A3A] transition-colors hover:text-[#A8862C]"
                            >
                              Edit
                            </Link>
                            <DeleteCategoryButton id={c._id.toString()} />
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

        {/* ---------- add form ---------- */}
        <aside className="xl:sticky xl:top-32">
          <CategoryForm />
        </aside>
      </div>
    </div>
  );
}
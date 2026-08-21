// app/admin/blog/page.jsx
import Link from "next/link";
import Image from "next/image";
import { connectDB } from "@/lib/db";
import BlogPost from "@/models/BlogPost";
import DeleteBlogButton from "@/components/admin/DeleteBlogButton";

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
const DocIcon = (p) => (
  <svg {...iconProps} {...p}>
    <path d="M14 3.5H7a1.5 1.5 0 0 0-1.5 1.5v14A1.5 1.5 0 0 0 7 20.5h10a1.5 1.5 0 0 0 1.5-1.5V8z" />
    <path d="M14 3.5V8h4.5M8.5 12.5h7M8.5 16h4.5" />
  </svg>
);
const EyeIcon = (p) => (
  <svg {...iconProps} {...p}>
    <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

function formatDate(d) {
  return new Date(d).toLocaleDateString("en-ZA", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default async function AdminBlogPage() {
  await connectDB();
  const posts = await BlogPost.find().sort({ createdAt: -1 }).lean();

  return (
    <div className="pb-12">
      {/* ---------- header ---------- */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-[26px] font-medium leading-tight tracking-[-0.01em] text-[#141414] sm:text-[30px]">
            Blog
          </h1>
          <p className="mt-2 text-[15px] text-[#6B6B6B]">
            {posts.length === 0
              ? "No posts yet."
              : `${posts.length} post${posts.length > 1 ? "s" : ""} published`}
          </p>
        </div>

        <Link
          href="/admin/blog/new"
          className="inline-flex items-center gap-1.5 rounded-lg bg-[#141414] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#BF9A3A]"
        >
          <PlusIcon className="h-4 w-4" />
          New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        /* ---------- empty ---------- */
        <div className="mt-8 rounded-2xl border border-dashed border-black/15 bg-[#FAF8F4] px-6 py-16 text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#F1E8D5] text-[#BF9A3A]">
            <DocIcon className="h-7 w-7" />
          </span>
          <p className="mt-5 text-[17px] font-medium text-[#141414]">No blog posts yet</p>
          <p className="mx-auto mt-2 max-w-md text-[14.5px] leading-relaxed text-[#6B6B6B]">
            Write your first article and it will appear on the storefront blog and the homepage.
          </p>
          <Link
            href="/admin/blog/new"
            className="mt-6 inline-block rounded-lg bg-[#141414] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#BF9A3A]"
          >
            Create a post
          </Link>
        </div>
      ) : (
        <>
          {/* ---------- mobile: cards ---------- */}
          <div className="mt-6 space-y-3 lg:hidden">
            {posts.map((p) => (
              <div key={String(p._id)} className="rounded-2xl border border-black/10 bg-white p-4">
                <div className="flex items-start gap-4">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-[#F1ECE2]">
                    {p.coverImage && (
                      <Image src={p.coverImage} alt="" fill sizes="64px" className="object-cover" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-[15px] font-medium leading-snug text-[#141414]">{p.title}</p>
                    <p className="mt-1 truncate text-[13px] text-[#8A8A8A]">/{p.slug}</p>
                    <p className="mt-1 text-[13px] text-[#8A8A8A]">{formatDate(p.createdAt)}</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 border-t border-black/[0.07] pt-3">
                  <Link
                    href={`/blog/${p.slug}`}
                    target="_blank"
                    className="rounded-lg border border-black/10 px-3 py-1.5 text-[13px] font-medium text-[#5A5A5A] transition-colors hover:border-[#BF9A3A] hover:text-[#BF9A3A]"
                  >
                    View
                  </Link>
                  <Link
                    href={`/admin/blog/${p._id}/edit`}
                    className="rounded-lg border border-black/10 px-3 py-1.5 text-[13px] font-medium text-[#5A5A5A] transition-colors hover:border-[#BF9A3A] hover:text-[#BF9A3A]"
                  >
                    Edit
                  </Link>
                  <span className="ml-auto">
                    <DeleteBlogButton id={p._id.toString()} />
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
                  <th className="w-[92px] px-5 py-3.5 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#8A8A8A]">
                    Cover
                  </th>
                  <th className="px-5 py-3.5 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#8A8A8A]">
                    Title
                  </th>
                  <th className="px-5 py-3.5 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#8A8A8A]">
                    Slug
                  </th>
                  <th className="px-5 py-3.5 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#8A8A8A]">
                    Published
                  </th>
                  <th className="px-5 py-3.5 text-right text-[12px] font-semibold uppercase tracking-[0.08em] text-[#8A8A8A]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.07]">
                {posts.map((p) => (
                  <tr key={String(p._id)} className="transition-colors hover:bg-[#FCFAF6]">
                    <td className="px-5 py-4">
                      <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-[#F1ECE2]">
                        {p.coverImage && (
                          <Image src={p.coverImage} alt="" fill sizes="48px" className="object-cover" />
                        )}
                      </div>
                    </td>
                    <td className="max-w-[320px] px-5 py-4">
                      <Link
                        href={`/admin/blog/${p._id}/edit`}
                        className="font-medium text-[#141414] transition-colors hover:text-[#BF9A3A]"
                      >
                        {p.title}
                      </Link>
                    </td>
                    <td className="px-5 py-4">
                      <code className="rounded bg-black/[0.04] px-2 py-1 text-[13px] text-[#5A5A5A]">
                        /{p.slug}
                      </code>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-[#5A5A5A]">
                      {formatDate(p.createdAt)}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-4">
                        <Link
                          href={`/blog/${p.slug}`}
                          target="_blank"
                          title="View on site"
                          className="text-[#8A8A8A] transition-colors hover:text-[#BF9A3A]"
                        >
                          <EyeIcon className="h-[18px] w-[18px]" />
                        </Link>
                        <Link
                          href={`/admin/blog/${p._id}/edit`}
                          className="font-medium text-[#BF9A3A] transition-colors hover:text-[#A8862C]"
                        >
                          Edit
                        </Link>
                        <DeleteBlogButton id={p._id.toString()} />
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
// app/admin/blog/page.jsx
import Link from "next/link";
import Image from "next/image";
import { connectDB } from "@/lib/db";
import BlogPost from "@/models/BlogPost";
import DeleteBlogButton from "@/components/admin/DeleteBlogButton";

// This page has no cookies()/searchParams usage, so Next.js would otherwise
// statically render it once at build time and freeze the list forever —
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

function formatDate(date) {
  if (!date) return "—";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default async function AdminBlogPage() {
  await connectDB();

  const posts = await BlogPost.find()
    .sort({ createdAt: -1 })
    .lean();

  return (
    <div className="pb-16">

      {/* PAGE HEADER */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#BF9A3A]">
            Content Management
          </p>

          <div className="mt-2 flex items-center gap-3">
            <h1 className="text-[28px] font-semibold tracking-[-0.02em] text-[#142C47] sm:text-[32px]">
              All Blog Posts
            </h1>

            <span className="rounded-full border border-black/[0.08] bg-white px-3 py-1 text-[12px] font-semibold text-[#142C47]">
              {posts.length} {posts.length === 1 ? "Post" : "Posts"}
            </span>
          </div>

          <p className="mt-2 text-[14px] text-[#737373]">
            Create, manage and publish articles for your website.
          </p>
        </div>

        <Link
          href="/admin/blog/new"
          className="inline-flex w-fit items-center gap-2 rounded-xl bg-[#8E0900] px-5 py-3 text-[14px] font-semibold text-white shadow-[0_8px_20px_rgba(142,9,0,0.16)] transition-all hover:bg-[#730700] hover:-translate-y-0.5"
        >
          <PlusIcon className="h-[17px] w-[17px]" />
          New Post
        </Link>
      </div>

      {/* EMPTY STATE */}
      {posts.length === 0 ? (
        <div className="mt-8 rounded-3xl border border-black/[0.08] bg-white px-6 py-16 text-center shadow-[0_10px_40px_rgba(20,20,20,0.04)]">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F5EFE4] text-[#BF9A3A]">
            <DocIcon className="h-7 w-7" />
          </span>

          <h2 className="mt-5 text-[19px] font-semibold text-[#142C47]">
            No blog posts yet
          </h2>

          <p className="mx-auto mt-2 max-w-md text-[14px] leading-6 text-[#737373]">
            Write your first article and it will appear on your website blog.
          </p>

          <Link
            href="/admin/blog/new"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#8E0900] px-5 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-[#730700]"
          >
            <PlusIcon className="h-4 w-4" />
            Create a Post
          </Link>
        </div>
      ) : (
        <div className="mt-8 overflow-hidden rounded-3xl border border-black/[0.08] bg-white shadow-[0_10px_40px_rgba(20,20,20,0.04)]">

          {/* CARD HEADER */}
          <div className="flex flex-col gap-3 border-b border-black/[0.07] bg-[#FAF8F4] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#142C47]">
                Published Content
              </p>

              <p className="mt-1 text-[13px] text-[#858585]">
                Manage your website articles
              </p>
            </div>

            <span className="w-fit rounded-full bg-[#142C47] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.08em] text-white">
              {posts.length} Total
            </span>
          </div>

          {/* MOBILE */}
          <div className="divide-y divide-black/[0.07] lg:hidden">
            {posts.map((post) => (
              <div
                key={String(post._id)}
                className="p-5"
              >
                <div className="flex gap-4">
                  <div className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-xl bg-[#F1ECE2]">
                    {post.coverImage && (
                      <Image
                        src={post.coverImage}
                        alt=""
                        fill
                        sizes="72px"
                        className="object-cover"
                      />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="line-clamp-2 text-[15px] font-semibold leading-5 text-[#142C47]">
                      {post.title}
                    </h3>

                    <p className="mt-1 truncate text-[12px] text-[#969696]">
                      /{post.slug}
                    </p>

                    <p className="mt-1 text-[12px] text-[#777777]">
                      {formatDate(post.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 border-t border-black/[0.07] pt-4">
                  <Link
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    className="rounded-lg border border-black/[0.09] px-3.5 py-2 text-[12px] font-semibold text-[#555] transition-colors hover:border-[#BF9A3A] hover:text-[#BF9A3A]"
                  >
                    View
                  </Link>

                  <Link
                    href={`/admin/blog/${post._id}/edit`}
                    className="rounded-lg border border-black/[0.09] px-3.5 py-2 text-[12px] font-semibold text-[#555] transition-colors hover:border-[#BF9A3A] hover:text-[#BF9A3A]"
                  >
                    Edit
                  </Link>

                  <span className="ml-auto">
                    <DeleteBlogButton id={post._id.toString()} />
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* DESKTOP */}
          <div className="hidden lg:block">
            <table className="w-full">
              <thead>
                <tr className="border-b border-black/[0.07] bg-white">
                  <th className="w-[90px] px-6 py-4 text-left text-[10px] font-bold uppercase tracking-[0.14em] text-[#8A8A8A]">
                    Cover
                  </th>

                  <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-[0.14em] text-[#8A8A8A]">
                    Article
                  </th>

                  <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-[0.14em] text-[#8A8A8A]">
                    Slug
                  </th>

                  <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-[0.14em] text-[#8A8A8A]">
                    Published
                  </th>

                  <th className="px-6 py-4 text-right text-[10px] font-bold uppercase tracking-[0.14em] text-[#8A8A8A]">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-black/[0.07]">
                {posts.map((post) => (
                  <tr
                    key={String(post._id)}
                    className="transition-colors hover:bg-[#FCFAF6]"
                  >
                    <td className="px-6 py-5">
                      <div className="relative h-14 w-14 overflow-hidden rounded-xl bg-[#F1ECE2]">
                        {post.coverImage && (
                          <Image
                            src={post.coverImage}
                            alt=""
                            fill
                            sizes="56px"
                            className="object-cover"
                          />
                        )}
                      </div>
                    </td>

                    <td className="max-w-[340px] px-6 py-5">
                      <Link
                        href={`/admin/blog/${post._id}/edit`}
                        className="line-clamp-2 text-[14px] font-semibold leading-5 text-[#142C47] transition-colors hover:text-[#8E0900]"
                      >
                        {post.title}
                      </Link>
                    </td>

                    <td className="px-6 py-5">
                      <code className="rounded-lg bg-[#F6F4EF] px-2.5 py-1.5 text-[12px] text-[#666]">
                        /{post.slug}
                      </code>
                    </td>

                    <td className="whitespace-nowrap px-6 py-5 text-[13px] text-[#666]">
                      {formatDate(post.createdAt)}
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center justify-end gap-5">
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          title="View on site"
                          className="text-[#8A8A8A] transition-colors hover:text-[#BF9A3A]"
                        >
                          <EyeIcon className="h-[18px] w-[18px]" />
                        </Link>

                        <Link
                          href={`/admin/blog/${post._id}/edit`}
                          className="text-[13px] font-semibold text-[#BF9A3A] transition-colors hover:text-[#8E0900]"
                        >
                          Edit
                        </Link>

                        <DeleteBlogButton id={post._id.toString()} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
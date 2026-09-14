import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { connectDB } from "@/lib/db";
import BlogPost from "@/models/BlogPost";
import Breadcrumbs from "@/components/Breadcrumbs";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  await connectDB();

  const post = await BlogPost.findOne({ slug }).lean();

  if (!post) return {};

  const title = post.metaTitle || `${post.title} - Artics Decorr`;
  const description = post.metaDescription || post.excerpt;

  return {
    title,
    description,
    keywords: post.keywords?.length ? post.keywords : undefined,

    openGraph: {
      title,
      description,
      images: post.coverImage ? [post.coverImage] : undefined,
      type: "article",
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;

  await connectDB();

  const post = await BlogPost.findOne({ slug }).lean();

  if (!post) notFound();

  const formattedDate = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <article className="min-h-screen bg-[#f5f3ee] pb-24">

      {/* Breadcrumb */}
      <Breadcrumbs
        image={post.coverImage || "/products/p16.png"}
        title={post.title}
        items={[
          { label: "Blog", href: "/blog" },
          { label: post.title },
        ]}
      />

      {/* Article Header */}
      <header className="mx-auto w-full max-w-[1180px] px-5 pt-14 sm:px-8 sm:pt-20 lg:px-10 lg:pt-24">
        <div className="mx-auto max-w-[920px] text-center">

          {/* Back to blog */}
          <Link
            href="/blog"
            className="group mb-7 inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.24em] text-[#770800] transition-opacity hover:opacity-70"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">
              ←
            </span>
            Back to Journal
          </Link>

          {/* Date */}
          {formattedDate && (
            <div className="mb-5 text-[10px] uppercase tracking-[0.25em] text-[#132c47]/55">
              {formattedDate}
            </div>
          )}

          {/* Title */}
          <h1 className="font-serif text-4xl font-normal leading-[1.08] tracking-[-0.02em] text-[#132c47] sm:text-5xl lg:text-[64px]">
            {post.title}
          </h1>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="mx-auto mt-7 max-w-[760px] text-sm leading-7 text-[#132c47]/65 sm:text-base sm:leading-8">
              {post.excerpt}
            </p>
          )}

          {/* Decorative line */}
          <div className="mx-auto mt-9 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#770800]/30" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#770800]" />
            <span className="h-px w-10 bg-[#770800]/30" />
          </div>
        </div>
      </header>

      {/* Cover Image */}
      {post.coverImage && (
        <div className="mx-auto mt-12 w-full max-w-[1280px] px-5 sm:mt-16 sm:px-8 lg:px-10">
          <div className="relative aspect-[16/8.5] w-full overflow-hidden bg-[#132c47] shadow-[0_25px_70px_rgba(19,44,71,0.12)]">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 90vw, 1280px"
              className="object-cover"
              priority
            />

            {/* subtle overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#132c47]/15 via-transparent to-transparent" />
          </div>
        </div>
      )}

      {/* Article Content */}
      <div className="mx-auto mt-14 w-full max-w-6xl px-5 sm:mt-20 sm:px-8">

        <div className="relative">

          {/* Left decorative line */}
          <div className="absolute -left-5 top-0 hidden h-full w-px bg-[#770800]/10 xl:block" />

          <div
            className="
              rich-content

              text-[15px]
              leading-8
              text-[#132c47]/75

              sm:text-base
              sm:leading-8

              [&_h2]:mb-5
              [&_h2]:mt-14
              [&_h2]:font-serif
              [&_h2]:text-3xl
              [&_h2]:font-normal
              [&_h2]:leading-tight
              [&_h2]:text-[#132c47]

              [&_h3]:mb-4
              [&_h3]:mt-10
              [&_h3]:font-serif
              [&_h3]:text-2xl
              [&_h3]:font-normal
              [&_h3]:leading-tight
              [&_h3]:text-[#132c47]

              [&_h4]:mb-3
              [&_h4]:mt-8
              [&_h4]:font-serif
              [&_h4]:text-xl
              [&_h4]:text-[#132c47]

              [&_p]:mb-7

              [&_a]:font-medium
              [&_a]:text-[#770800]
              [&_a]:underline
              [&_a]:underline-offset-4
              [&_a]:decoration-[#770800]/30
              [&_a]:transition-colors
              [&_a:hover]:decoration-[#770800]

              [&_strong]:font-semibold
              [&_strong]:text-[#132c47]

              [&_em]:text-[#132c47]/80

              [&_ul]:my-7
              [&_ul]:list-disc
              [&_ul]:space-y-2
              [&_ul]:pl-6

              [&_ol]:my-7
              [&_ol]:list-decimal
              [&_ol]:space-y-2
              [&_ol]:pl-6

              [&_li]:pl-1

              [&_blockquote]:my-10
              [&_blockquote]:border-l-2
              [&_blockquote]:border-[#770800]
              [&_blockquote]:bg-white/50
              [&_blockquote]:px-6
              [&_blockquote]:py-5
              [&_blockquote]:font-serif
              [&_blockquote]:text-xl
              [&_blockquote]:italic
              [&_blockquote]:leading-8
              [&_blockquote]:text-[#132c47]

              [&_img]:my-10
              [&_img]:h-auto
              [&_img]:w-full

              [&_figure]:my-10
              [&_figure]:overflow-hidden

              [&_figcaption]:mt-3
              [&_figcaption]:text-center
              [&_figcaption]:text-xs
              [&_figcaption]:italic
              [&_figcaption]:text-[#132c47]/50

              [&_hr]:my-12
              [&_hr]:border-0
              [&_hr]:border-t
              [&_hr]:border-[#132c47]/10

              [&_table]:my-8
              [&_table]:w-full
              [&_table]:border-collapse

              [&_th]:border
              [&_th]:border-[#132c47]/10
              [&_th]:bg-[#132c47]
              [&_th]:px-4
              [&_th]:py-3
              [&_th]:text-left
              [&_th]:text-sm
              [&_th]:font-medium
              [&_th]:text-white

              [&_td]:border
              [&_td]:border-[#132c47]/10
              [&_td]:px-4
              [&_td]:py-3
            "
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>

        {/* Bottom divider */}
        <div className="mt-16 border-t border-[#132c47]/10 pt-10 sm:mt-20">

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-[#132c47]/45">
                Artics Decorr Journal
              </p>

              <p className="mt-2 font-serif text-lg text-[#132c47]">
                Inspired spaces. Thoughtful living.
              </p>
            </div>

            <Link
              href="/blog"
              className="group inline-flex w-fit items-center gap-3 border border-[#132c47]/15 px-6 py-3 text-[10px] font-medium uppercase tracking-[0.18em] text-[#132c47] transition-all duration-300 hover:border-[#770800] hover:bg-[#770800] hover:text-white"
            >
              View All Articles
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>

          </div>
        </div>
      </div>
    </article>
  );
}
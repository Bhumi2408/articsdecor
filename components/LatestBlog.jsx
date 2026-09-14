

import Link from "next/link";
import Image from "next/image";
import { connectDB } from "@/lib/db";
import BlogPost from "@/models/BlogPost";

const HEADING = "The Art of Outdoor Living";
const SUBHEADING =
  "Discover ideas, inspiration and expert insights for creating beautiful outdoor spaces.";

const LIMIT = 4;

function formatDate(d) {
  if (!d) return "";

  return new Date(d)
    .toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
    .toUpperCase();
}

function truncate(str = "", max = 145) {
  const clean = String(str).replace(/\s+/g, " ").trim();

  return clean.length > max
    ? `${clean.slice(0, max).trimEnd()}…`
    : clean;
}

export default async function LatestBlog() {
  await connectDB();

  const posts = await BlogPost.find()
    .sort({ createdAt: -1 })
    .limit(LIMIT)
    .lean();

  if (!posts.length) return null;

  const featured = posts[0];
  const secondaryPosts = posts.slice(1);

  const featuredCategory =
    featured.category ||
    featured.keywords?.[0] ||
    "Outdoor Living";

  const featuredDate = formatDate(
    featured.publishedAt || featured.createdAt
  );

  return (
    <section className="relative w-full overflow-hidden bg-[#102f2b] py-18 lg:py-20">

      {/* =========================================================
          BACKGROUND DECOR
      ========================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-40
          -top-40
          h-[500px]
          w-[500px]
          rounded-full
          border
          border-[#c9932e]/10
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-20
          -top-20
          h-[300px]
          w-[300px]
          rounded-full
          border
          border-[#c9932e]/10
        "
      />

      <div className="mx-auto max-w-[1800px] px-6 sm:px-8 lg:px-14 xl:px-16">

        {/* =========================================================
            HEADER
        ========================================================== */}

        <div className="mb-14 flex flex-col justify-between gap-8 md:mb-16 lg:flex-row lg:items-end">

          <div className="max-w-[760px]">

            <div className="mb-5 flex items-center gap-4">
              <span className="h-px w-12 bg-[#c9932e]" />

              <span
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.28em]
                  text-[#d9b36a]
                "
              >
                Journal
              </span>
            </div>

            <h2
              className="
                font-serif
                text-[44px]
                font-normal
                leading-[0.92]
                tracking-[-1.5px]
                text-white
                sm:text-[56px]
                md:text-[64px]
                lg:text-[72px]
                xl:text-[82px]
              "
            >
              {HEADING}
            </h2>

          </div>

          <div className="max-w-[390px] lg:pb-2">

            <p
              className="
                text-[14px]
                leading-[1.8]
                text-white/65
                md:text-[15px]
              "
            >
              {SUBHEADING}
            </p>

            <Link
              href="/blog"
              className="
                mt-6
                inline-flex
                items-center
                gap-4
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.2em]
                text-white
                transition-colors
                duration-300
                hover:text-[#d9b36a]
              "
            >
              Explore Journal

              <span
                className="
                  h-px
                  w-10
                  bg-[#c9932e]
                  transition-all
                  duration-300
                  group-hover:w-14
                "
              />
            </Link>

          </div>

        </div>


        {/* =========================================================
            EDITORIAL GRID
        ========================================================== */}

        <div
          className="
            grid
            grid-cols-1
            gap-10
            lg:grid-cols-[1.25fr_0.75fr]
            lg:gap-16
          "
        >

          {/* =====================================================
              FEATURED ARTICLE
          ====================================================== */}

          <Link
            href={`/blog/${featured.slug}`}
            className="group block"
          >

            <article>

              {/* IMAGE */}

              <div
                className="
                  relative
                  aspect-[16/10]
                  w-full
                  overflow-hidden
                  bg-[#183c37]
                  sm:aspect-[16/9]
                "
              >

                {featured.coverImage ? (
                  <Image
                    src={featured.coverImage}
                    alt={featured.title}
                    fill
                    priority
                    sizes="
                      (max-width: 1024px) 100vw,
                      60vw
                    "
                    className="
                      object-cover
                      transition-transform
                      duration-[1200ms]
                      ease-[cubic-bezier(0.16,1,0.3,1)]
                      group-hover:scale-[1.045]
                    "
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-white/40">
                    No image
                  </div>
                )}

                {/* IMAGE DARKEN */}

                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-[#071d1a]/75
                    via-transparent
                    to-transparent
                    opacity-70
                    transition-opacity
                    duration-700
                    group-hover:opacity-90
                  "
                />

                {/* FEATURED LABEL */}

                <div
                  className="
                    absolute
                    left-5
                    top-5
                    border
                    border-white/40
                    bg-[#102f2b]/75
                    px-4
                    py-2
                    backdrop-blur-sm
                  "
                >
                  <span
                    className="
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[0.22em]
                      text-white
                    "
                  >
                    Featured
                  </span>
                </div>

                {/* NUMBER */}

                <span
                  className="
                    absolute
                    bottom-5
                    right-6
                    font-serif
                    text-[70px]
                    leading-none
                    text-white/15
                    sm:text-[90px]
                  "
                >
                  01
                </span>

              </div>


              {/* CONTENT */}

              <div className="mt-7">

                <div className="flex items-center gap-3">

                  <span
                    className="
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[0.22em]
                      text-[#d9b36a]
                    "
                  >
                    {featuredCategory}
                  </span>

                  <span className="h-px w-6 bg-white/20" />

                  {featuredDate && (
                    <span
                      className="
                        text-[9px]
                        uppercase
                        tracking-[0.18em]
                        text-white/45
                      "
                    >
                      {featuredDate}
                    </span>
                  )}

                </div>


                <h3
                  className="
                    mt-4
                    max-w-[850px]
                    font-serif
                    text-[32px]
                    font-normal
                    leading-[1.05]
                    tracking-[-0.5px]
                    text-white
                    transition-colors
                    duration-300
                    group-hover:text-[#d9b36a]
                    sm:text-[40px]
                    md:text-[46px]
                  "
                >
                  {featured.title}
                </h3>


                {featured.excerpt && (
                  <p
                    className="
                      mt-5
                      max-w-[700px]
                      text-[14px]
                      leading-[1.8]
                      text-white/55
                      md:text-[15px]
                    "
                  >
                    {truncate(featured.excerpt, 190)}
                  </p>
                )}


                <div className="mt-7 flex items-center gap-4">

                  <span
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      border
                      border-[#c9932e]
                      text-[#d9b36a]
                      transition-all
                      duration-300
                      group-hover:bg-[#c9932e]
                      group-hover:text-white
                    "
                  >
                    →
                  </span>

                  <span
                    className="
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.2em]
                      text-white
                    "
                  >
                    Read Article
                  </span>

                </div>

              </div>

            </article>

          </Link>


          {/* =====================================================
              SECONDARY ARTICLES
          ====================================================== */}

          <div className="flex flex-col">

            {secondaryPosts.map((post, index) => {

              const category =
                post.category ||
                post.keywords?.[0] ||
                "Outdoor Living";

              const date = formatDate(
                post.publishedAt || post.createdAt
              );

              const number = String(index + 2).padStart(2, "0");

              return (
                <Link
                  key={String(post._id)}
                  href={`/blog/${post.slug}`}
                  className="group block"
                >

                  <article
                    className="
                      border-t
                      border-white/15
                      py-7
                      first:border-t-0
                      lg:py-8
                    "
                  >

                    <div
                      className="
                        grid
                        grid-cols-[120px_1fr]
                        gap-5
                        sm:grid-cols-[150px_1fr]
                        sm:gap-7
                      "
                    >

                      {/* THUMBNAIL */}

                      <div
                        className="
                          relative
                          aspect-[1/1]
                          overflow-hidden
                          bg-[#183c37]
                        "
                      >

                        {post.coverImage ? (
                          <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            sizes="150px"
                            className="
                              object-cover
                              transition-transform
                              duration-700
                              ease-out
                              group-hover:scale-[1.08]
                            "
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-xs text-white/30">
                            No image
                          </div>
                        )}

                      </div>


                      {/* CONTENT */}

                      <div className="flex min-w-0 flex-col">

                        <div className="flex items-center gap-3">

                          <span
                            className="
                              font-serif
                              text-[20px]
                              text-[#c9932e]
                            "
                          >
                            {number}
                          </span>

                          <span className="h-px w-5 bg-white/20" />

                          <span
                            className="
                              truncate
                              text-[8px]
                              font-semibold
                              uppercase
                              tracking-[0.18em]
                              text-white/45
                            "
                          >
                            {category}
                          </span>

                        </div>


                        <h3
                          className="
                            mt-3
                            text-[18px]
                            font-medium
                            leading-[1.25]
                            text-white
                            transition-colors
                            duration-300
                            group-hover:text-[#d9b36a]
                            sm:text-[21px]
                          "
                        >
                          {post.title}
                        </h3>


                        {post.excerpt && (
                          <p
                            className="
                              mt-3
                              line-clamp-2
                              text-[12px]
                              leading-[1.65]
                              text-white/45
                              sm:text-[13px]
                            "
                          >
                            {truncate(post.excerpt, 100)}
                          </p>
                        )}


                        <div className="mt-auto pt-4">

                          <span
                            className="
                              text-[9px]
                              font-semibold
                              uppercase
                              tracking-[0.2em]
                              text-[#d9b36a]
                            "
                          >
                            {date}
                          </span>

                        </div>

                      </div>

                    </div>

                  </article>

                </Link>
              );
            })}

          </div>

        </div>


        {/* =========================================================
            BOTTOM CTA
        ========================================================== */}

        <div
          className="
            mt-14
            flex
            items-center
            justify-between
            border-t
            border-white/15
            pt-7
            md:mt-16
          "
        >

          <span
            className="
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.25em]
              text-white/35
            "
          >
            Artics Decorr Journal
          </span>

          <Link
            href="/blog"
            className="
              group
              flex
              items-center
              gap-5
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.2em]
              text-white
              transition-colors
              duration-300
              hover:text-[#d9b36a]
            "
          >
            View All Stories

            <span
              className="
                text-[18px]
                leading-none
                transition-transform
                duration-300
                group-hover:translate-x-2
              "
            >
              →
            </span>
          </Link>

        </div>

      </div>
    </section>
  );
}
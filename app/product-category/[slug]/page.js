import { notFound } from "next/navigation";
import Image from "next/image";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import Category from "@/models/Category";
import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/Pagination";
import SortSelect from "@/components/SortSelect";
import { getWishlistIds } from "@/lib/wishlist";
import { toPlain } from "@/lib/serialize";
import Link from "next/link";

const SORT_MAP = {
  "price-asc": { price: 1 },
  "price-desc": { price: -1 },
  rating: { ratingAvg: -1 },
  latest: { createdAt: -1 },
  default: { createdAt: -1 },
};

export async function generateMetadata({ params }) {
  const { slug } = await params;

  await connectDB();

  const category = await Category.findOne({ slug }).lean();

  if (!category) return {};

  return {
    title: category.metaTitle || `${category.name} | Artics Decorr`,
    description:
      category.metaDescription ||
      category.description ||
      undefined,
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}) {
  const { slug } = await params;
  const sp = await searchParams;

  const page = Math.max(
    1,
    parseInt(sp.page || "1", 10)
  );

  const limit = 15;
  const sort = sp.sort || "default";

  await connectDB();

  const category = await Category.findOne({
    slug,
  }).lean();

  if (!category) notFound();

  const query = {
  category: category._id,
  hiddenFromStore: { $ne: true },
};

  const [rawItems, total] = await Promise.all([
    Product.find(query)
      .populate("category", "name slug")
      .sort(SORT_MAP[sort] || SORT_MAP.default)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),

    Product.countDocuments(query),
  ]);

  const items = toPlain(rawItems);

  const wishlistIds = await getWishlistIds();

  const pages = Math.max(
    1,
    Math.ceil(total / limit)
  );

  function buildHref(p) {
    const params = new URLSearchParams(sp);

    params.set("page", String(p));

    return `/product-category/${slug}?${params.toString()}`;
  }

  return (
    <main className="min-h-screen bg-[#f5f3ee] text-[#132c47]">

    <section className="relative overflow-hidden">
  <div className="relative py-60">
    <Image
      src={category.image || "/products/p5.png"}
      alt={category.name}
      fill
      priority
      className="object-cover"
      sizes="100vw"
    />

    {/* overlay */}
    <div className="absolute inset-0 bg-[#132c47]/70" />

    <div className="absolute inset-0 flex items-center">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="max-w-[850px]">
          {/* breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/60">
            <Link
              href="/"
              className="transition-colors hover:text-white"
            >
              Home
            </Link>

            <span>/</span>

            <Link
              href="/products"
              className="transition-colors hover:text-white"
            >
              Products
            </Link>

            <span>/</span>

            <span className="text-white/90">
              {category.name}
            </span>
          </div>

          {/* title */}
          <h1 className="font-serif text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
            {category.name}
          </h1>

          {/* description */}
          {category.description && (
            <p className="mt-5 max-w-[720px] text-sm leading-7 text-white/80 sm:text-base">
              {category.description}
            </p>
          )}
        </div>
      </div>
    </div>
  </div>
</section>

   

      {/* =====================================================
          PRODUCTS HEADER
      ===================================================== */}
      <section className="mx-auto w-full max-w-[1400px] px-5 pb-7 pt-16 sm:px-8 sm:pt-20 lg:px-12">

        <div className="flex flex-col gap-7 border-b border-[#132c47]/10 pb-7 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <div className="mb-4 flex items-center gap-4">
              <span className="h-px w-9 bg-[#770800]" />

              <span className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#132c47]/40">
                Explore Collection
              </span>
            </div>

            <h2 className="font-serif text-3xl text-[#132c47] sm:text-4xl">
              Discover our{" "}
              <span className="italic text-[#770800]">
                pieces.
              </span>
            </h2>
          </div>

          <div className="flex items-center justify-between gap-6 sm:justify-end">

            <p className="text-[10px] uppercase tracking-[0.2em] text-[#132c47]/40">
              {total < 10 ? `0${total}` : total}{" "}
              {total === 1 ? "Product" : "Products"}
            </p>

            <div className="border-l border-[#132c47]/10 pl-5">
              <SortSelect />
            </div>

          </div>
        </div>

      </section>

      {/* =====================================================
          PRODUCT GRID
      ===================================================== */}
      {items.length === 0 ? (

        <section className="mx-auto w-full max-w-[1400px] px-5 pb-24 sm:px-8 lg:px-12">

          <div className="relative overflow-hidden border border-[#132c47]/10 bg-white px-6 py-24 text-center">

            <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full border border-[#770800]/10" />

            <div className="pointer-events-none absolute -bottom-28 -left-20 h-64 w-64 rounded-full border border-[#132c47]/[0.05]" />

            <div className="relative">

              <div className="mx-auto mb-7 flex h-16 w-16 items-center justify-center rounded-full bg-[#132c47] text-[#d2bb8a]">
                <span className="text-xl">✦</span>
              </div>

              <p className="mb-3 text-[9px] font-semibold uppercase tracking-[0.3em] text-[#770800]">
                Coming Soon
              </p>

              <h2 className="font-serif text-3xl text-[#132c47] sm:text-4xl">
                Nothing here
                <br />
                <span className="italic">
                  just yet.
                </span>
              </h2>

              <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-[#132c47]/45">
                We are continually adding new pieces to our
                collection. Check back soon to discover more.
              </p>

              <Link
                href="/shop"
                className="mt-8 inline-flex items-center gap-4 bg-[#770800] px-8 py-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#f5f3ee] transition-all duration-300 hover:bg-[#132c47]"
              >
                Explore All Products
                <span className="text-base">→</span>
              </Link>

            </div>
          </div>

        </section>

      ) : (

        <section className="mx-auto w-full max-w-[1400px] px-5 pb-24 sm:px-8 lg:px-12">

          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-14 lg:grid-cols-3 lg:gap-x-8">

            {items.map((p) => (
              <ProductCard
                key={p._id}
                product={p}
                initialWishlisted={wishlistIds.includes(
                  p._id.toString()
                )}
              />
            ))}

          </div>

        </section>

      )}

      {/* =====================================================
          PAGINATION
      ===================================================== */}
      {items.length > 0 && pages > 1 && (
        <section className="mx-auto w-full max-w-[1400px] px-5 pb-20 sm:px-8 lg:px-12">
          <div className="border-t border-[#132c47]/10 pt-8">
            <Pagination
              page={page}
              pages={pages}
              buildHref={buildHref}
            />
          </div>
        </section>
      )}

    </main>
  );
}
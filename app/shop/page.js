// app/shop/page.jsx

import Link from "next/link";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import Category from "@/models/Category";
import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/Pagination";
import Breadcrumbs from "@/components/Breadcrumbs";
import SortSelect from "@/components/SortSelect";
import ShopSearchBar from "@/components/ShopSearchBar";
import PriceFilter from "@/components/PriceFilter";
import MobileFilterDrawer from "@/components/MobileFilterDrawer";
import { getWishlistIds } from "@/lib/wishlist";
import { toPlain } from "@/lib/serialize";
import { formatINR } from "@/lib/format";

export const metadata = {
  title: "Shop - Artics Decorr",
};

const SORT_MAP = {
  "price-asc": { price: 1 },
  "price-desc": { price: -1 },
  rating: { ratingAvg: -1 },
  latest: { createdAt: -1 },
  default: { createdAt: -1 },
};

const escapeRegex = (s) =>
  s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export default async function ShopPage({ searchParams }) {
  const sp = await searchParams;

  const page = Math.max(
    1,
    parseInt(sp.page || "1", 10)
  );

  const limit = Math.min(
    60,
    Math.max(1, parseInt(sp.show || "16", 10) || 16)
  );

  const sort = sp.sort || "default";
  const term = (sp.search || sp.q || "").trim();

  await connectDB();

  const query = {
  hiddenFromStore: { $ne: true },
};

  if (sp.category) {
    query.category = sp.category;
  }

  if (term) {
    const rx = {
      $regex: escapeRegex(term),
      $options: "i",
    };

    query.$or = [
      { name: rx },
      { description: rx },
    ];
  }

  if (sp.minPrice || sp.maxPrice) {
    query.price = {};

    if (sp.minPrice) {
      query.price.$gte = Number(sp.minPrice);
    }

    if (sp.maxPrice) {
      query.price.$lte = Number(sp.maxPrice);
    }
  }

  const [
    rawItems,
    total,
    categories,
    recentRaw,
  ] = await Promise.all([
    Product.find(query)
      .populate("category", "name slug")
      .sort(SORT_MAP[sort] || SORT_MAP.default)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),

    Product.countDocuments(query),

    Category.find()
      .sort({ name: 1 })
      .lean(),

    Product.find({
  hiddenFromStore: { $ne: true },
})
  .sort({ createdAt: -1 })
  .limit(3)
  .lean()
  ]);

  const items = toPlain(rawItems);
  const recentProducts = toPlain(recentRaw);

  const categoryCounts = await Promise.all(
    categories.map((c) =>
      Product.countDocuments({
  category: c._id,
  hiddenFromStore: { $ne: true },
})
    )
  );

  const wishlistIds = await getWishlistIds();

  const pages = Math.max(
    1,
    Math.ceil(total / limit)
  );

  const start =
    total === 0
      ? 0
      : (page - 1) * limit + 1;

  const end = Math.min(
    page * limit,
    total
  );

  const activeCategory = categories.find(
    (c) =>
      c._id.toString() === sp.category
  );

  const hasPrice = Boolean(
    sp.minPrice || sp.maxPrice
  );

  const activeCount = [
    Boolean(sp.category),
    hasPrice,
  ].filter(Boolean).length;

  function buildHref(p) {
    const params = new URLSearchParams(sp);
    params.set("page", String(p));

    return `/shop?${params.toString()}`;
  }

  function hrefWithout(...keys) {
    const params = new URLSearchParams(sp);

    keys.forEach((key) => {
      params.delete(key);
    });

    params.delete("page");

    const qs = params.toString();

    return qs
      ? `/shop?${qs}`
      : "/shop";
  }

  /* ============================================================
     CATEGORY LIST
  ============================================================ */

  const CategoriesBlock = ({ mobile = false }) => (
    <div>
      <div className="mb-6 flex items-end justify-between">
        <div>
          <span className="mb-2 block text-[9px] font-bold uppercase tracking-[0.28em] text-[#770800]">
            Browse
          </span>

          <h3 className="font-serif text-[23px] leading-none text-[#132c47]">
            Categories
          </h3>
        </div>

        <span className="text-[10px] uppercase tracking-[0.12em] text-[#87909a]">
          {categories.length} types
        </span>
      </div>

      <ul className="space-y-1">
        {sp.category && mobile && (
          <li>
            <Link
              href={hrefWithout("category")}
              className="group flex items-center justify-between border-b border-[#132c47]/10 py-3.5"
            >
              <span className="text-[13px] font-medium text-[#132c47]">
                All Products
              </span>

              <span className="text-[#770800] transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </li>
        )}

        {categories.map((category, index) => {
          const active =
            sp.category === category._id.toString();

          return (
            <li key={category._id.toString()}>
              <Link
                href={
                  active
                    ? hrefWithout("category")
                    : `/shop?category=${category._id}`
                }
                className={`
                  group relative flex items-center justify-between
                  border-b border-[#132c47]/10
                  py-3.5
                  transition-all duration-300
                  ${
                    active
                      ? "pl-3 text-[#132c47]"
                      : "text-[#66717c] hover:pl-3 hover:text-[#132c47]"
                  }
                `}
              >
                <span
                  className={`
                    absolute left-0 top-1/2 h-5 w-[2px]
                    -translate-y-1/2
                    bg-[#770800]
                    transition-all duration-300
                    ${
                      active
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    }
                  `}
                />

                <span className="text-[13px] font-medium">
                  {category.name}
                </span>

                <span
                  className={`
                    min-w-[26px] text-right text-[10px]
                    tabular-nums
                    ${
                      active
                        ? "text-[#770800]"
                        : "text-[#9ba2a8]"
                    }
                  `}
                >
                  {categoryCounts[index]}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );

  /* ============================================================
     PRICE
  ============================================================ */

  const PriceBlock = () => (
    <div>
      <div className="mb-6">
        <span className="mb-2 block text-[9px] font-bold uppercase tracking-[0.28em] text-[#770800]">
          Refine
        </span>

        <h3 className="font-serif text-[23px] leading-none text-[#132c47]">
          Price Range
        </h3>
      </div>

      <PriceFilter
        defaultMin={sp.minPrice}
        defaultMax={sp.maxPrice}
        category={sp.category}
      />
    </div>
  );

  return (
    <main className="min-h-screen bg-[#f5f3ee]">

      {/* ============================================================
          HERO
      ============================================================ */}

      <Breadcrumbs
        title="Shop"
        image="/products/p20.png"
        items={[
          {
            label: "Shop",
          },
        ]}
      />



      {/* ============================================================
          MOBILE CONTROLS
      ============================================================ */}

      <div className="mx-auto max-w-[1480px] px-5 pb-2 py-10 sm:px-8 lg:hidden">

        <ShopSearchBar defaultValue={term} />

        <div className="mt-3 grid grid-cols-2 gap-3">

          <MobileFilterDrawer
            activeCount={activeCount}
          >
            <div className="space-y-12">
              <CategoriesBlock mobile />
              <PriceBlock />
            </div>
          </MobileFilterDrawer>

          <SortSelect />

        </div>
      </div>

      {/* ============================================================
          SHOP CONTENT
      ============================================================ */}

      <section className="mx-auto max-w-[1480px] px-5 py-8 sm:px-8 md:py-12 lg:px-12 lg:py-16">

        <div className="grid gap-12 lg:grid-cols-[270px_minmax(0,1fr)] xl:gap-16">

          {/* ========================================================
              SIDEBAR
          ======================================================== */}

          <aside className="hidden lg:block">

            <div className="sticky top-[105px]">

              {/* SEARCH */}
              <div className="mb-8 rounded-[4px] bg-[#132c47] p-5">

                <p className="mb-3 text-[9px] font-bold uppercase tracking-[0.25em] text-white">
                  Find something
                </p>

                <ShopSearchBar defaultValue={term} />

              </div>

              {/* CATEGORIES */}
              <div className="border-t border-[#132c47]/10 pt-7">
                <CategoriesBlock />
              </div>

              {/* PRICE */}
              <div className="mt-8 border-t border-[#132c47]/10 pt-8">
                <PriceBlock />
              </div>

              {/* RECENT */}
              {recentProducts.length > 0 && (
                <div className="mt-8 border-t border-[#132c47]/10 pt-8">

                  <div className="mb-5">
                    <span className="mb-2 block text-[9px] font-bold uppercase tracking-[0.25em] text-[#770800]">
                      Fresh arrivals
                    </span>

                    <h3 className="font-serif text-[22px] text-[#132c47]">
                      Recently Added
                    </h3>
                  </div>

                  <div className="space-y-5">

                    {recentProducts.map((product) => (
                      <Link
                        key={product._id}
                        href={`/product/${product.slug}`}
                        className="group flex gap-3"
                      >

                        <div className="h-[68px] w-[68px] shrink-0 overflow-hidden bg-[#e9e3d8]">
                          {product.images?.[0] && (
                            <img
                              src={product.images[0]}
                              alt={product.imageAlt || product.name}
                              className="
                                h-full w-full object-cover
                                transition-transform duration-700
                                group-hover:scale-110
                              "
                            />
                          )}
                        </div>

                        <div className="min-w-0 pt-1">
                          <p className="
                            line-clamp-2
                            text-[12px]
                            font-medium
                            leading-[1.45]
                            text-[#132c47]
                            transition-colors
                            group-hover:text-[#770800]
                          ">
                            {product.name}
                          </p>

                          <p className="mt-1 text-[12px] font-semibold text-[#737d86]">
                            {formatINR(product.price)}
                          </p>
                        </div>

                      </Link>
                    ))}

                  </div>
                </div>
              )}

            </div>
          </aside>

          {/* ========================================================
              PRODUCTS
          ======================================================== */}

          <div className="min-w-0">

            {/* TOOLBAR */}
            <div className="mb-8">

              <div className="
                flex flex-col gap-5
                border-b border-[#132c47]/15
                pb-6
                sm:flex-row
                sm:items-end
                sm:justify-between
              ">

                <div>

                  <div className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#770800]" />

                    <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#770800]">
                      Collection
                    </p>
                  </div>

                  <p className="mt-2 text-[13px] text-[#737d86]">
                    {term
                      ? `Showing results for “${term}”`
                      : `${start}–${end} of ${total} pieces`}
                  </p>

                </div>

                <div className="hidden md:block">
                  <SortSelect />
                </div>

              </div>

              {/* ACTIVE FILTERS */}
              {(activeCount > 0 || term) && (
                <div className="mt-5 flex flex-wrap items-center gap-2">

                  {term && (
                    <Chip
                      href={hrefWithout("search", "q")}
                    >
                      Search: {term}
                    </Chip>
                  )}

                  {activeCategory && (
                    <Chip
                      href={hrefWithout("category")}
                    >
                      {activeCategory.name}
                    </Chip>
                  )}

                  {hasPrice && (
                    <Chip
                      href={hrefWithout("minPrice", "maxPrice")}
                    >
                      {sp.minPrice
                        ? formatINR(Number(sp.minPrice))
                        : "Min"}{" "}
                      —{" "}
                      {sp.maxPrice
                        ? formatINR(Number(sp.maxPrice))
                        : "Max"}
                    </Chip>
                  )}

                  <Link
                    href="/shop"
                    className="
                      ml-1 text-[9px] font-bold uppercase
                      tracking-[0.18em] text-[#737d86]
                      underline underline-offset-4
                      transition-colors hover:text-[#770800]
                    "
                  >
                    Clear all
                  </Link>

                </div>
              )}

            </div>

            {/* ======================================================
                EMPTY
            ====================================================== */}

            {items.length === 0 ? (

              <div className="
                flex min-h-[460px]
                items-center justify-center
                border border-[#132c47]/10
                bg-[#fffdfa]
                px-6 text-center
              ">

                <div>

                  <span className="
                    mx-auto flex h-14 w-14
                    items-center justify-center
                    rounded-full
                    bg-[#132c47]
                    font-serif text-xl
                    text-[#d6ae7d]
                  ">
                    —
                  </span>

                  <p className="
                    mt-6 text-[9px] font-bold
                    uppercase tracking-[0.28em]
                    text-[#770800]
                  ">
                    Collection
                  </p>

                  <h2 className="
                    mt-3 font-serif text-3xl
                    text-[#132c47]
                  ">
                    Nothing found
                  </h2>

                  <p className="
                    mx-auto mt-3 max-w-[380px]
                    text-[13px] leading-7
                    text-[#737d86]
                  ">
                    We couldn't find products matching
                    your current selection.
                  </p>

                  {(activeCount > 0 || term) && (
                    <Link
                      href="/shop"
                      className="
                        mt-7 inline-flex
                        bg-[#132c47]
                        px-7 py-3.5
                        text-[9px] font-bold
                        uppercase tracking-[0.2em]
                        text-white
                        transition-all duration-300
                        hover:bg-[#770800]
                      "
                    >
                      View all products
                    </Link>
                  )}

                </div>

              </div>

            ) : (

              /* ====================================================
                 PRODUCT GRID
              ==================================================== */

              <div className="
                grid grid-cols-1
                gap-x-7 gap-y-14
                sm:grid-cols-2
                xl:grid-cols-3
              ">

                {items.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    initialWishlisted={wishlistIds.includes(
                      product._id.toString()
                    )}
                  />
                ))}

              </div>

            )}

            {/* ======================================================
                PAGINATION
            ====================================================== */}

            <div className="
              mt-16 border-t
              border-[#132c47]/10
              pt-8
            ">
              <Pagination
                page={page}
                pages={pages}
                buildHref={buildHref}
              />
            </div>

          </div>

        </div>
      </section>

    </main>
  );
}

/* ================================================================
   FILTER CHIP
================================================================ */

function Chip({ href, children }) {
  return (
    <Link
      href={href}
      className="
        inline-flex items-center
        border border-[#132c47]/15
        bg-white
        px-3.5 py-2
        text-[9px]
        font-bold uppercase
        tracking-[0.13em]
        text-[#132c47]
        transition-all duration-300
        hover:border-[#770800]
        hover:text-[#770800]
      "
    >
      {children}

      <span className="ml-2 text-[11px] text-[#9aa0a5]">
        ×
      </span>
    </Link>
  );
}

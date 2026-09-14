import { notFound } from "next/navigation";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import Review from "@/models/Review";
import ProductCard from "@/components/ProductCard";
import ProductGallery from "@/components/ProductGallery";
import AddToCartBox from "@/components/AddToCartBox";
import SpecsTable from "@/components/SpecsTable";
import StarRating from "@/components/StarRating";
import Breadcrumbs from "@/components/Breadcrumbs";
import ReviewSection from "@/components/ReviewSection";
import { getCurrentUser } from "@/lib/auth";
import { formatINR } from "@/lib/format";
import { getWishlistIds } from "@/lib/wishlist";
import { toPlain } from "@/lib/serialize";

const SHELL =
  "mx-auto max-w-[1480px] px-5 sm:px-8 lg:px-12";

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.3,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

const TruckIcon = (p) => (
  <svg {...iconProps} {...p}>
    <path d="M3 7.5h11v9H3zM14 11h4l3 3v2.5h-7z" />
    <circle cx="7" cy="17.5" r="1.6" />
    <circle cx="17" cy="17.5" r="1.6" />
  </svg>
);

const CardIcon = (p) => (
  <svg {...iconProps} {...p}>
    <rect x="3" y="6" width="18" height="12" rx="2" />
    <path d="M3 10h18M6.5 14.5h3" />
  </svg>
);

const ShieldIcon = (p) => (
  <svg {...iconProps} {...p}>
    <path d="M12 3.5 19 6v5.5c0 4.3-3 7.3-7 9-4-1.7-7-4.7-7-9V6z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const TRUST = [
  {
    Icon: TruckIcon,
    title: "Pan-India delivery",
    sub: "Crated & insured",
  },
  {
    Icon: CardIcon,
    title: "Secure payments",
    sub: "UPI, cards, netbanking",
  },
  {
    Icon: ShieldIcon,
    title: "Built to last",
    sub: "Weatherproof materials",
  },
];

function stripHtml(html) {
  return (html || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  await connectDB();

  const product = await Product.findOne({ slug }).lean();

  if (!product) return {};

  const title =
    product.metaTitle ||
    `${product.name} | Artics Decorr`;

  const description =
    product.metaDescription ||
    stripHtml(product.description).slice(0, 160);

  return {
    title,
    description,
    keywords: product.keywords?.length
      ? product.keywords
      : undefined,

  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;

  await connectDB();

  const session = await getCurrentUser();

  const rawProduct = await Product.findOne({ slug })
    .populate("category", "name slug")
    .lean();

  if (!rawProduct) notFound();

  const [rawRelated, rawReviews, wishlistIds] = await Promise.all([
  Product.find({
    category: rawProduct.category?._id,
    _id: { $ne: rawProduct._id },
    hiddenFromStore: { $ne: true },   // 👈 add kiya
  })
    .limit(4)
    .lean(),

      Review.find({
        product: rawProduct._id,
      })
        .sort({ createdAt: -1 })
        .lean(),

      getWishlistIds(),
    ]);

  const product = toPlain(rawProduct);
  const related = toPlain(rawRelated);
  const reviews = toPlain(rawReviews);

  const onSale =
    product.compareAtPrice > product.price;

  const discount = onSale
    ? Math.round(
      ((product.compareAtPrice - product.price) /
        product.compareAtPrice) *
      100
    )
    : 0;

  const inStock = product.stock > 0;
  const lowStock =
    inStock && product.stock <= 5;

  const eyebrow =
    product.collectionTag ||
    product.category?.name;

  const specCount = Array.isArray(product.specs)
    ? product.specs.length
    : 0;

  return (
    <main className="min-h-screen bg-[#f5f3ee]">

      {/* =====================================================
          BREADCRUMBS
      ===================================================== */}
      <Breadcrumbs
        title={product.name}
        image={product.images?.[0]}
        items={[
          {
            label: "Shop",
            href: "/shop",
          },

          ...(product.category?.name
            ? [
              {
                label: product.category.name,
                href: `/shop?category=${product.category._id}`,
              },
            ]
            : []),

          {
            label: product.name,
          },
        ]}
      />

      {/* =====================================================
          PRODUCT HERO
      ===================================================== */}
      <section
        className={`${SHELL} pb-16 pt-7 lg:pb-20 lg:pt-9`}
      >
        <div
          className="
            grid
            items-start
            gap-10
            lg:grid-cols-[minmax(0,1fr)_520px]
            lg:gap-12
            xl:grid-cols-[minmax(0,1fr)_560px]
            xl:gap-16
          "
        >

          {/* GALLERY */}
          <div className="min-w-0">
            <ProductGallery
              images={product.images}
              name={product.name}
              primaryImageAlt={product.imageAlt}
            />
          </div>

          {/* PRODUCT INFORMATION */}
          <div
            className="
              min-w-0
              rounded-[4px]
              border
              border-[#132c47]/10
              bg-[#fffdfa]
              px-6
              py-7
              sm:px-8
              sm:py-9
              lg:sticky
              lg:top-[105px]
            "
          >

            {/* CATEGORY */}
            {eyebrow && (
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-8 bg-[#770800]" />

                <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#770800]">
                  {eyebrow}
                </span>
              </div>
            )}

            {/* TITLE */}
            <h1
              className="
                max-w-[520px]
                font-serif
                text-[34px]
                leading-[1.08]
                tracking-[-0.025em]
                text-[#132c47]
                sm:text-[40px]
                xl:text-[44px]
              "
            >
              {product.name}
            </h1>

            {/* RATING */}
            <div className="mt-5 flex flex-wrap items-center gap-4">
              <StarRating
                value={product.ratingAvg}
                count={product.ratingCount}
              />

              <span className="h-4 w-px bg-[#132c47]/15" />

              <span className="inline-flex items-center gap-2 text-[11px] font-medium text-[#66717c]">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${inStock
                      ? "bg-[#3f7a52]"
                      : "bg-[#770800]"
                    }`}
                />

                {inStock
                  ? lowStock
                    ? `Only ${product.stock} left`
                    : "In stock"
                  : "Out of stock"}
              </span>
            </div>

            <div className="my-7 h-px bg-[#132c47]/10" />

            {/* PRICE */}
            <div>
              <div className="flex flex-wrap items-end gap-x-4 gap-y-2">
                <span
                  className="
                    font-serif
                    text-[40px]
                    leading-none
                    tracking-[-0.02em]
                    text-[#132c47]
                    sm:text-[44px]
                  "
                >
                  {formatINR(product.price)}
                </span>

                {onSale && (
                  <>
                    <span className="pb-1 text-[16px] text-[#9aa0a5] line-through">
                      {formatINR(
                        product.compareAtPrice
                      )}
                    </span>

                    <span
                      className="
                        mb-1
                        rounded-full
                        bg-[#770800]
                        px-3
                        py-1.5
                        text-[9px]
                        font-bold
                        uppercase
                        tracking-[0.15em]
                        text-white
                      "
                    >
                      Save {discount}%
                    </span>
                  </>
                )}
              </div>

              <p className="mt-3 text-[11px] text-[#737d86]">
                Inclusive of GST
                <span className="mx-2 text-[#132c47]/20">
                  •
                </span>
                Delivery calculated at checkout
              </p>
            </div>

            {/* CART */}
            <div className="mt-8">
              <AddToCartBox
                product={product}
                initialWishlisted={wishlistIds.includes(
                  product._id.toString()
                )}
              />
            </div>

            {/* TRUST */}
            <div className="mt-8 border-t border-[#132c47]/10 pt-7">
              <div className="grid grid-cols-3">
                {TRUST.map(
                  ({ Icon, title, sub }, index) => (
                    <div
                      key={title}
                      className={`
                        px-3 text-center
                        ${index !== 0
                          ? "border-l border-[#132c47]/10"
                          : ""
                        }
                      `}
                    >
                      <Icon className="mx-auto h-5 w-5 text-[#770800]" />

                      <p className="mt-3 text-[10.5px] font-semibold leading-tight text-[#132c47]">
                        {title}
                      </p>

                      <p className="mt-1.5 text-[9.5px] leading-tight text-[#858c92]">
                        {sub}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* CATEGORY */}
            {product.category?.name && (
              <div className="mt-7 border-t border-[#132c47]/10 pt-5">
                <p className="text-[10.5px] text-[#7a838a]">
                  Category

                  <span className="mx-2 text-[#132c47]/20">
                    /
                  </span>

                  <a
                    href={`/shop?category=${product.category._id}`}
                    className="
                      font-medium
                      text-[#132c47]
                      underline
                      decoration-[#770800]
                      underline-offset-4
                      transition-colors
                      hover:text-[#770800]
                    "
                  >
                    {product.category.name}
                  </a>
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =====================================================
          DESCRIPTION + SPECIFICATIONS
      ===================================================== */}
      {(product.description || specCount > 0) && (
        <section className="border-y border-[#132c47]/10 bg-[#fffdfa]">
          <div
            className={`${SHELL} py-14 lg:py-20`}
          >
            <div
              className="
                grid
                items-start
                gap-12
                lg:grid-cols-[minmax(0,1fr)_440px]
                lg:gap-16
                xl:grid-cols-[minmax(0,1fr)_460px]
                xl:gap-20
              "
            >

              {/* DESCRIPTION */}
              {product.description && (
                <div className="min-w-0">

                  <div className="mb-7 flex items-center gap-3">
                    <span className="h-px w-8 bg-[#770800]" />

                    <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#770800]">
                      The details
                    </span>
                  </div>

                  <h2
                    className="
                      font-serif
                      text-[32px]
                      leading-[1.08]
                      tracking-[-0.025em]
                      text-[#132c47]
                      sm:text-[40px]
                    "
                  >
                    Everything you need
                    <br />
                    to know.
                  </h2>

                  {/* DESCRIPTION SCROLL */}
                  <div className="product-description-scroll mt-8 max-h-[620px] overflow-y-auto pr-5">
                    <div
                      className="
                        product-description
                        max-w-[780px]
                        pb-6
                      "
                      dangerouslySetInnerHTML={{
                        __html:
                          product.description,
                      }}
                    />
                  </div>
                </div>
              )}

              {/* SPECIFICATIONS */}
              {specCount > 0 && (
                <aside
                  className="
                    min-w-0
                    lg:sticky
                    lg:top-[105px]
                    lg:self-start
                  "
                >
                  <div className="mb-6">
                    <span className="mb-2 block text-[9px] font-bold uppercase tracking-[0.28em] text-[#770800]">
                      Product information
                    </span>

                    <div className="flex items-end justify-between gap-5">
                      <h2 className="font-serif text-[29px] leading-none text-[#132c47]">
                        Specifications
                      </h2>

                      <span className="text-[9px] uppercase tracking-[0.16em] text-[#92989d]">
                        {specCount} details
                      </span>
                    </div>
                  </div>

                  <div className="overflow-hidden border border-[#132c47]/10 bg-white">
                    <SpecsTable
                      specs={product.specs}
                    />
                  </div>

                  <p className="mt-4 text-[10px] leading-5 text-[#858c92]">
                    Product specifications may vary
                    slightly depending on the finish
                    and material selected.
                  </p>
                </aside>
              )}
            </div>
          </div>
        </section>
      )}

      {/* =====================================================
    REVIEWS
===================================================== */}
      <section className="review-section">
        <div className={`${SHELL} review-section-shell`}>

          {/* HEADER */}
          <div className="review-heading">
            <div>
              <div className="review-eyebrow">
                <span />
                CUSTOMER FEEDBACK
              </div>

              <h2>What people are saying</h2>

              <p className="review-subtitle">
                Real stories from our customers who have brought our pieces
                into their spaces.
              </p>
            </div>

            <div className="review-heading-right">
              <span>Thoughtful design.</span>
              <span>Timeless spaces.</span>
              <i />
            </div>
          </div>

          {/* REVIEW COMPONENT — ONLY ONCE */}
          <div className="review-section-card">
            <ReviewSection
              productId={product._id.toString()}
              reviews={reviews}
              currentUserId={session?.sub ? String(session.sub) : null}
            />
          </div>

        </div>
      </section>

      {/* =====================================================
          RELATED PRODUCTS
      ===================================================== */}
      {related.length > 0 && (
        <section className="border-t border-[#132c47]/10 bg-[#fffdfa]">
          <div
            className={`${SHELL} py-16 lg:py-24`}
          >
            <div
              className="
                mb-10
                flex
                items-end
                justify-between
                gap-6
              "
            >
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <span className="h-px w-8 bg-[#770800]" />

                  <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#770800]">
                    Continue exploring
                  </span>
                </div>

                <h2
                  className="
                    font-serif
                    text-[34px]
                    leading-none
                    tracking-[-0.025em]
                    text-[#132c47]
                    sm:text-[42px]
                  "
                >
                  You May Also Like
                </h2>
              </div>

              <a
                href="/shop"
                className="
                  hidden
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-[#132c47]
                  underline
                  decoration-[#770800]
                  underline-offset-4
                  transition-colors
                  hover:text-[#770800]
                  sm:block
                "
              >
                View all products
              </a>
            </div>

            <div
              className="
                grid
                grid-cols-1
                gap-x-7
                gap-y-14
                sm:grid-cols-2
                xl:grid-cols-4
              "
            >
              {related.map((p) => (
                <ProductCard
                  key={p._id}
                  product={p}
                  initialWishlisted={wishlistIds.includes(
                    p._id.toString()
                  )}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

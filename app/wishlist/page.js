import Link from "next/link";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { getCurrentUser } from "@/lib/auth";
import ProductCard from "@/components/ProductCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import { toPlain } from "@/lib/serialize";

export default async function WishlistPage() {
  const session = await getCurrentUser();

  if (!session) {
    return (
      <main className="min-h-[75vh] bg-[#f5f3ee] text-[#132c47]">
        <div className="container-lute pt-8">
          <Breadcrumbs items={[{ label: "Wishlist" }]} />
        </div>

        <section className="flex min-h-[65vh] items-center justify-center px-5 py-20">
          <div className="w-full max-w-xl text-center">

            <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-[#132c47]/10 bg-white">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-8 w-8 text-[#770800]"
              >
                <path
                  d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#770800]">
              Your Collection
            </p>

            <h1 className="font-serif text-4xl leading-tight text-[#132c47] sm:text-5xl">
              Your wishlist
              <br />
              <span className="italic text-[#770800]">
                awaits.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-md text-sm leading-7 text-[#132c47]/60">
              Sign in to save your favourite pieces and create a
              collection of designs you love.
            </p>

            <Link
              href="/account/login?next=/wishlist"
              className="mt-9 inline-flex items-center gap-4 rounded-full bg-[#132c47] px-8 py-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#f5f3ee] transition-all duration-300 hover:bg-[#770800] hover:shadow-lg"
            >
              Sign In
              <span className="text-base">→</span>
            </Link>
          </div>
        </section>
      </main>
    );
  }

  await connectDB();

  const user = await User.findById(session.sub)
    .populate({
      path: "wishlist",
      populate: {
        path: "category",
        select: "name slug",
      },
    })
    .lean();

  // A wishlisted product can be deleted later, leaving a populate() result
  // of `null` in its place — filter those out before rendering.
  const products = toPlain((user?.wishlist || []).filter(Boolean));

  return (
    <main className="min-h-screen bg-[#f5f3ee] text-[#132c47] ">
      {/* Breadcrumb */}
      <div>
        <Breadcrumbs image="/products/p13.png" title="Wishlist"  items={[{ label: "Wishlist" }]} />
      </div>

      {/* Header */}
      <section className=" sm:px-5 lg:px-24 pb-14 pt-16 sm:pb-16 sm:pt-20">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">

          <div>
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#770800]">
              Saved Pieces
            </p>

            <h1 className="font-serif text-5xl leading-[0.95] tracking-[-0.02em] text-[#132c47] sm:text-6xl lg:text-7xl">
              My
              <span className="italic text-[#770800]">
                Wishlist.
              </span>
            </h1>
          </div>

          <div className="max-w-xs border-l border-[#132c47]/15 pl-5 lg:mb-1">
            <p className="text-sm leading-6 text-[#132c47]/55">
              A curated collection of pieces you've chosen for
              your space.
            </p>

            {products.length > 0 && (
              <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#132c47]/40">
                {products.length}{" "}
                {products.length === 1 ? "Piece" : "Pieces"} Saved
              </p>
            )}
          </div>

        </div>
      </section>

      {/* Divider */}
      <div className="sm:px-5 lg:px-24">
        <div className="h-px bg-[#132c47]/10" />
      </div>

      {/* Products / Empty State */}
      {products.length === 0 ? (
        <section className="sm:px-5 lg:px-24 py-24 sm:py-32">
          <div className="relative overflow-hidden rounded-[2px] border border-[#132c47]/10 bg-white px-6 py-20 text-center sm:px-10">

            {/* Decorative background */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full border border-[#770800]/10" />
            <div className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full border border-[#132c47]/[0.06]" />

            <div className="relative">
              <div className="mx-auto mb-7 flex h-16 w-16 items-center justify-center rounded-full bg-[#132c47] text-[#f5f3ee]">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-6 w-6"
                >
                  <path
                    d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-[#770800]">
                Nothing Saved Yet
              </p>

              <h2 className="font-serif text-3xl text-[#132c47] sm:text-4xl">
                Start creating your
                <br />
                <span className="italic">
                  collection.
                </span>
              </h2>

              <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-[#132c47]/50">
                Explore our collection and save the pieces that
                speak to your style.
              </p>

              <Link
                href="/shop"
                className="mt-8 inline-flex items-center gap-4 rounded-full bg-[#770800] px-8 py-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#f5f3ee] transition-all duration-300 hover:bg-[#132c47] hover:shadow-lg"
              >
                Explore Collection
                <span className="text-base">→</span>
              </Link>
            </div>
          </div>
        </section>
      ) : (
        <section className="sm:px-5 lg:px-24 pb-24 pt-12 sm:pb-32 sm:pt-14">

          {/* Collection label */}
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="h-px w-8 bg-[#770800]" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#132c47]/45">
                Your Selection
              </span>
            </div>

            <span className="text-[10px] uppercase tracking-[0.2em] text-[#132c47]/35">
              {products.length < 10 ? `0${products.length}` : products.length}
            </span>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4 lg:gap-x-7">
            {products.map((p) => (
              <ProductCard
                key={p._id}
                product={p}
                initialWishlisted={true}
              />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
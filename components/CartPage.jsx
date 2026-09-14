"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import { formatINR } from "@/lib/format";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQty = useCartStore((s) => s.updateQty);

  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const subtotal = items.reduce(
    (sum, i) => sum + i.price * i.qty,
    0
  );

  // Shipping is free for every order. Keep the total equal to the merchandise subtotal.
  const total = subtotal;

  return (
    <main className="min-h-screen bg-[#f5f3ee] pb-24 text-[#132c47]">
      {/* Breadcrumb */}
      <div>
        <Breadcrumbs image="/products/p2.png" title="Cart" items={[{ label: "Cart" }]} />
      </div>

      {/* Empty Cart */}
      {items.length === 0 ? (
        <section className="sm:px-5 lg:px-24 flex min-h-[65vh] items-center justify-center py-20">
          <div className="w-full max-w-xl text-center">

            <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-[#132c47]/10 bg-white">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-8 w-8 text-[#770800]"
              >
                <path
                  d="M6 8h12l1 13H5L6 8Z"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 8a3 3 0 0 1 6 0"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#770800]">
              Your Selection
            </p>

            <h1 className="font-serif text-4xl leading-tight text-[#132c47] sm:text-5xl">
              Your cart is
              <br />
              <span className="italic text-[#770800]">
                waiting.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-md text-sm leading-7 text-[#132c47]/55">
              Discover pieces designed to bring comfort, character
              and timeless style to your space.
            </p>

            <Link
              href="/shop"
              className="mt-9 inline-flex items-center gap-4 rounded-full bg-[#132c47] px-8 py-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#f5f3ee] transition-all duration-300 hover:bg-[#770800] hover:shadow-lg"
            >
              Explore Collection
              <span className="text-base">→</span>
            </Link>
          </div>
        </section>
      ) : (
        <>
          {/* Page Header */}
          <section className="sm:px-5 lg:px-24 pb-14 pt-16 sm:pb-16 sm:pt-20">
            <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">

              <div>
                <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#770800]">
                  Your Selection
                </p>

                <h1 className="font-serif text-5xl leading-[0.95] tracking-[-0.02em] text-[#132c47] sm:text-6xl lg:text-7xl">
                  Shopping&nbsp;
                  <span className="italic text-[#770800]">
                    Cart.
                  </span>
                </h1>
              </div>

              <div className="max-w-xs border-l border-[#132c47]/15 pl-5 lg:mb-1">
                <p className="text-sm leading-6 text-[#132c47]/55">
                  A considered selection of pieces for your
                  space.
                </p>

                <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#132c47]/40">
                  {items.length < 10 ? `0${items.length}` : items.length}{" "}
                  {items.length === 1 ? "Item" : "Items"}
                </p>
              </div>

            </div>
          </section>

          {/* Divider */}
          <div className="sm:px-5 lg:px-24">
            <div className="h-px bg-[#132c47]/10" />
          </div>

          {/* Main Cart */}
          <section className="sm:px-5 lg:px-24 pt-12 sm:pt-14">
            <div className="grid gap-12 lg:grid-cols-[1fr_350px] xl:gap-16">

              {/* ================= PRODUCTS ================= */}
              <div>

                {/* Section heading */}
                <div className="mb-8 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="h-px w-8 bg-[#770800]" />

                    <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#132c47]/45">
                      Selected Pieces
                    </span>
                  </div>

                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#132c47]/30">
                    {items.length < 10
                      ? `0${items.length}`
                      : items.length}
                  </span>
                </div>

                {/* Desktop */}
                <div className="hidden md:block">
                  <div className="overflow-hidden border-y border-[#132c47]/10">

                    {/* Table Header */}
                    <div className="grid grid-cols-[minmax(250px,1fr)_120px_140px_130px_70px] items-center border-b border-[#132c47]/10 py-4 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#132c47]/40">
                      <div>Product</div>
                      <div>Price</div>
                      <div>Quantity</div>
                      <div>Subtotal</div>
                      <div />
                    </div>

                    {/* Items */}
                    {items.map((item) => (
                      <div
                        key={item.productId}
                        className="grid grid-cols-[minmax(250px,1fr)_120px_140px_130px_70px] items-center border-b border-[#132c47]/10 py-6 last:border-b-0"
                      >
                        {/* Product */}
                        <div>
                          <Link
                            href={`/product/${item.slug}`}
                            className="group flex items-center gap-5"
                          >
                            <div className="relative h-24 w-24 shrink-0 overflow-hidden bg-white">
                              {item.image && (
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  fill
                                  sizes="96px"
                                  className="object-cover transition duration-500 group-hover:scale-105"
                                />
                              )}
                            </div>

                            <div className="pr-4">
                              <p className="font-serif text-[17px] leading-6 text-[#132c47] transition-colors group-hover:text-[#770800]">
                                {item.name}
                              </p>

                              <span className="mt-2 block text-[9px] uppercase tracking-[0.18em] text-[#132c47]/35">
                                View Product →
                              </span>
                            </div>
                          </Link>
                        </div>

                        {/* Price */}
                        <div className="text-sm text-[#132c47]/70">
                          {formatINR(item.price)}
                        </div>

                        {/* Quantity */}
                        <div>
                          <div className="flex w-fit items-center border border-[#132c47]/15 bg-white">
                            <button
                              type="button"
                              aria-label="Decrease quantity"
                              onClick={() =>
                                updateQty(
                                  item.productId,
                                  item.qty - 1
                                )
                              }
                              className="flex h-9 w-9 items-center justify-center text-[#132c47]/50 transition hover:bg-[#132c47] hover:text-white"
                            >
                              −
                            </button>

                            <span className="flex h-9 w-10 items-center justify-center border-x border-[#132c47]/10 text-xs">
                              {item.qty}
                            </span>

                            <button
                              type="button"
                              aria-label="Increase quantity"
                              onClick={() =>
                                updateQty(
                                  item.productId,
                                  item.qty + 1
                                )
                              }
                              className="flex h-9 w-9 items-center justify-center text-[#132c47]/50 transition hover:bg-[#132c47] hover:text-white"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Subtotal */}
                        <div className="font-serif text-base text-[#132c47]">
                          {formatINR(item.price * item.qty)}
                        </div>

                        {/* Remove */}
                        <div>
                          <button
                            type="button"
                            onClick={() =>
                              removeItem(item.productId)
                            }
                            className="text-[9px] uppercase tracking-[0.15em] text-[#132c47]/35 transition hover:text-[#770800]"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}

                  </div>
                </div>

                {/* ================= MOBILE ================= */}
                <div className="space-y-4 md:hidden">
                  {items.map((item) => (
                    <div
                      key={item.productId}
                      className="border border-[#132c47]/10 bg-white p-4"
                    >
                      <div className="flex gap-4">

                        <Link
                          href={`/product/${item.slug}`}
                          className="relative h-24 w-24 shrink-0 overflow-hidden bg-[#f5f3ee]"
                        >
                          {item.image && (
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              sizes="96px"
                              className="object-cover"
                            />
                          )}
                        </Link>

                        <div className="min-w-0 flex-1">
                          <Link
                            href={`/product/${item.slug}`}
                            className="font-serif text-base leading-5 text-[#132c47]"
                          >
                            {item.name}
                          </Link>

                          <p className="mt-2 text-sm text-[#132c47]/55">
                            {formatINR(item.price)}
                          </p>

                          <button
                            type="button"
                            onClick={() =>
                              removeItem(item.productId)
                            }
                            className="mt-3 text-[9px] uppercase tracking-[0.15em] text-[#770800]"
                          >
                            Remove
                          </button>
                        </div>
                      </div>

                      <div className="mt-5 flex items-center justify-between border-t border-[#132c47]/10 pt-4">
                        <span className="text-[9px] uppercase tracking-[0.2em] text-[#132c47]/40">
                          Quantity
                        </span>

                        <div className="flex items-center border border-[#132c47]/15">
                          <button
                            type="button"
                            onClick={() =>
                              updateQty(
                                item.productId,
                                item.qty - 1
                              )
                            }
                            className="flex h-8 w-8 items-center justify-center text-[#132c47]/60"
                          >
                            −
                          </button>

                          <span className="flex h-8 w-9 items-center justify-center border-x border-[#132c47]/10 text-xs">
                            {item.qty}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              updateQty(
                                item.productId,
                                item.qty + 1
                              )
                            }
                            className="flex h-8 w-8 items-center justify-center text-[#132c47]/60"
                          >
                            +
                          </button>
                        </div>

                        <span className="font-serif text-base">
                          {formatINR(item.price * item.qty)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Continue Shopping */}
                <div className="mt-8">
                  <Link
                    href="/shop"
                    className="inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#132c47]/55 transition hover:text-[#770800]"
                  >
                    <span>←</span>
                    Continue Shopping
                  </Link>
                </div>
              </div>

              {/* ================= TOTALS ================= */}
              <aside className="lg:sticky lg:top-28 lg:self-start">

                <div className="relative overflow-hidden border border-[#132c47]/10 bg-[#132c47] p-7 text-[#f5f3ee] sm:p-8">

                  {/* Decorative */}
                  <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full border border-white/[0.06]" />

                  <div className="relative">

                    <p className="mb-3 text-[9px] font-semibold uppercase tracking-[0.3em] text-[#c7ad78]">
                      Order Summary
                    </p>

                    <h2 className="font-serif text-3xl">
                      Cart
                      <span className="italic text-[#c7ad78]">
                        {" "}Totals
                      </span>
                    </h2>

                    <div className="my-7 h-px bg-white/10" />

                    {/* Subtotal */}
                    <div className="flex items-center justify-between py-3">
                      <span className="text-xs text-white/50">
                        Subtotal
                      </span>

                      <span className="text-sm">
                        {formatINR(subtotal)}
                      </span>
                    </div>

                    {/* Shipping fee intentionally omitted: shipping is free on all orders. */}

                    {/* Total */}
                    <div className="mt-5 flex items-end justify-between">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
                        Total
                      </span>

                      <span className="font-serif text-2xl text-[#f5f3ee]">
                        {formatINR(total)}
                      </span>
                    </div>

                    {/* Checkout */}
                    <Link
                      href="/checkout"
                      className="group mt-7 flex h-14 w-full items-center justify-center gap-4 bg-white text-[10px] font-semibold uppercase tracking-[0.23em] text-[#770800] transition-all duration-300 hover:bg-[#8f1007] hover:text-white hover:shadow-[0_12px_30px_rgba(119,8,0,.3)]"
                    >
                      Proceed to Checkout
                      <span className="text-base transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </Link>

                    <p className="mt-5 text-center text-[9px] uppercase tracking-[0.18em] text-white/20">
                      Secure & seamless checkout
                    </p>

                  </div>
                </div>

              </aside>
            </div>
          </section>
        </>
      )}
    </main>
  );
}

import Link from "next/link";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import { formatINR } from "@/lib/format";

export default async function CheckoutSuccessPage({ searchParams }) {
  const sp = await searchParams;

  await connectDB();

  const order = sp.order
    ? await Order.findOne({ orderNumber: sp.order }).lean()
    : null;

  const isPaid = order?.paymentStatus === "paid";

  return (
    <main className="min-h-screen bg-[#f5f3ee] text-[#132c47]">
      <section className="mx-auto flex min-h-screen w-full max-w-[900px] items-center justify-center px-5 py-20 sm:px-8">

        <div className="w-full max-w-[650px] text-center">

          {/* Success Icon */}
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-[#132c47]/10 bg-white shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#132c47]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-6 w-6 text-[#f5f3ee]"
              >
                <path
                  d="m5 12 4.5 4.5L19 7"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Eyebrow */}
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#770800]">
            Order Confirmed
          </p>

          {/* Heading */}
          <h1 className="font-serif text-5xl leading-[1] tracking-[-0.02em] text-[#132c47] sm:text-6xl">
            Thank you for
            <br />
            <span className="italic text-[#770800]">
              your order.
            </span>
          </h1>

          {order ? (
            <>
              {/* Message */}
              <p className="mx-auto mt-7 max-w-lg text-sm leading-7 text-[#132c47]/55">
                Your order{" "}
                <span className="font-semibold text-[#132c47]">
                  {order.orderNumber}
                </span>{" "}
                has been placed successfully.
                {" "}
                {isPaid
                  ? "Your payment has been confirmed."
                  : "We're confirming your payment — this can take a minute."}
              </p>

              {/* Order Card */}
              <div className="relative mt-12 overflow-hidden border border-[#132c47]/10 bg-white text-left">

                {/* Decorative circle */}
                <div className="pointer-events-none absolute -right-24 -top-24 h-52 w-52 rounded-full border border-[#770800]/[0.08]" />

                <div className="relative">

                  {/* Card Header */}
                  <div className="border-b border-[#132c47]/10 px-6 py-6 sm:px-8">
                    <div className="flex items-center justify-between gap-4">

                      <div>
                        <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#770800]">
                          Order Details
                        </p>

                        <p className="mt-2 font-serif text-xl text-[#132c47]">
                          {order.orderNumber}
                        </p>
                      </div>

                      <div className="hidden text-right sm:block">
                        <p className="text-[9px] uppercase tracking-[0.2em] text-[#132c47]/35">
                          Total
                        </p>

                        <p className="mt-1 font-serif text-xl text-[#132c47]">
                          {formatINR(order.total)}
                        </p>
                      </div>

                    </div>
                  </div>

                  {/* Status Rows */}
                  <div className="px-6 py-5 sm:px-8">

                    <div className="flex items-center justify-between border-b border-[#132c47]/10 py-4">
                      <div>
                        <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#132c47]/35">
                          Order Status
                        </p>
                      </div>

                      <span className="inline-flex items-center gap-2 text-xs font-medium capitalize text-[#132c47]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#770800]" />
                        {order.orderStatus}
                      </span>
                    </div>

                    <div className="flex items-center justify-between border-b border-[#132c47]/10 py-4">
                      <div>
                        <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#132c47]/35">
                          Payment Status
                        </p>
                      </div>

                      <span
                        className={`inline-flex items-center gap-2 text-xs font-medium capitalize ${
                          isPaid
                            ? "text-[#132c47]"
                            : "text-[#770800]"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            isPaid
                              ? "bg-[#132c47]"
                              : "bg-[#770800]"
                          }`}
                        />

                        {order.paymentStatus}
                      </span>
                    </div>

                    {/* Mobile Total */}
                    <div className="flex items-center justify-between py-4 sm:hidden">
                      <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#132c47]/35">
                        Total
                      </p>

                      <p className="font-serif text-xl text-[#132c47]">
                        {formatINR(order.total)}
                      </p>
                    </div>

                  </div>

                </div>
              </div>

              {/* Payment notice */}
              {!isPaid && (
                <div className="mt-5 border border-[#770800]/10 bg-[#770800]/[0.035] px-5 py-4 text-left">
                  <div className="flex gap-3">
                    <span className="mt-0.5 text-[#770800]">
                      !
                    </span>

                    <p className="text-xs leading-5 text-[#132c47]/55">
                      Your order has been received. Payment verification
                      may take a short while. Your payment
                      status will update once confirmation is received.
                    </p>
                  </div>
                </div>
              )}
            </>
          ) : (
            /* No order found */
            <div className="mx-auto mt-8 max-w-lg">
              <p className="text-sm leading-7 text-[#132c47]/55">
                Your order has been placed successfully. Thank you
                for choosing us.
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">

            <Link
              href="/shop"
              className="group inline-flex h-13 w-full items-center justify-center gap-4 bg-[#132c47] px-8 text-[10px] font-semibold uppercase tracking-[0.23em] text-[#f5f3ee] transition-all duration-300 hover:bg-[#770800] sm:w-auto"
            >
              Continue Shopping
              <span className="text-base transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>

            <Link
              href="/"
              className="inline-flex h-13 w-full items-center justify-center border border-[#132c47]/15 px-8 text-[10px] font-semibold uppercase tracking-[0.23em] text-[#132c47]/60 transition-all duration-300 hover:border-[#132c47]/30 hover:text-[#132c47] sm:w-auto"
            >
              Back to Home
            </Link>

          </div>

          {/* Bottom */}
          <div className="mt-14 flex items-center justify-center gap-4">
            <span className="h-px w-8 bg-[#770800]" />

            <span className="text-[8px] uppercase tracking-[0.3em] text-[#132c47]/25">
              Thank you for shopping with us
            </span>

            <span className="h-px w-8 bg-[#770800]" />
          </div>

        </div>
      </section>
    </main>
  );
}
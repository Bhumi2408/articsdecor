import Link from "next/link";

export default function CheckoutCancelPage() {
  return (
    <main className="min-h-screen bg-[#f5f3ee] text-[#132c47]">
      <section className="mx-auto flex min-h-screen w-full max-w-[900px] items-center justify-center px-5 py-20 sm:px-8">
        <div className="w-full max-w-[620px] text-center">

          {/* Cancel Icon */}
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-[#132c47]/10 bg-white shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#770800] text-[#f5f3ee]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-6 w-6"
              >
                <path
                  d="M7 7l10 10M17 7 7 17"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          {/* Eyebrow */}
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#770800]">
            Payment Cancelled
          </p>

          {/* Heading */}
          <h1 className="font-serif text-5xl leading-[1] tracking-[-0.02em] text-[#132c47] sm:text-6xl">
            Your payment was
            <br />
            <span className="italic text-[#770800]">
              not completed.
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-7 max-w-lg text-sm leading-7 text-[#132c47]/55">
            Your payment was not completed and your order has been
            saved as pending. You can return to your cart and try
            again whenever you're ready.
          </p>

          {/* Info Card */}
          <div className="relative mt-12 overflow-hidden border border-[#132c47]/10 bg-white p-7 text-left sm:p-8">

            {/* Decorative element */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full border border-[#770800]/10" />

            <div className="relative flex gap-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#132c47] text-[#c8ad76]">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-5 w-5"
                >
                  <path
                    d="M12 8v5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="12"
                    cy="17"
                    r=".8"
                    fill="currentColor"
                  />
                  <path
                    d="M10.3 3.8 2.9 17a2 2 0 0 0 1.75 3h14.7a2 2 0 0 0 1.75-3L13.7 3.8a2 2 0 0 0-3.4 0Z"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#770800]">
                  Order Pending
                </p>

                <p className="mt-2 text-xs leading-6 text-[#132c47]/55">
                  No successful payment has been recorded. Your
                  pending order remains saved, so you can try the
                  checkout process again.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">

            <Link
              href="/cart"
              className="group inline-flex h-13 w-full items-center justify-center gap-4 bg-[#770800] px-8 text-[10px] font-semibold uppercase tracking-[0.23em] text-[#f5f3ee] transition-all duration-300 hover:bg-[#132c47] hover:shadow-[0_12px_30px_rgba(119,8,0,.18)] sm:w-auto"
            >
              Return to Cart
              <span className="text-base transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>

            <Link
              href="/shop"
              className="inline-flex h-13 w-full items-center justify-center border border-[#132c47]/15 px-8 text-[10px] font-semibold uppercase tracking-[0.23em] text-[#132c47]/60 transition-all duration-300 hover:border-[#132c47]/30 hover:text-[#132c47] sm:w-auto"
            >
              Continue Shopping
            </Link>

          </div>

          {/* Bottom */}
          <div className="mt-14 flex items-center justify-center gap-4">
            <span className="h-px w-8 bg-[#770800]" />

            <span className="text-[8px] uppercase tracking-[0.3em] text-[#132c47]/25">
              Need assistance? Contact us
            </span>

            <span className="h-px w-8 bg-[#770800]" />
          </div>

        </div>
      </section>
    </main>
  );
}
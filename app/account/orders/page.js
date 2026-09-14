// app/account/orders/page.jsx
import Link from "next/link";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import { getCurrentUser } from "@/lib/auth";
import Breadcrumbs from "@/components/Breadcrumbs";
import { formatINR } from "@/lib/format";

const ArrowIcon = (p) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...p}
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const BoxIcon = (p) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...p}
  >
    <path d="M21 8.5 12 3.5 3 8.5v7L12 20.5l9-5z" />
    <path d="M3 8.5 12 13.5l9-5M12 13.5v7" />
  </svg>
);

/* =========================================================
   STATUS STYLE
========================================================= */

function statusStyle(status = "") {
  const s = status.toLowerCase();

  if (["delivered", "completed"].includes(s)) {
    return "border-[#132c47]/20 bg-[#132c47]/[0.06] text-[#132c47]";
  }

  if (["shipped", "dispatched"].includes(s)) {
    return "border-[#770800]/20 bg-[#770800]/[0.06] text-[#770800]";
  }

  if (["processing", "confirmed", "paid"].includes(s)) {
    return "border-[#132c47]/15 bg-[#f5f3ee] text-[#132c47]";
  }

  if (["cancelled", "canceled", "failed", "refunded"].includes(s)) {
    return "border-red-200 bg-red-50 text-red-700";
  }

  return "border-[#770800]/20 bg-[#770800]/[0.05] text-[#770800]";
}

/* =========================================================
   DATE
========================================================= */

function formatDate(d) {
  return new Date(d).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/* =========================================================
   PAGE
========================================================= */

export default async function OrderHistoryPage() {
  const session = await getCurrentUser();

  await connectDB();

  const orders = await Order.find({ user: session.sub })
    .sort({ createdAt: -1 })
    .lean();

  return (
    <div className="min-h-screen bg-[#f5f3ee] pb-20">

      {/* =====================================================
          BREADCRUMB
      ====================================================== */}

      <div className="bg-white">
        <Breadcrumbs
        image="/products/p10.png" title="Orders"
          items={[
            { label: "My Account", href: "/account" },
            { label: "Orders" },
          ]}
        />
      </div>

      {/* =====================================================
          MAIN
      ====================================================== */}

      <div className="container-lute mx-auto mt-8 max-w-6xl px-4 sm:px-6">

        {/* ===================================================
            HEADER
        ==================================================== */}

        <div className="relative overflow-hidden rounded-2xl bg-[#132c47] px-6 py-8 text-white shadow-[0_18px_45px_-25px_rgba(19,44,71,0.65)] sm:px-8 md:px-10 md:py-10">

          {/* subtle decorative circle */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full border border-white/[0.08]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 right-10 h-72 w-72 rounded-full border border-[#770800]/30"
          />

          <div className="relative z-10 flex flex-wrap items-end justify-between gap-6">

            <div>
              <div className="mb-3 flex items-center gap-3">
                <span className="h-px w-8 bg-[#770800]" />

                <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/65">
                  My Account
                </span>
              </div>

              <h1 className="font-serif text-[32px] font-medium leading-tight tracking-[-0.02em] sm:text-[40px]">
                Order History
              </h1>

              <p className="mt-2 max-w-lg text-[14px] leading-relaxed text-white/65 sm:text-[15px]">
                {orders.length === 0
                  ? "Your past orders will appear here."
                  : `${orders.length} order${
                      orders.length > 1 ? "s" : ""
                    } placed with Artics Decorr`}
              </p>
            </div>

            <Link
              href="/account"
              className="
                group
                inline-flex
                items-center
                gap-2
                border
                border-white/25
                bg-white/[0.04]
                px-5
                py-2.5
                text-[13px]
                font-medium
                text-white/90
                backdrop-blur-sm
                transition-all
                duration-300
                hover:border-white/60
                hover:bg-white
                hover:text-[#132c47]
              "
            >
              <ArrowIcon className="h-4 w-4 rotate-180 transition-transform duration-300 group-hover:-translate-x-1" />
              Back to Account
            </Link>

          </div>
        </div>

        {/* ===================================================
            EMPTY STATE
        ==================================================== */}

        {orders.length === 0 ? (
          <div className="mt-8 overflow-hidden rounded-2xl border border-[#132c47]/10 bg-white shadow-[0_12px_35px_-28px_rgba(19,44,71,0.5)]">

            <div className="flex flex-col items-center px-6 py-20 text-center">

              <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-[#f5f3ee] text-[#132c47]">
                <span className="absolute inset-1 rounded-full border border-[#770800]/15" />

                <BoxIcon className="relative h-9 w-9" />
              </div>

              <span className="mt-7 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#770800]">
                Your Collection Awaits
              </span>

              <h2 className="mt-2 font-serif text-[27px] text-[#132c47]">
                No orders yet
              </h2>

              <p className="mx-auto mt-3 max-w-md text-[14px] leading-7 text-[#68727c]">
                When you place your first order, it will appear here with
                complete order details, status and receipt information.
              </p>

              <Link
                href="/shop"
                className="
                  group
                  relative
                  mt-7
                  inline-flex
                  items-center
                  gap-3
                  overflow-hidden
                  border
                  border-[#770800]
                  bg-[#770800]
                  px-7
                  py-3.5
                  text-[13px]
                  font-semibold
                  uppercase
                  tracking-[0.12em]
                  text-white
                  transition-all
                  duration-300
                  hover:bg-[#132c47]
                  hover:border-[#132c47]
                "
              >
                <span>Start Shopping</span>

                <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

            </div>
          </div>
        ) : (
          <>
            {/* =================================================
                MOBILE ORDERS
            ================================================== */}

            <div className="mt-8 space-y-4 md:hidden">
              {orders.map((o) => (
                <Link
                  key={String(o._id)}
                  href={`/account/orders/${o._id}`}
                  className="
                    group
                    block
                    overflow-hidden
                    rounded-2xl
                    border
                    border-[#132c47]/10
                    bg-white
                    shadow-[0_10px_30px_-25px_rgba(19,44,71,0.6)]
                    transition-all
                    duration-300
                    active:border-[#770800]/40
                  "
                >
                  {/* top accent */}
                  <div className="h-1 w-full bg-[#132c47] transition-colors duration-300 group-hover:bg-[#770800]" />

                  <div className="p-5">

                    <div className="flex items-start justify-between gap-3">

                      <div className="min-w-0">
                        <p className="truncate text-[15.5px] font-semibold text-[#132c47]">
                          {o.orderNumber}
                        </p>

                        <p className="mt-1.5 text-[12.5px] text-[#8A8F94]">
                          Placed on {formatDate(o.createdAt)}
                        </p>
                      </div>

                      <span
                        className={`
                          shrink-0
                          rounded-full
                          border
                          px-3
                          py-1.5
                          text-[10px]
                          font-bold
                          uppercase
                          tracking-[0.08em]
                          ${statusStyle(o.orderStatus)}
                        `}
                      >
                        {o.orderStatus}
                      </span>

                    </div>

                    <div className="mt-5 flex items-end justify-between border-t border-[#132c47]/[0.07] pt-4">

                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#92979b]">
                          Order Total
                        </p>

                        <p className="mt-1 text-[18px] font-semibold text-[#132c47]">
                          {formatINR(o.total)}
                        </p>
                      </div>

                      <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#770800]">
                        View Order
                        <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>

                    </div>

                  </div>
                </Link>
              ))}
            </div>

            {/* =================================================
                DESKTOP TABLE
            ================================================== */}

            <div className="mt-8 hidden overflow-hidden rounded-2xl border border-[#132c47]/10 bg-white shadow-[0_15px_40px_-30px_rgba(19,44,71,0.65)] md:block">

              <table className="w-full text-[14px]">

                <thead>
                  <tr className="bg-[#132c47] text-left">

                    <th className="px-6 py-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/65">
                      Order
                    </th>

                    <th className="px-6 py-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/65">
                      Date
                    </th>

                    <th className="px-6 py-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/65">
                      Status
                    </th>

                    <th className="px-6 py-5 text-right text-[11px] font-semibold uppercase tracking-[0.14em] text-white/65">
                      Total
                    </th>

                    <th className="px-6 py-5" />

                  </tr>
                </thead>

                <tbody className="divide-y divide-[#132c47]/[0.07]">

                  {orders.map((o) => (
                    <tr
                      key={String(o._id)}
                      className="group transition-colors duration-300 hover:bg-[#f5f3ee]/70"
                    >

                      {/* ORDER */}
                      <td className="px-6 py-5">
                        <span className="font-semibold text-[#132c47]">
                          {o.orderNumber}
                        </span>
                      </td>

                      {/* DATE */}
                      <td className="px-6 py-5 text-[#69747d]">
                        {formatDate(o.createdAt)}
                      </td>

                      {/* STATUS */}
                      <td className="px-6 py-5">
                        <span
                          className={`
                            inline-flex
                            rounded-full
                            border
                            px-3
                            py-1.5
                            text-[10.5px]
                            font-bold
                            uppercase
                            tracking-[0.07em]
                            ${statusStyle(o.orderStatus)}
                          `}
                        >
                          {o.orderStatus}
                        </span>
                      </td>

                      {/* TOTAL */}
                      <td className="px-6 py-5 text-right">
                        <span className="font-semibold text-[#132c47]">
                          {formatINR(o.total)}
                        </span>
                      </td>

                      {/* VIEW */}
                      <td className="px-6 py-5 text-right">
                        <Link
                          href={`/account/orders/${o._id}`}
                          className="
                            group/view
                            inline-flex
                            items-center
                            gap-2
                            border
                            border-[#132c47]/15
                            px-4
                            py-2
                            text-[12px]
                            font-semibold
                            uppercase
                            tracking-[0.08em]
                            text-[#132c47]
                            transition-all
                            duration-300
                            hover:border-[#770800]
                            hover:bg-[#770800]
                            hover:text-white
                          "
                        >
                          View
                          <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover/view:translate-x-1" />
                        </Link>
                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>
            </div>

            {/* =================================================
                BOTTOM NOTE
            ================================================== */}

            <div className="mt-6 flex items-center justify-center gap-3 text-center">
              <span className="h-px w-8 bg-[#132c47]/15" />
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#8B9094]">
                Artics Decorr
              </span>
              <span className="h-px w-8 bg-[#132c47]/15" />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
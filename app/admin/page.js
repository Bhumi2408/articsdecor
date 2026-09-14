// app/admin/page.jsx
import Link from "next/link";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import Product from "@/models/Product";
import { formatINR } from "@/lib/format";

/* ---------------- icons ---------------- */

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

const BoxIcon = (p) => (
  <svg {...iconProps} {...p}>
    <path d="M21 8.5 12 3.5 3 8.5v7L12 20.5l9-5z" />
    <path d="M3 8.5 12 13.5l9-5M12 13.5v7" />
  </svg>
);

const ClockIcon = (p) => (
  <svg {...iconProps} {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 1.8" />
  </svg>
);

const TagIcon = (p) => (
  <svg {...iconProps} {...p}>
    <path d="M3.5 10.5V4.5h6l10 10-6 6z" />
    <circle cx="7.5" cy="8.5" r="1.3" />
  </svg>
);

const RevenueIcon = (p) => (
  <svg {...iconProps} {...p}>
    <path d="M12 3v18" />
    <path d="M16.5 7.5c0-1.7-1.8-3-4.2-3S8 5.5 8 7.2s1.4 2.7 4.2 3.3 4.2 1.5 4.2 3.4-1.8 3.3-4.2 3.3-4.2-1.3-4.2-3" />
  </svg>
);

const ArrowIcon = (p) => (
  <svg {...iconProps} {...p}>
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </svg>
);

const ChevronIcon = (p) => (
  <svg {...iconProps} {...p}>
    <path d="m9 18 6-6-6-6" />
  </svg>
);

/* ---------------- helpers ---------------- */

function statusStyle(status = "") {
  const s = status.toLowerCase();

  if (["delivered", "completed", "paid"].includes(s)) {
    return "border-green-200 bg-green-50 text-green-700";
  }

  if (["shipped", "dispatched"].includes(s)) {
    return "border-blue-200 bg-blue-50 text-blue-700";
  }

  if (["processing", "confirmed"].includes(s)) {
    return "border-indigo-200 bg-indigo-50 text-indigo-700";
  }

  if (["cancelled", "canceled", "failed", "refunded"].includes(s)) {
    return "border-red-200 bg-red-50 text-red-700";
  }

  return "border-amber-200 bg-amber-50 text-amber-700";
}

function formatDate(d) {
  return new Date(d).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/* ---------------- page ---------------- */

export default async function AdminDashboard() {
  await connectDB();

  const [
    totalOrders,
    pendingOrders,
    productCount,
    revenueAgg,
    recentOrders,
  ] = await Promise.all([
    Order.countDocuments(),

    Order.countDocuments({
      orderStatus: "pending",
    }),

    Product.countDocuments(),

    Order.aggregate([
      {
        $match: {
          paymentStatus: "paid",
        },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$total",
          },
        },
      },
    ]),

    Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .lean(),
  ]);

  const revenue = revenueAgg[0]?.total || 0;

  const stats = [
    {
      label: "Total Orders",
      value: totalOrders,
      Icon: BoxIcon,
      href: "/admin/orders",
      description: "All orders received",
      iconClass: "bg-[#132c47] text-white",
    },
    {
      label: "Pending Orders",
      value: pendingOrders,
      Icon: ClockIcon,
      href: "/admin/orders",
      description: "Need your attention",
      iconClass: "bg-[#770800] text-white",
    },
    {
      label: "Products",
      value: productCount,
      Icon: TagIcon,
      href: "/admin/products",
      description: "Products in your store",
      iconClass: "bg-[#132c47] text-white",
    },
  ];

  return (
    <div className="min-h-full bg-[#f5f3ee] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <div className="mx-auto w-full max-w-7xl">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="flex flex-col gap-5 border-b border-[#132c47]/10 pb-7 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-px w-8 bg-[#770800]" />

              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#770800]">
                Admin Panel
              </span>
            </div>

            <h1 className="text-3xl font-semibold tracking-[-0.03em] text-[#132c47] sm:text-4xl">
              Dashboard
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-[#132c47]/60 sm:text-[15px]">
              Keep track of orders, products and store performance from one
              place.
            </p>
          </div>

          <Link
            href="/admin/orders"
            className="inline-flex w-fit items-center gap-3 rounded-lg bg-[#132c47] px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#770800]"
          >
            View all orders

            <ArrowIcon className="h-4 w-4" />
          </Link>
        </div>

        {/* =====================================================
            OVERVIEW CARDS
        ====================================================== */}

        <section className="mt-7">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-[#132c47]">
                Store Overview
              </h2>

              <p className="mt-1 text-xs text-[#132c47]/50">
                A quick look at your store
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

            {stats.map(
              ({
                label,
                value,
                Icon,
                href,
                description,
                iconClass,
              }) => (
                <Link
                  key={label}
                  href={href}
                  className="group relative overflow-hidden rounded-xl border border-[#132c47]/10 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#770800]/30 hover:shadow-lg sm:p-6"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#132c47]/50">
                        {label}
                      </p>

                      <p className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-[#132c47]">
                        {value}
                      </p>

                      <p className="mt-2 text-xs text-[#132c47]/50">
                        {description}
                      </p>
                    </div>

                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${iconClass}`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                  </div>

                  <div className="mt-5 flex items-center gap-1 text-xs font-semibold text-[#770800] opacity-0 transition-opacity group-hover:opacity-100">
                    Open section
                    <ArrowIcon className="h-3.5 w-3.5" />
                  </div>
                </Link>
              )
            )}

            {/* Revenue */}

            <div className="relative overflow-hidden rounded-xl bg-[#132c47] p-5 text-white shadow-sm sm:p-6">
              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full border border-white/10" />
              <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full border border-white/10" />

              <div className="relative">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/60">
                      Revenue
                    </p>

                    <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-[#f5f3ee]/50">
                      Paid orders
                    </p>
                  </div>

                  <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-[#f5f3ee]">
                    <RevenueIcon className="h-5 w-5" />
                  </span>
                </div>

                <p className="mt-6 break-words text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl">
                  {formatINR(revenue)}
                </p>

                <div className="mt-3 h-px w-full bg-white/10" />

                <p className="mt-3 text-xs text-white/50">
                  Total successfully paid revenue
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            RECENT ORDERS
        ====================================================== */}

        <section className="mt-8 overflow-hidden rounded-xl border border-[#132c47]/10 bg-white shadow-sm">

          {/* section header */}

          <div className="flex flex-col gap-4 border-b border-[#132c47]/10 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-5 w-1 rounded-full bg-[#770800]" />

                <h2 className="text-base font-semibold text-[#132c47]">
                  Recent Orders
                </h2>
              </div>

              <p className="mt-1.5 pl-3 text-xs text-[#132c47]/50">
                Your latest customer orders
              </p>
            </div>

            <Link
              href="/admin/orders"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#770800] transition-colors hover:text-[#132c47]"
            >
              See all orders
              <ArrowIcon className="h-4 w-4" />
            </Link>
          </div>

          {recentOrders.length === 0 ? (
            /* empty */

            <div className="px-6 py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f5f3ee] text-[#132c47]">
                <BoxIcon className="h-6 w-6" />
              </div>

              <p className="mt-4 text-sm font-semibold text-[#132c47]">
                No orders yet
              </p>

              <p className="mt-1 text-xs text-[#132c47]/50">
                New customer orders will appear here.
              </p>
            </div>
          ) : (
            <>
              {/* =================================================
                  MOBILE ORDERS
              ================================================== */}

              <div className="divide-y divide-[#132c47]/10 md:hidden">
                {recentOrders.map((o) => (
                  <Link
                    key={String(o._id)}
                    href={`/admin/orders/${o._id}`}
                    className="block px-5 py-4 transition-colors hover:bg-[#f5f3ee]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-[#132c47]">
                          {o.orderNumber}
                        </p>

                        <p className="mt-1 truncate text-xs text-[#132c47]/50">
                          {o.shippingAddress?.fullName || "Guest"}
                        </p>

                        <p className="mt-1 text-[11px] text-[#132c47]/40">
                          {formatDate(o.createdAt)}
                        </p>
                      </div>

                      <span
                        className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] ${statusStyle(
                          o.orderStatus
                        )}`}
                      >
                        {o.orderStatus}
                      </span>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-[#132c47]/10 pt-3">
                      <span className="text-sm font-semibold text-[#132c47]">
                        {formatINR(o.total)}
                      </span>

                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#770800]">
                        View
                        <ChevronIcon className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              {/* =================================================
                  DESKTOP ORDERS
              ================================================== */}

              <div className="hidden md:block">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[700px] border-collapse">
                    <thead>
                      <tr className="bg-[#f5f3ee]">
                        <th className="px-6 py-4 text-left text-[10px] font-semibold uppercase tracking-[0.15em] text-[#132c47]/50">
                          Order
                        </th>

                        <th className="px-6 py-4 text-left text-[10px] font-semibold uppercase tracking-[0.15em] text-[#132c47]/50">
                          Customer
                        </th>

                        <th className="px-6 py-4 text-left text-[10px] font-semibold uppercase tracking-[0.15em] text-[#132c47]/50">
                          Date
                        </th>

                        <th className="px-6 py-4 text-left text-[10px] font-semibold uppercase tracking-[0.15em] text-[#132c47]/50">
                          Status
                        </th>

                        <th className="px-6 py-4 text-right text-[10px] font-semibold uppercase tracking-[0.15em] text-[#132c47]/50">
                          Total
                        </th>

                        <th className="px-6 py-4" />
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-[#132c47]/10">
                      {recentOrders.map((o) => (
                        <tr
                          key={String(o._id)}
                          className="group transition-colors hover:bg-[#f5f3ee]/70"
                        >
                          <td className="px-6 py-4">
                            <Link
                              href={`/admin/orders/${o._id}`}
                              className="text-sm font-semibold text-[#132c47] transition-colors hover:text-[#770800]"
                            >
                              {o.orderNumber}
                            </Link>
                          </td>

                          <td className="px-6 py-4">
                            <div className="max-w-[180px]">
                              <p className="truncate text-sm text-[#132c47]">
                                {o.shippingAddress?.fullName || "Guest"}
                              </p>
                            </div>
                          </td>

                          <td className="px-6 py-4 text-sm text-[#132c47]/55">
                            {formatDate(o.createdAt)}
                          </td>

                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] ${statusStyle(
                                o.orderStatus
                              )}`}
                            >
                              {o.orderStatus}
                            </span>
                          </td>

                          <td className="px-6 py-4 text-right text-sm font-semibold text-[#132c47]">
                            {formatINR(o.total)}
                          </td>

                          <td className="px-6 py-4 text-right">
                            <Link
                              href={`/admin/orders/${o._id}`}
                              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[#132c47]/40 transition-all hover:bg-[#770800] hover:text-white"
                              aria-label={`View ${o.orderNumber}`}
                            >
                              <ChevronIcon className="h-4 w-4" />
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </section>

        {/* =====================================================
            BOTTOM QUICK ACTION
        ====================================================== */}

        <div className="mt-5 grid gap-4 sm:grid-cols-2">

          <Link
            href="/admin/orders"
            className="group flex items-center justify-between rounded-xl border border-[#132c47]/10 bg-white px-5 py-4 shadow-sm transition-all hover:border-[#770800]/30 hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#132c47] text-white">
                <BoxIcon className="h-5 w-5" />
              </span>

              <div>
                <p className="text-sm font-semibold text-[#132c47]">
                  Manage Orders
                </p>

                <p className="mt-0.5 text-xs text-[#132c47]/50">
                  View and update orders
                </p>
              </div>
            </div>

            <ArrowIcon className="h-4 w-4 text-[#770800] transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            href="/admin/products"
            className="group flex items-center justify-between rounded-xl border border-[#132c47]/10 bg-white px-5 py-4 shadow-sm transition-all hover:border-[#770800]/30 hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#770800] text-white">
                <TagIcon className="h-5 w-5" />
              </span>

              <div>
                <p className="text-sm font-semibold text-[#132c47]">
                  Manage Products
                </p>

                <p className="mt-0.5 text-xs text-[#132c47]/50">
                  Add and edit your products
                </p>
              </div>
            </div>

            <ArrowIcon className="h-4 w-4 text-[#770800] transition-transform group-hover:translate-x-1" />
          </Link>

        </div>
      </div>
    </div>
  );
}
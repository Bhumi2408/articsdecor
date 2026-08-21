// app/admin/page.jsx
import Link from "next/link";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import Product from "@/models/Product";
import { formatZAR } from "@/lib/format";

/* ---------------- icons ---------------- */
const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
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
const RandIcon = (p) => (
  <svg {...iconProps} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M9.5 16V8h2.6a2.4 2.4 0 0 1 0 4.8H9.5m3 0L15 16" />
  </svg>
);
const ArrowIcon = (p) => (
  <svg {...iconProps} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

function statusStyle(status = "") {
  const s = status.toLowerCase();
  if (["delivered", "completed", "paid"].includes(s)) return "bg-emerald-50 text-emerald-700 border-emerald-200";
  if (["shipped", "dispatched"].includes(s)) return "bg-indigo-50 text-indigo-700 border-indigo-200";
  if (["processing", "confirmed"].includes(s)) return "bg-blue-50 text-blue-700 border-blue-200";
  if (["cancelled", "canceled", "failed", "refunded"].includes(s)) return "bg-red-50 text-red-700 border-red-200";
  return "bg-amber-50 text-amber-700 border-amber-200";
}

function formatDate(d) {
  return new Date(d).toLocaleDateString("en-ZA", { day: "2-digit", month: "short", year: "numeric" });
}

/* ---------------- page ---------------- */
export default async function AdminDashboard() {
  await connectDB();

  const [totalOrders, pendingOrders, productCount, revenueAgg, recentOrders] = await Promise.all([
    Order.countDocuments(),
    Order.countDocuments({ orderStatus: "pending" }),
    Product.countDocuments(),
    Order.aggregate([
      { $match: { paymentStatus: "paid" } },
      { $group: { _id: null, total: { $sum: "$total" } } },
    ]),
    Order.find().sort({ createdAt: -1 }).limit(5).lean(),
  ]);

  const revenue = revenueAgg[0]?.total || 0;

  const STATS = [
    { label: "Total Orders", value: totalOrders, Icon: BoxIcon, tint: "bg-[#EEF2FF] text-[#4F46E5]", href: "/admin/orders" },
    { label: "Pending Orders", value: pendingOrders, Icon: ClockIcon, tint: "bg-[#FFF7E6] text-[#B7791F]", href: "/admin/orders" },
    { label: "Products", value: productCount, Icon: TagIcon, tint: "bg-[#ECFDF5] text-[#047857]", href: "/admin/products" },
  ];

  return (
    <div className="pb-12">
      {/* ---------- header ---------- */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-[26px] font-medium leading-tight tracking-[-0.01em] text-[#141414] sm:text-[30px]">
            Dashboard
          </h1>
          <p className="mt-2 text-[15px] text-[#6B6B6B]">Overview of your store today.</p>
        </div>
        <Link
          href="/admin/orders"
          className="inline-flex items-center gap-1.5 rounded-lg bg-[#141414] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#BF9A3A]"
        >
          View all orders
          <ArrowIcon className="h-4 w-4" />
        </Link>
      </div>

      {/* ---------- stats ---------- */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {STATS.map(({ label, value, Icon, tint, href }) => (
          <Link
            key={label}
            href={href}
            className="group rounded-2xl border border-black/10 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-[#BF9A3A]/50 hover:shadow-[0_12px_28px_-20px_rgba(0,0,0,0.45)] sm:p-6"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="text-[12px] font-semibold uppercase tracking-[0.09em] text-[#8A8A8A]">
                {label}
              </p>
              <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${tint}`}>
                <Icon className="h-[18px] w-[18px]" />
              </span>
            </div>
            <p className="mt-4 text-[32px] font-medium leading-none text-[#141414]">{value}</p>
          </Link>
        ))}

        {/* revenue — highlighted */}
        <div className="rounded-2xl bg-gradient-to-br from-[#141414] to-[#2C2418] p-5 text-white sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <p className="text-[12px] font-semibold uppercase tracking-[0.09em] text-[#DBAF36]">
              Revenue (Paid)
            </p>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#DBAF36]/40 bg-[#DBAF36]/15 text-[#DBAF36]">
              <RandIcon className="h-[18px] w-[18px]" />
            </span>
          </div>
          <p className="mt-4 break-words text-[26px] font-medium leading-tight sm:text-[30px]">
            {formatZAR(revenue)}
          </p>
        </div>
      </div>

      {/* ---------- recent orders ---------- */}
      <div className="mt-10">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#8A8A8A]">
            Recent orders
          </h2>
          <Link
            href="/admin/orders"
            className="text-[14px] font-medium text-[#BF9A3A] transition-colors hover:text-[#A8862C]"
          >
            See all
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <div className="mt-5 rounded-2xl border border-dashed border-black/15 bg-[#FAF8F4] px-6 py-12 text-center">
            <p className="text-[15px] text-[#6B6B6B]">No orders yet.</p>
          </div>
        ) : (
          <>
            {/* mobile: cards */}
            <div className="mt-5 space-y-3 md:hidden">
              {recentOrders.map((o) => (
                <Link
                  key={String(o._id)}
                  href={`/admin/orders/${o._id}`}
                  className="block rounded-2xl border border-black/10 bg-white p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-[15px] font-medium text-[#141414]">{o.orderNumber}</p>
                      <p className="mt-1 truncate text-[13px] text-[#8A8A8A]">
                        {o.shippingAddress?.fullName || "—"} &middot; {formatDate(o.createdAt)}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.05em] ${statusStyle(o.orderStatus)}`}
                    >
                      {o.orderStatus}
                    </span>
                  </div>
                  <p className="mt-3 border-t border-black/[0.07] pt-3 text-[16px] font-medium text-[#141414]">
                    {formatZAR(o.total)}
                  </p>
                </Link>
              ))}
            </div>

            {/* desktop: table */}
            <div className="mt-5 hidden overflow-hidden rounded-2xl border border-black/10 md:block">
              <table className="w-full text-[14.5px]">
                <thead>
                  <tr className="bg-[#FAF8F4] text-left">
                    {["Order", "Customer", "Date", "Status", "Total"].map((h, i) => (
                      <th
                        key={h}
                        className={`px-5 py-3.5 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#8A8A8A] ${
                          i === 4 ? "text-right" : ""
                        }`}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.07]">
                  {recentOrders.map((o) => (
                    <tr key={String(o._id)} className="transition-colors hover:bg-[#FCFAF6]">
                      <td className="px-5 py-4">
                        <Link
                          href={`/admin/orders/${o._id}`}
                          className="font-medium text-[#141414] transition-colors hover:text-[#BF9A3A]"
                        >
                          {o.orderNumber}
                        </Link>
                      </td>
                      <td className="px-5 py-4 text-[#5A5A5A]">{o.shippingAddress?.fullName || "—"}</td>
                      <td className="px-5 py-4 text-[#5A5A5A]">{formatDate(o.createdAt)}</td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-block rounded-full border px-3 py-1 text-[11.5px] font-semibold uppercase tracking-[0.05em] ${statusStyle(o.orderStatus)}`}
                        >
                          {o.orderStatus}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right font-medium text-[#141414]">
                        {formatZAR(o.total)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
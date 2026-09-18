// app/admin/orders/page.jsx
import Link from "next/link";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import { formatINR } from "@/lib/format";

// Uses searchParams so this already renders dynamically, but make it
// explicit so it can't silently regress to a frozen static page later.
export const dynamic = "force-dynamic";

const STATUSES = ["all", "pending", "processing", "shipped", "delivered", "cancelled"];

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

function statusStyle(status = "") {
  const s = status.toLowerCase();
  if (["delivered", "completed", "paid"].includes(s)) return "bg-emerald-50 text-emerald-700 border-emerald-200";
  if (["shipped", "dispatched"].includes(s)) return "bg-indigo-50 text-indigo-700 border-indigo-200";
  if (["processing", "confirmed"].includes(s)) return "bg-blue-50 text-blue-700 border-blue-200";
  if (["cancelled", "canceled", "failed", "refunded", "unpaid"].includes(s)) return "bg-red-50 text-red-700 border-red-200";
  return "bg-amber-50 text-amber-700 border-amber-200";
}

function formatDate(d) {
  return new Date(d).toLocaleDateString("en-ZA", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default async function AdminOrdersPage({ searchParams }) {
  const sp = await searchParams;
  const status = sp.status || "all";
  await connectDB();

  const query = status === "all" ? {} : { orderStatus: status };

  const [orders, statusAgg] = await Promise.all([
    Order.find(query).sort({ createdAt: -1 }).lean(),
    Order.aggregate([{ $group: { _id: "$orderStatus", n: { $sum: 1 } } }]),
  ]);

  /* har tab ke liye count */
  const counts = statusAgg.reduce((acc, r) => ({ ...acc, [r._id]: r.n }), {});
  counts.all = statusAgg.reduce((sum, r) => sum + r.n, 0);

  return (
    <div className="pb-12">
      {/* ---------- header ---------- */}
      <div>
        <h1 className="text-[26px] font-medium leading-tight tracking-[-0.01em] text-[#141414] sm:text-[30px]">
          Orders
        </h1>
        <p className="mt-2 text-[15px] text-[#6B6B6B]">
          {orders.length === 0
            ? "Nothing to show for this filter."
            : `${orders.length} order${orders.length > 1 ? "s" : ""}${
                status !== "all" ? ` · ${status}` : ""
              }`}
        </p>
      </div>

      {/* ---------- status tabs ---------- */}
      <div className="admin-orders-tabs -mx-1 mt-6 flex gap-2 overflow-x-auto px-1 pb-1">
        <style>{`
          .admin-orders-tabs { scrollbar-width: none; -ms-overflow-style: none; }
          .admin-orders-tabs::-webkit-scrollbar { display: none; }
        `}</style>

        {STATUSES.map((s) => {
          const active = status === s;
          return (
            <Link
              key={s}
              href={`/admin/orders?status=${s}`}
              aria-current={active ? "page" : undefined}
              className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-[13.5px] font-medium capitalize transition-colors ${
                active
                  ? "bg-[#141414] text-white"
                  : "border border-black/10 bg-white text-[#5A5A5A] hover:border-[#BF9A3A]/60 hover:text-[#BF9A3A]"
              }`}
            >
              {s}
              <span
                className={`rounded-full px-1.5 text-[11.5px] ${
                  active ? "bg-white/15 text-white" : "bg-black/[0.05] text-[#8A8A8A]"
                }`}
              >
                {counts[s] || 0}
              </span>
            </Link>
          );
        })}
      </div>

      {orders.length === 0 ? (
        /* ---------- empty ---------- */
        <div className="mt-6 rounded-2xl border border-dashed border-black/15 bg-[#FAF8F4] px-6 py-16 text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#F1E8D5] text-[#BF9A3A]">
            <BoxIcon className="h-7 w-7" />
          </span>
          <p className="mt-5 text-[17px] font-medium text-[#141414]">
            {status === "all" ? "No orders yet" : `No ${status} orders`}
          </p>
          {status !== "all" && (
            <Link
              href="/admin/orders?status=all"
              className="mt-5 inline-block rounded-lg bg-[#141414] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#BF9A3A]"
            >
              Show all orders
            </Link>
          )}
        </div>
      ) : (
        <>
          {/* ---------- mobile: cards ---------- */}
          <div className="mt-6 space-y-3 lg:hidden">
            {orders.map((o) => (
              <Link
                key={String(o._id)}
                href={`/admin/orders/${o._id}`}
                className="block rounded-2xl border border-black/10 bg-white p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-[15px] font-medium text-[#141414]">{o.orderNumber}</p>
                    <p className="mt-1 truncate text-[13.5px] text-[#5A5A5A]">
                      {o.shippingAddress?.fullName || "—"}
                    </p>
                    <p className="mt-0.5 text-[13px] text-[#8A8A8A]">{formatDate(o.createdAt)}</p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.05em] ${statusStyle(o.orderStatus)}`}
                  >
                    {o.orderStatus}
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-black/[0.07] pt-3">
                  <span
                    className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.05em] ${statusStyle(o.paymentStatus)}`}
                  >
                    {o.paymentStatus}
                  </span>
                  <span className="text-[16px] font-medium text-[#141414]">
                    {formatINR(o.total)}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* ---------- desktop: table ---------- */}
          <div className="mt-6 hidden overflow-hidden rounded-2xl border border-black/10 lg:block">
            <table className="w-full text-[14.5px]">
              <thead>
                <tr className="bg-[#FAF8F4] text-left">
                  {["Order", "Customer", "Date", "Payment", "Status", "Total", ""].map((h, i) => (
                    <th
                      key={h || i}
                      className={`px-5 py-3.5 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#8A8A8A] ${
                        i >= 5 ? "text-right" : ""
                      }`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.07]">
                {orders.map((o) => (
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
                    <td className="whitespace-nowrap px-5 py-4 text-[#5A5A5A]">
                      {formatDate(o.createdAt)}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-block rounded-full border px-2.5 py-1 text-[11.5px] font-semibold uppercase tracking-[0.05em] ${statusStyle(o.paymentStatus)}`}
                      >
                        {o.paymentStatus}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-block rounded-full border px-2.5 py-1 text-[11.5px] font-semibold uppercase tracking-[0.05em] ${statusStyle(o.orderStatus)}`}
                      >
                        {o.orderStatus}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-right font-medium text-[#141414]">
                      {formatINR(o.total)}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <Link
                        href={`/admin/orders/${o._id}`}
                        className="font-medium text-[#BF9A3A] transition-colors hover:text-[#A8862C]"
                      >
                        Manage
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
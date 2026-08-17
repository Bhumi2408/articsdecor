import Link from "next/link";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import { formatZAR } from "@/lib/format";

const STATUSES = ["all", "pending", "processing", "shipped", "delivered", "cancelled"];

export default async function AdminOrdersPage({ searchParams }) {
  const sp = await searchParams;
  const status = sp.status || "all";
  await connectDB();
  const query = status === "all" ? {} : { orderStatus: status };
  const orders = await Order.find(query).sort({ createdAt: -1 }).lean();

  return (
    <div>
      <h1 className="font-serif text-3xl mb-6">Orders</h1>

      <div className="flex gap-2 mb-6 text-sm flex-wrap">
        {STATUSES.map((s) => (
          <Link
            key={s}
            href={`/admin/orders?status=${s}`}
            className={`px-3 py-1 rounded border capitalize ${
              status === s ? "bg-gold text-white border-gold" : "border-border"
            }`}
          >
            {s}
          </Link>
        ))}
      </div>

      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-left text-muted">
            <th className="py-3">Order</th>
            <th className="py-3">Customer</th>
            <th className="py-3">Date</th>
            <th className="py-3">Payment</th>
            <th className="py-3">Status</th>
            <th className="py-3">Total</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o._id} className="border-b border-border">
              <td className="py-3">{o.orderNumber}</td>
              <td className="py-3">{o.shippingAddress?.fullName}</td>
              <td className="py-3">{new Date(o.createdAt).toLocaleDateString("en-ZA")}</td>
              <td className="py-3 capitalize">{o.paymentStatus}</td>
              <td className="py-3 capitalize">{o.orderStatus}</td>
              <td className="py-3">{formatZAR(o.total)}</td>
              <td className="py-3">
                <Link href={`/admin/orders/${o._id}`} className="text-gold hover:text-gold-dark">
                  Manage
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {orders.length === 0 && <p className="text-muted mt-6">No orders found.</p>}
    </div>
  );
}

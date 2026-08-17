import Link from "next/link";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import { getCurrentUser } from "@/lib/auth";
import Breadcrumbs from "@/components/Breadcrumbs";
import { formatZAR } from "@/lib/format";

export default async function OrderHistoryPage() {
  const session = await getCurrentUser();
  await connectDB();
  const orders = await Order.find({ user: session.sub }).sort({ createdAt: -1 }).lean();

  return (
    <div className="container-lute max-w-4xl pb-20">
      <Breadcrumbs items={[{ label: "My Account", href: "/account" }, { label: "Orders" }]} />
      <h1 className="font-serif text-3xl mb-8">Order History</h1>

      {orders.length === 0 ? (
        <p className="text-muted">You haven&rsquo;t placed any orders yet.</p>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-muted">
              <th className="py-3">Order</th>
              <th className="py-3">Date</th>
              <th className="py-3">Status</th>
              <th className="py-3">Total</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o._id} className="border-b border-border">
                <td className="py-3">{o.orderNumber}</td>
                <td className="py-3">{new Date(o.createdAt).toLocaleDateString("en-ZA")}</td>
                <td className="py-3 capitalize">{o.orderStatus}</td>
                <td className="py-3">{formatZAR(o.total)}</td>
                <td className="py-3">
                  <Link href={`/account/orders/${o._id}`} className="text-gold hover:text-gold-dark">
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

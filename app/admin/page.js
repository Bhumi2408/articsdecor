import Link from "next/link";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import Product from "@/models/Product";
import { formatZAR } from "@/lib/format";

export default async function AdminDashboard() {
  await connectDB();
  const [totalOrders, pendingOrders, productCount, revenueAgg] = await Promise.all([
    Order.countDocuments(),
    Order.countDocuments({ orderStatus: "pending" }),
    Product.countDocuments(),
    Order.aggregate([{ $match: { paymentStatus: "paid" } }, { $group: { _id: null, total: { $sum: "$total" } } }]),
  ]);
  const revenue = revenueAgg[0]?.total || 0;

  return (
    <div>
      <h1 className="font-serif text-3xl mb-8">Dashboard</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <StatCard label="Total Orders" value={totalOrders} />
        <StatCard label="Pending Orders" value={pendingOrders} />
        <StatCard label="Products" value={productCount} />
        <StatCard label="Revenue (Paid)" value={formatZAR(revenue)} />
      </div>
      <Link href="/admin/orders" className="text-gold hover:text-gold-dark text-sm">
        View all orders &rarr;
      </Link>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="border border-border rounded-lg p-6">
      <p className="text-sm text-muted mb-1">{label}</p>
      <p className="text-2xl font-serif">{value}</p>
    </div>
  );
}

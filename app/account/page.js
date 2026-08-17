import Link from "next/link";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import Order from "@/models/Order";
import { getCurrentUser } from "@/lib/auth";
import LogoutButton from "@/components/LogoutButton";
import Breadcrumbs from "@/components/Breadcrumbs";

export default async function AccountDashboard() {
  const session = await getCurrentUser();
  await connectDB();
  const [user, orderCount] = await Promise.all([
    User.findById(session.sub).select("name email").lean(),
    Order.countDocuments({ user: session.sub }),
  ]);

  return (
    <div className="container-lute max-w-3xl pb-20">
      <Breadcrumbs items={[{ label: "My Account" }]} />
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl">My Account</h1>
        <LogoutButton endpoint="/api/auth/logout" redirectTo="/" className="text-sm text-muted hover:text-gold" />
      </div>

      <div className="grid sm:grid-cols-2 gap-6 mb-10">
        <div className="border border-border rounded-lg p-6">
          <h2 className="text-sm uppercase tracking-wide text-muted mb-2">Account Details</h2>
          <p className="font-medium">{user.name}</p>
          <p className="text-muted text-sm">{user.email}</p>
        </div>
        <div className="border border-border rounded-lg p-6">
          <h2 className="text-sm uppercase tracking-wide text-muted mb-2">Orders</h2>
          <p className="text-3xl font-serif">{orderCount}</p>
          <Link href="/account/orders" className="text-sm text-gold hover:text-gold-dark">
            View order history &rarr;
          </Link>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 text-sm">
        <Link href="/account/orders" className="border border-border rounded-lg p-4 text-center hover:border-gold">
          Order History
        </Link>
        <Link href="/wishlist" className="border border-border rounded-lg p-4 text-center hover:border-gold">
          Wishlist
        </Link>
        <Link href="/shop" className="border border-border rounded-lg p-4 text-center hover:border-gold">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

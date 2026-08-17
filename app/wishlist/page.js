import Link from "next/link";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { getCurrentUser } from "@/lib/auth";
import ProductCard from "@/components/ProductCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import { toPlain } from "@/lib/serialize";

export default async function WishlistPage() {
  const session = await getCurrentUser();

  if (!session) {
    return (
      <div className="container-lute py-20 text-center">
        <Breadcrumbs items={[{ label: "Wishlist" }]} />
        <p className="text-muted mb-6">Sign in to view and manage your wishlist.</p>
        <Link href="/account/login?next=/wishlist" className="btn-gold px-6 py-3 rounded text-sm">
          Sign In
        </Link>
      </div>
    );
  }

  await connectDB();
  const user = await User.findById(session.sub)
    .populate({ path: "wishlist", populate: { path: "category", select: "name slug" } })
    .lean();
  const products = toPlain(user?.wishlist || []);

  return (
    <div className="container-lute pb-20">
      <Breadcrumbs items={[{ label: "Wishlist" }]} />
      <h1 className="font-serif text-3xl mb-8">Wishlist</h1>

      {products.length === 0 ? (
        <p className="text-muted">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} initialWishlisted={true} />
          ))}
        </div>
      )}
    </div>
  );
}

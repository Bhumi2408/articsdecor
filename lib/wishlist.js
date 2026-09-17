import { connectDB } from "@/lib/db";
import User from "@/models/User";
import Product from "@/models/Product";
import { getCurrentUser } from "@/lib/auth";

export async function getWishlistIds() {
  const session = await getCurrentUser();
  if (!session) return [];
  await connectDB();

  const user = await User.findById(session.sub).select("wishlist");
  const rawIds = user?.wishlist || [];
  if (!rawIds.length) return [];

  // Products can be deleted after being wishlisted, leaving orphaned ids
  // behind — filter those out (and prune them from the user's record) so
  // the count shown in the UI always matches what can actually be displayed.
  const existing = await Product.find({ _id: { $in: rawIds } }).select("_id").lean();
  const existingIds = existing.map((p) => p._id.toString());

  if (existingIds.length !== rawIds.length) {
    user.wishlist = existingIds;
    await user.save();
  }

  return existingIds;
}

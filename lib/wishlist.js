import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { getCurrentUser } from "@/lib/auth";

export async function getWishlistIds() {
  const session = await getCurrentUser();
  if (!session) return [];
  await connectDB();
  const user = await User.findById(session.sub).select("wishlist").lean();
  return (user?.wishlist || []).map((id) => id.toString());
}

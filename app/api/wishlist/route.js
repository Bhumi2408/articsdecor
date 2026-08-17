import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { getCurrentUser } from "@/lib/auth";

export async function POST(req) {
  const session = await getCurrentUser();
  if (!session) return NextResponse.json({ error: "Please sign in" }, { status: 401 });

  const { productId } = await req.json();
  if (!productId) return NextResponse.json({ error: "Product id required" }, { status: 400 });

  await connectDB();
  const user = await User.findById(session.sub);
  if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const idx = user.wishlist.findIndex((id) => id.toString() === productId);
  let inWishlist;
  if (idx >= 0) {
    user.wishlist.splice(idx, 1);
    inWishlist = false;
  } else {
    user.wishlist.push(productId);
    inWishlist = true;
  }
  await user.save();

  return NextResponse.json({ inWishlist });
}

import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import Review from "@/models/Review";
import Product from "@/models/Product";
import { getCurrentUser } from "@/lib/auth";

export async function POST(req) {
  const session = await getCurrentUser();
  if (!session) {
    return NextResponse.json({ error: "Please sign in to leave a review" }, { status: 401 });
  }

  const { productId, rating, comment } = await req.json();
  if (!productId || !rating) {
    return NextResponse.json({ error: "Product and rating are required" }, { status: 400 });
  }

  await connectDB();

  await Review.create({
    product: productId,
    user: session.sub,
    userName: session.name,
    rating,
    comment,
  });

  const [stats] = await Review.aggregate([
    { $match: { product: new mongoose.Types.ObjectId(productId) } },
    { $group: { _id: "$product", avg: { $avg: "$rating" }, count: { $sum: 1 } } },
  ]);

  if (stats) {
    await Product.findByIdAndUpdate(productId, { ratingAvg: stats.avg, ratingCount: stats.count });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}

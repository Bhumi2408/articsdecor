import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import Review from "@/models/Review";
import Product from "@/models/Product";
import { getCurrentUser } from "@/lib/auth";

export async function POST(req) {
  try {
    const session = await getCurrentUser();

    if (!session) {
      return NextResponse.json(
        { error: "Please sign in to leave a review" },
        { status: 401 }
      );
    }

    const { productId, rating, comment } = await req.json();

    if (!productId || !rating) {
      return NextResponse.json(
        { error: "Product and rating are required" },
        { status: 400 }
      );
    }

    await connectDB();

    const review = await Review.create({
      product: productId,
      user: session.sub,
      userName: session.name,
      rating: Number(rating),
      comment: String(comment || "").trim(),
    });

    const [stats] = await Review.aggregate([
      {
        $match: {
          product: new mongoose.Types.ObjectId(productId),
        },
      },
      {
        $group: {
          _id: "$product",
          avg: { $avg: "$rating" },
          count: { $sum: 1 },
        },
      },
    ]);

    if (stats) {
      await Product.findByIdAndUpdate(productId, {
        ratingAvg: stats.avg,
        ratingCount: stats.count,
      });
    }

    return NextResponse.json(
      {
        ok: true,
        review: review.toObject(),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("CREATE REVIEW ERROR:", error);

    return NextResponse.json(
      {
        error: "Could not submit your review",
      },
      { status: 500 }
    );
  }
}

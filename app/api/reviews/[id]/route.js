import { NextResponse } from "next/server";
import mongoose from "mongoose";

import { connectDB } from "@/lib/db";
import Review from "@/models/Review";
import Product from "@/models/Product";
import { getCurrentUser } from "@/lib/auth";

/* =========================================================
   UPDATE PRODUCT RATING STATS
========================================================= */

async function updateProductStats(productId) {
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
  } else {
    // No reviews left
    await Product.findByIdAndUpdate(productId, {
      ratingAvg: 0,
      ratingCount: 0,
    });
  }
}

/* =========================================================
   PATCH — EDIT REVIEW
========================================================= */

export async function PATCH(req, { params }) {
  try {
    const session = await getCurrentUser();

    if (!session) {
      return NextResponse.json(
        {
          error: "Please sign in to edit your review",
        },
        { status: 401 }
      );
    }

    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          error: "Invalid review ID",
        },
        { status: 400 }
      );
    }

    const body = await req.json();

    const rating = Number(body.rating);
    const comment = String(body.comment || "").trim();

    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        {
          error: "Rating must be between 1 and 5",
        },
        { status: 400 }
      );
    }

    if (!comment) {
      return NextResponse.json(
        {
          error: "Review comment is required",
        },
        { status: 400 }
      );
    }

    /*
      IMPORTANT:
      Only the owner of the review can edit it.
      Your POST route stores user as session.sub.
    */

    const review = await Review.findOne({
      _id: id,
      user: session.sub,
    });

    if (!review) {
      return NextResponse.json(
        {
          error: "Review not found or you are not allowed to edit it",
        },
        { status: 404 }
      );
    }

    review.rating = rating;
    review.comment = comment;

    await review.save();

    // Recalculate product rating
    await updateProductStats(review.product);

    return NextResponse.json(
      {
        ok: true,
        message: "Review updated successfully",
        review: review.toObject(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("UPDATE REVIEW ERROR:", error);

    return NextResponse.json(
      {
        error: "Could not update your review",
      },
      { status: 500 }
    );
  }
}

/* =========================================================
   DELETE — DELETE REVIEW
========================================================= */

export async function DELETE(req, { params }) {
  try {
    const session = await getCurrentUser();

    if (!session) {
      return NextResponse.json(
        {
          error: "Please sign in to delete your review",
        },
        { status: 401 }
      );
    }

    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          error: "Invalid review ID",
        },
        { status: 400 }
      );
    }

    /*
      Find ONLY the review belonging to logged-in user.
    */

    const review = await Review.findOne({
      _id: id,
      user: session.sub,
    });

    if (!review) {
      return NextResponse.json(
        {
          error: "Review not found or you are not allowed to delete it",
        },
        { status: 404 }
      );
    }

    const productId = review.product;

    await Review.deleteOne({
      _id: id,
      user: session.sub,
    });

    // Recalculate product rating/count after deletion
    await updateProductStats(productId);

    return NextResponse.json(
      {
        ok: true,
        message: "Review deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE REVIEW ERROR:", error);

    return NextResponse.json(
      {
        error: "Could not delete your review",
      },
      { status: 500 }
    );
  }
}
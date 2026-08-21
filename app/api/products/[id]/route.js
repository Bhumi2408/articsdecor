// app/api/products/[id]/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { getCurrentAdmin } from "@/lib/auth";
import { sanitizeRichText } from "@/lib/sanitize";
import { toApiError } from "@/lib/apiError";
import { validateProduct } from "../route";

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    await connectDB();
    const product = await Product.findById(id).populate("category", "name slug").lean();
    if (!product) return NextResponse.json({ error: "Product not found." }, { status: 404 });
    return NextResponse.json(product);
  } catch (err) {
    const { status, body } = toApiError(err);
    return NextResponse.json(body, { status });
  }
}

export async function PUT(req, { params }) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json(
        { error: "Your session expired. Please sign in again." },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await req.json();
    await connectDB();

    const fieldErrors = validateProduct(body, { partial: true });
    if (Object.keys(fieldErrors).length) {
      return NextResponse.json(
        { error: "Please fix the highlighted fields.", fieldErrors },
        { status: 400 }
      );
    }

    // koi doosra product wahi slug to nahi le raha
    if (body.slug) {
      const clash = await Product.findOne({ slug: body.slug, _id: { $ne: id } })
        .select("_id")
        .lean();
      if (clash) {
        return NextResponse.json(
          {
            error: `Another product already uses the slug "${body.slug}".`,
            fieldErrors: { slug: "This slug is already taken." },
          },
          { status: 409 }
        );
      }
    }

    const update = { ...body };
    if (update.description !== undefined) update.description = sanitizeRichText(update.description);

    const product = await Product.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    });
    if (!product) return NextResponse.json({ error: "Product not found." }, { status: 404 });
    return NextResponse.json(product);
  } catch (err) {
    const { status, body } = toApiError(err);
    return NextResponse.json(body, { status });
  }
}

export async function DELETE(req, { params }) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json(
        { error: "Your session expired. Please sign in again." },
        { status: 401 }
      );
    }

    const { id } = await params;
    await connectDB();
    const product = await Product.findByIdAndDelete(id);
    if (!product) return NextResponse.json({ error: "Product not found." }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch (err) {
    const { status, body } = toApiError(err);
    return NextResponse.json(body, { status });
  }
}
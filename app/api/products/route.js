// app/api/products/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { getCurrentAdmin } from "@/lib/auth";
import { sanitizeRichText } from "@/lib/sanitize";
import { toApiError } from "@/lib/apiError";

const SORT_MAP = {
  "price-asc": { price: 1 },
  "price-desc": { price: -1 },
  rating: { ratingAvg: -1 },
  latest: { createdAt: -1 },
  default: { createdAt: -1 },
};

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const sort = searchParams.get("sort") || "default";
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.min(48, Math.max(1, parseInt(searchParams.get("limit") || "16", 10) || 16));

    const query = {
      hiddenFromStore: { $ne: true },
    };
    if (category) query.category = category;
    if (search) query.name = { $regex: escapeRegex(search), $options: "i" };
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const [items, total] = await Promise.all([
      Product.find(query)
        .populate("category", "name slug")
        .sort(SORT_MAP[sort] || SORT_MAP.default)
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Product.countDocuments(query),
    ]);

    return NextResponse.json({ items, total, page, pages: Math.max(1, Math.ceil(total / limit)) });
  } catch (err) {
    const { status, body } = toApiError(err);
    return NextResponse.json(body, { status });
  }
}

/* ---------- shared validation ---------- */
export function validateProduct(body, { partial = false } = {}) {
  const fieldErrors = {};
  const has = (k) => !partial || body[k] !== undefined;

  if (has("name") && !String(body.name || "").trim()) {
    fieldErrors.name = "Name is required.";
  }

  if (has("slug")) {
    const slug = String(body.slug || "").trim();
    if (!slug) fieldErrors.slug = "Slug is required.";
    else if (!/^[a-z0-9-]+$/.test(slug))
      fieldErrors.slug = "Only lowercase letters, numbers and hyphens.";
  }

  if (has("price")) {
    const price = Number(body.price);
    if (body.price === "" || body.price == null || Number.isNaN(price))
      fieldErrors.price = "Enter a valid price.";
    else if (price < 0) fieldErrors.price = "Price cannot be negative.";
  }

  if (body.compareAtPrice != null && body.compareAtPrice !== "") {
    const compare = Number(body.compareAtPrice);
    if (Number.isNaN(compare)) fieldErrors.compareAtPrice = "Enter a valid amount.";
    else if (compare > 0 && compare <= Number(body.price))
      fieldErrors.compareAtPrice = "Must be higher than the price.";
  }

  if (body.stock != null && body.stock !== "") {
    const stock = Number(body.stock);
    if (Number.isNaN(stock)) fieldErrors.stock = "Enter a valid number.";
    else if (stock < 0) fieldErrors.stock = "Stock cannot be negative.";
  }

  if (has("images") && Array.isArray(body.images) && body.images.length === 0) {
    fieldErrors.images = "Add at least one image.";
  }

  return fieldErrors;
}

export async function POST(req) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json(
        { error: "Your session expired. Please sign in again." },
        { status: 401 }
      );
    }

    await connectDB();
    const body = await req.json();

    const fieldErrors = validateProduct(body);
    if (Object.keys(fieldErrors).length) {
      return NextResponse.json(
        { error: "Please fix the highlighted fields.", fieldErrors },
        { status: 400 }
      );
    }

    if (body.hiddenFromStore) body.featured = false;

    // slug pehle se hai kya — Mongo error se pehle saaf message
    const exists = await Product.findOne({ slug: body.slug }).select("_id").lean();
    if (exists) {
      return NextResponse.json(
        {
          error: `A product with the slug "${body.slug}" already exists.`,
          fieldErrors: { slug: "This slug is already taken." },
        },
        { status: 409 }
      );
    }

    const product = await Product.create({
      ...body,
      description: sanitizeRichText(body.description),
    });
    return NextResponse.json(product, { status: 201 });
  } catch (err) {
    const { status, body } = toApiError(err);
    return NextResponse.json(body, { status });
  }
}
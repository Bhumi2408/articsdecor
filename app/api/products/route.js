import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { getCurrentAdmin } from "@/lib/auth";
import { sanitizeRichText } from "@/lib/sanitize";

const SORT_MAP = {
  "price-asc": { price: 1 },
  "price-desc": { price: -1 },
  rating: { ratingAvg: -1 },
  latest: { createdAt: -1 },
  default: { createdAt: -1 },
};

export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const sort = searchParams.get("sort") || "default";
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const limit = Math.min(48, parseInt(searchParams.get("limit") || "16", 10));

  const query = {};
  if (category) query.category = category;
  if (search) query.name = { $regex: search, $options: "i" };
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
}

export async function POST(req) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const body = await req.json();

  if (!body.name || !body.slug || body.price == null) {
    return NextResponse.json({ error: "Name, slug and price are required" }, { status: 400 });
  }

  const product = await Product.create({ ...body, description: sanitizeRichText(body.description) });
  return NextResponse.json(product, { status: 201 });
}

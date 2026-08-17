import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import BlogPost from "@/models/BlogPost";
import { getCurrentAdmin } from "@/lib/auth";
import { sanitizeRichText } from "@/lib/sanitize";

export async function GET() {
  await connectDB();
  const posts = await BlogPost.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json({ items: posts });
}

export async function POST(req) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const body = await req.json();

  if (!body.title || !body.slug) {
    return NextResponse.json({ error: "Title and slug are required" }, { status: 400 });
  }

  const post = await BlogPost.create({ ...body, content: sanitizeRichText(body.content) });
  return NextResponse.json(post, { status: 201 });
}

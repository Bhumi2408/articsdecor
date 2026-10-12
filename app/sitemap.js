import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import Category from "@/models/Category";
import BlogPost from "@/models/BlogPost";
import { SITE_URL } from "@/lib/siteUrl";

// Forces this to re-run on every request instead of being frozen as a
// static file at build time, so a newly added product/category/blog post
// shows up in the sitemap immediately — no rebuild needed.
export const dynamic = "force-dynamic";

const STATIC_PATHS = [
  "",
  "/about-us",
  "/contact",
  "/products",
  "/shop",
  "/materials",
  "/blog",
  "/delivery-returns",
  "/privacy",
  "/terms",
  "/haryana",
  "/mumbai",
];

export default async function sitemap() {
  await connectDB();

  const [products, categories, posts] = await Promise.all([
    Product.find({ hiddenFromStore: { $ne: true } })
      .select("slug updatedAt")
      .lean(),
    Category.find().select("slug updatedAt").lean(),
    BlogPost.find().select("slug updatedAt").lean(),
  ]);

  const now = new Date();

  const staticEntries = STATIC_PATHS.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "daily",
    priority: path === "" ? 1 : 0.7,
  }));

  const productEntries = products.map((p) => ({
    url: `${SITE_URL}/product/${p.slug}`,
    lastModified: p.updatedAt || now,
    changeFrequency: "daily",
    priority: 0.8,
  }));

  const categoryEntries = categories.map((c) => ({
    url: `${SITE_URL}/product-category/${c.slug}`,
    lastModified: c.updatedAt || now,
    changeFrequency: "daily",
    priority: 0.7,
  }));

  const blogEntries = posts.map((b) => ({
    url: `${SITE_URL}/blog/${b.slug}`,
    lastModified: b.updatedAt || now,
    changeFrequency: "daily",
    priority: 0.6,
  }));

  return [...staticEntries, ...productEntries, ...categoryEntries, ...blogEntries];
}

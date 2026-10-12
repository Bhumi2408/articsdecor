import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import Category from "@/models/Category";
import BlogPost from "@/models/BlogPost";
import { SITE_URL } from "@/lib/siteUrl";

// Re-run on every request so a newly added product/category/blog post is
// reflected immediately, same as the sitemap.
export const dynamic = "force-dynamic";

export async function GET() {
  await connectDB();

  const [categories, products, posts] = await Promise.all([
    Category.find().select("name slug").sort({ name: 1 }).lean(),
    Product.find({ hiddenFromStore: { $ne: true } })
      .select("name slug")
      .sort({ createdAt: -1 })
      .lean(),
    BlogPost.find().select("title slug").sort({ createdAt: -1 }).lean(),
  ]);

  const lines = [
    "# Artics Decorr",
    "",
    "> Premium outdoor furniture manufacturer in India — wicker sofa sets, poolside loungers, gazebos, daybeds and more, built for durability and style.",
    "",
    "## Site",
    `- [Home](${SITE_URL}/)`,
    `- [Shop](${SITE_URL}/shop)`,
    `- [All Products](${SITE_URL}/products)`,
    `- [About Us](${SITE_URL}/about-us)`,
    `- [Materials](${SITE_URL}/materials)`,
    `- [Blog](${SITE_URL}/blog)`,
    `- [Contact](${SITE_URL}/contact)`,
    "",
    "## Categories",
    ...categories.map((c) => `- [${c.name}](${SITE_URL}/product-category/${c.slug})`),
    "",
    "## Products",
    ...products.map((p) => `- [${p.name}](${SITE_URL}/product/${p.slug})`),
    "",
    "## Blog",
    ...posts.map((b) => `- [${b.title}](${SITE_URL}/blog/${b.slug})`),
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

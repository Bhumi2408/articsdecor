import Link from "next/link";
import Image from "next/image";
import { connectDB } from "@/lib/db";
import BlogPost from "@/models/BlogPost";
import Breadcrumbs from "@/components/Breadcrumbs";

export default async function BlogPage() {
  await connectDB();
  const posts = await BlogPost.find().sort({ createdAt: -1 }).lean();

  return (
    <div className="container-lute pb-20">
      <Breadcrumbs items={[{ label: "Blog" }]} />
      <h1 className="font-serif text-3xl mb-8">Blog</h1>

      {posts.length === 0 ? (
        <p className="text-muted">No articles published yet.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug}`}
              className="border border-border rounded-lg overflow-hidden bg-surface group"
            >
              <div className="aspect-video bg-gold-light relative overflow-hidden">
                {post.coverImage && (
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    sizes="33vw"
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                )}
              </div>
              <div className="p-5">
                <h2 className="font-serif text-lg mb-2">{post.title}</h2>
                <p className="text-sm text-muted line-clamp-3">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

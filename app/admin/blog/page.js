import Link from "next/link";
import Image from "next/image";
import { connectDB } from "@/lib/db";
import BlogPost from "@/models/BlogPost";
import DeleteBlogButton from "@/components/admin/DeleteBlogButton";

export default async function AdminBlogPage() {
  await connectDB();
  const posts = await BlogPost.find().sort({ createdAt: -1 }).lean();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-3xl">Blog</h1>
        <Link href="/admin/blog/new" className="btn-gold px-4 py-2 rounded text-sm">
          New Post
        </Link>
      </div>

      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-left text-muted">
            <th className="py-3">Cover</th>
            <th className="py-3">Title</th>
            <th className="py-3">Slug</th>
            <th className="py-3">Published</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {posts.map((p) => (
            <tr key={p._id} className="border-b border-border">
              <td className="py-3">
                <div className="w-12 h-12 relative bg-gold-light rounded overflow-hidden shrink-0">
                  {p.coverImage && <Image src={p.coverImage} alt={p.title} fill sizes="48px" className="object-cover" />}
                </div>
              </td>
              <td className="py-3">{p.title}</td>
              <td className="py-3">{p.slug}</td>
              <td className="py-3">{new Date(p.createdAt).toLocaleDateString("en-ZA")}</td>
              <td className="py-3">
                <div className="flex gap-3">
                  <Link href={`/admin/blog/${p._id}/edit`} className="text-gold hover:text-gold-dark">
                    Edit
                  </Link>
                  <DeleteBlogButton id={p._id.toString()} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {posts.length === 0 && <p className="text-muted mt-6">No blog posts yet.</p>}
    </div>
  );
}

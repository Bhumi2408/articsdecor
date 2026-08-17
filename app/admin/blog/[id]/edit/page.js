import { notFound } from "next/navigation";
import { connectDB } from "@/lib/db";
import BlogPost from "@/models/BlogPost";
import BlogForm from "@/components/admin/BlogForm";

export default async function EditBlogPostPage({ params }) {
  const { id } = await params;
  await connectDB();
  const post = await BlogPost.findById(id).lean();
  if (!post) notFound();

  return (
    <div>
      <h1 className="font-serif text-3xl mb-8">Edit Blog Post</h1>
      <BlogForm initialPost={JSON.parse(JSON.stringify(post))} />
    </div>
  );
}

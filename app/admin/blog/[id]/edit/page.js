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
      <BlogForm initialPost={JSON.parse(JSON.stringify(post))} />
    </div>
  );
}

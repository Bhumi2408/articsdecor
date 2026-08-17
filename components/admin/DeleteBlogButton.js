"use client";

import { useRouter } from "next/navigation";

export default function DeleteBlogButton({ id }) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm("Delete this blog post?")) return;
    await fetch(`/api/blog/${id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <button onClick={handleDelete} className="text-red-600 hover:text-red-800">
      Delete
    </button>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUploader from "./ImageUploader";

export default function CategoryForm({ initialCategory }) {
  const router = useRouter();
  const isEdit = Boolean(initialCategory);

  const [form, setForm] = useState({
    name: initialCategory?.name || "",
    slug: initialCategory?.slug || "",
    description: initialCategory?.description || "",
    image: initialCategory?.image || "",
  });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const url = isEdit ? `/api/categories/${initialCategory._id}` : "/api/categories";
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not save category");

      if (isEdit) {
        router.push("/admin/categories");
      } else {
        setForm({ name: "", slug: "", description: "", image: "" });
      }
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="border border-border rounded-lg p-6 space-y-4 h-fit">
      <h2 className="font-serif text-lg">{isEdit ? "Edit Category" : "Add Category"}</h2>
      <div>
        <label className="block text-sm mb-1">Name</label>
        <input
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full border border-border rounded px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label className="block text-sm mb-1">Slug</label>
        <input
          required
          value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
          className="w-full border border-border rounded px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label className="block text-sm mb-1">Description</label>
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={3}
          className="w-full border border-border rounded px-3 py-2 text-sm"
        />
      </div>
      <ImageUploader label="Category Image" value={form.image} onChange={(url) => setForm({ ...form, image: url })} />
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <button type="submit" disabled={saving} className="btn-gold px-5 py-2 rounded text-sm">
        {saving ? "Saving..." : isEdit ? "Update Category" : "Add Category"}
      </button>
    </form>
  );
}

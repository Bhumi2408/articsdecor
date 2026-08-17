"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUploader from "./ImageUploader";
import RichTextEditor from "./RichTextEditor";

export default function BlogForm({ initialPost }) {
  const router = useRouter();
  const isEdit = Boolean(initialPost);

  const [form, setForm] = useState({
    title: initialPost?.title || "",
    slug: initialPost?.slug || "",
    excerpt: initialPost?.excerpt || "",
    content: initialPost?.content || "",
    coverImage: initialPost?.coverImage || "",
    metaTitle: initialPost?.metaTitle || "",
    metaDescription: initialPost?.metaDescription || "",
    keywords: initialPost?.keywords?.join(", ") || "",
  });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function update(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const payload = {
        ...form,
        keywords: form.keywords
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      };
      const url = isEdit ? `/api/blog/${initialPost._id}` : "/api/blog";
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not save blog post");
      router.push("/admin/blog");
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
      <div className="grid sm:grid-cols-2 gap-4">
        <TextField label="Title" value={form.title} onChange={(v) => update("title", v)} required />
        <TextField label="Slug" value={form.slug} onChange={(v) => update("slug", v)} required />
      </div>

      <div>
        <label className="block text-sm mb-1">Excerpt</label>
        <textarea
          value={form.excerpt}
          onChange={(e) => update("excerpt", e.target.value)}
          rows={2}
          className="w-full border border-border rounded px-3 py-2 text-sm"
        />
      </div>

      <ImageUploader label="Cover Image" value={form.coverImage} onChange={(url) => update("coverImage", url)} />

      <RichTextEditor
        label="Content"
        value={form.content}
        onChange={(html) => update("content", html)}
        placeholder="Write your article..."
      />

      <fieldset className="border border-border rounded-lg p-4">
        <legend className="text-sm uppercase tracking-wide px-1">SEO</legend>
        <div className="space-y-4">
          <TextField label="Meta Title" value={form.metaTitle} onChange={(v) => update("metaTitle", v)} />
          <div>
            <label className="block text-sm mb-1">Meta Description</label>
            <textarea
              value={form.metaDescription}
              onChange={(e) => update("metaDescription", e.target.value)}
              rows={2}
              maxLength={160}
              className="w-full border border-border rounded px-3 py-2 text-sm"
            />
            <p className="text-xs text-muted mt-1">{form.metaDescription.length}/160 characters</p>
          </div>
          <TextField label="Keywords (comma separated)" value={form.keywords} onChange={(v) => update("keywords", v)} />
        </div>
      </fieldset>

      {error && <p className="text-red-600 text-sm">{error}</p>}
      <button type="submit" disabled={saving} className="btn-gold px-6 py-3 rounded text-sm">
        {saving ? "Saving..." : isEdit ? "Update Post" : "Publish Post"}
      </button>
    </form>
  );
}

function TextField({ label, value, onChange, type = "text", required = false }) {
  return (
    <div>
      <label className="block text-sm mb-1">{label}</label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-border rounded px-3 py-2 text-sm"
      />
    </div>
  );
}

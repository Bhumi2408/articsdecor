"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MultiImageUploader from "./MultiImageUploader";
import RichTextEditor from "./RichTextEditor";

export default function ProductForm({ categories, initialProduct }) {
  const router = useRouter();
  const isEdit = Boolean(initialProduct);

  const [form, setForm] = useState({
    name: initialProduct?.name || "",
    slug: initialProduct?.slug || "",
    price: initialProduct?.price ?? "",
    compareAtPrice: initialProduct?.compareAtPrice ?? "",
    category: initialProduct?.category?._id || initialProduct?.category || "",
    description: initialProduct?.description || "",
    images: initialProduct?.images || [],
    stock: initialProduct?.stock ?? 10,
    collectionTag: initialProduct?.collectionTag || "",
    featured: initialProduct?.featured || false,
    metaTitle: initialProduct?.metaTitle || "",
    metaDescription: initialProduct?.metaDescription || "",
    keywords: initialProduct?.keywords?.join(", ") || "",
    specs: {
      centerStone: initialProduct?.specs?.centerStone || "",
      accentStones: initialProduct?.specs?.accentStones || "",
      metal: initialProduct?.specs?.metal || "",
      totalCarats: initialProduct?.specs?.totalCarats || "",
      totalWeight: initialProduct?.specs?.totalWeight || "",
      size: initialProduct?.specs?.size || "",
      certificate: initialProduct?.specs?.certificate || "",
    },
  });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function update(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }
  function updateSpec(key, value) {
    setForm((f) => ({ ...f, specs: { ...f.specs, [key]: value } }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        compareAtPrice: form.compareAtPrice ? Number(form.compareAtPrice) : null,
        stock: Number(form.stock),
        keywords: form.keywords
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      };
      const url = isEdit ? `/api/products/${initialProduct._id}` : "/api/products";
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not save product");
      router.push("/admin/products");
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
        <TextField label="Name" value={form.name} onChange={(v) => update("name", v)} required />
        <TextField label="Slug" value={form.slug} onChange={(v) => update("slug", v)} required />
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        <TextField label="Price (R)" type="number" value={form.price} onChange={(v) => update("price", v)} required />
        <TextField
          label="Compare-at Price (R)"
          type="number"
          value={form.compareAtPrice}
          onChange={(v) => update("compareAtPrice", v)}
        />
        <TextField label="Stock" type="number" value={form.stock} onChange={(v) => update("stock", v)} />
      </div>

      <div>
        <label className="block text-sm mb-1">Category</label>
        <select
          value={form.category}
          onChange={(e) => update("category", e.target.value)}
          className="w-full border border-border rounded px-3 py-2 text-sm"
        >
          <option value="">Select category</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <MultiImageUploader label="Product Images" values={form.images} onChange={(v) => update("images", v)} />
      <TextField label="Collection Tag" value={form.collectionTag} onChange={(v) => update("collectionTag", v)} />

      <RichTextEditor
        label="Description"
        value={form.description}
        onChange={(html) => update("description", html)}
        placeholder="Describe this piece..."
      />

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={form.featured} onChange={(e) => update("featured", e.target.checked)} />
        Feature on homepage
      </label>

      <fieldset className="border border-border rounded-lg p-4">
        <legend className="text-sm uppercase tracking-wide px-1">SEO</legend>
        <div className="space-y-4">
          <TextField
            label="Meta Title"
            value={form.metaTitle}
            onChange={(v) => update("metaTitle", v)}
          />
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
          <TextField
            label="Keywords (comma separated)"
            value={form.keywords}
            onChange={(v) => update("keywords", v)}
          />
        </div>
      </fieldset>

      <fieldset className="border border-border rounded-lg p-4">
        <legend className="text-sm uppercase tracking-wide px-1">Specifications</legend>
        <div className="grid sm:grid-cols-2 gap-4">
          <TextField label="Center Stone" value={form.specs.centerStone} onChange={(v) => updateSpec("centerStone", v)} />
          <TextField label="Accent Stones" value={form.specs.accentStones} onChange={(v) => updateSpec("accentStones", v)} />
          <TextField label="Metal" value={form.specs.metal} onChange={(v) => updateSpec("metal", v)} />
          <TextField label="Total Carats" value={form.specs.totalCarats} onChange={(v) => updateSpec("totalCarats", v)} />
          <TextField label="Total Weight" value={form.specs.totalWeight} onChange={(v) => updateSpec("totalWeight", v)} />
          <TextField label="Size" value={form.specs.size} onChange={(v) => updateSpec("size", v)} />
          <TextField label="Certificate" value={form.specs.certificate} onChange={(v) => updateSpec("certificate", v)} />
        </div>
      </fieldset>

      {error && <p className="text-red-600 text-sm">{error}</p>}
      <button type="submit" disabled={saving} className="btn-gold px-6 py-3 rounded text-sm">
        {saving ? "Saving..." : isEdit ? "Update Product" : "Create Product"}
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

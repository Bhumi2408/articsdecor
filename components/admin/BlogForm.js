"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ImageUploader from "./ImageUploader";
import RichTextEditor from "./RichTextEditor";

/* =========================================================
   COMMON STYLES
========================================================= */

const inputClass =
  "w-full rounded-xl border border-[#E5E1D9] bg-white px-4 py-3 text-[14px] text-[#172033] outline-none transition-all placeholder:text-[#A5A5A5] focus:border-[#9E1B13] focus:ring-4 focus:ring-[#9E1B13]/10";

const labelClass =
  "mb-2 block text-[11px] font-bold uppercase tracking-[0.14em] text-[#687080]";

/* =========================================================
   ICONS
========================================================= */

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

const ArrowLeftIcon = (p) => (
  <svg {...iconProps} {...p}>
    <path d="M19 12H5" />
    <path d="M11 6l-6 6 6 6" />
  </svg>
);

const ExternalIcon = (p) => (
  <svg {...iconProps} {...p}>
    <path d="M14 5h5v5" />
    <path d="M19 5l-8 8" />
    <path d="M18 13v5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 4 18V7a1.5 1.5 0 0 1 1.5-1.5h5" />
  </svg>
);

const SaveIcon = (p) => (
  <svg {...iconProps} {...p}>
    <path d="M5 4h11l3 3v13H5z" />
    <path d="M8 4v5h7V4" />
    <path d="M8 20v-6h8v6" />
  </svg>
);

const ImageIcon = (p) => (
  <svg {...iconProps} {...p}>
    <rect x="3.5" y="4" width="17" height="16" rx="2" />
    <circle cx="8.5" cy="9" r="1.5" />
    <path d="M20.5 15l-4.5-4.5L7 19.5" />
  </svg>
);

const SearchIcon = (p) => (
  <svg {...iconProps} {...p}>
    <circle cx="10.8" cy="10.8" r="6.3" />
    <path d="M15.5 15.5 20 20" />
  </svg>
);

/* =========================================================
   HELPERS
========================================================= */

const slugify = (s) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

function Card({ eyebrow, title, description, children, className = "" }) {
  return (
    <section
      className={`overflow-hidden rounded-2xl border border-[#E5E1D9] bg-white shadow-[0_8px_30px_rgba(22,32,51,0.04)] ${className}`}
    >
      {(eyebrow || title || description) && (
        <div className="border-b border-[#ECE8E1] px-5 py-5 sm:px-6">
          {eyebrow && (
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9E1B13]">
              {eyebrow}
            </p>
          )}

          {title && (
            <h2 className="mt-1 text-[18px] font-semibold text-[#16324F]">
              {title}
            </h2>
          )}

          {description && (
            <p className="mt-1.5 text-[13px] leading-5 text-[#7B818D]">
              {description}
            </p>
          )}
        </div>
      )}

      <div className="p-5 sm:p-6">{children}</div>
    </section>
  );
}

function TextField({
  label,
  value,
  onChange,
  type = "text",
  required = false,
  placeholder,
  hint,
}) {
  return (
    <div>
      <label className={labelClass}>
        {label}
        {required && <span className="ml-1 text-[#9E1B13]">*</span>}
      </label>

      <input
        type={type}
        required={required}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass}
      />

      {hint && (
        <p className="mt-2 text-[12px] leading-5 text-[#999D A5]">
          {hint}
        </p>
      )}
    </div>
  );
}

/* =========================================================
   FORM
========================================================= */

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

  const [slugTouched, setSlugTouched] = useState(isEdit);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function update(key, value) {
    setForm((f) => ({
      ...f,
      [key]: value,
    }));
  }

  function updateTitle(value) {
    setForm((f) => ({
      ...f,
      title: value,
      slug: slugTouched ? f.slug : slugify(value),
    }));
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

      const url = isEdit
        ? `/api/blog/${initialPost._id}`
        : "/api/blog";

      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Could not save blog post");
      }

      router.push("/admin/blog");
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  const metaLen = form.metaDescription.length;

  const keywordChips = form.keywords
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <form onSubmit={handleSubmit} className="pb-12">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="mb-7 flex flex-col gap-5 border-b border-[#E4E0D8] pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <Link
              href="/admin/blog"
              className="flex items-center gap-1.5 text-[13px] font-medium text-[#777D87] transition-colors hover:text-[#9E1B13]"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Blog
            </Link>

            <span className="text-[#C4C0B8]">/</span>

            <span className="text-[13px] font-medium text-[#16324F]">
              {isEdit ? "Edit Post" : "New Post"}
            </span>
          </div>

          <h2 className="text-[27px] font-semibold tracking-[-0.02em] text-[#16324F] sm:text-[32px]">
            {isEdit ? "Edit Post" : "Create New Post"}
          </h2>

          <p className="mt-1.5 text-[14px] text-[#777D87]">
            {isEdit
              ? "Update your article content and publishing details."
              : "Write, optimize and publish a new article."}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {isEdit && form.slug && (
            <Link
              href={`/blog/${form.slug}`}
              target="_blank"
              className="inline-flex items-center gap-2 rounded-xl border border-[#DDD8CF] bg-white px-4 py-2.5 text-[13px] font-semibold text-[#555C68] transition-all hover:border-[#9E1B13] hover:text-[#9E1B13]"
            >
              <ExternalIcon className="h-4 w-4" />
              Preview
            </Link>
          )}

          <Link
            href="/admin/blog"
            className="rounded-xl px-3 py-2.5 text-[13px] font-semibold text-[#777D87] transition-colors hover:text-[#9E1B13]"
          >
            Cancel
          </Link>
        </div>
      </div>

      {/* =====================================================
          MAIN GRID
      ===================================================== */}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_350px]">

        {/* ===================================================
            LEFT / MAIN CONTENT
        =================================================== */}

        <div className="min-w-0 space-y-6">

          {/* POST DETAILS */}
          <Card
            eyebrow="Article"
            title="Post Details"
            description="Basic information that will appear with your article."
          >
            <div className="space-y-5">

              <TextField
                label="Title"
                value={form.title}
                onChange={updateTitle}
                placeholder="Premium Outdoor Furniture Manufacturer"
                required
              />

              {/* SLUG */}
              <div>
                <label className={labelClass}>
                  Slug <span className="ml-1 text-[#9E1B13]">*</span>
                </label>

                <div className="flex overflow-hidden rounded-xl border border-[#E5E1D9] bg-white transition-all focus-within:border-[#9E1B13] focus-within:ring-4 focus-within:ring-[#9E1B13]/10">
                  <span className="flex shrink-0 items-center border-r border-[#E5E1D9] bg-[#F7F5F0] px-4 text-[13px] font-medium text-[#858A94]">
                    /blog/
                  </span>

                  <input
                    required
                    value={form.slug}
                    onChange={(e) => {
                      setSlugTouched(true);
                      update("slug", slugify(e.target.value));
                    }}
                    placeholder="premium-outdoor-furniture-manufacturer"
                    className="w-full min-w-0 bg-transparent px-4 py-3 text-[14px] text-[#172033] outline-none placeholder:text-[#A5A5A5]"
                  />
                </div>

                <p className="mt-2 text-[12px] leading-5 text-[#999D A5]">
                  {isEdit
                    ? "Changing the slug can affect existing links."
                    : "The slug is automatically generated from the title."}
                </p>
              </div>

              {/* EXCERPT */}
              <div>
                <label className={labelClass}>
                  Excerpt
                </label>

                <textarea
                  value={form.excerpt}
                  onChange={(e) => update("excerpt", e.target.value)}
                  rows={4}
                  placeholder="Write a short summary that appears on the blog listing and homepage."
                  className={`${inputClass} resize-y`}
                />
              </div>
            </div>
          </Card>

          {/* CONTENT */}
          <Card
            eyebrow="Editor"
            title="Article Content"
            description="Write and format the complete article."
          >
            <div className="overflow-hidden rounded-xl border border-[#E5E1D9]">
              <RichTextEditor
                value={form.content}
                onChange={(html) => update("content", html)}
                placeholder="Start writing your article..."
              />
            </div>
          </Card>

        </div>

        {/* ===================================================
            RIGHT SIDEBAR
        =================================================== */}

        <aside className="space-y-6 xl:sticky xl:top-28 xl:self-start">

          {/* PUBLISH CARD */}
          <section className="overflow-hidden rounded-2xl bg-[#16324F] shadow-[0_15px_40px_rgba(22,50,79,0.15)]">

            <div className="relative overflow-hidden px-5 py-5 sm:px-6">

              <div className="pointer-events-none absolute -right-12 -top-16 h-36 w-36 rounded-full border border-white/[0.08]" />
              <div className="pointer-events-none absolute -bottom-20 -left-12 h-36 w-36 rounded-full border border-[#9E1B13]/30" />

              <div className="relative">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D9A86C]">
                  Publishing
                </p>

                <h3 className="mt-1 text-[19px] font-semibold text-white">
                  {isEdit ? "Update Article" : "Publish Article"}
                </h3>

                <p className="mt-1.5 text-[12.5px] leading-5 text-white/60">
                  {isEdit
                    ? "Save your latest changes to this article."
                    : "Your article will be available on the website after publishing."}
                </p>
              </div>
            </div>

            <div className="bg-white p-5 sm:p-6">

              {error && (
                <div
                  role="alert"
                  className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] leading-5 text-red-700"
                >
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={saving}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#9E1B13] px-5 py-3.5 text-[14px] font-semibold text-white shadow-[0_8px_20px_rgba(158,27,19,0.18)] transition-all hover:bg-[#86170F] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                ) : (
                  <SaveIcon className="h-[17px] w-[17px]" />
                )}

                {saving
                  ? "Saving..."
                  : isEdit
                    ? "Update Post"
                    : "Publish Post"}
              </button>

            </div>
          </section>

          {/* COVER IMAGE */}
          <Card
            eyebrow="Media"
            title="Cover Image"
            description="Choose the main image for this article."
          >
            <div className="mb-4 flex items-center gap-3 rounded-xl bg-[#F7F5F0] p-3.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-[#9E1B13]">
                <ImageIcon className="h-[18px] w-[18px]" />
              </span>

              <p className="text-[12px] leading-5 text-[#737985]">
                This image will represent your post on listings and previews.
              </p>
            </div>

            <ImageUploader
              value={form.coverImage}
              onChange={(url) => update("coverImage", url)}
            />
          </Card>

          {/* SEO */}
          <Card
            eyebrow="Search"
            title="SEO Settings"
            description="Leave fields blank to use the article title and excerpt."
          >
            <div className="space-y-5">

              <TextField
                label="Meta Title"
                value={form.metaTitle}
                onChange={(v) => update("metaTitle", v)}
                placeholder={form.title || "Page title for Google"}
              />

              <div>
                <label className={labelClass}>
                  Meta Description
                </label>

                <textarea
                  value={form.metaDescription}
                  onChange={(e) =>
                    update("metaDescription", e.target.value)
                  }
                  rows={4}
                  maxLength={160}
                  placeholder="Write the description that can appear in search results."
                  className={`${inputClass} resize-y`}
                />

                <div className="mt-2 flex items-center justify-between text-[11.5px]">
                  <span className="text-[#999D A5]">
                    Recommended: 120–160 characters
                  </span>

                  <span
                    className={
                      metaLen > 150
                        ? "font-semibold text-amber-600"
                        : "text-[#999D A5]"
                    }
                  >
                    {metaLen}/160
                  </span>
                </div>
              </div>

              <div>
                <TextField
                  label="Keywords"
                  value={form.keywords}
                  onChange={(v) => update("keywords", v)}
                  placeholder="furniture, outdoor, manufacturer"
                  hint="Separate multiple keywords with commas."
                />

                {keywordChips.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {keywordChips.map((k, i) => (
                      <span
                        key={`${k}-${i}`}
                        className="rounded-full border border-[#E6D5B6] bg-[#FBF4E7] px-3 py-1.5 text-[11.5px] font-semibold text-[#8B681F]"
                      >
                        {k}
                      </span>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </Card>

        </aside>
      </div>

      {/* =====================================================
          MOBILE SAVE BUTTON
      ===================================================== */}

      <div className="mt-6 xl:hidden">
        <button
          type="submit"
          disabled={saving}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#9E1B13] px-5 py-3.5 text-[14px] font-semibold text-white shadow-[0_8px_20px_rgba(158,27,19,0.18)] transition-all hover:bg-[#86170F] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
          ) : (
            <SaveIcon className="h-[17px] w-[17px]" />
          )}

          {saving
            ? "Saving..."
            : isEdit
              ? "Update Post"
              : "Publish Post"}
        </button>
      </div>
    </form>
  );
}
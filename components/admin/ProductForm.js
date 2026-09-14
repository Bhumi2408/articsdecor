"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MultiImageUploader from "./MultiImageUploader";
import RichTextEditor from "./RichTextEditor";
import SpecsEditor from "./SpecsEditor";
import { readApiError } from "@/lib/apiError";

/* ── TOAST ───────────────────────────────────────────────────────────
   Change this one line to match the library already wired into layout.js:
     sonner          →  import { toast } from "sonner";
     react-hot-toast →  import toast from "react-hot-toast";
   Both expose toast.success() / toast.error(), so nothing else changes.
──────────────────────────────────────────────────────────────────── */
import { toast } from "sonner";

const inputClass =
  "w-full rounded-[4px] border border-[#132c47]/15 bg-white px-3.5 py-2.5 text-[14.5px] text-[#132c47] outline-none transition-all placeholder:text-[#a3aab1] focus:border-[#770800] focus:ring-2 focus:ring-[#770800]/15";

const labelClass =
  "mb-1.5 block text-[11px] font-bold uppercase tracking-[0.16em] text-[#737d86]";

const slugify = (s) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

function Card({ title, description, children }) {
  return (
    <section className="rounded-[4px] border border-[#132c47]/12 bg-white p-5 sm:p-6">
      {title && (
        <div className="mb-5">
          <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#770800]">
            {title}
          </h2>
          {description && (
            <p className="mt-1.5 text-[13.5px] leading-relaxed text-[#737d86]">{description}</p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}

function FieldError({ children }) {
  if (!children) return null;
  return (
    <p
      data-field-error
      className="mt-1.5 flex items-start gap-1 text-[12.5px] font-medium text-[#770800]"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        aria-hidden="true"
        className="mt-[2px] h-3.5 w-3.5 shrink-0"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v4.5M12 16h.01" />
      </svg>
      {children}
    </p>
  );
}

function TextField({
  label,
  value,
  onChange,
  type = "text",
  required,
  placeholder,
  hint,
  prefix,
  error,
}) {
  const ring = error
    ? "border-[#770800] focus:border-[#770800] focus-within:border-[#770800] focus:ring-[#770800]/20 focus-within:ring-[#770800]/20"
    : "border-[#132c47]/15 focus:border-[#770800] focus-within:border-[#770800] focus:ring-[#770800]/15 focus-within:ring-[#770800]/15";

  return (
    <div>
      <label className={labelClass}>
        {label}
        {required && <span className="ml-1 text-[#770800]">*</span>}
      </label>

      {prefix ? (
        <div
          className={`flex items-stretch overflow-hidden rounded-[4px] border transition-all focus-within:ring-2 ${ring}`}
        >
          <span className="flex shrink-0 items-center border-r border-[#132c47]/12 bg-[#f5f3ee] px-3 text-[14px] text-[#737d86]">
            {prefix}
          </span>
          <input
            type={type}
            required={required}
            value={value}
            placeholder={placeholder}
            aria-invalid={Boolean(error)}
            onChange={(e) => onChange(e.target.value)}
            className="w-full min-w-0 bg-white px-3.5 py-2.5 text-[14.5px] text-[#132c47] outline-none placeholder:text-[#a3aab1]"
          />
        </div>
      ) : (
        <input
          type={type}
          required={required}
          value={value}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full rounded-[4px] border bg-white px-3.5 py-2.5 text-[14.5px] text-[#132c47] outline-none transition-all placeholder:text-[#a3aab1] focus:ring-2 ${ring}`}
        />
      )}

      <FieldError>{error}</FieldError>
      {!error && hint && <p className="mt-1.5 text-[12.5px] text-[#9aa0a5]">{hint}</p>}
    </div>
  );
}

/* Old products stored specs as an object with fixed keys.
   Convert them to rows so editing an old product doesn't blow up. */
const LEGACY_LABELS = {
  centerStone: "Center Stone",
  accentStones: "Accent Stones",
  metal: "Metal",
  totalCarats: "Total Carats",
  totalWeight: "Total Weight",
  size: "Size",
  certificate: "Certificate",
};

function toSpecRows(specs) {
  if (Array.isArray(specs)) return specs;
  if (specs && typeof specs === "object") {
    return Object.entries(LEGACY_LABELS)
      .filter(([key]) => specs[key])
      .map(([key, label]) => ({ label, value: specs[key] }));
  }
  return [];
}

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
    imageAlt: initialProduct?.imageAlt || "",
    stock: initialProduct?.stock ?? 10,
    collectionTag: initialProduct?.collectionTag || "",
    featured: initialProduct?.featured || false,
    hiddenFromStore: initialProduct?.hiddenFromStore || false,
    metaTitle: initialProduct?.metaTitle || "",
    metaDescription: initialProduct?.metaDescription || "",
    keywords: initialProduct?.keywords?.join(", ") || "",
    specs: toSpecRows(initialProduct?.specs),
  });

  const [slugTouched, setSlugTouched] = useState(isEdit);
  const [fieldErrors, setFieldErrors] = useState({});
  const [saving, setSaving] = useState(false);

  function clearFieldError(key) {
    setFieldErrors((fe) => {
      if (!fe[key]) return fe;
      const next = { ...fe };
      delete next[key];
      return next;
    });
  }

  function update(key, value) {
    clearFieldError(key);
    setForm((f) => ({ ...f, [key]: value }));
  }

  function updateName(value) {
    clearFieldError("name");
    if (!slugTouched) clearFieldError("slug");
    setForm((f) => ({ ...f, name: value, slug: slugTouched ? f.slug : slugify(value) }));
  }

  function scrollToFirstError() {
    setTimeout(() => {
      const el = document.querySelector("[data-field-error]");
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 50);
  }

  /* Catch the obvious problems before hitting the server */
  function validate() {
    const fe = {};
    if (!form.name.trim()) fe.name = "Name is required.";
    if (!form.slug.trim()) fe.slug = "Slug is required.";
    if (form.price === "" || Number.isNaN(Number(form.price))) fe.price = "Enter a valid price.";
    else if (Number(form.price) < 0) fe.price = "Price cannot be negative.";
    if (form.compareAtPrice !== "" && Number(form.compareAtPrice) <= Number(form.price))
      fe.compareAtPrice = "Must be higher than the price.";
    if (form.stock !== "" && Number(form.stock) < 0) fe.stock = "Stock cannot be negative.";
    if (!form.category) fe.category = "Pick a category.";
    if (!form.images.length) fe.images = "Add at least one image.";

    const halfFilled = form.specs.some(
      (row) => Boolean(row.label?.trim()) !== Boolean(row.value?.trim())
    );
    if (halfFilled) fe.specs = "Every specification row needs both a label and a value.";

    return fe;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const localErrors = validate();
    if (Object.keys(localErrors).length) {
      setFieldErrors(localErrors);
      const count = Object.keys(localErrors).length;
      toast.error(count === 1 ? Object.values(localErrors)[0] : `Fix ${count} fields below.`);
      scrollToFirstError();
      return;
    }

    setSaving(true);
    setFieldErrors({});

    try {
      const payload = {
        ...form,
        price: Number(form.price),
        compareAtPrice: form.compareAtPrice ? Number(form.compareAtPrice) : null,
        stock: Number(form.stock),
        /* drop empty rows so blank ones never reach the database */
        specs: form.specs
          .map((row) => ({ label: (row.label || "").trim(), value: (row.value || "").trim() }))
          .filter((row) => row.label && row.value),
        keywords: form.keywords
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      };

      const url = isEdit ? `/api/products/${initialProduct._id}` : "/api/products";
      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const { error: message, fieldErrors: serverFields } = await readApiError(res);
        setFieldErrors(serverFields);
        toast.error(message || "Could not save product.");
        if (Object.keys(serverFields).length) scrollToFirstError();
        return;
      }

      toast.success(isEdit ? "Product updated." : "Product created.");
      router.push("/admin/products");
      router.refresh();
    } catch (err) {
      toast.error(
        err instanceof TypeError
          ? "Could not reach the server. Check your connection and try again."
          : err.message || "Could not save product."
      );
    } finally {
      setSaving(false);
    }
  }

  const metaLen = form.metaDescription.length;
  const price = Number(form.price) || 0;
  const compare = Number(form.compareAtPrice) || 0;
  const discount =
    compare > price && price > 0 ? Math.round(((compare - price) / compare) * 100) : 0;
  const keywordChips = form.keywords
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const SaveButton = ({ className = "" }) => (
    <button
      type="submit"
      disabled={saving}
      className={`flex w-full items-center justify-center gap-2 rounded-[4px] bg-[#132c47] py-3.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#770800] disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
    >
      {saving && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
      )}
      {saving ? "Saving…" : isEdit ? "Update product" : "Create product"}
    </button>
  );

  return (
    <form onSubmit={handleSubmit}>
      {/* ---------- header ---------- */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="mb-2 block text-[9px] font-bold uppercase tracking-[0.28em] text-[#770800]">
            Catalogue
          </span>
          <h1 className="font-serif text-[26px] leading-tight text-[#132c47] sm:text-[32px]">
            {isEdit ? "Edit Product" : "New Product"}
          </h1>
          <p className="mt-1.5 text-[14px] text-[#737d86]">
            {isEdit
              ? "Update this product and save your changes."
              : "Add a new product to the store."}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {isEdit && form.slug && (
            <Link
              href={`/product/${form.slug}`}
              target="_blank"
              className="rounded-[4px] border border-[#132c47]/15 px-4 py-2.5 text-[9px] font-bold uppercase tracking-[0.18em] text-[#66717c] transition-colors hover:border-[#770800] hover:text-[#770800]"
            >
              Preview
            </Link>
          )}
          <Link
            href="/admin/products"
            className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#737d86] transition-colors hover:text-[#770800]"
          >
            Cancel
          </Link>
        </div>
      </div>

      {/* ---------- body ---------- */}
      <div className="mt-7 grid gap-6 xl:grid-cols-[1fr_330px] xl:items-start">
        <div className="min-w-0 space-y-6">
          <Card title="Basics">
            <div className="space-y-5">
              <TextField
                label="Name"
                value={form.name}
                onChange={updateName}
                placeholder="Rehau Wicker Corner Sofa Set"
                error={fieldErrors.name}
                required
              />

              <div>
                <label className={labelClass}>
                  Slug <span className="ml-1 text-[#770800]">*</span>
                </label>
                <div
                  className={`flex items-stretch overflow-hidden rounded-[4px] border transition-all focus-within:ring-2 ${fieldErrors.slug
                    ? "border-[#770800] focus-within:border-[#770800] focus-within:ring-[#770800]/20"
                    : "border-[#132c47]/15 focus-within:border-[#770800] focus-within:ring-[#770800]/15"
                    }`}
                >
                  <span className="hidden shrink-0 items-center border-r border-[#132c47]/12 bg-[#f5f3ee] px-3 text-[13px] text-[#737d86] sm:flex">
                    /product/
                  </span>
                  <input
                    required
                    value={form.slug}
                    placeholder="rehau-wicker-corner-sofa-set"
                    onChange={(e) => {
                      setSlugTouched(true);
                      update("slug", slugify(e.target.value));
                    }}
                    aria-invalid={Boolean(fieldErrors.slug)}
                    className="w-full min-w-0 bg-white px-3.5 py-2.5 text-[14.5px] text-[#132c47] outline-none placeholder:text-[#a3aab1]"
                  />
                </div>
                <FieldError>{fieldErrors.slug}</FieldError>
                {!fieldErrors.slug && (
                  <p className="mt-1.5 text-[12.5px] text-[#9aa0a5]">
                    {isEdit
                      ? "Careful — changing this breaks existing links."
                      : "Generated from the name automatically."}
                  </p>
                )}
              </div>
            </div>
          </Card>

          <Card title="Pricing & stock">
            <div className="grid gap-5 sm:grid-cols-3">
              <TextField
                label="Price"
                type="number"
                prefix="₹"
                value={form.price}
                onChange={(v) => update("price", v)}
                placeholder="0"
                error={fieldErrors.price}
                required
              />
              <TextField
                label="Compare-at"
                type="number"
                prefix="₹"
                value={form.compareAtPrice}
                onChange={(v) => update("compareAtPrice", v)}
                placeholder="Optional"
                error={fieldErrors.compareAtPrice}
                hint={discount > 0 ? `${discount}% off` : "Original price"}
              />
              <TextField
                label="Stock"
                type="number"
                value={form.stock}
                onChange={(v) => update("stock", v)}
                error={fieldErrors.stock}
              />
            </div>

            {compare > 0 && compare <= price && (
              <p className="mt-3 rounded-[4px] border border-[#770800]/25 bg-[#770800]/5 px-3.5 py-2.5 text-[13px] text-[#770800]">
                Compare-at price should be higher than the price, otherwise no discount will show.
              </p>
            )}
          </Card>

          <Card
            title="Images"
            description="The first image is used on product cards and listings."
          >
            <MultiImageUploader values={form.images} onChange={(v) => update("images", v)} />
            <FieldError>{fieldErrors.images}</FieldError>
            <div className="mt-5">
              <TextField
                label="Main image alt text"
                value={form.imageAlt}
                onChange={(v) => update("imageAlt", v)}
                placeholder="Describe the main product image for search and screen readers"
                hint="Applied to the first product image. Leave blank to use the product name."
              />
            </div>
          </Card>

          <Card
            title="Description"
            description="This is the long write-up shown on the product page. Headings, paragraphs and lists are all supported — the page layout gives it a full-width reading column, so write as much as you need."
          >
            <RichTextEditor
              value={form.description}
              onChange={(html) => update("description", html)}
              placeholder="Describe the materials, construction, dimensions, and who this piece is for…"
            />
          </Card>

          <Card
            title="Specification table"
            description="Add whatever rows this product needs. These appear as the specification table on the product page."
          >
            <SpecsEditor value={form.specs} onChange={(v) => update("specs", v)} />
            <FieldError>{fieldErrors.specs}</FieldError>
          </Card>
        </div>

        {/* sidebar */}
        <aside className="space-y-6 xl:sticky xl:top-32">
          <Card>
            <SaveButton />
          </Card>

          <Card title="Organisation">
            <div className="space-y-5">
              <div>
                <label className={labelClass}>Category</label>
                <div className="relative">
                  <select
                    value={form.category}
                    onChange={(e) => update("category", e.target.value)}
                    aria-invalid={Boolean(fieldErrors.category)}
                    className={`w-full appearance-none rounded-[4px] border bg-white px-3.5 py-2.5 pr-10 text-[14.5px] text-[#132c47] outline-none transition-all focus:ring-2 ${fieldErrors.category
                      ? "border-[#770800] focus:border-[#770800] focus:ring-[#770800]/20"
                      : "border-[#132c47]/15 focus:border-[#770800] focus:ring-[#770800]/15"
                      }`}
                  >
                    <option value="">Select category</option>
                    {categories.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#737d86]"
                  >
                    <path d="m6 9.5 6 6 6-6" />
                  </svg>
                </div>
                <FieldError>{fieldErrors.category}</FieldError>
              </div>

              <TextField
                label="Collection Tag"
                value={form.collectionTag}
                onChange={(v) => update("collectionTag", v)}
                placeholder="Poolside"
              />

              {/* Featured */}
              <label className="flex cursor-pointer items-center justify-between gap-3 rounded-[4px] border border-[#132c47]/15 px-3.5 py-3">
                <span>
                  <span className="block text-[14.5px] font-medium text-[#132c47]">
                    Featured
                  </span>
                  <span className="mt-0.5 block text-[12.5px] text-[#737d86]">
                    {form.hiddenFromStore
                      ? "Hidden products can't be featured"
                      : "Show on homepage"}
                  </span>
                </span>

                <span className="relative inline-flex shrink-0">
                  <input
                    type="checkbox"
                    checked={Boolean(form.featured)}
                    disabled={Boolean(form.hiddenFromStore)}
                    onChange={(e) => update("featured", e.target.checked)}
                    className="peer sr-only"
                  />
                  <span className="block h-6 w-11 rounded-full bg-[#132c47]/15 transition-colors peer-checked:bg-[#770800]" />
                  <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5" />
                </span>
              </label>

              {/* Hide from Store */}
              <label className="flex cursor-pointer items-center justify-between gap-3 rounded-[4px] border border-[#770800]/20 bg-[#770800]/[0.03] px-3.5 py-3">
                <span>
                  <span className="block text-[14.5px] font-medium text-[#132c47]">
                    Hide from Store
                  </span>
                  <span className="mt-0.5 block text-[12.5px] text-[#737d86]">
                    Product stays accessible by direct URL but won't appear in listings
                  </span>
                </span>

                <span className="relative inline-flex shrink-0">
                  <input
                    type="checkbox"
                    checked={Boolean(form.hiddenFromStore)}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setForm((f) => ({
                        ...f,
                        hiddenFromStore: checked,
                        featured: checked ? false : f.featured,   // hidden ON hote hi featured OFF
                      }));
                      clearFieldError("hiddenFromStore");
                      clearFieldError("featured");
                    }}
                    className="peer sr-only"
                  />
                  <span className="block h-6 w-11 rounded-full bg-[#132c47]/15 transition-colors peer-checked:bg-[#770800]" />
                  <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5" />
                </span>
              </label>
            </div>
          </Card>

          <Card title="SEO" description="Leave blank to fall back to the name and description.">
            <div className="space-y-5">
              <TextField
                label="Meta Title"
                value={form.metaTitle}
                onChange={(v) => update("metaTitle", v)}
                placeholder={form.name || "Page title for Google"}
              />

              <div>
                <label className={labelClass}>Meta Description</label>
                <textarea
                  value={form.metaDescription}
                  onChange={(e) => update("metaDescription", e.target.value)}
                  rows={3}
                  maxLength={160}
                  placeholder="Snippet shown in search results."
                  className={`${inputClass} resize-y`}
                />
                <div className="mt-1.5 flex items-center justify-between text-[12.5px]">
                  <span className="text-[#9aa0a5]">Aim for 120–160</span>
                  <span className={metaLen > 150 ? "text-[#770800]" : "text-[#9aa0a5]"}>
                    {metaLen}/160
                  </span>
                </div>
              </div>

              <div>
                <TextField
                  label="Keywords"
                  value={form.keywords}
                  onChange={(v) => update("keywords", v)}
                  placeholder="wicker sofa, outdoor furniture, rehau"
                  hint="Comma separated."
                />
                {keywordChips.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {keywordChips.map((k, i) => (
                      <span
                        key={`${k}-${i}`}
                        className="rounded-full bg-[#f5f3ee] px-2.5 py-1 text-[12px] font-medium text-[#66717c]"
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

      {/* sidebar sits below the form on mobile, so repeat the save button */}
      <div className="mt-6 xl:hidden">
        <SaveButton />
      </div>
    </form>
  );
}

// components/admin/MultiImageUploader.jsx
"use client";

import { useRef, useState } from "react";
import Image from "next/image";

const MAX_MB = 5;

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

const UploadIcon = (p) => (
  <svg {...iconProps} {...p}>
    <path d="M12 16V4M8 8l4-4 4 4" />
    <path d="M4 16v2.5A1.5 1.5 0 0 0 5.5 20h13a1.5 1.5 0 0 0 1.5-1.5V16" />
  </svg>
);
const XIcon = (p) => (
  <svg {...iconProps} {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);
const LeftIcon = (p) => (
  <svg {...iconProps} {...p}>
    <path d="M14 6l-6 6 6 6" />
  </svg>
);
const RightIcon = (p) => (
  <svg {...iconProps} {...p}>
    <path d="M10 6l6 6-6 6" />
  </svg>
);

export default function MultiImageUploader({ label, values = [], onChange }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState("");

  async function uploadFiles(fileList) {
    const files = Array.from(fileList || []).filter((f) => f.type.startsWith("image/"));
    if (!files.length) return;

    const tooBig = files.find((f) => f.size > MAX_MB * 1024 * 1024);
    if (tooBig) {
      setError(`"${tooBig.name}" is larger than ${MAX_MB}MB.`);
      return;
    }

    setUploading(true);
    setError("");
    setProgress({ done: 0, total: files.length });

    const uploaded = [];
    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch("/api/upload", { method: "POST", body: formData });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Upload failed");
        uploaded.push(data.url);
        setProgress((p) => ({ ...p, done: p.done + 1 }));
      }
      onChange([...values, ...uploaded]);
    } catch (err) {
      // jo upload ho chuki hain wo bacha lo
      if (uploaded.length) onChange([...values, ...uploaded]);
      setError(err.message);
    } finally {
      setUploading(false);
      setProgress({ done: 0, total: 0 });
    }
  }

  function handleInput(e) {
    uploadFiles(e.target.files);
    e.target.value = "";
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragOver(false);
    uploadFiles(e.dataTransfer.files);
  }

  function removeAt(index) {
    onChange(values.filter((_, i) => i !== index));
  }

  function move(index, dir) {
    const next = [...values];
    const target = index + dir;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  }

  return (
    <div>
      {label && (
        <label className="mb-1.5 block text-[12.5px] font-semibold uppercase tracking-[0.07em] text-[#6B6B6B]">
          {label}
        </label>
      )}

      {/* ---------- grid ---------- */}
      {values.length > 0 && (
        <div className="mb-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
          {values.map((url, i) => (
            <div
              key={url + i}
              className="group relative aspect-square overflow-hidden rounded-xl border border-black/10 bg-[#F1ECE2]"
            >
              <Image src={url} alt="" fill sizes="140px" className="object-cover" />

              {i === 0 && (
                <span className="absolute left-1.5 top-1.5 rounded-full bg-[#141414]/85 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.06em] text-white">
                  Main
                </span>
              )}

              {/* remove */}
              <button
                type="button"
                onClick={() => removeAt(i)}
                aria-label="Remove image"
                className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity hover:bg-red-600 focus:opacity-100 group-hover:opacity-100"
              >
                <XIcon className="h-3.5 w-3.5" />
              </button>

              {/* reorder */}
              <div className="absolute inset-x-0 bottom-0 flex justify-between bg-gradient-to-t from-black/65 to-transparent px-1.5 pb-1.5 pt-5 opacity-0 transition-opacity focus-within:opacity-100 group-hover:opacity-100">
                <button
                  type="button"
                  onClick={() => move(i, -1)}
                  disabled={i === 0}
                  aria-label="Move left"
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-[#141414] transition-opacity disabled:opacity-30"
                >
                  <LeftIcon className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => move(i, 1)}
                  disabled={i === values.length - 1}
                  aria-label="Move right"
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-[#141414] transition-opacity disabled:opacity-30"
                >
                  <RightIcon className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ---------- drop zone ---------- */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && inputRef.current?.click()}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-4 py-7 text-center transition-colors ${
          dragOver ? "border-[#BF9A3A] bg-[#FBF7EE]" : "border-black/15 bg-[#FAF8F4] hover:border-[#BF9A3A]/60"
        }`}
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F1E8D5] text-[#BF9A3A]">
          <UploadIcon className="h-5 w-5" />
        </span>
        <p className="mt-3 text-[14px] font-medium text-[#141414]">
          {uploading ? `Uploading ${progress.done + 1} of ${progress.total}...` : "Drop images or click to upload"}
        </p>
        <p className="mt-1 text-[12.5px] text-[#8A8A8A]">
          Multiple files allowed &middot; max {MAX_MB}MB each
        </p>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleInput}
          className="hidden"
        />
      </div>

      {values.length > 0 && (
  <p className="mt-2 text-[12.5px] text-[#9A9A9A]">
    {values.length} image{values.length > 1 ? "s" : ""} &middot; The first image will appear in listings — use the arrows to change the order.
  </p>
)}

      {error && (
        <p role="alert" className="mt-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-[13px] text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
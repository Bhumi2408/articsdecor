// components/admin/ImageUploader.jsx
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

export default function ImageUploader({ label, value, onChange }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState("");

  async function upload(file) {
    if (!file || !file.type.startsWith("image/")) return;
    if (file.size > MAX_MB * 1024 * 1024) {
      setError(`Image is larger than ${MAX_MB}MB.`);
      return;
    }

    setUploading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      onChange(data.url);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      {label && (
        <label className="mb-1.5 block text-[12.5px] font-semibold uppercase tracking-[0.07em] text-[#6B6B6B]">
          {label}
        </label>
      )}

      {value ? (
        <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-black/10 bg-[#F1ECE2]">
          <Image src={value} alt="Preview" fill sizes="320px" className="object-cover" />

          <button
            type="button"
            onClick={() => onChange("")}
            aria-label="Remove image"
            className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-red-600"
          >
            <XIcon className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="absolute inset-x-0 bottom-0 bg-black/60 py-2.5 text-[13px] font-medium text-white opacity-0 transition-opacity hover:bg-black/75 group-hover:opacity-100"
          >
            {uploading ? "Uploading..." : "Replace image"}
          </button>
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            upload(e.dataTransfer.files?.[0]);
          }}
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
            {uploading ? "Uploading..." : "Drop an image or click to upload"}
          </p>
          <p className="mt-1 text-[12.5px] text-[#8A8A8A]">Max {MAX_MB}MB</p>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          upload(e.target.files?.[0]);
          e.target.value = "";
        }}
        className="hidden"
      />

      {error && (
        <p role="alert" className="mt-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-[13px] text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
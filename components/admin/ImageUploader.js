"use client";

import { useState } from "react";
import Image from "next/image";

export default function ImageUploader({ label, value, onChange }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
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
      e.target.value = "";
    }
  }

  return (
    <div>
      {label && <label className="block text-sm mb-1">{label}</label>}
      {value && (
        <div className="w-24 h-24 relative rounded border border-border overflow-hidden mb-2 bg-gold-light">
          <Image src={value} alt="Preview" fill sizes="96px" className="object-cover" />
        </div>
      )}
      <input type="file" accept="image/*" onChange={handleFile} className="text-sm" />
      {uploading && <p className="text-xs text-muted mt-1">Uploading...</p>}
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
      {value && (
        <button type="button" onClick={() => onChange("")} className="text-xs text-red-600 mt-1 block">
          Remove image
        </button>
      )}
    </div>
  );
}

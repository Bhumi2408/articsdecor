"use client";

import { useState } from "react";
import Image from "next/image";

export default function MultiImageUploader({ label, values = [], onChange }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFiles(e) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploading(true);
    setError("");
    try {
      const uploaded = [];
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch("/api/upload", { method: "POST", body: formData });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Upload failed");
        uploaded.push(data.url);
      }
      onChange([...values, ...uploaded]);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  function removeAt(index) {
    onChange(values.filter((_, i) => i !== index));
  }

  return (
    <div>
      {label && <label className="block text-sm mb-1">{label}</label>}
      {values.length > 0 && (
        <div className="flex flex-wrap gap-3 mb-2">
          {values.map((url, i) => (
            <div key={url + i} className="relative w-20 h-20 rounded border border-border overflow-hidden bg-gold-light">
              <Image src={url} alt="" fill sizes="80px" className="object-cover" />
              <button
                type="button"
                onClick={() => removeAt(i)}
                className="absolute top-0 right-0 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center leading-none"
                aria-label="Remove image"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
      <input type="file" accept="image/*" multiple onChange={handleFiles} className="text-sm" />
      {uploading && <p className="text-xs text-muted mt-1">Uploading...</p>}
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}

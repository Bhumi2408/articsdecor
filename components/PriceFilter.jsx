// components/PriceFilter.jsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function PriceFilter({ defaultMin, defaultMax, category }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [min, setMin] = useState(defaultMin || "");
  const [max, setMax] = useState(defaultMax || "");

  function handleSubmit(e) {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (min) params.set("minPrice", min);
    else params.delete("minPrice");
    if (max) params.set("maxPrice", max);
    else params.delete("maxPrice");
    params.set("page", "1");
    router.push(`/shop?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center gap-2 mb-4">
        <input
          type="number"
          value={min}
          onChange={(e) => setMin(e.target.value)}
          placeholder="Min"
          className="w-1/2 border border-border rounded px-2 py-1.5 text-sm"
        />
        <span className="text-muted">—</span>
        <input
          type="number"
          value={max}
          onChange={(e) => setMax(e.target.value)}
          placeholder="Max"
          className="w-1/2 border border-border rounded px-2 py-1.5 text-sm"
        />
      </div>
      <button className="btn-gold text-xs px-5 py-2.5 rounded w-full">Filter</button>
    </form>
  );
}
// components/ShopSearchBar.jsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";

export default function ShopSearchBar({ defaultValue = "" }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(defaultValue);

  function handleSubmit(e) {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (value.trim()) {
      params.set("search", value.trim());
    } else {
      params.delete("search");
    }
    params.set("page", "1");
    router.push(`/shop?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search products..."
        className="w-full border border-border rounded-full pl-4 pr-11 py-2.5 text-sm bg-white focus:outline-none focus:border-gold"
      />
      <button
        type="submit"
        aria-label="Search"
        className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center"
      >
        <Search className="w-4 h-4" />
      </button>
    </form>
  );
}
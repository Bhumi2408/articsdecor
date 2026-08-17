"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProductGallery({ images = [], name }) {
  const [active, setActive] = useState(0);
  const displayImages = images.length ? images : [""];

  return (
    <div>
      <div className="aspect-square bg-gold-light rounded-lg overflow-hidden relative">
        {displayImages[active] ? (
          <Image
            src={displayImages[active]}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted">No image</div>
        )}
      </div>

      {displayImages.length > 1 && (
        <div className="flex gap-3 mt-4">
          {displayImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-16 h-16 rounded border overflow-hidden relative ${
                i === active ? "border-gold" : "border-border"
              }`}
            >
              <Image src={img} alt={`${name} ${i + 1}`} fill sizes="64px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// components/MobileFilterDrawer.jsx
"use client";

import { useEffect, useState } from "react";

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

const FilterIcon = (p) => (
  <svg {...iconProps} {...p}>
    <path d="M4 6h16M7 12h10M10 18h4" />
  </svg>
);
const XIcon = (p) => (
  <svg {...iconProps} {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export default function MobileFilterDrawer({ activeCount = 0, children }) {
  const [open, setOpen] = useState(false);

  /* drawer khula ho to page scroll band */
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <style>{`
        @keyframes luteSheetUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
        @keyframes luteFadeIn { from { opacity: 0; } to { opacity: 1; } }
        .lute-sheet { animation: luteSheetUp .28s cubic-bezier(0.22,0.61,0.36,1); }
        .lute-scrim { animation: luteFadeIn .2s ease-out; }
        @media (prefers-reduced-motion: reduce) {
          .lute-sheet, .lute-scrim { animation: none; }
        }
      `}</style>

      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-black/15 bg-white py-2.5 text-[14px] font-medium text-[#1B1B1B] transition-colors active:bg-[#FAF8F4]"
      >
        <FilterIcon className="h-[18px] w-[18px]" />
        Filters
        {activeCount > 0 && (
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#BF9A3A] px-1.5 text-[11px] font-semibold text-white">
            {activeCount}
          </span>
        )}
      </button>

      {open && (
        <div className="fixed inset-0 z-[60] md:hidden" role="dialog" aria-modal="true" aria-label="Filters">
          <button
            type="button"
            aria-label="Close filters"
            onClick={() => setOpen(false)}
            className="lute-scrim absolute inset-0 h-full w-full bg-black/45"
          />

          <div className="lute-sheet absolute inset-x-0 bottom-0 flex max-h-[85vh] flex-col rounded-t-2xl bg-white pb-[env(safe-area-inset-bottom)]">
            {/* grab handle */}
            <div className="flex justify-center pt-3">
              <span className="h-1 w-10 rounded-full bg-black/15" />
            </div>

            <div className="flex items-center justify-between border-b border-black/[0.07] px-5 py-3.5">
              <h2 className="text-[16px] font-medium text-[#141414]">Filters</h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="flex h-8 w-8 items-center justify-center rounded-full text-[#5A5A5A] transition-colors hover:bg-black/5"
              >
                <XIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">{children}</div>

            <div className="border-t border-black/[0.07] px-5 py-3.5">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="w-full rounded-lg bg-[#141414] py-3 text-[15px] font-semibold text-white transition-colors active:bg-[#BF9A3A]"
              >
                Show results
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
"use client";

/* Repeatable label/value rows for the product specification table.
   Replaces the seven fixed jewellery fields — every product can now
   define whatever rows it needs. */

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

const PlusIcon = (p) => (
  <svg {...iconProps} {...p}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);
const TrashIcon = (p) => (
  <svg {...iconProps} {...p}>
    <path d="M4 7h16M9.5 7V5h5v2M6.5 7l.8 12.2a1 1 0 0 0 1 .8h7.4a1 1 0 0 0 1-.8L17.5 7" />
  </svg>
);
const UpIcon = (p) => (
  <svg {...iconProps} {...p}>
    <path d="m6 14 6-6 6 6" />
  </svg>
);
const DownIcon = (p) => (
  <svg {...iconProps} {...p}>
    <path d="m6 10 6 6 6-6" />
  </svg>
);

/* One click adds a row that's already labelled — saves typing the
   same handful of labels on every product. */
const PRESETS = [
  "Material",
  "Size",
  "Dimensions",
  "Brand",
  "Country of Origin",
  "Model No.",
  "Usage / Application",
  "Color",
  "Set Contain",
  "Shape",
  "Seating Capacity",
];

const inputClass =
  "w-full min-w-0 rounded-[4px] border border-[#132c47]/15 bg-white px-3 py-2.5 text-[14px] text-[#132c47] outline-none transition-all placeholder:text-[#a3aab1] focus:border-[#770800] focus:ring-2 focus:ring-[#770800]/15";

export default function SpecsEditor({ value = [], onChange }) {
  /* Guard against products still holding the old object shape */
  const rows = Array.isArray(value) ? value : [];

  const update = (index, key, next) => {
    const copy = rows.map((row, i) => (i === index ? { ...row, [key]: next } : row));
    onChange(copy);
  };

  const addRow = (label = "") => onChange([...rows, { label, value: "" }]);

  const removeRow = (index) => onChange(rows.filter((_, i) => i !== index));

  const move = (index, direction) => {
    const target = index + direction;
    if (target < 0 || target >= rows.length) return;
    const copy = [...rows];
    [copy[index], copy[target]] = [copy[target], copy[index]];
    onChange(copy);
  };

  const usedLabels = new Set(
    rows.map((row) => (row.label || "").trim().toLowerCase())
  );

  return (
    <div>
      {rows.length === 0 ? (
        <p className="rounded-[4px] border border-dashed border-[#132c47]/20 bg-[#f5f3ee] px-4 py-8 text-center text-[13.5px] text-[#737d86]">
          No rows yet. Add one below, or start from a suggested label.
        </p>
      ) : (
        <div className="space-y-2.5">
          {/* column headings, desktop only */}
          <div className="hidden gap-2.5 px-1 sm:grid sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)_auto]">
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#737d86]">
              Label
            </span>
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#737d86]">
              Value
            </span>
            <span className="w-[104px]" />
          </div>

          {rows.map((row, index) => (
            <div
              key={index}
              className="grid gap-2.5 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)_auto]"
            >
              <input
                value={row.label || ""}
                onChange={(e) => update(index, "label", e.target.value)}
                placeholder="Material"
                aria-label={`Specification ${index + 1} label`}
                className={inputClass}
              />
              <input
                value={row.value || ""}
                onChange={(e) => update(index, "value", e.target.value)}
                placeholder="German Rehau synthetic wicker"
                aria-label={`Specification ${index + 1} value`}
                className={inputClass}
              />

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => move(index, -1)}
                  disabled={index === 0}
                  aria-label="Move row up"
                  className="grid h-9 w-9 place-items-center rounded-[4px] border border-[#132c47]/15 text-[#737d86] transition-colors hover:border-[#132c47]/40 hover:text-[#132c47] disabled:opacity-30"
                >
                  <UpIcon className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => move(index, 1)}
                  disabled={index === rows.length - 1}
                  aria-label="Move row down"
                  className="grid h-9 w-9 place-items-center rounded-[4px] border border-[#132c47]/15 text-[#737d86] transition-colors hover:border-[#132c47]/40 hover:text-[#132c47] disabled:opacity-30"
                >
                  <DownIcon className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => removeRow(index)}
                  aria-label="Remove row"
                  className="grid h-9 w-9 place-items-center rounded-[4px] border border-[#132c47]/15 text-[#737d86] transition-colors hover:border-[#770800] hover:text-[#770800]"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={() => addRow()}
        className="mt-4 inline-flex items-center gap-1.5 rounded-[4px] bg-[#132c47] px-4 py-2.5 text-[9px] font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#770800]"
      >
        <PlusIcon className="h-3.5 w-3.5" />
        Add row
      </button>

      <div className="mt-5 border-t border-[#132c47]/10 pt-4">
        <p className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#737d86]">
          Suggested labels
        </p>
        <div className="flex flex-wrap gap-1.5">
          {PRESETS.filter((label) => !usedLabels.has(label.toLowerCase())).map((label) => (
            <button
              key={label}
              type="button"
              onClick={() => addRow(label)}
              className="rounded-full border border-[#132c47]/15 px-3 py-1.5 text-[12px] text-[#66717c] transition-colors hover:border-[#770800] hover:text-[#770800]"
            >
              + {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
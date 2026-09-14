/* Legacy fallback: products saved before the schema change still hold an
   object with fixed keys. Convert those so old rows keep rendering. */
const LEGACY_LABELS = {
  centerStone: "Center Stone",
  accentStones: "Accent Stones",
  metal: "Metal",
  totalCarats: "Total Carats",
  totalWeight: "Total Weight",
  size: "Size",
  certificate: "Certificate",
};

function normaliseSpecs(specs) {
  if (Array.isArray(specs)) {
    return specs.filter((row) => row?.label?.trim() && row?.value?.trim());
  }

  if (specs && typeof specs === "object") {
    return Object.entries(LEGACY_LABELS)
      .filter(([key]) => specs[key])
      .map(([key, label]) => ({ label, value: specs[key] }));
  }

  return [];
}

export default function SpecsTable({ specs }) {
  const rows = normaliseSpecs(specs);

  if (!rows.length) {
    return (
      <p className="px-5 py-6 text-[13px] text-[#737d86]">
        No specifications listed for this product yet.
      </p>
    );
  }

  return (
    <table className="w-full text-left">
      <tbody>
        {rows.map((row, i) => (
          <tr
            key={`${row.label}-${i}`}
            className="border-b border-[#132c47]/10 last:border-b-0"
          >
            <th
              scope="row"
              className="w-[45%] px-5 py-3.5 align-top text-[11px] font-bold uppercase tracking-[0.14em] text-[#737d86]"
            >
              {row.label}
            </th>
            <td className="px-5 py-3.5 align-top text-[14px] leading-[1.6] text-[#132c47]">
              {row.value}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
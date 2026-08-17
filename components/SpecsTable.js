const LABELS = {
  centerStone: "Center Stone",
  accentStones: "Accent Stones",
  metal: "Metal",
  totalCarats: "Total Carats",
  totalWeight: "Total Weight",
  size: "Size",
  certificate: "Certificate",
};

export default function SpecsTable({ specs }) {
  const rows = Object.entries(LABELS).filter(([key]) => specs?.[key]);
  if (!rows.length) return null;

  return (
    <table className="w-full text-sm border-t border-border">
      <tbody>
        {rows.map(([key, label]) => (
          <tr key={key} className="border-b border-border">
            <td className="py-2 pr-4 text-muted w-1/3">{label}</td>
            <td className="py-2">{specs[key]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function StarRating({ value = 0, count = 0, size = "text-sm" }) {
  const rounded = Math.round(value);

  if (!count) {
    return <span className={`${size} text-muted`}>No reviews yet</span>;
  }

  return (
    <div className={`flex items-center gap-1 ${size}`}>
      <span className="text-gold" aria-hidden="true">
        {"★".repeat(rounded)}
        {"☆".repeat(5 - rounded)}
      </span>
      <span className="text-muted">
        {value.toFixed(2)} ({count})
      </span>
    </div>
  );
}


function Star({ fill = 0 }) {
  const id = `star-${Math.random().toString(36).slice(2, 9)}`;
  const path =
    "M12 3.6l2.6 5.3 5.8.85-4.2 4.1 1 5.75L12 16.9l-5.2 2.7 1-5.75-4.2-4.1 5.8-.85z";

  return (
    <svg viewBox="0 0 24 24" className="h-[15px] w-[15px]" aria-hidden="true">
      {fill > 0 && fill < 1 && (
        <defs>
          <linearGradient id={id}>
            <stop offset={`${fill * 100}%`} stopColor="#770800" />
            <stop offset={`${fill * 100}%`} stopColor="transparent" />
          </linearGradient>
        </defs>
      )}
      <path
        d={path}
        fill={fill >= 1 ? "#770800" : fill > 0 ? `url(#${id})` : "none"}
        stroke="#770800"
        strokeWidth="1.2"
        strokeLinejoin="round"
        opacity={fill > 0 ? 1 : 0.35}
      />
    </svg>
  );
}

export default function StarRating({ value = 0, count = 0 }) {
  if (!count) {
    return <span className="text-[12px] text-[#9aa0a5]">No reviews yet</span>;
  }

  return (
    <div className="flex items-center gap-2">
      <div
        className="flex items-center gap-0.5"
        role="img"
        aria-label={`Rated ${value.toFixed(1)} out of 5`}
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} fill={Math.min(1, Math.max(0, value - i))} />
        ))}
      </div>
      <span className="text-[12px] text-[#737d86]">
        {value.toFixed(1)} ({count})
      </span>
    </div>
  );
}
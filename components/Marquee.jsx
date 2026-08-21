import { Settings, Sun } from "lucide-react";

// components/Marquee.jsx
export default function Marquee({ items }) {
  const list = [...items, ...items]; // seamless loop ke liye duplicate

  return (
    <div className="w-full overflow-hidden border-y border-gray-200 bg-white py-7">
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
        {list.map((item, i) => (
          <div key={i} className="flex items-center gap-10">
            <span className="md:text-lg font-medium text-[#22201D]">
              {item}
            </span>
            <span className="text-amber-500 text-xl"><Sun/></span>
          </div>
        ))}
      </div>
    </div>
  );
}
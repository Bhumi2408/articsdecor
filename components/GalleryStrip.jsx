// components/GalleryStrip.jsx
const IMAGES = [
  { src: "/home/g1.png", alt: "Diamond cluster stud earrings in yellow gold" },
  { src: "/home/g2.png", alt: "Tanzanite trillion pendant with diamond halo" },
  { src: "/home/g3.jpeg", alt: "Vintage-style diamond engagement ring" },
  { src: "/home/g4.png", alt: "Blue sapphire stud earrings with diamond halo" },
  { src: "/home/g5.png", alt: "Oval tanzanite pendant on a gold chain" },
  { src: "/home/g6.jpeg", alt: "Rose gold solitaire ring with cushion-cut diamond" },
];

export default function GalleryStrip() {
  return (
    <section className="w-full bg-white py-12 md:pt-10 md:pb-16">
      <div className="grid grid-cols-2 gap-[18px] px-[15px] sm:grid-cols-3 md:px-[60px] lg:grid-cols-6">
        {IMAGES.map((img, i) => (
          <div
            key={i}
            className="group aspect-square w-full overflow-hidden rounded-[14px] bg-[#F1ECE2]"
          >
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
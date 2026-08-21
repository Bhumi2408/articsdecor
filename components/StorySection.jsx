// components/StorySection.jsx
export default function StorySection() {
  return (
    <section className="bg-[#faf8f5] py-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left - images, layered/offset */}
        <div className="relative">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl overflow-hidden shadow-lg mt-10">
              <img
                src="/home/test4.jpeg"
                alt="Portrait"
                className="w-full h-[300px] object-cover"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img
                src="/ring-gif.gif"
                alt="Ring"
                className="w-full h-[300px] object-cover"
              />
            </div>
          </div>

          {/* Decorative accent */}
          <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-amber-100 -z-10 hidden md:block" />
        </div>

        {/* Right - content */}
        <div>
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-600">
            Est. 2006
          </span>

          <h2 className="font-serif text-3xl md:text-4xl font-medium text-gray-900 mt-2 mb-5 leading-tight">
            Our Story of Excellence
          </h2>

          <p className="text-gray-500 text-sm font-medium mb-4 italic">
            Lute Diamonds – Exclusively Styled Through Fine Workmanship
          </p>

          <p className="text-gray-700 text-[15px] mb-3 leading-relaxed">
            Established in 2006, <span className="font-semibold">Lute Diamonds (Pty) Ltd</span> has
            grown into a distinguished name in the diamond and jewellery industry. Much like the
            diamond itself, our brilliance is timeless, and our presence extends from South Africa
            to global markets.
          </p>

          <p className="text-gray-700 text-[15px] mb-6 leading-relaxed">
            Rooted in the rich <span className="font-semibold">Kimberley diamond heritage</span>,
            we combine tradition with innovation to create jewellery and services that inspire
            trust, elegance, and enduring value.
          </p>

          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide mb-3">
              What We Offer
            </h3>
            <ul className="space-y-2">
              {[
                { title: "Custom-made diamond jewellery", desc: "tailored to individual tastes" },
                { title: "Diamond cutting and polishing", desc: "with world-class precision" },
                { title: "Jewellery and rough diamond valuations", desc: "you can rely on" },
                { title: "Diamond marketing services", desc: "that connect brilliance with opportunity" },
              ].map((item, i) => (
                <li key={i} className="flex gap-2.5 text-[15px] text-gray-700">
                  <span className="text-amber-600 mt-0.5">✦</span>
                  <span>
                    <span className="font-semibold">{item.title}</span> {item.desc}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6 border-l-2 border-amber-200 pl-4">
            <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide mb-1.5">
              Global Expertise, African Roots
            </h3>
            <p className="text-gray-700 text-[15px] leading-relaxed">
              With successful trade experience in{" "}
              <span className="font-semibold">Australia, China, and South Africa</span>, we bring
              global insight while staying true to our African heritage. This combination ensures
              authenticity, quality, and competitiveness in every piece and service.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide mb-1">
              Our Craftsmanship Team
            </h3>
            <p className="text-gray-500 text-sm mb-2.5">
              Our strength lies in the expertise of our people:
            </p>
            <ul className="space-y-2">
              {[
                { name: "Leonardo Steenkamp Junior", desc: "12 years of excellence in jewellery manufacturing" },
                { name: "Abbey Gene-April", desc: "Over 45 years of mastery in diamond cutting and polishing, with Lute Diamonds since 2007" },
                { name: "Sylvester", desc: "Skilled craftsman, contributing since 2018" },
              ].map((m, i) => (
                <li key={i} className="flex gap-2.5 text-[15px] text-gray-700">
                  <span className="text-amber-600 mt-0.5">✦</span>
                  <span>
                    <span className="font-semibold">{m.name}</span> – {m.desc}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-gray-700 text-[15px] leading-relaxed">
            Together, our artisans embody the passion, precision, and artistry that define{" "}
            <span className="font-semibold">Lute Diamonds</span>. We don't just create jewellery —
            we create timeless symbols of beauty, love, and legacy.
          </p>
        </div>
      </div>
    </section>
  );
}
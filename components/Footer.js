import Link from "next/link";

const SHOP_LINKS = [
  { href: "/product-category/wedding-rings", label: "Wedding Rings" },
  { href: "/product-category/pendants", label: "Pendants" },
  { href: "/product-category/earrings", label: "Earrings" },
];

const INFO_LINKS = [
  { href: "/order-tracking", label: "Order Tracking" },
  { href: "/delivery-returns", label: "Delivery & Returns" },
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact Us" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-foreground text-white mt-24">
      <div className="container-lute grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 py-14">
        <div>
          <h3 className="font-serif text-xl mb-3">Lute Diamonds</h3>
          <p className="text-sm text-white/70 leading-relaxed">
            Premium quality, handcrafted, ethically sourced jewellery you can trust. Established 2006.
          </p>
        </div>

        <div>
          <h4 className="text-sm uppercase tracking-wide text-gold mb-4">Shop</h4>
          <ul className="space-y-2 text-sm text-white/80">
            {SHOP_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-gold">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm uppercase tracking-wide text-gold mb-4">Information</h4>
          <ul className="space-y-2 text-sm text-white/80">
            {INFO_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-gold">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm uppercase tracking-wide text-gold mb-4">Head Office</h4>
          <p className="text-sm text-white/80 leading-relaxed">
            25 Villiers Street
            <br />
            Kimberley 8301, South Africa
            <br />
            +27 72 252 9457
            <br />
            luteig@gmail.com
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-white/50">
        &copy; {new Date().getFullYear()} Lute Diamonds (Pty) Ltd. All rights reserved.
      </div>
    </footer>
  );
}

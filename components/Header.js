"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/shop", label: "Shop" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const items = useCartStore((s) => s.items);
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setMounted(true);
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => setUser(d.user))
      .catch(() => {});
  }, [pathname]);

  const cartCount = mounted ? items.reduce((sum, i) => sum + i.qty, 0) : 0;

  return (
    <header className="border-b border-border bg-surface sticky top-0 z-40">
      <div className="bg-foreground text-white text-xs text-center py-2 px-4">
        Handcrafted, ethically sourced jewellery &mdash; free shipping on orders over R50,000
      </div>
      <div className="container-lute flex items-center justify-between py-4 gap-4">
        <Link href="/" className="font-serif text-2xl tracking-wide text-foreground">
          Lute Diamonds
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-gold transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4 text-sm">
          <Link href={user ? "/account" : "/account/login"} className="hover:text-gold transition-colors">
            {user ? `Hi, ${user.name.split(" ")[0]}` : "My Account"}
          </Link>
          <Link href="/wishlist" className="hover:text-gold transition-colors">
            Wishlist
          </Link>
          <Link href="/cart" className="relative hover:text-gold transition-colors">
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-gold text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          <button
            className="md:hidden border border-border rounded px-2 py-1"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            Menu
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="md:hidden border-t border-border px-5 py-3 flex flex-col gap-3 text-sm">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

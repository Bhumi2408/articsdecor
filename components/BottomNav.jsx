"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User, Heart, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";

const ITEMS = [
  { label: "Home", href: "/", Icon: Home },
  { label: "Account", href: "/account", Icon: User },
  { label: "Wishlist", href: "/wishlist", Icon: Heart },
  { label: "Cart", href: "/cart", Icon: ShoppingBag },
];

export default function BottomNav() {
  const pathname = usePathname();
  const cartItems = useCartStore((s) => s.items);
  const wishlistIds = useWishlistStore((s) => s.wishlistIds);

  const cartCount = cartItems.reduce((total, item) => total + (item.qty || 1), 0);
  const wishlistCount = wishlistIds.length;

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  return (
    <nav
      aria-label="Mobile"
      className="fixed inset-x-0 bottom-0 z-[999] flex items-stretch border-t border-[var(--ad-line)] bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_24px_rgba(28,22,14,0.08)] backdrop-blur xl:hidden"
    >
      {ITEMS.map(({ label, href, Icon }) => {
        const active = isActive(href);
        const count =
          label === "Cart" ? cartCount : label === "Wishlist" ? wishlistCount : 0;

        return (
          <Link
            key={label}
            href={href}
            className={
              "relative flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-[10px] font-semibold uppercase tracking-wide transition-colors " +
              (active ? "text-[var(--ad-gold)]" : "text-[var(--ad-ink)]")
            }
          >
            <span className="relative">
              <Icon className="h-[21px] w-[21px]" strokeWidth={active ? 2 : 1.6} />

              {count > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-[15px] min-w-[15px] items-center justify-center rounded-full bg-[var(--ad-gold)] px-1 text-[8px] font-bold leading-none text-white ring-2 ring-white">
                  {count > 99 ? "99+" : count}
                </span>
              )}
            </span>

            {label}
          </Link>
        );
      })}
    </nav>
  );
}

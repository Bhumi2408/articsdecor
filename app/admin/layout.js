"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";

const LINKS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/categories", label: "Categories" },
  { href: "/admin/blog", label: "Blog" },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  if (pathname === "/admin/login") return children;

  return (
    <div className="container-lute grid md:grid-cols-[220px_1fr] gap-10 py-10">
      <aside>
        <h2 className="font-serif text-xl mb-4">Admin Panel</h2>
        <nav className="flex flex-col gap-1 text-sm">
          {LINKS.map((l) => {
            const active = l.href === "/admin" ? pathname === l.href : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`px-3 py-2 rounded ${active ? "bg-gold-light text-gold-dark" : "hover:bg-gold-light"}`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
        <LogoutButton
          endpoint="/api/admin/auth/logout"
          redirectTo="/admin/login"
          className="px-3 py-2 text-sm text-muted hover:text-gold mt-4 block text-left"
        />
      </aside>
      <main>{children}</main>
    </div>
  );
}

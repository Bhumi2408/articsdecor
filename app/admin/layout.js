// app/admin/layout.jsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";
import Breadcrumbs from "@/components/Breadcrumbs";

/* -------------------------------------------------------
   ICON PROPS
------------------------------------------------------- */

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

/* -------------------------------------------------------
   ICONS
------------------------------------------------------- */

const GridIcon = (p) => (
  <svg {...iconProps} {...p}>
    <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
    <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
    <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
    <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
  </svg>
);

const BoxIcon = (p) => (
  <svg {...iconProps} {...p}>
    <path d="M21 8.5 12 3.5 3 8.5v7L12 20.5l9-5z" />
    <path d="M3 8.5 12 13.5l9-5M12 13.5v7" />
  </svg>
);

const TagIcon = (p) => (
  <svg {...iconProps} {...p}>
    <path d="M3.5 10.5V4.5h6l10 10-6 6z" />
    <circle cx="7.5" cy="8.5" r="1.3" />
  </svg>
);

const LayersIcon = (p) => (
  <svg {...iconProps} {...p}>
    <path d="M12 3.5 3 8l9 4.5L21 8z" />
    <path d="M3 12.5 12 17l9-4.5M3 16.5 12 21l9-4.5" />
  </svg>
);

const DocIcon = (p) => (
  <svg {...iconProps} {...p}>
    <path d="M14 3.5H7a1.5 1.5 0 0 0-1.5 1.5v14A1.5 1.5 0 0 0 7 20.5h10a1.5 1.5 0 0 0 1.5-1.5V8z" />
    <path d="M14 3.5V8h4.5M8.5 12.5h7M8.5 16h4.5" />
  </svg>
);

const ArrowIcon = (p) => (
  <svg {...iconProps} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

/* -------------------------------------------------------
   NAVIGATION
------------------------------------------------------- */

const LINKS = [
  {
    href: "/admin",
    label: "Dashboard",
    Icon: GridIcon,
  },
  {
    href: "/admin/orders",
    label: "Orders",
    Icon: BoxIcon,
  },
  {
    href: "/admin/products",
    label: "Products",
    Icon: TagIcon,
  },
  {
    href: "/admin/categories",
    label: "Categories",
    Icon: LayersIcon,
  },
  {
    href: "/admin/blog",
    label: "Blog",
    Icon: DocIcon,
  },
];

/* -------------------------------------------------------
   PAGE NAME
------------------------------------------------------- */

function getCurrentLabel(pathname) {
  if (pathname === "/admin") return "Admin";

  const item = LINKS.find(({ href }) =>
    href === "/admin"
      ? pathname === href
      : pathname.startsWith(href)
  );

  return item?.label || "Admin";
}

/* -------------------------------------------------------
   LAYOUT
------------------------------------------------------- */

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  /* Login page should not get admin layout */
  if (pathname === "/admin/login") {
    return children;
  }

  const currentLabel = getCurrentLabel(pathname);

  const isActive = (href) =>
    href === "/admin"
      ? pathname === href
      : pathname.startsWith(href);

  return (
    <div className="min-h-screen bg-[#f5f3ee] text-[#132c47] pb-10">

      {/* =================================================
          MOBILE ADMIN HEADER
      ================================================= */}

      <header className="border-b border-[#132c47]/10 bg-white lg:hidden">
        <div className="mx-auto w-full max-w-[1400px] px-4 py-4 sm:px-6">

          <div className="flex items-center justify-between gap-4">

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#770800]">
                Artics Decorr
              </p>

              <h1 className="mt-1 text-[19px] font-semibold tracking-[-0.02em] text-[#132c47]">
                Admin Panel
              </h1>
            </div>

            <LogoutButton
              endpoint="/api/admin/auth/logout"
              redirectTo="/admin/login"
              className="shrink-0 rounded-lg border border-[#132c47]/15 bg-white px-3.5 py-2 text-[12.5px] font-semibold text-[#132c47] transition-all hover:border-[#770800] hover:bg-[#770800] hover:text-white"
            />
          </div>

          {/* Mobile navigation */}

          <nav className="mt-5 flex gap-2 overflow-x-auto pb-1">
            {LINKS.map(({ href, label, Icon }) => {
              const active = isActive(href);

              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`flex shrink-0 items-center gap-2 rounded-lg px-4 py-2.5 text-[13px] font-semibold transition-all ${
                    active
                      ? "bg-[#770800] text-white shadow-sm"
                      : "border border-[#132c47]/10 bg-[#f5f3ee] text-[#59636d] hover:border-[#770800]/30 hover:text-[#770800]"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* =================================================
          MAIN WRAPPER
      ================================================= */}

      <div>

        {/* =================================================
            BREADCRUMB
            IMPORTANT:
            OUTSIDE GRID = SIDEBAR KE UPAR
        ================================================= */}

        <div className="mb-10">
          <Breadcrumbs
          image="/products/p26.png" title="Admin"
            items={[
              { label: "Admin", href: "/admin" },
              ...(pathname !== "/admin"
                ? [{ label: currentLabel }]
                : []),
            ]}
          />
        </div>

        {/* =================================================
            SIDEBAR + CONTENT
        ================================================= */}

        <div className="grid gap-7 lg:grid-cols-[240px_minmax(0,1fr)] mx-auto w-full max-w-[1400px] lg:items-start">

          {/* =================================================
              DESKTOP SIDEBAR
          ================================================= */}

          <aside className="hidden lg:block">
            <div className="sticky top-6 overflow-hidden rounded-2xl border border-[#132c47]/10 bg-white shadow-[0_10px_35px_rgba(19,44,71,0.07)]">

              {/* Sidebar brand */}

              <div className="relative overflow-hidden bg-[#132c47] px-6 py-7">

                <div className="absolute -right-14 -top-16 h-40 w-40 rounded-full border border-white/10" />

                <div className="absolute -bottom-20 right-10 h-36 w-36 rounded-full border border-[#770800]/40" />

                <div className="relative">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#d8b8a9]">
                    Artics Decorr
                  </p>

                  <h2 className="mt-2 text-[20px] font-semibold tracking-[-0.02em] text-white">
                    Admin Panel
                  </h2>

                  <p className="mt-1.5 text-[12px] text-white/55">
                    Store management
                  </p>
                </div>
              </div>

              {/* Sidebar links */}

              <nav className="p-3">

                <p className="px-3 pb-2 pt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#9b968e]">
                  Management
                </p>

                <div className="space-y-1">
                  {LINKS.map(({ href, label, Icon }) => {
                    const active = isActive(href);

                    return (
                      <Link
                        key={href}
                        href={href}
                        aria-current={active ? "page" : undefined}
                        className={`group flex items-center gap-3 rounded-xl px-3 py-3 text-[14px] font-medium transition-all ${
                          active
                            ? "bg-[#770800] text-white shadow-[0_7px_20px_rgba(119,8,0,0.18)]"
                            : "text-[#5f6870] hover:bg-[#f5f3ee] hover:text-[#132c47]"
                        }`}
                      >

                        <span
                          className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                            active
                              ? "bg-white/10"
                              : "bg-[#f5f3ee]"
                          }`}
                        >
                          <Icon className="h-[17px] w-[17px]" />
                        </span>

                        <span>{label}</span>

                        {active && (
                          <ArrowIcon className="ml-auto h-4 w-4 text-white/70" />
                        )}
                      </Link>
                    );
                  })}
                </div>
              </nav>

              {/* Sidebar footer */}

              <div className="border-t border-[#132c47]/10 p-3">

                <div className="rounded-xl bg-[#f5f3ee] px-4 py-3">
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#9b968e]">
                    Store Admin
                  </p>

                  <p className="mt-1 text-[12px] leading-relaxed text-[#132c47]">
                    Manage your store from one place.
                  </p>
                </div>

                <LogoutButton
                  endpoint="/api/admin/auth/logout"
                  redirectTo="/admin/login"
                  className="mt-2 flex w-full rounded-xl px-3 py-3 text-left text-[13.5px] font-medium text-[#77736d] transition-all hover:bg-[#770800]/5 hover:text-[#770800]"
                />
              </div>
            </div>
          </aside>

          {/* =================================================
              PAGE CONTENT
          ================================================= */}

          <main className="min-w-0">

            {/* Page title banner */}

            <section className="relative mb-6 overflow-hidden rounded-2xl bg-[#132c47] px-6 py-7 sm:px-8 sm:py-8">

              <div className="absolute -right-14 -top-16 h-44 w-44 rounded-full border border-white/10" />

              <div className="absolute -bottom-20 right-16 h-44 w-44 rounded-full border border-[#770800]/40" />

              <div className="absolute bottom-0 left-1/2 h-[2px] w-20 -translate-x-1/2 bg-[#770800]" />

              <div className="relative">

                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#d8b8a9]">
                  Artics Decorr
                </p>

                <h2 className="mt-2 text-[26px] font-semibold tracking-[-0.02em] text-white sm:text-[30px]">
                  {currentLabel === "Admin"
                    ? "Dashboard"
                    : currentLabel}
                </h2>

                <p className="mt-2 max-w-xl text-[13.5px] leading-relaxed text-white/60">
                  {currentLabel === "Admin"
                    ? "Overview of your store and recent activity."
                    : `Manage your ${currentLabel.toLowerCase()} from the admin panel.`}
                </p>

              </div>
            </section>

            {/* Actual page */}

            <div className="min-w-0">
              {children}
            </div>

          </main>
        </div>
      </div>
    </div>
  );
}
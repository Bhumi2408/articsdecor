"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { ShoppingBag, Heart } from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const LOGO_SRC = "/logos.png";

const MEGA_FEATURE = {
  image: "/products/p5.png",
  title: "Wicker Sofa Sets",
  copy: "German Rehau weave on powder-coated aluminium — built to stay outdoors all year.",
  href: "/product-category/wicker-sofa-set",
  cta: "Explore the range",
};


/* ============================== ICONS ============================== */
const Ico = {
  search: (p) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      {...p}
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.6-3.6" />
    </svg>
  ),
  bag: (p) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...p}
    >
      <path d="M4.5 7.5h15l-1.1 12.1a1.5 1.5 0 0 1-1.5 1.4H7.1a1.5 1.5 0 0 1-1.5-1.4L4.5 7.5Z" />
      <path d="M8.75 10V6.75a3.25 3.25 0 0 1 6.5 0V10" />
    </svg>
  ),
  user: (p) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      {...p}
    >
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="10" r="3.1" />
      <path d="M6.4 19a6.2 6.2 0 0 1 11.2 0" />
    </svg>
  ),
  chevron: (p) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...p}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  ),
  menu: (p) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      {...p}
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  ),
  close: (p) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      {...p}
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  ),
};

/* shared class strings */
const iconBtn =
  "relative grid h-[38px] w-[38px] sm:h-[42px] sm:w-[42px] place-items-center rounded-full text-[var(--ad-ink)] " +
  "transition-colors hover:bg-[var(--ad-gold-soft)] hover:text-[var(--ad-gold)] " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ad-gold)]";

/* ============================== HEADER ============================== */
export default function Header({ logoSrc = LOGO_SRC, onSearch }) {
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [openDrop, setOpenDrop] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [mobileAcc, setMobileAcc] = useState(null);
  const [categories, setCategories] = useState([]);

  const closeTimer = useRef(null);
  const searchInput = useRef(null);
  const cartItems = useCartStore((s) => s.items);
  const wishlistIds = useWishlistStore((s) => s.wishlistIds);
  const setWishlistIds = useWishlistStore((s) => s.setWishlistIds);

  const cartCount = cartItems.reduce(
    (total, item) => total + (item.qty || 1),
    0,
  );

  const wishlistCount = wishlistIds.length;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      setSearchOpen(false);
      setOpenDrop(null);
      setDrawer(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (searchOpen && searchInput.current) searchInput.current.focus();
  }, [searchOpen]);

  useEffect(() => {
    document.body.style.overflow = drawer ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawer]);

  useEffect(() => {
    setDrawer(false);
    setOpenDrop(null);
    setSearchOpen(false);
    setMobileAcc(null);
  }, [pathname]);

  useEffect(() => {
  let cancelled = false;

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories", {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch categories");
      }

      const data = await res.json();

      if (!cancelled) {
        setCategories(Array.isArray(data?.items) ? data.items : []);
      }
    } catch (error) {
      console.error("CATEGORY MENU ERROR:", error);

      if (!cancelled) {
        setCategories([]);
      }
    }
  };

  fetchCategories();

  return () => {
    cancelled = true;
  };
}, []);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  // Reconcile the persisted (localStorage) wishlist with the server's
  // truth on load — the local store can otherwise go stale across
  // devices/browsers, after login/logout, or from edits made elsewhere.
  useEffect(() => {
    let cancelled = false;

    fetch("/api/wishlist", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : { ids: [] }))
      .then((data) => {
        if (!cancelled) setWishlistIds(Array.isArray(data.ids) ? data.ids : []);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [setWishlistIds]);

const productCategories = categories.map((category) => ({
  label: category.name,
  href: `/product-category/${category.slug}`,
}));

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  {
    label: "Products",
    href: "/products",
    children: productCategories,
  },
  { label: "Shop", href: "/shop" },
  { label: "Materials", href: "/materials" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

  const hoverIn = (label) => {
    clearTimeout(closeTimer.current);
    setOpenDrop(label);
  };
  const hoverOut = () => {
    closeTimer.current = setTimeout(() => setOpenDrop(null), 180);
  };

  const submitSearch = (e) => {
    e.preventDefault();
    const q = new FormData(e.currentTarget).get("q");
    if (onSearch) onSearch(q);
    else window.location.href = "/shop?s=" + encodeURIComponent(q || "");
  };

  const isActive = (href) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(href + "/");

  const productsActive =
    isActive("/products") ||
    pathname.startsWith("/product-category") ||
    pathname.startsWith("/product/");



  return (
    <>
      <header className="font-artics fixed inset-x-0 top-0 z-[1000]">
        <div
          className={
            "mx-auto max-w-[1780px] transition-all duration-300 " +
            (scrolled
              ? "px-3 py-2 sm:px-[60px] sm:py-2.5"
              : "px-3 py-3 sm:px-[60px] sm:py-[18px]")
          }
        >
          <div
            className={
              "relative flex items-center rounded-full bg-white pl-4 pr-2 sm:pl-[22px] sm:pr-5 " +
              "transition-all duration-300 " +
              (scrolled
                ? "h-[58px] shadow-[0_6px_22px_rgba(28,22,14,0.15)] sm:h-[66px]"
                : "h-16 shadow-[0_10px_34px_rgba(28,22,14,0.10)] sm:h-[76px]")
            }
          >
            {/* logo */}
            <Link
              href="/"
              aria-label="Artics Decorr — home"
              className="flex shrink-0 items-center"
            >
              <img
                src={logoSrc}
                alt="Artics Decorr"
                className={
                  "block w-auto transition-all duration-300 " +
                  (scrolled ? "h-[42px] sm:h-[50px]" : "h-[42px] sm:h-[50px]")
                }
              />
            </Link>

            {/* desktop menu */}
            <nav aria-label="Main" className="ml-auto hidden xl:block">
              <ul className="flex items-center gap-[22px] 2xl:gap-[30px]">
                {NAV_LINKS.map((item) => {
                  const active = item.children
                    ? productsActive
                    : isActive(item.href);
                  const open = openDrop === item.label;
                  return (
                    <li
                      key={item.label}
                      className="static"
                      onMouseEnter={() => item.children && hoverIn(item.label)}
                      onMouseLeave={() => item.children && hoverOut()}
                    >
                      <Link
                        href={item.href}
                        aria-expanded={item.children ? open : undefined}
                        className={
                          "relative inline-flex items-center gap-1.5 whitespace-nowrap py-7 text-sm font-bold uppercase " +
                          "tracking-[0.4px] transition-colors 2xl:text-[15px] " +
                          "after:absolute after:inset-x-0 after:bottom-[22px] after:h-0.5 after:origin-left " +
                          "after:bg-[var(--ad-gold)] after:transition-transform after:duration-200 after:content-[''] " +
                          "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ad-gold)] " +
                          (active
                            ? "text-[var(--ad-gold)] after:scale-x-100"
                            : "text-[var(--ad-ink)] after:scale-x-0 hover:text-[var(--ad-gold)] hover:after:scale-x-100")
                        }
                      >
                        {item.label}
                        {item.children && (
                          <Ico.chevron
                            className={
                              "h-3.5 w-3.5 transition-transform duration-200 " +
                              (open ? "rotate-180" : "")
                            }
                          />
                        )}
                      </Link>

                      {/* ---------- MEGA MENU ---------- */}
                      {item.children && (
                        <div
                          className={
                            "absolute inset-x-0 top-full pt-3.5 transition-all duration-200 " +
                            (open
                              ? "visible translate-y-0 opacity-100"
                              : "invisible translate-y-2.5 opacity-0")
                          }
                        >
                          <div className="overflow-hidden rounded-[26px] border border-[var(--ad-line)] bg-white shadow-[0_30px_70px_-20px_rgba(28,22,14,0.28)]">
                            <div className="grid grid-cols-[1fr_300px] gap-8 px-8 pb-6 pt-7">
                              <ul className="grid grid-cols-2 gap-x-[18px] gap-y-0.5 xl:grid-cols-3">
                                {item.children.map((c) => (
                                  <li key={c.label}>
                                    <Link
                                      href={c.href}
                                      className="group flex items-center rounded-xl px-3 py-[8px] text-sm font-medium leading-tight text-[#3B342C] transition-colors hover:bg-[var(--ad-gold-soft)] hover:text-[var(--ad-gold)]"
                                    >
                                      <span className="block h-[1.5px] w-0 shrink-0 bg-[var(--ad-gold)] transition-all duration-200 group-hover:mr-2.5 group-hover:w-3.5" />
                                      {c.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>

                              <Link
                                href={MEGA_FEATURE.href}
                                className="group flex flex-col overflow-hidden rounded-[18px] border border-[var(--ad-line)] bg-[var(--ad-gold-soft)]"
                              >
                                <span className="block h-[150px] overflow-hidden">
                                  <img
                                    src={MEGA_FEATURE.image}
                                    alt=""
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                  />
                                </span>
                                <span className="block px-[18px] pb-[18px] pt-4">
                                  <strong className="mb-1.5 block text-[15px] font-semibold text-[var(--ad-ink)]">
                                    {MEGA_FEATURE.title}
                                  </strong>
                                  <span className="mb-3 block text-[12.5px] leading-relaxed text-[var(--ad-ink-soft)]">
                                    {MEGA_FEATURE.copy}
                                  </span>
                                  <span className="inline-block border-b-[1.5px] border-current pb-px text-[12.5px] font-semibold text-[var(--ad-gold)]">
                                    {MEGA_FEATURE.cta}
                                  </span>
                                </span>
                              </Link>
                            </div>

                            <div className="flex items-center gap-7 border-t border-[var(--ad-line)] bg-[#FCFAF6] px-8 py-4">
                              <Link
                                href="/products"
                                className="text-[13px] font-medium text-[var(--ad-ink)] transition-colors hover:text-[var(--ad-gold)]"
                              >
                                View all products
                              </Link>
                              <Link
                                href="/materials"
                                className="text-[13px] font-medium text-[var(--ad-ink)] transition-colors hover:text-[var(--ad-gold)]"
                              >
                                Materials we use
                              </Link>
                            </div>
                          </div>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* tools */}
            <div className="ml-auto flex shrink-0 items-center gap-1 xl:ml-6">
              <span
                aria-hidden="true"
                className="mr-3.5 hidden h-[26px] w-px bg-[var(--ad-line)] xl:block"
              />

              <LanguageSwitcher className="hidden xl:flex" />
              <LanguageSwitcher variant="compact" className="xl:hidden" />

              <button
                type="button"
                onClick={() => setSearchOpen((s) => !s)}
                aria-label="Search"
                className={iconBtn}
              >
                <Ico.search className="h-5 w-5 sm:h-[21px] sm:w-[21px]" />
              </button>

              <div className="hidden items-center gap-4 xl:flex">
                {/* WISHLIST */}
                <Link
                  href="/wishlist"
                  aria-label="Wishlist"
                  className="relative flex h-10 w-10 items-center justify-center text-[#172b40] transition-colors hover:text-[var(--ad-gold)]"
                >
                  <Heart className="h-[21px] w-[21px]" strokeWidth={1.5} />

                  {wishlistCount > 0 && (
                    <span
                      className="
          absolute
          right-0
          top-0
          flex
          h-[17px]
          min-w-[17px]
          items-center
          justify-center
          rounded-full
          bg-[var(--ad-gold)]
          px-1
          text-[9px]
          font-bold
          leading-none
          text-white
          ring-2
          ring-white
        "
                    >
                      {wishlistCount > 99 ? "99+" : wishlistCount}
                    </span>
                  )}
                </Link>

                {/* CART */}
                <Link
                  href="/cart"
                  aria-label="Cart"
                  className="relative flex h-10 w-10 items-center justify-center text-[#172b40] transition-colors hover:text-[var(--ad-gold)]"
                >
                  <ShoppingBag
                    className="h-[21px] w-[21px]"
                    strokeWidth={1.5}
                  />

                  {cartCount > 0 && (
                    <span
                      className="
          absolute
          right-0
          top-0
          flex
          h-[17px]
          min-w-[17px]
          items-center
          justify-center
          rounded-full
          bg-[var(--ad-gold)]
          px-1
          text-[9px]
          font-bold
          leading-none
          text-white
          ring-2
          ring-white
        "
                    >
                      {cartCount > 99 ? "99+" : cartCount}
                    </span>
                  )}
                </Link>
              </div>

              <Link
                href="/account"
                aria-label="Account"
                className={iconBtn + " hidden xl:grid"}
              >
                <Ico.user className="h-5 w-5 sm:h-[21px] sm:w-[21px]" />
              </Link>

              <button
                type="button"
                onClick={() => setDrawer(true)}
                aria-label="Open menu"
                className={iconBtn + " xl:hidden"}
              >
                <Ico.menu className="h-5 w-5 sm:h-[21px] sm:w-[21px]" />
              </button>
            </div>
          </div>
        </div>

        {/* search panel */}
        <div
          className={
            "mx-auto max-w-[1780px] overflow-hidden px-3 transition-all duration-300 sm:px-[26px] " +
            (searchOpen ? "max-h-[120px]" : "max-h-0")
          }
        >
          <form
            onSubmit={submitSearch}
            className="mt-2.5 flex items-center gap-2.5 rounded-full bg-white py-2.5 pl-5 pr-3 shadow-[0_10px_34px_rgba(28,22,14,0.12)] sm:pl-6"
          >
            <Ico.search className="h-[21px] w-[21px] shrink-0 text-[var(--ad-ink-soft)]" />
            <input
              ref={searchInput}
              name="q"
              type="search"
              placeholder="Search wicker sofas, loungers, gazebos…"
              className="ad-search-input min-w-0 flex-1 border-0 bg-transparent py-2 text-[15px] text-[var(--ad-ink)] outline-none placeholder:text-[#9d968c]"
            />
            <button
              type="submit"
              className="rounded-full bg-[var(--ad-gold)] px-4 py-2.5 text-[11.5px] font-semibold uppercase tracking-wider text-white sm:px-7 sm:py-3 sm:text-[12.5px]"
            >
              Search
            </button>
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              aria-label="Close search"
              className="grid place-items-center p-1.5 text-[var(--ad-ink-soft)]"
            >
              <Ico.close className="h-5 w-5" />
            </button>
          </form>
        </div>
      </header>

      {/* ---------- mobile drawer ---------- */}
      <div
        onClick={() => setDrawer(false)}
        className={
          "fixed inset-0 z-[1100] bg-[rgba(28,22,14,0.45)] transition-opacity duration-300 " +
          (drawer ? "visible opacity-100" : "invisible opacity-0")
        }
      />

      <aside
        aria-hidden={!drawer}
        className={
          "font-artics fixed inset-y-0 right-0 z-[1101] w-[min(380px,88vw)] overflow-y-auto bg-white " +
          "transition-transform duration-300 ease-out " +
          (drawer ? "translate-x-0" : "translate-x-full")
        }
      >
        <div className="flex items-center justify-between border-b border-[var(--ad-line)] px-5 py-[18px]">
          <img src={logoSrc} alt="Artics Decorr" className="h-12 w-auto" />
          <button
            type="button"
            onClick={() => setDrawer(false)}
            aria-label="Close menu"
            className="text-[var(--ad-ink)]"
          >
            <Ico.close className="h-6 w-6" />
          </button>
        </div>

        <nav>
          {NAV_LINKS.map((item) => {
            const active = item.children ? productsActive : isActive(item.href);
            const accOpen = mobileAcc === item.label;
            return (
              <div key={item.label} className="border-b border-[#F5F1EA]">
                <div className="flex items-center justify-between pr-3">
                  <Link
                    href={item.href}
                    className={
                      "flex-1 px-5 py-4 text-sm font-bold uppercase tracking-[0.4px] " +
                      (active
                        ? "text-[var(--ad-gold)]"
                        : "text-[var(--ad-ink)]")
                    }
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <button
                      type="button"
                      onClick={() => setMobileAcc(accOpen ? null : item.label)}
                      aria-label={"Toggle " + item.label}
                      className="p-2 text-[var(--ad-ink-soft)]"
                    >
                      <Ico.chevron
                        className={
                          "h-[18px] w-[18px] transition-transform duration-200 " +
                          (accOpen ? "rotate-180" : "")
                        }
                      />
                    </button>
                  )}
                </div>

                {item.children && (
                  <div
                    className={
                      "overflow-hidden bg-[#FCFAF6] transition-all duration-300 " +
                      (accOpen ? "max-h-[760px]" : "max-h-0")
                    }
                  >
                    {item.children.map((c) => (
                      <Link
                        key={c.label}
                        href={c.href}
                        className="block py-[11px] pl-[34px] pr-5 text-[13.5px] text-[#4a423a] hover:text-[var(--ad-gold)]"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="border-b border-[#F5F1EA] py-6">
          <LanguageSwitcher variant="mobile" />
        </div>

        <div className="px-5 pb-9 pt-6">
          <p className="mb-2 text-[12.5px] leading-relaxed text-[var(--ad-ink-soft)]">
            A4/3/15, G.T. Road, Vijay Nagar, Ghaziabad 201009
          </p>
          <a
            href="tel:+918860166301"
            className="text-sm font-semibold text-[var(--ad-gold)]"
          >
            +91 88601 66301
          </a>
        </div>
      </aside>

      {/* Google Translate mounts its <select> here; kept off-screen and
          driven entirely by LanguageSwitcher's own dropdown UI. */}
      <div id="google_translate_element" className="hidden" />
    </>
  );
}

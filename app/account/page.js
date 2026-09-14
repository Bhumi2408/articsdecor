// app/account/page.jsx

import Link from "next/link";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import Order from "@/models/Order";
import { getCurrentUser } from "@/lib/auth";
import { getWishlistIds } from "@/lib/wishlist";
import LogoutButton from "@/components/LogoutButton";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata = {
  title: "My Account | Artics Decorr",
  description:
    "Manage your Artics Decorr account, orders, wishlist and saved outdoor furniture.",
  keywords: [
    "Artics Decorr account",
    "Artics Decorr orders",
    "Artics Decorr wishlist",
    "outdoor furniture India",
    "premium outdoor furniture",
  ],
};

/* =========================================================
   ICONS
========================================================= */

const BoxIcon = (p) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...p}
  >
    <path d="M21 8.5 12 3.5 3 8.5v7L12 20.5l9-5z" />
    <path d="M3 8.5 12 13.5l9-5M12 13.5v7" />
  </svg>
);

const HeartIcon = (p) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...p}
  >
    <path d="M12 20s-7.5-4.6-7.5-9.4A4.1 4.1 0 0 1 12 8.2a4.1 4.1 0 0 1 7.5 2.4C19.5 15.4 12 20 12 20z" />
  </svg>
);

const BagIcon = (p) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...p}
  >
    <path d="M5.5 8h13l-1 12.5H6.5z" />
    <path d="M9 10V6.8a3 3 0 0 1 6 0V10" />
  </svg>
);

const ArrowIcon = (p) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...p}
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const UserIcon = (p) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...p}
  >
    <circle cx="12" cy="8" r="3.5" />
    <path d="M5 20c.8-3.7 3.1-5.5 7-5.5s6.2 1.8 7 5.5" />
  </svg>
);

const ChevronIcon = (p) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...p}
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

/* =========================================================
   HELPERS
========================================================= */

function initials(name = "") {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

const QUICK_LINKS = [
  {
    href: "/account/orders",
    label: "Order History",
    desc: "Track and review your purchases",
    Icon: BoxIcon,
    number: "01",
  },
  {
    href: "/wishlist",
    label: "My Wishlist",
    desc: "Your favourite pieces, saved",
    Icon: HeartIcon,
    number: "02",
  },
  {
    href: "/shop",
    label: "Continue Shopping",
    desc: "Explore our latest collection",
    Icon: BagIcon,
    number: "03",
  },
];

/* =========================================================
   PAGE
========================================================= */

export default async function AccountDashboard() {
  const session = await getCurrentUser();

  await connectDB();

  const [user, orderCount, wishlistIds] = await Promise.all([
    User.findById(session.sub).select("name email createdAt").lean(),
    Order.countDocuments({ user: session.sub }),
    getWishlistIds(),
  ]);

  const name = user?.name || "there";
  const firstName = name.split(" ")[0];

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
    : "—";

  const STATS = [
    {
      label: "Orders Placed",
      value: orderCount,
      href: "/account/orders",
      cta: "View orders",
    },
    {
      label: "Saved Pieces",
      value: wishlistIds?.length ?? 0,
      href: "/wishlist",
      cta: "View wishlist",
    },
    {
      label: "Member Since",
      value: memberSince,
      href: null,
      cta: null,
    },
  ];

  return (
    <main className="w-full bg-[#f7f8fa] pb-20">
      {/* =====================================================
          BREADCRUMB
      ====================================================== */}

      <Breadcrumbs image="/products/p10.png" title="Account" items={[{ label: "My Account" }]} />

      {/* =====================================================
          ACCOUNT HERO
      ====================================================== */}

      <section className="px-5 pt-10 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1500px]">
          <div
            className="
              relative
              overflow-hidden
              bg-[#102f4f]
              px-6
              py-8
              sm:px-10
              sm:py-10
              lg:px-14
              lg:py-12
            "
          >
            {/* decorative circles */}

            <div
              aria-hidden="true"
              className="
                absolute
                -right-24
                -top-32
                h-[330px]
                w-[330px]
                rounded-full
                border
                border-white/10
              "
            />

            <div
              aria-hidden="true"
              className="
                absolute
                -right-5
                -top-24
                h-[230px]
                w-[230px]
                rounded-full
                border
                border-white/5
              "
            />

            <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              {/* PROFILE */}

              <div className="flex items-center gap-5 sm:gap-6">
                <div
                  className="
                    flex
                    h-16
                    w-16
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-[#d8a94d]
                    text-[20px]
                    font-bold
                    text-[#102f4f]
                    sm:h-[76px]
                    sm:w-[76px]
                    sm:text-[23px]
                  "
                >
                  {initials(name) || "AD"}
                </div>

                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#d8a94d]">
                    Welcome Back
                  </p>

                  <h1
                    className="
                      mt-2
                      text-[27px]
                      font-semibold
                      leading-tight
                      text-white
                      sm:text-[32px]
                    "
                  >
                    Hi, {firstName}
                  </h1>

                  <p className="mt-1.5 truncate text-[13px] text-white/60 sm:text-[14px]">
                    {user?.email}
                  </p>
                </div>
              </div>

              {/* LOGOUT */}

              <LogoutButton
                endpoint="/api/auth/logout"
                redirectTo="/"
                className="
                  inline-flex
                  w-fit
                  items-center
                  justify-center
                  border
                  border-white/25
                  bg-white/5
                  px-6
                  py-3
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.16em]
                  text-white
                  transition-all
                  duration-300
                  hover:border-[#d8a94d]
                  hover:bg-[#d8a94d]
                  hover:text-[#102f4f]
                "
              />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          STATS
      ====================================================== */}

      <section className="px-5 sm:px-8 lg:px-12">
        <div
          className="
            mx-auto
            -mt-1
            grid
            max-w-[1500px]
            grid-cols-1
            bg-white
            shadow-[0_15px_45px_rgba(16,47,79,0.06)]
            sm:grid-cols-3
          "
        >
          {STATS.map((stat, index) => (
            <div
              key={stat.label}
              className={`
                group
                relative
                px-6
                py-7
                sm:px-7
                lg:px-9
                lg:py-8
                ${
                  index !== STATS.length - 1
                    ? "border-b border-[#e9edf1] sm:border-b-0 sm:border-r"
                    : ""
                }
              `}
            >
              {/* gold top indicator */}

              <span
                className="
                  absolute
                  left-0
                  top-0
                  h-[3px]
                  w-0
                  bg-[#d8a94d]
                  transition-all
                  duration-500
                  group-hover:w-full
                "
              />

              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7c8792]">
                {stat.label}
              </p>

              <p className="mt-3 text-[30px] font-semibold leading-none text-[#102f4f] lg:text-[34px]">
                {stat.value}
              </p>

              {stat.href && (
                <Link
                  href={stat.href}
                  className="
                    mt-4
                    inline-flex
                    items-center
                    gap-2
                    text-[12px]
                    font-semibold
                    uppercase
                    tracking-[0.1em]
                    text-[#102f4f]
                    transition-colors
                    hover:text-[#d09d3c]
                  "
                >
                  {stat.cta}
                  <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
          QUICK ACCESS
      ====================================================== */}

      <section className="px-5 pt-14 sm:px-8 sm:pt-16 lg:px-12 lg:pt-20">
        <div className="mx-auto max-w-[1500px]">
          {/* heading */}

          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#b2873b]">
                Your Space
              </p>

              <h2 className="mt-2 text-[28px] font-semibold tracking-[-0.02em] text-[#102f4f] sm:text-[34px]">
                Quick Access
              </h2>
            </div>

            <p className="max-w-[360px] text-[13px] leading-6 text-[#7b838b] sm:text-right">
              Everything you need to manage your Artics Decorr experience.
            </p>
          </div>

          {/* cards */}

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {QUICK_LINKS.map(
              ({ href, label, desc, Icon, number }) => (
                <Link
                  key={href}
                  href={href}
                  className="
                    group
                    relative
                    overflow-hidden
                    border
                    border-[#e3e7eb]
                    bg-white
                    p-6
                    transition-all
                    duration-500
                    hover:-translate-y-1
                    hover:border-[#102f4f]
                    hover:shadow-[0_18px_45px_rgba(16,47,79,0.10)]
                    sm:p-7
                  "
                >
                  {/* number */}

                  <span
                    className="
                      absolute
                      right-5
                      top-5
                      text-[10px]
                      font-semibold
                      tracking-[0.15em]
                      text-[#d8dde2]
                      transition-colors
                      duration-300
                      group-hover:text-[#d8a94d]
                    "
                  >
                    {number}
                  </span>

                  {/* icon */}

                  <div
                    className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      border
                      border-[#dce4eb]
                      bg-[#f5f8fa]
                      text-[#102f4f]
                      transition-all
                      duration-300
                      group-hover:border-[#102f4f]
                      group-hover:bg-[#102f4f]
                      group-hover:text-white
                    "
                  >
                    <Icon className="h-[21px] w-[21px]" />
                  </div>

                  {/* text */}

                  <div className="mt-7">
                    <h3
                      className="
                        text-[17px]
                        font-semibold
                        text-[#102f4f]
                        transition-colors
                        duration-300
                        group-hover:text-[#b2873b]
                      "
                    >
                      {label}
                    </h3>

                    <p className="mt-2 max-w-[270px] text-[13px] leading-6 text-[#737c84]">
                      {desc}
                    </p>
                  </div>

                  {/* bottom action */}

                  <div className="mt-7 flex items-center justify-between border-t border-[#edf0f2] pt-4">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#102f4f]">
                      Explore
                    </span>

                    <span
                      className="
                        flex
                        h-7
                        w-7
                        items-center
                        justify-center
                        border
                        border-[#dfe4e8]
                        text-[#102f4f]
                        transition-all
                        duration-300
                        group-hover:border-[#102f4f]
                        group-hover:bg-[#102f4f]
                        group-hover:text-white
                      "
                    >
                      <ChevronIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </span>
                  </div>

                  {/* hover gold line */}

                  <span
                    aria-hidden="true"
                    className="
                      absolute
                      bottom-0
                      left-0
                      h-[3px]
                      w-0
                      bg-[#d8a94d]
                      transition-all
                      duration-500
                      group-hover:w-full
                    "
                  />
                </Link>
              )
            )}
          </div>
        </div>
      </section>

      {/* =====================================================
          BOTTOM BRAND STRIP
      ====================================================== */}

      <section className="px-5 pt-14 sm:px-8 lg:px-12">
        <div
          className="
            mx-auto
            flex
            max-w-[1500px]
            flex-col
            gap-5
            border-t
            border-[#dfe4e8]
            pt-7
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <div className="flex items-center gap-3">
            <UserIcon className="h-4 w-4 text-[#b2873b]" />

            <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#7a838c]">
              Your Artics Decorr Account
            </span>
          </div>

          <Link
            href="/shop"
            className="
              group
              inline-flex
              items-center
              gap-2
              text-[11px]
              font-semibold
              uppercase
              tracking-[0.16em]
              text-[#102f4f]
              transition-colors
              hover:text-[#b2873b]
            "
          >
            Explore Collection
            <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </main>
  );
}
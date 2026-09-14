// app/account/register/page.jsx
"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";

const SIDE_IMAGE = "/products/p5.png";
const LOGO_SRC = "/logo.png";

/* =========================================================
   ICONS
========================================================= */

const EyeIcon = ({ open, className = "" }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {open ? (
      <>
        <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ) : (
      <>
        <path d="M4 4l16 16" />
        <path d="M9.9 5.8A9.6 9.6 0 0 1 12 5.5c6 0 9.5 6.5 9.5 6.5a17 17 0 0 1-3.4 4.1" />
        <path d="M6.4 7.9A16.7 16.7 0 0 0 2.5 12S6 18.5 12 18.5c1.3 0 2.4-.3 3.5-.7" />
        <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
      </>
    )}
  </svg>
);

const UserIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
  >
    <circle cx="12" cy="8" r="3.5" />
    <path d="M5 20c.7-3.5 3.2-5.5 7-5.5s6.3 2 7 5.5" />
  </svg>
);

const MailIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
  >
    <rect x="3.5" y="5" width="17" height="14" rx="2" />
    <path d="m4 7 8 6 8-6" />
  </svg>
);

const LockIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
  >
    <rect x="4.5" y="10" width="15" height="10" rx="2" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
  </svg>
);

const ArrowIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
  >
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </svg>
);

/* =========================================================
   REGISTER FORM
========================================================= */

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const next = searchParams.get("next") || "/account";

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Registration failed");
      }

      router.push(next);
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  const passwordOk = form.password.length >= 8;

  return (
    <main className="bg-[#f7f8fa]">
     <Breadcrumbs image="/products/p10.png" title="Register" items={[{ label: "Register" }]} />
      <div className="bg-[#f7f8fa] mx-auto grid w-full max-w-[1450px] py-8 sm:py-12 lg:py-16 overflow-hidden shadow-[0_25px_80px_rgba(16,47,79,0.10)] lg:grid-cols-[48%_52%]">

        {/* =====================================================
            LEFT IMAGE PANEL
        ====================================================== */}

        <div className="relative hidden min-h-[720px] overflow-hidden lg:block">
          <img
            src={SIDE_IMAGE}
            alt="Artics Decorr outdoor furniture"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1500ms] hover:scale-[1.03]"
          />

          {/* DARK BLUE OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#071d31]/95 via-[#102f4f]/45 to-[#102f4f]/10" />

          {/* DECORATIVE BORDER */}
          <div className="absolute inset-6 border border-white/20" />

          {/* CONTENT */}
          <div className="absolute inset-x-0 bottom-0 z-10 p-10 xl:p-14">
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-[#d8b36a]" />

              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#d8b36a]">
                Artics Decorr
              </span>
            </div>

            <h2 className="max-w-[500px] font-serif text-[42px] font-medium leading-[1.08] text-white xl:text-[50px]">
              Create your
              <br />
              beautiful space.
            </h2>

            <p className="mt-5 max-w-[470px] text-[15px] leading-7 text-white/70">
              Join Artics Decorr and discover thoughtfully crafted outdoor
              furniture designed to bring comfort, character and timeless
              style to your space.
            </p>

            <div className="mt-8 flex items-center gap-8">
              <div>
                <p className="font-serif text-[25px] text-white">Premium</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-white/45">
                  Outdoor Furniture
                </p>
              </div>

              <span className="h-10 w-px bg-white/20" />

              <div>
                <p className="font-serif text-[25px] text-white">Designed</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-white/45">
                  For Living
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            RIGHT FORM PANEL
        ====================================================== */}

        <div className="relative flex items-center justify-center px-5 py-10 sm:px-10 sm:py-14 lg:px-14 xl:px-20">

          {/* TOP ACCENT */}
          <div className="absolute left-0 right-0 top-0 h-1 bg-[#102f4f]" />

          <div className="w-full max-w-[500px]">

            {/* MOBILE LOGO */}
            <Link
              href="/"
              className="mb-10 flex justify-center lg:hidden"
            >
              <img
                src={LOGO_SRC}
                alt="Artics Decorr"
                className="h-11 w-auto"
              />
            </Link>

            {/* HEADER */}
            <div className="text-center lg:text-left">
              <div className="mb-4 flex items-center justify-center gap-3 lg:justify-start">
                <span className="h-px w-8 bg-[#d8b36a]" />

                <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#a37b35]">
                  Welcome to Artics Decorr
                </span>

                <span className="h-px w-8 bg-[#d8b36a] lg:hidden" />
              </div>

              <h1 className="font-serif text-[34px] font-medium leading-tight tracking-[-0.5px] text-[#102f4f] sm:text-[40px]">
                Create an Account
              </h1>

              <p className="mx-auto mt-3 max-w-[430px] text-[14px] leading-6 text-[#777] lg:mx-0">
                Create your account and make your next furniture experience
                simple and effortless.
              </p>
            </div>

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="mt-9 space-y-5"
            >

              {/* NAME */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#5f6871]"
                >
                  Full Name
                </label>

                <div className="group relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9ba2a8] transition-colors group-focus-within:text-[#102f4f]">
                    <UserIcon />
                  </span>

                  <input
                    id="name"
                    required
                    autoComplete="name"
                    placeholder="Enter your full name"
                    value={form.name}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        name: e.target.value,
                      })
                    }
                    className="h-[54px] w-full border border-[#dfe3e7] bg-[#fafbfc] pl-12 pr-4 text-[14px] text-[#172b41] outline-none transition-all placeholder:text-[#a7adb3] focus:border-[#102f4f] focus:bg-white focus:ring-4 focus:ring-[#102f4f]/[0.06]"
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#5f6871]"
                >
                  Email Address
                </label>

                <div className="group relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9ba2a8] transition-colors group-focus-within:text-[#102f4f]">
                    <MailIcon />
                  </span>

                  <input
                    id="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        email: e.target.value,
                      })
                    }
                    className="h-[54px] w-full border border-[#dfe3e7] bg-[#fafbfc] pl-12 pr-4 text-[14px] text-[#172b41] outline-none transition-all placeholder:text-[#a7adb3] focus:border-[#102f4f] focus:bg-white focus:ring-4 focus:ring-[#102f4f]/[0.06]"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#5f6871]"
                >
                  Password
                </label>

                <div className="group relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9ba2a8] transition-colors group-focus-within:text-[#102f4f]">
                    <LockIcon />
                  </span>

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={8}
                    autoComplete="new-password"
                    placeholder="At least 8 characters"
                    value={form.password}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        password: e.target.value,
                      })
                    }
                    className="h-[54px] w-full border border-[#dfe3e7] bg-[#fafbfc] pl-12 pr-12 text-[14px] text-[#172b41] outline-none transition-all placeholder:text-[#a7adb3] focus:border-[#102f4f] focus:bg-white focus:ring-4 focus:ring-[#102f4f]/[0.06]"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((v) => !v)
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8b939a] transition-colors hover:text-[#102f4f]"
                  >
                    <EyeIcon
                      open={showPassword}
                      className="h-5 w-5"
                    />
                  </button>
                </div>

                <div className="mt-2 flex items-center justify-between">
                  <p
                    className={`text-[11.5px] ${
                      form.password.length === 0
                        ? "text-[#999]"
                        : passwordOk
                        ? "text-emerald-600"
                        : "text-[#999]"
                    }`}
                  >
                    {passwordOk
                      ? "✓ Password looks good"
                      : "Minimum 8 characters"}
                  </p>

                  {form.password.length > 0 && (
                    <span className="text-[10px] uppercase tracking-[0.12em] text-[#aaa]">
                      {form.password.length}/8+
                    </span>
                  )}
                </div>
              </div>

              {/* ERROR */}
              {error && (
                <div
                  role="alert"
                  className="border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700"
                >
                  {error}
                </div>
              )}

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={submitting}
                className="
                  group
                  relative
                  flex
                  h-[56px]
                  w-full
                  items-center
                  justify-center
                  gap-2
                  overflow-hidden
                  bg-[#102f4f]
                  text-[13px]
                  font-semibold
                  uppercase
                  tracking-[0.14em]
                  text-white
                  transition-all
                  duration-500
                  hover:bg-[#0b263e]
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {/* CENTER FILL EFFECT */}
                <span
                  aria-hidden="true"
                  className="
                    absolute
                    inset-0
                    origin-center
                    scale-x-0
                    bg-[#d8b36a]
                    transition-transform
                    duration-500
                    ease-[cubic-bezier(0.65,0,0.35,1)]
                    group-hover:scale-x-100
                  "
                />

                <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-[#102f4f]">
                  {submitting && (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white group-hover:border-[#102f4f]/30 group-hover:border-t-[#102f4f]" />
                  )}

                  {submitting
                    ? "Creating Account..."
                    : "Create Account"}

                  {!submitting && <ArrowIcon />}
                </span>
              </button>

              {/* TERMS */}
              <p className="text-center text-[11.5px] leading-5 text-[#999]">
                By creating an account, you agree to our{" "}
                <Link
                  href="/terms"
                  className="text-[#102f4f] underline underline-offset-2 transition-colors hover:text-[#a37b35]"
                >
                  Terms
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-[#102f4f] underline underline-offset-2 transition-colors hover:text-[#a37b35]"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </form>

            {/* DIVIDER */}
            <div className="my-8 flex items-center gap-4">
              <span className="h-px flex-1 bg-[#e5e7e9]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#a0a4a8]">
                Already a member?
              </span>

              <span className="h-px flex-1 bg-[#e5e7e9]" />
            </div>

            {/* LOGIN */}
            <Link
              href={`/account/login${
                next !== "/account"
                  ? `?next=${encodeURIComponent(next)}`
                  : ""
              }`}
              className="
                group
                flex
                h-[54px]
                w-full
                items-center
                justify-center
                gap-2
                border
                border-[#102f4f]
                text-[12px]
                font-semibold
                uppercase
                tracking-[0.14em]
                text-[#102f4f]
                transition-all
                duration-300
                hover:bg-[#102f4f]
                hover:text-white
              "
            >
              Sign In
              <ArrowIcon />
            </Link>

            {/* BOTTOM BRAND */}
            <div className="mt-8 flex items-center justify-center gap-3 text-[#b0b4b8]">
              <span className="h-px w-8 bg-[#e5e7e9]" />

              <span className="text-[10px] uppercase tracking-[0.22em]">
                Artics Decorr
              </span>

              <span className="h-px w-8 bg-[#e5e7e9]" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

/* =========================================================
   SKELETON
========================================================= */

function RegisterSkeleton() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-[#f7f8fa] px-5">
      <div className="w-full max-w-[500px] animate-pulse space-y-5">
        <div className="mx-auto h-10 w-56 bg-[#102f4f]/10" />
        <div className="h-14 w-full bg-black/[0.05]" />
        <div className="h-14 w-full bg-black/[0.05]" />
        <div className="h-14 w-full bg-black/[0.05]" />
        <div className="h-14 w-full bg-[#102f4f]/10" />
      </div>
    </div>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function RegisterPage() {
  return (
    <Suspense fallback={<RegisterSkeleton />}>
      <RegisterForm />
    </Suspense>
  );
}
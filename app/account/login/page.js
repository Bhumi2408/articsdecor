// app/account/login/page.jsx
"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";

/* =========================================================
   THEME
   =========================================================
   Primary Navy  : #132c47
   Accent Maroon : #244128
   Background     : #f5f3ee
========================================================= */

const SIDE_IMAGE = "/products/p32.png";
const LOGO_SRC = "/logo.png";

const EyeIcon = ({ open, className = "" }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
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
        <path d="M9.9 5.8A9.6 9.6 0 0 1 12 5.5c6 0 9.5 6.5 9.5 6.5a17 17 0 0 1-3.4 4.1M6.4 7.9A16.7 16.7 0 0 0 2.5 12S6 18.5 12 18.5c1.3 0 2.4-.3 3.5-.7" />
        <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
      </>
    )}
  </svg>
);

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/account";

  const [form, setForm] = useState({
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
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      router.push(next);
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass = `
    w-full
    rounded-xl
    border
    border-[#132c47]/15
    bg-white
    px-4
    py-3.5
    text-[15px]
    text-[#132c47]
    outline-none
    placeholder:text-[#9a9a9a]
    transition-all
    duration-300
    focus:border-[#132c47]
    focus:ring-4
    focus:ring-[#132c47]/10
  `;

  const labelClass = `
    mb-2.5
    block
    text-[11.5px]
    font-bold
    uppercase
    tracking-[0.14em]
    text-[#132c47]
  `;

  return (
    <main className="min-h-screen bg-[#f5f3ee]">
       <Breadcrumbs image="/products/p10.png" title="Login" items={[{ label: "Login" }]} />
      <div
        className="
          grid
          min-h-screen
          lg:grid-cols-2
        "
      >
        {/* =====================================================
            LEFT VISUAL
        ====================================================== */}
        <div className="relative hidden overflow-hidden lg:block">
          <img
            src={SIDE_IMAGE}
            alt=""
            className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
              transition-transform
              duration-[1200ms]
              hover:scale-[1.02]
            "
          />

          {/* NAVY BASE OVERLAY */}
          <div
            className="
              absolute
              inset-0
              bg-[#132c47]/40
            "
          />

          {/* MAROON GRADIENT */}
          <div
            className="
              absolute
              inset-0
              bg-gradient-to-br
              from-[#132c47]/20
              via-[#132c47]/35
              to-[#244128]/55
            "
          />

          {/* CONTENT */}
          <div
            className="
              relative
              flex
              min-h-screen
              flex-col
              justify-end
              p-12
              xl:p-16
              2xl:p-20
            "
          >
            {/* BRAND */}
            <div className="mb-10">
              <div
                className="
                  mb-4
                  h-px
                  w-16
                  bg-[#f5f3ee]/70
                "
              />

              <span
                className="
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.28em]
                  text-[#f5f3ee]
                "
              >
                Artics Decorr
              </span>
            </div>

            <h2
              className="
                max-w-[560px]
                font-serif
                text-[42px]
                font-medium
                leading-[1.05]
                tracking-[-0.8px]
                text-white
                xl:text-[52px]
                2xl:text-[58px]
              "
            >
              Welcome back to
              <br />
              timeless comfort.
            </h2>

            <p
              className="
                mt-6
                max-w-[500px]
                text-[15px]
                leading-[1.8]
                text-white/75
                xl:text-[16px]
              "
            >
              Sign in to manage your account, track your orders and
              continue exploring our thoughtfully designed outdoor
              furniture collection.
            </p>

            {/* DECORATIVE LINE */}
            <div className="mt-9 flex items-center gap-3">
              <span className="h-px w-12 bg-[#f5f3ee]/50" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#f5f3ee]" />
              <span className="h-px w-12 bg-[#f5f3ee]/50" />
            </div>
          </div>
        </div>

        {/* =====================================================
            RIGHT FORM
        ====================================================== */}
        <div
          className="
            flex
            items-center
            justify-center
            px-5
            py-12
            sm:px-10
            sm:py-16
            lg:px-12
            xl:px-20
            2xl:px-28
          "
        >
          <div className="w-full max-w-[470px]">

            {/* MOBILE LOGO */}
            <div className="mb-10 lg:hidden">
              <Link href="/" className="inline-flex items-center">
                <img
                  src={LOGO_SRC}
                  alt="Artics Decorr"
                  className="h-11 w-auto object-contain"
                />
              </Link>

              <div className="mt-5 h-px w-14 bg-[#244128]" />
            </div>

            {/* FORM CARD */}
            <div
              className="
                rounded-2xl
                border
                border-[#132c47]/10
                bg-white
                p-6
                shadow-[0_25px_70px_-35px_rgba(19,44,71,0.45)]
                sm:p-9
                lg:p-10
                xl:p-12
              "
            >
              {/* TOP LABEL */}
              <div className="mb-8">
                <span
                  className="
                    inline-flex
                    items-center
                    gap-2
                    text-[11px]
                    font-bold
                    uppercase
                    tracking-[0.2em]
                    text-[#244128]
                  "
                >
                  <span className="h-px w-7 bg-[#244128]" />
                  My Account
                </span>

                <h1
                  className="
                    mt-4
                    font-serif
                    text-[34px]
                    font-medium
                    leading-tight
                    tracking-[-0.5px]
                    text-[#132c47]
                    sm:text-[38px]
                  "
                >
                  Sign In
                </h1>

                <p
                  className="
                    mt-3
                    text-[14.5px]
                    leading-7
                    text-[#66717b]
                  "
                >
                  Enter your details to access your account and
                  continue shopping with us.
                </p>
              </div>

              {/* FORM */}
              <form onSubmit={handleSubmit} className="space-y-5">

                {/* EMAIL */}
                <div>
                  <label htmlFor="email" className={labelClass}>
                    Email Address
                  </label>

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
                    className={inputClass}
                  />
                </div>

                {/* PASSWORD */}
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className={labelClass}>
                      Password
                    </label>

                    <span
                      className="
                        mb-2.5
                        text-[10px]
                        font-medium
                        uppercase
                        tracking-[0.1em]
                        text-[#9a9a9a]
                      "
                    >
                      Secure Login
                    </span>
                  </div>

                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      required
                      autoComplete="current-password"
                      placeholder="••••••••"
                      value={form.password}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          password: e.target.value,
                        })
                      }
                      className={`${inputClass} pr-12`}
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
                      className="
                        absolute
                        right-3
                        top-1/2
                        -translate-y-1/2
                        rounded-lg
                        p-2
                        text-[#132c47]/50
                        transition-all
                        duration-300
                        hover:bg-[#f5f3ee]
                        hover:text-[#244128]
                      "
                    >
                      <EyeIcon
                        open={showPassword}
                        className="h-5 w-5"
                      />
                    </button>
                  </div>
                </div>

                {/* ERROR */}
                {error && (
                  <div
                    role="alert"
                    className="
                      rounded-xl
                      border
                      border-[#244128]/20
                      bg-[#244128]/5
                      px-4
                      py-3
                      text-[13.5px]
                      leading-relaxed
                      text-[#244128]
                    "
                  >
                    {error}
                  </div>
                )}

                {/* LOGIN BUTTON */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="
                    group
                    relative
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    overflow-hidden
                    rounded-xl
                    bg-[#132c47]
                    py-4
                    text-[13px]
                    font-bold
                    uppercase
                    tracking-[0.14em]
                    text-white
                    transition-all
                    duration-500
                    hover:bg-[#244128]
                    hover:shadow-[0_12px_30px_-12px_rgba(119,8,0,0.5)]
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >
                  <span
                    className="
                      absolute
                      inset-0
                      -translate-x-full
                      bg-white/10
                      transition-transform
                      duration-500
                      group-hover:translate-x-full
                    "
                  />

                  {submitting && (
                    <span
                      className="
                        relative
                        h-4
                        w-4
                        animate-spin
                        rounded-full
                        border-2
                        border-white/40
                        border-t-white
                      "
                    />
                  )}

                  <span className="relative">
                    {submitting
                      ? "Signing in..."
                      : "Sign In"}
                  </span>

                  {!submitting && (
                    <span
                      className="
                        relative
                        ml-1
                        text-lg
                        leading-none
                        transition-transform
                        duration-300
                        group-hover:translate-x-1
                      "
                    >
                      →
                    </span>
                  )}
                </button>
              </form>

              {/* DIVIDER */}
              <div className="my-8 flex items-center gap-4">
                <span className="h-px flex-1 bg-[#132c47]/10" />

                <span
                  className="
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.18em]
                    text-[#9a9a9a]
                  "
                >
                  or
                </span>

                <span className="h-px flex-1 bg-[#132c47]/10" />
              </div>

              {/* REGISTER */}
              <div
                className="
                  rounded-xl
                  border
                  border-[#132c47]/10
                  bg-[#f5f3ee]
                  px-5
                  py-4
                  text-center
                "
              >
                <p className="text-[14px] text-[#66717b]">
                  No account yet?
                </p>

                <Link
                  href={`/account/register${
                    next !== "/account"
                      ? `?next=${encodeURIComponent(next)}`
                      : ""
                  }`}
                  className="
                    mt-1
                    inline-flex
                    items-center
                    gap-1
                    text-[14px]
                    font-bold
                    text-[#244128]
                    transition-colors
                    duration-300
                    hover:text-[#132c47]
                  "
                >
                  Create your account
                  <span
                    className="
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  >
                    →
                  </span>
                </Link>
              </div>
            </div>

            {/* BOTTOM BRAND LINE */}
            <div className="mt-7 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-[#132c47]/15" />

              <span
                className="
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.25em]
                  text-[#132c47]/45
                "
              >
                Artics Decorr
              </span>

              <span className="h-px w-10 bg-[#132c47]/15" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function LoginSkeleton() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5f3ee] px-5">
      <div className="w-full max-w-[430px] animate-pulse rounded-2xl bg-white p-8 shadow-sm">
        <div className="mb-8 h-4 w-28 rounded bg-[#132c47]/10" />
        <div className="mb-3 h-10 w-40 rounded bg-[#132c47]/10" />
        <div className="mb-8 h-4 w-full rounded bg-[#132c47]/5" />

        <div className="space-y-5">
          <div className="h-14 w-full rounded-xl bg-[#132c47]/5" />
          <div className="h-14 w-full rounded-xl bg-[#132c47]/5" />
          <div className="h-14 w-full rounded-xl bg-[#132c47]/10" />
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginSkeleton />}>

      <LoginForm />
    </Suspense>
  );
}
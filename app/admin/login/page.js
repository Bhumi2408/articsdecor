"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function AdminLoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/admin/auth/login", {
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

      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#17251f] text-white">
      <Breadcrumbs image="/products/p16.png" title="Admin" items={[{ label: "Admin" }]}/>
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#b79a63]/10 blur-[120px]" />

        <div className="absolute -bottom-40 -right-40 h-[550px] w-[550px] rounded-full bg-[#7e967b]/10 blur-[130px]" />

        <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.5)_1px,transparent_1px)] [background-size:60px_60px]" />
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-5 py-10 sm:px-8">
        <div className="grid w-full max-w-[1080px] overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.035] shadow-[0_30px_100px_rgba(0,0,0,.45)] backdrop-blur-xl lg:grid-cols-[1.05fr_0.95fr]">

          {/* ================= LEFT PANEL ================= */}
          <div className="relative hidden min-h-[680px] overflow-hidden border-r border-white/10 lg:flex">
            
            {/* Decorative circles */}
            <div className="absolute -left-48 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full border border-[#b79a63]/10" />

            <div className="absolute -left-20 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full border border-[#b79a63]/10" />

            <div className="absolute right-[-120px] top-[-100px] h-[300px] w-[300px] rounded-full border border-white/[0.04]" />

            <div className="relative z-10 flex w-full flex-col justify-between p-14">

              {/* Brand */}
              <div>
                <div className="flex items-center gap-4">
                  
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#b79a63]/50 bg-[#b79a63]/10">
                    <span className="text-2xl text-[#cdb27a]">✦</span>
                  </div>

                  <div>
                    <div className="font-serif text-[27px] tracking-[0.12em] text-[#f1eee5]">
                      ARTICS
                    </div>

                    <div className="mt-0.5 text-[9px] uppercase tracking-[0.42em] text-[#cdb27a]">
                      Decor
                    </div>
                  </div>

                </div>

                {/* Main copy */}
                <div className="mt-28 max-w-[470px]">
                  <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.38em] text-[#cdb27a]">
                    Admin Portal
                  </p>

                  <h1 className="font-serif text-[52px] leading-[1.05] text-[#f4f0e7] xl:text-[62px]">
                    Design
                    <br />
                    <span className="italic text-[#cdb27a]">
                      that lives
                    </span>
                    <br />
                    outdoors.
                  </h1>

                  <p className="mt-8 max-w-[390px] text-[14px] leading-7 text-white/45">
                    Manage your furniture collection, products and
                    digital storefront from one elegant workspace.
                  </p>
                </div>
              </div>

              {/* Bottom */}
              <div className="flex items-end justify-between">
                <div>
                  <div className="mb-3 h-px w-12 bg-[#b79a63]" />

                  <p className="text-[9px] uppercase tracking-[0.3em] text-white/30">
                    Premium Outdoor Furniture
                  </p>

                  <p className="mt-2 text-[10px] text-white/20">
                    Crafted for beautiful spaces
                  </p>
                </div>

                <div className="font-serif text-[80px] leading-none text-white/[0.025]">
                  AD
                </div>
              </div>

            </div>
          </div>

          {/* ================= RIGHT PANEL ================= */}
          <div className="flex min-h-[680px] items-center justify-center p-6 sm:p-10 lg:p-14">
            <div className="w-full max-w-[390px]">

              {/* Mobile Logo */}
              <div className="mb-12 text-center lg:hidden">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-[#b79a63]/50 bg-[#b79a63]/10">
                  <span className="text-2xl text-[#cdb27a]">
                    ✦
                  </span>
                </div>

                <div className="font-serif text-2xl tracking-[0.14em]">
                  ARTICS
                </div>

                <div className="mt-1 text-[9px] uppercase tracking-[0.4em] text-[#cdb27a]">
                  Decor
                </div>
              </div>

              {/* Heading */}
              <div className="mb-10">
                <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.32em] text-[#cdb27a]">
                  Welcome Back
                </p>

                <h2 className="font-serif text-[40px] leading-[1.08] text-[#f3efe6]">
                  Enter your
                  <br />
                  <span className="italic text-[#cdb27a]">
                    workspace.
                  </span>
                </h2>

                <p className="mt-5 text-sm leading-6 text-white/40">
                  Sign in to manage your products, collections
                  and online store.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2.5 block text-[10px] font-medium uppercase tracking-[0.2em] text-white/45"
                  >
                    Email Address
                  </label>

                  <div className="relative">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-white/25">
                      @
                    </span>

                    <input
                      id="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          email: e.target.value,
                        })
                      }
                      placeholder="admin@example.com"
                      className="h-14 w-full rounded-xl border border-white/10 bg-white/[0.045] pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-white/20 hover:border-white/20 focus:border-[#b79a63]/60 focus:bg-white/[0.065] focus:ring-1 focus:ring-[#b79a63]/20"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2.5 block text-[10px] font-medium uppercase tracking-[0.2em] text-white/45"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[8px] text-white/25">
                      ●
                    </span>

                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      required
                      autoComplete="current-password"
                      value={form.password}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          password: e.target.value,
                        })
                      }
                      placeholder="Enter your password"
                      className="h-14 w-full rounded-xl border border-white/10 bg-white/[0.045] pl-11 pr-16 text-sm text-white outline-none transition placeholder:text-white/20 hover:border-white/20 focus:border-[#b79a63]/60 focus:bg-white/[0.065] focus:ring-1 focus:ring-[#b79a63]/20"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] uppercase tracking-[0.15em] text-white/30 transition hover:text-[#cdb27a]"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <div className="flex items-start gap-3 rounded-xl border border-red-400/20 bg-red-400/[0.06] px-4 py-3">
                    <span className="mt-0.5 text-red-300">
                      !
                    </span>

                    <p className="text-xs leading-5 text-red-200/80">
                      {error}
                    </p>
                  </div>
                )}

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="group relative flex h-14 w-full items-center justify-center overflow-hidden rounded-xl bg-[#b79a63] text-[10px] font-semibold uppercase tracking-[0.28em] text-[#17251f] transition duration-300 hover:bg-[#cdb27a] hover:shadow-[0_14px_40px_rgba(183,154,99,.18)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <span>
                    {submitting ? "Signing in..." : "Sign In"}
                  </span>

                  {!submitting && (
                    <span className="absolute right-5 text-lg transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  )}
                </button>
              </form>

              {/* Footer */}
              <div className="mt-10 flex items-center gap-4">
                <div className="h-px flex-1 bg-white/[0.07]" />

                <span className="text-[8px] uppercase tracking-[0.28em] text-white/20">
                  Secure Access
                </span>

                <div className="h-px flex-1 bg-white/[0.07]" />
              </div>

              <p className="mt-5 text-center text-[10px] leading-5 text-white/20">
                Authorized access only. Your administration
                workspace is protected.
              </p>

            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
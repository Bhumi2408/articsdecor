"use client";

import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { COMPANY } from "@/lib/company";

/* ============================== TEXT BLOCKS ============================== */

export function P({ children }) {
  return (
    <p className="text-[15px] leading-[1.85] text-[#4A4A4A]">
      {children}
    </p>
  );
}

export function UL({ children }) {
  return (
    <ul className="ml-1 space-y-2.5 text-[15px] leading-[1.8] text-[#4A4A4A]">
      {children}
    </ul>
  );
}

export function LI({ children }) {
  return (
    <li className="flex gap-3">
      <span className="mt-[10px] h-1 w-1 shrink-0 rounded-full bg-[#770800]" />
      <span>{children}</span>
    </li>
  );
}

export function Note({ children }) {
  return (
    <div className="rounded-xl border border-[#132c47]/10 bg-[#f5f3ee] px-4 py-3.5 text-[14px] leading-[1.75] text-[#132c47]/70">
      {children}
    </div>
  );
}

/* ============================== LEGAL PAGE ============================== */

export default function LegalPage({
  title,
  subtitle,
  sections = [],
  breadcrumb,
}) {
  return (
    <main className="min-h-screen bg-[#f5f3ee] pb-20 text-[#132c47]">
      {/* ==================== BREADCRUMB ==================== */}
      <div>
        <Breadcrumbs
        image="/products/p16.png" title={title}
          items={[
            {
              label: breadcrumb || title,
            },
          ]}
        />
      </div>

      {/* ==================== HEADER ==================== */}
      <section className="mx-auto w-full max-w-[1400px] px-5 pt-8 sm:px-8 lg:px-12">
        <div className="relative overflow-hidden bg-[#132c47] px-7 py-10 sm:px-10 md:px-12 md:py-14">
          {/* decorative elements */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/10" />

          <div className="pointer-events-none absolute -bottom-32 right-20 h-72 w-72 rounded-full border border-[#770800]/30" />

          <div className="relative z-10">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-9 bg-[#770800]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/55">
                Artics Decorr
              </span>
            </div>

            <h1 className="font-serif text-[32px] leading-tight text-white sm:text-[40px] lg:text-[46px]">
              {title}
            </h1>

            {subtitle && (
              <p className="mt-4 max-w-3xl text-[15px] leading-[1.8] text-white/65">
                {subtitle}
              </p>
            )}

            <div className="mt-7 h-px w-full max-w-[720px] bg-white/10" />

            <p className="mt-5 text-[10px] font-medium uppercase tracking-[0.18em] text-white/40">
              Last updated: {COMPANY.lastUpdated}
            </p>
          </div>
        </div>
      </section>

      {/* ==================== BODY ==================== */}
      <section className="mx-auto mt-10 grid w-full max-w-[1400px] gap-10 px-5 sm:px-8 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16 lg:px-12">
        {/* ==================== CONTENTS ==================== */}
        <aside className="hidden lg:sticky lg:top-32 lg:block lg:self-start">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#132c47]/45">
            Contents
          </p>

          <nav className="mt-4 space-y-1">
            {sections.map((s, i) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="group block rounded-lg py-2 pl-3 pr-2 text-[13.5px] leading-snug text-[#132c47]/60 transition-colors hover:bg-white hover:text-[#770800]"
              >
                <span className="mr-2 text-[#132c47]/25 transition-colors group-hover:text-[#770800]">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {s.heading}
              </a>
            ))}
          </nav>
        </aside>

        {/* ==================== SECTIONS ==================== */}
        <div className="min-w-0 max-w-[800px]">
          <div className="space-y-12">
            {sections.map((s, i) => (
              <section
                key={s.id}
                id={s.id}
                className="scroll-mt-32"
              >
                <h2 className="font-serif text-[21px] leading-snug text-[#132c47] sm:text-[23px]">
                  <span className="mr-3 text-[13px] font-sans font-semibold tracking-wider text-[#770800]">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {s.heading}
                </h2>

                <div className="mt-4 space-y-4">
                  {s.body}
                </div>
              </section>
            ))}
          </div>

          {/* ==================== CONTACT CARD ==================== */}
          <div className="relative mt-16 overflow-hidden border border-[#132c47]/10 bg-white p-6 sm:p-8">
            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full border border-[#770800]/10" />

            <div className="relative">
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-7 bg-[#770800]" />

                <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#132c47]/40">
                  Need Assistance?
                </span>
              </div>

              <h2 className="font-serif text-[25px] text-[#132c47]">
                Still need help?
              </h2>

              <p className="mt-2 max-w-xl text-[14.5px] leading-[1.75] text-[#5A5A5A]">
                Our team is happy to help you with any questions regarding
                your order, products, returns or anything covered on this
                page.
              </p>

              <div className="mt-6 space-y-2 text-[14.5px]">
                <p className="text-[#5A5A5A]">
                  <span className="font-medium text-[#132c47]">
                    Email:
                  </span>{" "}
                  <a
                    href={`mailto:${COMPANY.email}`}
                    className="text-[#770800] transition-colors hover:text-[#132c47]"
                  >
                    {COMPANY.email}
                  </a>
                </p>

                <p className="text-[#5A5A5A]">
                  <span className="font-medium text-[#132c47]">
                    Tel:
                  </span>{" "}
                  <a
                    href={`tel:${COMPANY.phoneHref}`}
                    className="text-[#770800] transition-colors hover:text-[#132c47]"
                  >
                    {COMPANY.phone}
                  </a>
                </p>

                <p className="text-[#5A5A5A]">
                  <span className="font-medium text-[#132c47]">
                    Address:
                  </span>{" "}
                  {COMPANY.address}
                </p>
              </div>

              <Link
                href="/contact"
                className="mt-7 inline-flex items-center gap-4 bg-[#770800] px-6 py-3.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-[#132c47]"
              >
                Contact Us
                <span className="text-base">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
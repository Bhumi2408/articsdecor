// components/LegalPage.jsx
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { COMPANY } from "@/lib/company";

/* chhote reusable text blocks */
export function P({ children }) {
  return <p className="text-[15px] leading-[1.85] text-[#4A4A4A]">{children}</p>;
}

export function UL({ children }) {
  return (
    <ul className="ml-1 space-y-2.5 text-[15px] leading-[1.8] text-[#4A4A4A]">{children}</ul>
  );
}

export function LI({ children }) {
  return (
    <li className="flex gap-3">
      <span className="mt-[10px] h-1 w-1 shrink-0 rounded-full bg-[#BF9A3A]" />
      <span>{children}</span>
    </li>
  );
}

export function Note({ children }) {
  return (
    <div className="rounded-xl border border-[#E8DCC0] bg-[#FBF7EE] px-4 py-3.5 text-[14px] leading-[1.75] text-[#6B5A2E]">
      {children}
    </div>
  );
}

export default function LegalPage({ title, subtitle, sections = [], breadcrumb }) {
  return (
    <div className="pb-20">
      <div>
        <Breadcrumbs items={[{ label: breadcrumb || title }]} />
      </div>

      {/* ---------- header ---------- */}
      <div className="container-lute mt-8">
        <div className="rounded-2xl bg-gradient-to-r from-[#141414] to-[#2C2418] px-7 py-10 text-white md:px-12 md:py-14">
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#DBAF36]">
            Lute Diamonds
          </span>
          <h1 className="mt-3 text-[28px] font-medium leading-tight tracking-[-0.01em] md:text-[40px]">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 max-w-2xl text-[15px] leading-[1.75] text-white/65">{subtitle}</p>
          )}
          <p className="mt-6 text-[12.5px] uppercase tracking-[0.1em] text-white/40">
            Last updated: {COMPANY.lastUpdated}
          </p>
        </div>
      </div>

      {/* ---------- body ---------- */}
      <div className="container-lute mt-10 grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16">
        {/* contents */}
        <aside className="hidden lg:sticky lg:top-32 lg:block lg:self-start">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8A8A8A]">
            Contents
          </p>
          <nav className="mt-4 space-y-1">
            {sections.map((s, i) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="block rounded-lg py-1.5 pl-3 pr-2 text-[14px] leading-snug text-[#5A5A5A] transition-colors hover:bg-[#FAF8F4] hover:text-[#BF9A3A]"
              >
                <span className="mr-2 text-[#BFBFBF]">{String(i + 1).padStart(2, "0")}</span>
                {s.heading}
              </a>
            ))}
          </nav>
        </aside>

        {/* sections */}
        <div className="min-w-0 max-w-[760px]">
          <div className="space-y-11">
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} className="scroll-mt-32">
                <h2 className="text-[19px] font-medium leading-snug text-[#141414] sm:text-[21px]">
                  <span className="mr-2.5 text-[#BF9A3A]">{String(i + 1).padStart(2, "0")}</span>
                  {s.heading}
                </h2>
                <div className="mt-4 space-y-4">{s.body}</div>
              </section>
            ))}
          </div>

          {/* contact card */}
          <div className="mt-14 rounded-2xl border border-black/10 bg-[#FAF8F4] p-6 sm:p-8">
            <h2 className="text-[17px] font-medium text-[#141414]">Still need help?</h2>
            <p className="mt-2 text-[14.5px] leading-[1.75] text-[#5A5A5A]">
              Our team is happy to walk you through anything on this page.
            </p>
            <div className="mt-5 space-y-1.5 text-[14.5px]">
              <p className="text-[#5A5A5A]">
                <span className="font-medium text-[#141414]">Email:</span>{" "}
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="text-[#BF9A3A] transition-colors hover:text-[#A8862C]"
                >
                  {COMPANY.email}
                </a>
              </p>
              <p className="text-[#5A5A5A]">
                <span className="font-medium text-[#141414]">Tel:</span>{" "}
                <a
                  href={`tel:${COMPANY.phoneHref}`}
                  className="text-[#BF9A3A] transition-colors hover:text-[#A8862C]"
                >
                  {COMPANY.phone}
                </a>
              </p>
              <p className="text-[#5A5A5A]">
                <span className="font-medium text-[#141414]">Address:</span> {COMPANY.address}
              </p>
            </div>
            <Link
              href="/contact"
              className="mt-6 inline-block rounded-lg bg-[#141414] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#BF9A3A]"
            >
              Contact us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
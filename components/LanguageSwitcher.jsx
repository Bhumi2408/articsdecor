"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  LANGUAGES,
  loadGoogleTranslate,
  setLanguage,
  getSavedLanguage,
} from "@/lib/googleTranslate";

const compactBtn =
  "relative grid h-[38px] w-[38px] sm:h-[42px] sm:w-[42px] place-items-center rounded-full text-lg leading-none " +
  "transition-colors hover:bg-[var(--ad-gold-soft)] " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ad-gold)]";

export default function LanguageSwitcher({ variant = "desktop", className = "" }) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(getSavedLanguage);
  const ref = useRef(null);

  useEffect(() => {
    loadGoogleTranslate();
    if (current !== "en") setLanguage(current);
    // Only run once on mount — `current` is read for its initial value only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    function onClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function choose(code) {
    setCurrent(code);
    setOpen(false);
    setLanguage(code);
  }

  const active = LANGUAGES.find((l) => l.code === current) || LANGUAGES[0];

  if (variant === "mobile") {
    return (
      <div className="notranslate">
        <p className="mb-2.5 px-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--ad-ink-soft)]">
          Language
        </p>
        <div className="flex flex-wrap gap-2 px-5">
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => choose(l.code)}
              className={
                "flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[12.5px] font-medium transition-colors " +
                (l.code === current
                  ? "border-[var(--ad-gold)] bg-[var(--ad-gold-soft)] text-[var(--ad-gold)]"
                  : "border-[var(--ad-line)] text-[var(--ad-ink)] hover:border-[var(--ad-gold)] hover:text-[var(--ad-gold)]")
              }
            >
              <span aria-hidden="true">{l.flag}</span>
              {l.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div ref={ref} className={"notranslate relative " + className}>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label="Change language"
          aria-expanded={open}
          className={compactBtn}
        >
          <span aria-hidden="true">{active.flag}</span>
        </button>

        {open && (
          <ul className="absolute right-0 top-full z-50 mt-2 w-44 overflow-hidden rounded-2xl border border-[var(--ad-line)] bg-white py-1.5 shadow-[0_20px_50px_-15px_rgba(28,22,14,0.3)]">
            {LANGUAGES.map((l) => (
              <li key={l.code}>
                <button
                  type="button"
                  onClick={() => choose(l.code)}
                  className={
                    "flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-[13px] transition-colors hover:bg-[var(--ad-gold-soft)] hover:text-[var(--ad-gold)] " +
                    (l.code === current
                      ? "font-semibold text-[var(--ad-gold)]"
                      : "text-[var(--ad-ink)]")
                  }
                >
                  <span aria-hidden="true">{l.flag}</span>
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  return (
    <div ref={ref} className={"notranslate relative " + className}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Change language"
        aria-expanded={open}
        className="flex items-center gap-1.5 rounded-full px-3 py-2 text-[12px] font-semibold uppercase tracking-wide text-[var(--ad-ink)] transition-colors hover:bg-[var(--ad-gold-soft)] hover:text-[var(--ad-gold)]"
      >
        <span aria-hidden="true">{active.flag}</span>
        {active.label}
        <ChevronDown
          className={"h-3.5 w-3.5 transition-transform duration-200 " + (open ? "rotate-180" : "")}
          strokeWidth={2.2}
        />
      </button>

      {open && (
        <ul className="absolute right-0 top-full z-50 mt-2 w-44 overflow-hidden rounded-2xl border border-[var(--ad-line)] bg-white py-1.5 shadow-[0_20px_50px_-15px_rgba(28,22,14,0.3)]">
          {LANGUAGES.map((l) => (
            <li key={l.code}>
              <button
                type="button"
                onClick={() => choose(l.code)}
                className={
                  "flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-[13px] transition-colors hover:bg-[var(--ad-gold-soft)] hover:text-[var(--ad-gold)] " +
                  (l.code === current
                    ? "font-semibold text-[var(--ad-gold)]"
                    : "text-[var(--ad-ink)]")
                }
              >
                <span aria-hidden="true">{l.flag}</span>
                {l.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

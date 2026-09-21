// Lightweight wrapper around Google's free "Website Translator" widget.
// This avoids restructuring every page's copy into translation keys — the
// widget translates the rendered DOM in the browser on demand.

export const LANGUAGES = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "hi", label: "Hindi", flag: "🇮🇳" },
  { code: "ar", label: "Arabic", flag: "🇸🇦" },
  { code: "it", label: "Italian", flag: "🇮🇹" },
  { code: "fr", label: "French", flag: "🇫🇷" },
  { code: "de", label: "German", flag: "🇩🇪" },
];

export function loadGoogleTranslate() {
  if (typeof window === "undefined") return;
  if (window.__gtLoading) return;
  window.__gtLoading = true;

  window.googleTranslateElementInit = function () {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        includedLanguages: LANGUAGES.map((l) => l.code).join(","),
        autoDisplay: false,
      },
      "google_translate_element"
    );
  };

  const script = document.createElement("script");
  script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  script.async = true;
  document.body.appendChild(script);
}

// The widget injects a <select class="goog-te-combo"> once it's ready —
// that can take a moment after the script loads, so retry briefly.
export function setLanguage(code, attempt = 0) {
  if (typeof document === "undefined") return;

  const combo = document.querySelector("select.goog-te-combo");
  if (combo) {
    combo.value = code;
    combo.dispatchEvent(new Event("change"));
    try {
      localStorage.setItem("ad_lang", code);
    } catch {}
    return;
  }

  if (attempt < 20) {
    setTimeout(() => setLanguage(code, attempt + 1), 250);
  }
}

export function getSavedLanguage() {
  if (typeof window === "undefined") return "en";
  try {
    return localStorage.getItem("ad_lang") || "en";
  } catch {
    return "en";
  }
}

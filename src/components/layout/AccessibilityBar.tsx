"use client";

import { useEffect, useRef, useState } from "react";
import {
  Sun,
  Moon,
  Contrast,
  BookOpen,
  Type,
  Languages,
  Accessibility,
  Check,
} from "lucide-react";

type Theme = "default" | "dark" | "high-contrast" | "night-reading";

const FONT_SIZES = ["14px", "16px", "18px", "20px"] as const;

// Indian + international languages supported by Google Translate.
// Ordered: Indic first (our primary buyers/suppliers), then global.
const LANGUAGES = [
  { code: "en", label: "English", native: "English" },
  { code: "hi", label: "Hindi", native: "हिन्दी" },
  { code: "mr", label: "Marathi", native: "मराठी" },
  { code: "gu", label: "Gujarati", native: "ગુજરાતી" },
  { code: "ta", label: "Tamil", native: "தமிழ்" },
  { code: "te", label: "Telugu", native: "తెలుగు" },
  { code: "kn", label: "Kannada", native: "ಕನ್ನಡ" },
  { code: "ml", label: "Malayalam", native: "മലയാളം" },
  { code: "bn", label: "Bengali", native: "বাংলা" },
  { code: "pa", label: "Punjabi", native: "ਪੰਜਾਬੀ" },
  { code: "ur", label: "Urdu", native: "اردو" },
  { code: "ar", label: "Arabic", native: "العربية" },
  { code: "zh-CN", label: "Chinese (Simplified)", native: "中文" },
  { code: "fr", label: "French", native: "Français" },
  { code: "de", label: "German", native: "Deutsch" },
  { code: "es", label: "Spanish", native: "Español" },
  { code: "ru", label: "Russian", native: "Русский" },
  { code: "ja", label: "Japanese", native: "日本語" },
  { code: "ko", label: "Korean", native: "한국어" },
  { code: "pt", label: "Portuguese", native: "Português" },
  { code: "it", label: "Italian", native: "Italiano" },
  { code: "nl", label: "Dutch", native: "Nederlands" },
] as const;

function readGoogTrans(): string {
  if (typeof document === "undefined") return "en";
  const match = document.cookie.match(/googtrans=\/(?:auto|en)\/([^;]+)/);
  return match ? match[1] : "en";
}

function setGoogTrans(lang: string) {
  // Clear any existing googtrans cookies on all relevant scopes,
  // then set the new one at root + subdomain scope so Google Translate picks it up.
  const host = window.location.hostname;
  const parts = host.split(".");
  const apexDomain = parts.length > 1 ? `.${parts.slice(-2).join(".")}` : host;
  const paths = ["/"];
  const domains = [host, `.${host}`, apexDomain];
  for (const path of paths) {
    for (const dom of domains) {
      document.cookie = `googtrans=; path=${path}; domain=${dom}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    }
    document.cookie = `googtrans=; path=${path}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }
  if (lang && lang !== "en") {
    document.cookie = `googtrans=/en/${lang}; path=/`;
    document.cookie = `googtrans=/en/${lang}; path=/; domain=${apexDomain}`;
  }
  // Reload so Google Translate re-reads the cookie and translates all text.
  window.location.reload();
}

export default function AccessibilityBar() {
  const [theme, setTheme] = useState<Theme>("default");
  const [fontIdx, setFontIdx] = useState(1);
  const [translateOpen, setTranslateOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<string>("en");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedTheme = (localStorage.getItem("sb-theme") as Theme) || "default";
    const savedFontSize = localStorage.getItem("sb-font-size") || FONT_SIZES[1];
    const idx = FONT_SIZES.indexOf(savedFontSize as (typeof FONT_SIZES)[number]);
    setTheme(savedTheme);
    setFontIdx(idx >= 0 ? idx : 1);
    setCurrentLang(readGoogTrans());
  }, []);

  // Close translate dropdown on outside click.
  useEffect(() => {
    if (!translateOpen) return;
    function onDoc(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setTranslateOpen(false);
      }
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [translateOpen]);

  function applyTheme(next: Theme) {
    setTheme(next);
    if (next === "default") {
      document.documentElement.removeAttribute("data-theme");
      localStorage.removeItem("sb-theme");
    } else {
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("sb-theme", next);
    }
  }

  function changeFont(delta: number) {
    const next = Math.max(0, Math.min(FONT_SIZES.length - 1, fontIdx + delta));
    setFontIdx(next);
    document.documentElement.style.setProperty("--font-size-base", FONT_SIZES[next]);
    localStorage.setItem("sb-font-size", FONT_SIZES[next]);
  }

  function resetFont() {
    setFontIdx(1);
    document.documentElement.style.setProperty("--font-size-base", FONT_SIZES[1]);
    localStorage.removeItem("sb-font-size");
  }

  const currentLangLabel =
    LANGUAGES.find((l) => l.code === currentLang)?.native || "English";

  return (
    <div className="hidden md:flex items-center gap-1 text-sm" aria-label="Accessibility controls">
      {/* Text size controls */}
      <div className="flex items-center gap-0.5 border-r border-white/20 pr-2 mr-1">
        <span className="sr-only">Text size</span>
        <button
          type="button"
          onClick={() => changeFont(-1)}
          className="px-2 py-1 rounded hover:bg-white/10 font-semibold"
          aria-label="Decrease text size"
          title="Decrease text size"
        >
          A−
        </button>
        <button
          type="button"
          onClick={resetFont}
          className="px-2 py-1 rounded hover:bg-white/10"
          aria-label="Reset text size"
          title="Reset text size"
        >
          <Type size={14} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => changeFont(1)}
          className="px-2 py-1 rounded hover:bg-white/10 font-semibold"
          aria-label="Increase text size"
          title="Increase text size"
        >
          A+
        </button>
      </div>

      {/* Theme toggles */}
      <div className="flex items-center gap-0.5 border-r border-white/20 pr-2 mr-1">
        <button
          type="button"
          onClick={() => applyTheme("default")}
          className={`p-1.5 rounded hover:bg-white/10 ${theme === "default" ? "bg-white/15" : ""}`}
          aria-label="Default theme"
          aria-pressed={theme === "default"}
          title="Default theme"
        >
          <Sun size={14} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => applyTheme("dark")}
          className={`p-1.5 rounded hover:bg-white/10 ${theme === "dark" ? "bg-white/15" : ""}`}
          aria-label="Dark theme"
          aria-pressed={theme === "dark"}
          title="Dark theme"
        >
          <Moon size={14} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => applyTheme("high-contrast")}
          className={`p-1.5 rounded hover:bg-white/10 ${theme === "high-contrast" ? "bg-white/15" : ""}`}
          aria-label="High contrast theme"
          aria-pressed={theme === "high-contrast"}
          title="High contrast (black/yellow)"
        >
          <Contrast size={14} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => applyTheme("night-reading")}
          className={`p-1.5 rounded hover:bg-white/10 ${theme === "night-reading" ? "bg-white/15" : ""}`}
          aria-label="Night reading theme"
          aria-pressed={theme === "night-reading"}
          title="Night reading (sepia)"
        >
          <BookOpen size={14} aria-hidden="true" />
        </button>
      </div>

      {/* Translate widget — direct language switcher (reloads page with new language) */}
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setTranslateOpen((v) => !v)}
          className="flex items-center gap-1 px-2 py-1 rounded hover:bg-white/10"
          aria-expanded={translateOpen}
          aria-label="Translate this page"
          title="Translate this page"
        >
          <Languages size={14} aria-hidden="true" />
          <span>{currentLangLabel}</span>
        </button>
        {translateOpen && (
          <div
            role="menu"
            aria-label="Select language"
            className="absolute right-0 top-full mt-1 bg-[var(--card)] text-[var(--card-foreground)] border border-[var(--border)] rounded-md shadow-lg py-1 w-60 max-h-80 overflow-y-auto z-50"
          >
            {LANGUAGES.map((l) => {
              const selected = l.code === currentLang;
              return (
                <button
                  key={l.code}
                  type="button"
                  role="menuitemradio"
                  aria-checked={selected}
                  onClick={() => setGoogTrans(l.code)}
                  className={`flex items-center justify-between w-full px-3 py-2 text-left text-sm hover:bg-[var(--muted)] ${
                    selected ? "font-semibold text-brand-gold-600" : ""
                  }`}
                >
                  <span>
                    <span className="mr-1">{l.native}</span>
                    {l.native !== l.label && (
                      <span className="text-xs text-[var(--muted-foreground)]">
                        · {l.label}
                      </span>
                    )}
                  </span>
                  {selected && <Check size={14} aria-hidden="true" />}
                </button>
              );
            })}
            <p className="px-3 pt-1 pb-2 text-[10px] opacity-60">
              Powered by Google Translate
            </p>
          </div>
        )}
      </div>

      <a
        href="#main-content"
        className="flex items-center gap-1 px-2 py-1 rounded hover:bg-white/10"
        title="Accessibility: skip to content"
      >
        <Accessibility size={14} aria-hidden="true" />
        <span className="sr-only">Skip to main content</span>
      </a>
    </div>
  );
}

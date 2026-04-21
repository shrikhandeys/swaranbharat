"use client";

import { useEffect, useState } from "react";
import {
  Sun,
  Moon,
  Contrast,
  BookOpen,
  Type,
  Languages,
  Accessibility,
} from "lucide-react";

type Theme = "default" | "dark" | "high-contrast" | "night-reading";

const FONT_SIZES = ["14px", "16px", "18px", "20px"] as const;

export default function AccessibilityBar() {
  const [theme, setTheme] = useState<Theme>("default");
  const [fontIdx, setFontIdx] = useState(1);
  const [translateOpen, setTranslateOpen] = useState(false);

  useEffect(() => {
    const savedTheme = (localStorage.getItem("sb-theme") as Theme) || "default";
    const savedFontSize = localStorage.getItem("sb-font-size") || FONT_SIZES[1];
    const idx = FONT_SIZES.indexOf(savedFontSize as (typeof FONT_SIZES)[number]);
    setTheme(savedTheme);
    setFontIdx(idx >= 0 ? idx : 1);
  }, []);

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

      {/* Translate widget */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setTranslateOpen((v) => !v)}
          className="flex items-center gap-1 px-2 py-1 rounded hover:bg-white/10"
          aria-expanded={translateOpen}
          aria-label="Translate this page"
          title="Translate this page"
        >
          <Languages size={14} aria-hidden="true" />
          <span>Translate</span>
        </button>
        {translateOpen && (
          <div className="absolute right-0 top-full mt-1 bg-[var(--card)] text-[var(--card-foreground)] border border-[var(--border)] rounded-md shadow-lg p-3 w-64 z-50">
            <p className="text-xs mb-2 font-medium">Select language</p>
            <TranslateWidget />
            <p className="text-[10px] opacity-60 mt-2">Powered by Google Translate</p>
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

function TranslateWidget() {
  // Render a container that Google Translate will hydrate.
  // Relies on the script loaded in RootLayout which populates #google_translate_element.
  // We move the generated <select> into this container for styling.
  useEffect(() => {
    const interval = setInterval(() => {
      const src = document.querySelector("#google_translate_element .goog-te-combo");
      const dst = document.querySelector("#sb-translate-mount");
      if (src && dst && !dst.contains(src)) {
        dst.appendChild(src);
        clearInterval(interval);
      }
    }, 300);
    return () => clearInterval(interval);
  }, []);
  return <div id="sb-translate-mount" className="goog-te-gadget" />;
}

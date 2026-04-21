"use client";

// Runs before paint to apply saved accessibility preferences (theme + font size)
// so users don't see a flash of the default theme.
import { useEffect } from "react";

export default function AccessibilityInit() {
  useEffect(() => {
    try {
      const theme = localStorage.getItem("sb-theme");
      const fontSize = localStorage.getItem("sb-font-size");
      if (theme) document.documentElement.setAttribute("data-theme", theme);
      if (fontSize) document.documentElement.style.setProperty("--font-size-base", fontSize);
    } catch {
      /* localStorage unavailable */
    }
  }, []);
  return null;
}

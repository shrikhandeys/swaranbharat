import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Brand palette (matches Swaranbharat logo: deep navy + gold)
        brand: {
          navy: {
            50: "#f3f5f9",
            100: "#e3e8f1",
            200: "#c0cadb",
            300: "#92a1c0",
            400: "#6577a0",
            500: "#465885",
            600: "#35446a",
            700: "#293656",
            800: "#1f2a45",
            900: "#141c33",
            950: "#0b1122",
          },
          gold: {
            50: "#fefaec",
            100: "#fdf0c7",
            200: "#fbe18a",
            300: "#f9cc4e",
            400: "#f6b626",
            500: "#e89a0f",
            600: "#cd750a",
            700: "#a8530d",
            800: "#8a4112",
            900: "#723612",
            950: "#421b06",
          },
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "fade-in": "fadeIn 0.6s ease-out",
        "slide-up": "slideUp 0.6s ease-out",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;

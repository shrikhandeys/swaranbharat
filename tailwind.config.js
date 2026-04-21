/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Brand palette derived from the Swaranbharat visiting card:
        // deep navy blue (primary) with gold accent. Light shades are used
        // for section backgrounds so the site stays airy and clean.
        brand: {
          50: "#f3f6fd",
          100: "#e1e8f6",
          200: "#c2d1ed",
          300: "#8ba4d6",
          400: "#5777b8",
          500: "#3a5a9b",
          600: "#2f487d",
          700: "#263b68",
          800: "#1e2d4d",
          900: "#141d33",
        },
        gold: {
          50: "#fbf6e3",
          100: "#f6ecbf",
          200: "#efdc8e",
          300: "#e6c95b",
          400: "#dcb63a",
          500: "#c9a227",
          600: "#a6831e",
          700: "#85681b",
          800: "#6a531c",
          900: "#4c3b14",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Arial",
          "sans-serif",
        ],
      },
      container: {
        center: true,
        padding: "1rem",
      },
    },
  },
  plugins: [],
};

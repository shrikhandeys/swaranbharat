/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f4f8ed",
          100: "#e6efd4",
          200: "#cee0ab",
          300: "#aecc78",
          400: "#8fb74c",
          500: "#729a33",
          600: "#587a25",
          700: "#445e1f",
          800: "#384c1d",
          900: "#2f401c",
        },
        accent: {
          500: "#d97706",
          600: "#b45309",
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

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        "vision-bg": "#0A0A0B",
        "vision-surface": "#131316",
        "vision-border": "#232326",
        "vision-border-hover": "#3A3A3E",
        "vision-text": "#F2F2F0",
        "vision-text-secondary": "#8B8B8F",
        "vision-text-muted": "#5A5A5E",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
    },
  },
  plugins: [],
};
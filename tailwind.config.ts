import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        green: {
          DEFAULT: "#123524",
          mid: "#1a4a32",
          pale: "#e8f0eb",
        },
        gold: {
          DEFAULT: "#D4A017",
          deep: "#a67c12",
          pale: "#f8efd6",
        },
        dark: "#123524",
        charcoal: "#1F1F1F",
        ink: "#1F1F1F",
        muted: "#5a5a5a",
        faint: "#6b6b6b",
        cream: "#FAF8F3",
        line: "rgba(18,53,36,0.12)",
        "line-strong": "rgba(18,53,36,0.22)",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "6px",
        sm: "6px",
        md: "6px",
        lg: "10px",
        xl: "10px",
        "2xl": "10px",
      },
      boxShadow: {
        soft: "none",
        card: "none",
      },
      maxWidth: {
        content: "1120px",
      },
      keyframes: {
        spin: {
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        spin: "spin 0.7s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;

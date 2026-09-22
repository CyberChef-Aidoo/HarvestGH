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
        xl: "12px",
        "2xl": "16px",
      },
      boxShadow: {
        soft: "0 12px 40px rgba(18,53,36,0.08)",
        card: "0 8px 32px rgba(18,53,36,0.10)",
      },
      maxWidth: {
        content: "1120px",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        heroZoom: {
          "0%": { transform: "scale(1.08)" },
          "100%": { transform: "scale(1)" },
        },
        spin: {
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both",
        heroZoom: "heroZoom 12s cubic-bezier(0.22,1,0.36,1) forwards",
        spin: "spin 0.7s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;

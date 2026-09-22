import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // HarvestGH green + gold identity
        green: {
          DEFAULT: "#1a6b3c",
          mid: "#248a4d",
          pale: "#e6f3eb",
        },
        gold: {
          DEFAULT: "#c9921a",
          deep: "#a67612",
          pale: "#f8efd6",
        },
        dark: "#0c1a11",
        ink: "#142019",
        muted: "#5c6d60",
        faint: "#8a9a8e",
        cream: "#f4f6f3",
        line: "rgba(26,107,60,0.12)",
        "line-strong": "rgba(26,107,60,0.22)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "12px",
        "2xl": "16px",
      },
      boxShadow: {
        soft: "0 12px 40px rgba(12,26,17,0.08)",
        card: "0 8px 32px rgba(26,107,60,0.10)",
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

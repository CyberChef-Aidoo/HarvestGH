import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#7A3E2B",
          deep: "#5C2E20",
          pale: "#F1E4DD",
        },
        accent: {
          DEFAULT: "#C8391F",
          deep: "#9E2C17",
          pale: "#F8E3DE",
        },
        leaf: {
          DEFAULT: "#3F5A36",
          pale: "#E5EAE1",
        },
        charcoal: "#1C1A17",
        ink: "#1C1A17",
        muted: "#6E665B",
        faint: "#8A8276",
        surface: "#F4EFE4",
        line: "rgba(28,26,23,0.12)",
        "line-strong": "rgba(28,26,23,0.22)",
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
        soft: "0 12px 40px rgba(28,26,23,0.08)",
        card: "0 8px 32px rgba(28,26,23,0.10)",
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

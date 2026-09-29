import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#F3F7F1",
          100: "#E7F0E2",
          300: "#B7D0A6",
          500: "#5F9838",
          600: "#518130",
          700: "#436A27",
          800: "#375820",
          900: "#2B4419",
          DEFAULT: "#5F9838",
        },
        accent: {
          50: "#FDFAEA",
          300: "#FFDC84",
          400: "#FFD259",
          500: "#FFCA42",
          600: "#D9AC38",
          DEFAULT: "#FFCA42",
        },
        surface: {
          DEFAULT: "#FEFFDD",
          muted: "#F5F5EB",
        },
        ink: {
          DEFAULT: "#1A1F14",
          muted: "#4A5342",
          faint: "#6B7462",
          inverted: "#FEFFDD",
        },
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
        soft: "0 12px 40px rgba(26,31,20,0.08)",
        card: "0 8px 32px rgba(26,31,20,0.10)",
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

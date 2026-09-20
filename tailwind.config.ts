import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#000000",
          90: "rgba(0, 0, 0, 0.90)",
          80: "rgba(0, 0, 0, 0.80)",
          70: "rgba(0, 0, 0, 0.70)",
          60: "rgba(0, 0, 0, 0.60)",
          50: "rgba(0, 0, 0, 0.50)",
          40: "rgba(0, 0, 0, 0.40)",
          30: "rgba(0, 0, 0, 0.30)",
          20: "rgba(0, 0, 0, 0.20)",
          10: "rgba(0, 0, 0, 0.10)",
          5: "rgba(0, 0, 0, 0.05)",
        },
        ivory: {
          DEFAULT: "#F5F4EB",
          90: "rgba(245, 244, 235, 0.90)",
          80: "rgba(245, 244, 235, 0.80)",
          70: "rgba(245, 244, 235, 0.70)",
          60: "rgba(245, 244, 235, 0.60)",
          50: "rgba(245, 244, 235, 0.50)",
          20: "rgba(245, 244, 235, 0.20)",
          10: "rgba(245, 244, 235, 0.10)",
        },
        gold: {
          DEFAULT: "#C89A2B",
          hover: "#B38722",
          active: "#9E751D",
          muted: "rgba(200, 154, 43, 0.15)",
        },
      },
      fontFamily: {
        headline: ["var(--font-anton)", "Impact", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      lineHeight: {
        tighter: "0.9",
        tightest: "0.85",
      },
      borderRadius: {
        DEFAULT: "2px",
        none: "0px",
        sm: "2px",
        md: "4px",
      },
      maxWidth: {
        stadium: "1440px",
      },
      scale: {
        103: "1.03",
        104: "1.04",
      },
      screens: {
        xs: "420px",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "out-quart": "cubic-bezier(0.25, 1, 0.5, 1)",
        "in-out-quint": "cubic-bezier(0.83, 0, 0.17, 1)",
      },
      transitionDuration: {
        450: "450ms",
        600: "600ms",
        900: "900ms",
      },
      keyframes: {
        "ken-burns": {
          "0%": { transform: "scale(1.06) translate3d(0, 0, 0)" },
          "100%": { transform: "scale(1.18) translate3d(0, -1.5%, 0)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.85)", opacity: "0.9" },
          "70%, 100%": { transform: "scale(2.2)", opacity: "0" },
        },
        "scroll-cue": {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "40%": { opacity: "1" },
          "100%": { transform: "translateY(100%)", opacity: "0" },
        },
        "fade-up-in": {
          from: { opacity: "0", transform: "translate3d(0, 24px, 0)" },
          to: { opacity: "1", transform: "translate3d(0, 0, 0)" },
        },
        "rule-grow": {
          from: { transform: "scaleX(0)" },
          to: { transform: "scaleX(1)" },
        },
      },
      animation: {
        "ken-burns": "ken-burns 22s ease-out forwards",
        "pulse-ring": "pulse-ring 2.4s cubic-bezier(0.16, 1, 0.3, 1) infinite",
        "scroll-cue": "scroll-cue 2s cubic-bezier(0.83, 0, 0.17, 1) infinite",
        "fade-up-in": "fade-up-in 600ms cubic-bezier(0.16, 1, 0.3, 1) both",
        "rule-grow": "rule-grow 900ms cubic-bezier(0.16, 1, 0.3, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;

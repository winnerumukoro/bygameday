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
      },
    },
  },
  plugins: [],
};

export default config;

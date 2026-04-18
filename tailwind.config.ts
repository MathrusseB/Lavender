import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#F4EFE7",
        "cream-deep": "#EBE3D4",
        stone: "#D9CFBE",
        linen: "#C9BEA6",
        ink: "#1C1A16",
        "ink-soft": "#3A3530",
        "ink-mute": "#6F655A",
        rule: "#B7AB94",
        hay: "#B89755",
        pond: "#5A6B74",
        maple: "#8A3B2A",
        lavender: "#9A8BA8",
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', "serif"],
        mono: ['"Italiana"', "serif"],
        sans: ['"Work Sans"', "system-ui", "sans-serif"],
      },
      fontSize: {
        "hero-title": "clamp(56px, 9.5vw, 172px)",
        "section-title": "clamp(38px, 5.4vw, 76px)",
        "spec-numeral": "clamp(140px, 20vw, 260px)",
      },
      spacing: {
        gutter: "clamp(24px, 4.5vw, 72px)",
        "section-y": "clamp(80px, 11vw, 160px)",
        "sec-head-b": "clamp(40px, 6vw, 88px)",
      },
      letterSpacing: {
        display: "-0.02em",
        label: "0.28em",
        eyebrow: "0.42em",
      },
    },
  },
  plugins: [],
};

export default config;

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1rem", lg: "2rem" },
      screens: { "2xl": "1200px" },
    },
    extend: {
      colors: {
        // Coderzon brand palette
        brand: {
          DEFAULT: "#0E59F2", // primary blue
          dark: "#0B46BF",
          light: "#406AFF",
          50: "#EEF4FE",
          100: "#D7E5FD",
        },
        navy: {
          DEFAULT: "#051634", // headings + dark sections
          light: "#12223E",
          deep: "#07204D",
        },
        accent: "#F8E559", // yellow highlight
        muted: {
          DEFAULT: "#737373", // secondary text
          surface: "#F4F7FB", // light section background
        },
        body: "#343434", // default body copy
        // Navigation "console" surface — deeper than navy so the bar reads as
        // instrument chrome sitting above the page rather than part of it.
        console: {
          DEFAULT: "#03102A",
          raised: "#071A3A",
          line: "rgba(255,255,255,0.08)",
        },
      },
      fontFamily: {
        sans: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        label: "0.14em",
      },
      boxShadow: {
        card: "0px 25px 70px rgba(0, 0, 0, 0.08)",
        "card-hover": "0px 10px 70px rgba(0, 0, 0, 0.1)",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        // Original template animations, kept to the same values.
        orbit: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "float-y": {
          "0%, 100%": { transform: "translateY(-30px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "float-y-slow": {
          "0%, 100%": { transform: "translateY(-40px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "float-x": {
          "0%, 100%": { transform: "translateX(-20px)" },
          "50%": { transform: "translateX(-10px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
        orbit: "orbit 24s linear infinite",
        "float-y": "float-y 11s linear infinite",
        "float-y-slow": "float-y-slow 3s linear infinite",
        "float-x": "float-x 2s linear infinite",
      },
    },
  },
  plugins: [],
};

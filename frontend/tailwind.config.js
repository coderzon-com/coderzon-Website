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
        // Surfaces alternate through the page rather than sitting on one
        // ground. Near-black, paper, and a warm light grey between them.
        /* Stacked surfaces need an opaque lift from the ground, not a white
           overlay: cards that pile on top of each other must hide what is
           underneath or the stack reads as a smear. */
        ink: { DEFAULT: "#0A0A0A", raised: "#151515", high: "#1C1C1C" },
        mist: "#EDEDEA",
        signal: "#4DE1FF",
      },
      fontFamily: {
        sans: ["var(--font-instrument-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        label: "0.14em",
      },
      // A single spacing rhythm, used everywhere instead of ad-hoc padding.
      spacing: {
        "x-default": "clamp(1.25rem, 5vw, 5rem)",
        "y-default": "clamp(4rem, 9vw, 9rem)",
        /* For the seam between two sections that share a background.
           Where the boundary is invisible, both sections paying full vertical
           padding just compounds into dead space — measured at 39% of a
           screen between the deck and the platform wall. */
        "y-seam": "clamp(1.75rem, 3vw, 3rem)",
      },
      // One easing curve for the whole site, so motion feels authored.
      /* Depth on hover, inside the wall's shared perspective. Moving a plate
         toward the viewer makes it grow very slightly, which reads as coming
         forward; translating it in Y only reads as sliding. */
      translate: {
        "z-6": "0 0 24px",
      },
      transitionTimingFunction: {
        power: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      transitionDuration: {
        400: "400ms",
        600: "600ms",
      },
      fontSize: {
        /**
         * The hero headline, in two tiers.
         *
         * Keeping "Transforming business with" on a single line caps how large
         * it can be — twenty-six characters is a lot to fit beside a second
         * column. Rather than let that shrink the whole claim, the lead-in
         * stays modest and the word that matters gets the room: at 1920 the
         * lead-in sets at 65px and "Innovation" at 127px.
         *
         * Both floors are set by the longest unbreakable word at 320px, where
         * 280px is all there is.
         */
        "hero-lead": [
          "clamp(2.125rem, 3.8vw, 4.75rem)",
          { lineHeight: "1.05", letterSpacing: "-0.03em" },
        ],
        hero: [
          "clamp(3.25rem, 8vw, 9.5rem)",
          { lineHeight: "0.92", letterSpacing: "-0.04em" },
        ],
        display: [
          "clamp(2rem, 4vw, 3.25rem)",
          { lineHeight: "1.02", letterSpacing: "-0.03em" },
        ],
        heading: [
          "clamp(1.5rem, 2.6vw, 2.25rem)",
          { lineHeight: "1.1", letterSpacing: "-0.025em" },
        ],
        "display-sm": [
          "clamp(1.125rem, 1.5vw, 1.375rem)",
          { lineHeight: "1.25", letterSpacing: "-0.015em" },
        ],
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
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
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
        /* A short downward push with a long rest. The pause is what keeps a
           permanently-visible cue from becoming a distraction. */
        nudge: {
          "0%, 55%, 100%": { transform: "translateY(0)" },
          "28%": { transform: "translateY(4px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
        // Travels exactly half the duplicated track, so it loops seamlessly.
        marquee: "marquee 42s linear infinite",
        orbit: "orbit 24s linear infinite",
        "float-y": "float-y 11s linear infinite",
        "float-y-slow": "float-y-slow 3s linear infinite",
        "float-x": "float-x 2s linear infinite",
        nudge: "nudge 2.6s cubic-bezier(0.16, 1, 0.3, 1) infinite",
      },
    },
  },
  plugins: [],
};

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0A0F1F",
          soft: "#1C2438",
          mute: "#6B7385",
        },
        // Phase 25.5 — cooler off-white. The previous #FAFAF7 read as a
        // milk/beige cast on large surfaces. The new value is a near-neutral
        // cool grey that keeps warmth out of the institutional zones.
        paper: "#F4F5F2",
        // Phase 26 — middle surface, slightly darker than paper. Used for
        // recessed channels (story rail, secondary metadata blocks). Creates
        // a 4-tier depth ladder: panel < paper < white < ink.
        panel: "#E6E8E2",
        // Slightly more neutral border tone — was #E4E2DB (warm beige).
        rule: "#D9D9D6",
        accent: {
          DEFAULT: "#1F3A8A",   // institutional navy
          soft: "#E8ECF7",
        },
        // Phase 25.5 — muted institutional gold for highlights only
        // (active chip, urgency band, etc.). Use sparingly; avoid as fill.
        amber: {
          muted: "#A87C2F",
        },
        risk: {
          low: "#2F7D4F",
          medium: "#B08316",
          high: "#B04A1B",
          critical: "#8A1D1D",
        },
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
        serif: ["ui-serif", "Georgia", "serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;

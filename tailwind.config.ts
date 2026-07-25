import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          50: "#f0f4f9",
          100: "#e1e9f3",
          200: "#c7d6e7",
          300: "#a0bad7",
          400: "#7298c3",
          500: "#4f78af",
          600: "#3b5f93",
          700: "#304b77",
          800: "#1e3a5f", // Main Brand Accent
          900: "#1b3252",
          950: "#111f35",
        },
      },
      fontFamily: {
        // Editorial serif for headings, UI sans for body — both cover
        // Latin + Cyrillic + extended Cyrillic (see src/app/layout.tsx).
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        // The markup already used `shadow-xs`, which does not exist in
        // Tailwind v3 and so rendered as nothing.
        xs: "0 1px 2px 0 rgb(15 23 42 / 0.05)",
      },
      borderWidth: {
        3: "3px",
      },
    },
  },
  plugins: [],
};
export default config;

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
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;

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
        navy: {
          950: "#060A12",
          900: "#0B1120",
          850: "#10192D",
          800: "#1E293B",
          700: "#334155",
        },
        gold: {
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
        },
        accent: {
          lime: "#84CC16",
          emerald: "#10B981",
          cyan: "#06B6D4",
          amber: "#F59E0B",
        }
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "grid-pattern": "linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
export default config;

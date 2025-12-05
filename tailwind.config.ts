import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
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
        marian: {
          DEFAULT: "#60A5FA",
          dark: "#2B4593",
          glow: "rgba(96, 165, 250, 0.5)",
        },
        joseph: {
          DEFAULT: "#86EFAC",
          dark: "#4A6A4D",
          glow: "rgba(134, 239, 172, 0.5)",
        },
        slate: {
          850: "#151F32",
        }
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-glow": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
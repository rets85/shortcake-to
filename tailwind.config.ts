import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          DEFAULT: "#f43f5e",
          hover: "#e11d48",
          light: "#fff1f2",
          text: "#f43f5e",
        },
      },
      keyframes: {
        highlight: {
          from: { backgroundColor: "#FFF1F2" },
          to: { backgroundColor: "transparent" },
        },
      },
      animation: {
        highlight: "highlight 1.5s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;

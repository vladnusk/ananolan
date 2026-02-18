import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#0f766e",
          secondary: "#134e4a",
          accent: "#2dd4bf",
          muted: "#5eead4",
        },
        // Taxes site template palette
        taxes: {
          gray: {
            100: "#F3F4F6",
            200: "#E5E7EB",
            300: "#D1D5DB",
            400: "#CED4DA",
            500: "#6B7280",
            600: "#4B5563",
            700: "#374151",
            900: "#111827",
          },
          cyan: {
            DEFAULT: "#06B6D4",
            light: "#22D3EE",
          },
          black: "#000000",
          white: "#FFFFFF",
        },
      },
      backgroundImage: {
        "taxes-hero":
          "linear-gradient(135deg, rgba(6, 182, 212, 0.08) 0%, rgba(243, 244, 246, 1) 50%, rgba(255, 255, 255, 1) 100%)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;

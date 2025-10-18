import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
            DEFAULT: "#A98BE7", //purple color which we are using as primary brand color
            foreground: "#FFFFFF",
            50:  "#F6F2FB",
            100: "#EDE5F8",
            200: "#DACBF2",
            300: "#C7B1EB",
            400: "#B497E4",
            500: "#A98BE7", // brand default
            600: "#9579CC",
            700: "#7C63AA",
            800: "#634E87",
            900: "#4A3965",
          },
        secondary: {
          DEFAULT: "#C298D0", //secondary color 
          foreground: "#D4ACD0",
        },
        destructive: {
          DEFAULT: "#B85252",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#EADEDE",
          foreground: "#85889C",
        },
        accent: {
          DEFAULT: "#EADEDE",
          foreground: "#000000",
        },
        popover: {
          DEFAULT: "#FFFFFF",
          foreground: "#000000",
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#000000",
        },
        black: "#000000",
        orange: {
          50: "#FEF7F2",
          100: "#FDEEE5",
          200: "#FBDCCB",
          300: "#F8C4A1",
          400: "#F6A876",
          500: "#F58840",
          600: "#E6732A",
          700: "#C85E1F",
          800: "#A94A17",
          900: "#8B3B12",
        },
        burgundy: {
          50: "#F7F0F0",
          100: "#F0E1E1",
          200: "#E1C3C3",
          300: "#D2A5A5",
          400: "#C37878",
          500: "#B85252",
          600: "#A63E3E",
          700: "#8B3333",
          800: "#702929",
          900: "#5C2121",
        },
        cream: {
          50: "#FEFEFE",
          100: "#FDFDFD",
          200: "#F7F4F4",
          300: "#F1EEEE",
          400: "#EBE6E6",
          500: "#EADEDE",
          600: "#D4C8C8",
          700: "#BEB2B2",
          800: "#A89C9C",
          900: "#928686",
        },
        grey: {
          50: "#0D0D19",
          100: "#101023",
          200: "#111128",
          300: "#16171F",
          400: "#29212B",
          500: "#2B2A35",
          600: "#32323E",
          700: "#393946",
          800: "#404650",
          900: "#57575C",
          950: "#6B6A6B",
          1000: "#848485",
          1100: "#B6BCC6",
          1200: "#E0E0E0",
          1300: "#F2F2F0",
        },
        secondaryPalette: {
      100: "#A98BE7", // Secondary 001
      200: "#D4ACD0", // Secondary 002
      300: "#C298D0", // Secondary 003
    },  
     primaryPalette: {
      100: "#2B36D9", // Brand Blue
      200: "#010109", // Black
      300: "#F2F2F0", // White
    },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)",
        medium: "0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        large: "0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 20px 25px -5px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
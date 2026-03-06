/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
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
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Category colors for menu items
        category: {
          steamed: "hsl(var(--category-steamed))",
          "rice-rolls": "hsl(var(--category-rice-rolls))",
          buns: "hsl(var(--category-buns))",
          fried: "hsl(var(--category-fried))",
          noodle: "hsl(var(--category-noodle))",
          dessert: "hsl(var(--category-dessert))",
          other: "hsl(var(--category-other))",
          success: "hsl(var(--category-success))",
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
      fontSize: {
        base: "1.125rem", // 18px - elderly friendly
        lg: "1.25rem", // 20px
        xl: "1.5rem", // 24px
        "2xl": "1.875rem", // 30px
        "3xl": "2rem", // 32px - large headings
        "4xl": "2.25rem", // 36px - page titles
      },
      spacing: {
        18: "4.5rem", // 72px - enhanced spacing
        20: "5rem", // 80px - section spacing
        24: "6rem", // 96px - large section gaps
      },
      borderWidth: {
        3: "3px", // For focus states
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

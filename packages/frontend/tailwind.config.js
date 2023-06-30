// eslint-disable-next-line @typescript-eslint/no-var-requires
const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-monsterrat)", ...fontFamily.sans],
      },
      boxShadow: {
        md: "var(--fidt-shadow-xs)",
      },
    },
    screens: {
      sm: { max: "639px" },
      md: { min: "640px", max: "1023px" },
      lg: { min: "1024px", max: "1279px" },
      xl: { min: "1280px", max: "1535px" },
      xxl: { min: "1536px" },
    },
  },
  plugins: [],
};

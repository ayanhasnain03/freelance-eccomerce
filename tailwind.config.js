/** @type {import('tailwindcss').Config} */
import tailwindcssAnimate from "tailwindcss-animate";
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        "primary-red": "#fc0000",
      },
fontFamily: {
        agu: ["Agu Display", "sans-serif"],
        dancing: ["Dancing Script", "cursive"],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

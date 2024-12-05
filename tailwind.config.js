import tailwindcssAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        candal: ["Candal", "sans-serif"],
        dancing: ["Dancing Script", "cursive"],
      },
      colors: {
        primaryBg: "#F2F0F1",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

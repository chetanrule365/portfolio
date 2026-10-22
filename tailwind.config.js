/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#b04bff",
        accent: "#baffaf",
        muted: "#6a6969",
      },
      fontFamily: {
        sans: ["Rajdhani", "sans-serif"],
      },
      keyframes: {
        write: {
          from: { strokeDashoffset: "150", fill: "white" },
          to: { strokeDashoffset: "0", fill: "#b04bff" },
        },
      },
      animation: {
        write: "write 3s forwards",
      },
    },
  },
  plugins: [],
};

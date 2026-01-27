/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // 기존: --Gray-gray-*
        gray: {
          1000: "#13172aff",
          950: "#181d34ff",
          900: "#1b203bff",
          850: "#212742ff",
          800: "#272d49ff",
          700: "#353957ff",
          650: "#444866ff",
          600: "#525775ff",
          500: "#697198ff",
          400: "#8b94b2ff",
          300: "#a2a7c3ff",
          200: "#c5ccdbff",
          100: "#ecececff",
        },

        // 기존: --Colors-*
        mint: "#7ad8d2ff",
        yellow: "#f8ee7dff",
        blue: {
          1: "#4f9bf2ff",
          2: "#315df7ff",
        },
        red: {
          1000: "#3e1c26ff",
          500: "#ff4f41ff",
        },
        navy: {
          1: "#0e1430ff",
        },
      },
    },
  },
  plugins: [],
};

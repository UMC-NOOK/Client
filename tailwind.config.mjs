/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // 기존: --Gray-gray-*
        // 사용: className="text-gray-1000", className="bg-gray-1000"
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
        // 사용: className="text-mint", className="bg-mint"
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
      /**
       * 기존: gradient__*
       * 사용: className="bg-gradient-background"
       */
      backgroundImage: {
        "gradient-background":
          "linear-gradient(180deg, #0e1430 0%, #0e101b 100%)",
        "gradient-divider":
          "linear-gradient(90deg, rgba(46, 57, 107, 0) 0%, #2e396b 50%, rgba(46, 57, 107, 0) 100%)",
        "gradient-button":
          "linear-gradient(180deg, rgba(31, 39, 81, 0) 0%, #1f2751 100%)",
        "gradient-mask":
          "linear-gradient(180deg, rgba(24, 29, 52, 0) 0%, #181d34 100%)",
        "gradient-gray-400":
          "linear-gradient(180deg, #8b94b2 0%, rgba(139, 148, 178, 0) 100%)",
      },

      /**
       * 기존: Elevation-20)
       * 사용: className="shadow-elevation-20"
       */
      boxShadow: {
        "elevation-20": "0px 4px 20px #13172a",
      },

      /**
       * typography presets
       * "text-토큰명" 으로 한 번에 적용되게 (size + lineHeight + weight 포함)
       *
       * lineHeight:
       * - 150% => 1.5
       * - 100% => 1
       */

      fontSize: {
        // title
        "title-18-m": ["18px", { lineHeight: "1.5", fontWeight: "500" }],
        "title-18-b": ["18px", { lineHeight: "1.5", fontWeight: "700" }],
        "title-20-b": ["20px", { lineHeight: "1.5", fontWeight: "700" }],
        "title-40-b": ["40px", { lineHeight: "1.5", fontWeight: "700" }],

        // subtitle
        "subtitle-14-sb": ["14px", { lineHeight: "1.5", fontWeight: "600" }],

        // body
        "body-12-r": ["12px", { lineHeight: "1.5", fontWeight: "400" }],
        "body-13-r": ["13px", { lineHeight: "1.5", fontWeight: "400" }],
        "body-13-b": ["13px", { lineHeight: "1.5", fontWeight: "700" }],
        "body-14-r": ["14px", { lineHeight: "1.5", fontWeight: "400" }],
        "body-14-m": ["14px", { lineHeight: "1.5", fontWeight: "500" }],
        "body-14-b": ["14px", { lineHeight: "1.5", fontWeight: "700" }],
        "body-16-r": ["16px", { lineHeight: "1.5", fontWeight: "400" }],
        "body-16-b": ["16px", { lineHeight: "1.5", fontWeight: "700" }],

        // btn
        "btn-12-sb": ["12px", { lineHeight: "1", fontWeight: "600" }],
        "btn-14-r": ["14px", { lineHeight: "1", fontWeight: "400" }],
        "btn-14-sb": ["14px", { lineHeight: "1", fontWeight: "600" }],
        "btn-16-sb": ["16px", { lineHeight: "1", fontWeight: "600" }],
        "btn-18-m": ["18px", { lineHeight: "1", fontWeight: "500" }],

        // label
        "label-12-sb": ["12px", { lineHeight: "1", fontWeight: "600" }],
        "label-12-b": ["12px", { lineHeight: "1", fontWeight: "700" }],
        "label-13-r": ["13px", { lineHeight: "1", fontWeight: "400" }],
        "label-13-b": ["13px", { lineHeight: "1", fontWeight: "700" }],
        "label-13-sb": ["13px", { lineHeight: "1", fontWeight: "600" }],
        "label-14-sb": ["14px", { lineHeight: "1", fontWeight: "600" }],
        "label-16-sb": ["16px", { lineHeight: "1", fontWeight: "600" }],
      },
    },
  },
  plugins: [],
};



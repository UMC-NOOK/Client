/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // 기존: --Gray-gray-*
        // 사용: className="text-gray-10", className="bg-gray-10"
        gray: {
          10: "#13172aff",
          15: "#181d34ff",
          17: "#1b203bff",
          20: "#212742ff",
          25: "#272d49ff",
          30: "#353957ff",
          35: "#444866ff",
          40: "#525775ff",
          50: "#697198ff",
          60: "#8b94b2ff",
          70: "#a2a7c3ff",
          80: "#c5ccdbff",
          90: "#ecececff",
        },

        // 기존: --Colors-*
        // 사용: className="text-mint-60", className="bg-blue-1"
        mint: {
          60: "#7ad8d2ff",
        },
        yellow: {
          70: "#f8ee7dff",
          50: "#d2c42dff",
        },
        blue: {
          1: "#4f9bf2ff",
          2: "#315df7ff",
        },
        red: {
          60: "#eb4747ff",
          20: "#3e1c26ff",
          1: "#ff4f41ff",
        },
        navy: {
          1: "#0e1430ff",
        },
        pink: {
          60: "#EB60AFff",
        },
        green: { 50: "#5ECA46ff" },
        purple: { 60: "#BA31FFff" },
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
        "gradient-gray-60":
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
        "label-12-r" : ["12px", { lineHeight: "1", fontWeight: "400" }],
        "label-12-sb": ["12px", { lineHeight: "1", fontWeight: "600" }],
        "label-12-b": ["12px", { lineHeight: "1", fontWeight: "700" }],
        "label-13-r": ["13px", { lineHeight: "1", fontWeight: "400" }],
        "label-13-b": ["13px", { lineHeight: "1", fontWeight: "700" }],
        "label-13-sb": ["13px", { lineHeight: "1", fontWeight: "600" }],
        "label-14-sb": ["14px", { lineHeight: "1", fontWeight: "600" }],
        "label-16-sb": ["16px", { lineHeight: "1", fontWeight: "600" }],
        "label-16-b": ["16px", { lineHeight: "1", fontWeight: "700" }],
        "label-18-rb" : ["18px", { lineHeight : "1", fontWeight: "500"}],
        "label-20-b": ["20px", {lineHeight:"1", fontWeight: "700"}],
      },
    },
  },
  plugins: [],
};

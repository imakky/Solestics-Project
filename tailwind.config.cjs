const { ComponentsContentPath } = require("@yext/search-ui-react");

module.exports = {
  content: [
    "./src/**/*.{ts,tsx}",
    "./lib/**/*.{js,jsx}",
    ComponentsContentPath,
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Sora"],
      },
      fontSize: {
        xxs: "0.625rem",
      },
      colors: {
        primary: "var(--primary-color, #2563eb)",
        "primary-light": "var(--primary-color-light, #dbeafe)",
        "primary-dark": "var(--primary-color-dark, #1e40af)",
        neutral: "var(--neutral-color, #4b5563)",
        "neutral-light": "var(--neutral-color-light, #9ca3af)",
        "neutral-dark": "var(--neutral-color-dark, #1f2937)",
        "light-orange": "#FFEEDB",
        orange: "#FFB563",
        "dark-orange": "#F85E00",
        red: "#A41632",
        blue: "#17AABE",
        // gray: "#c4c4c442",
      },
      transitionProperty: {
        "fade-out": {
          "transition-property": "opacity",
          "transition-timing-function": "ease-in-out",
          "transition-duration": "6000ms",
        },
      },
      animation: {
        shaker: "shaker 0.4s infinite",
        "fade-in-out": "fade-in-out ease-in-out 33.5s infinite",
      },
      keyframes: {
        shaker: {
          "50%": {
            transform: "rotate(20deg)",
          },
          "100%": {
            transform: "rotate(-20deg)",
          },
        },
        "fade-in-out": {
          "0%": {
            opacity: 1,
          },
          "17.9%": {
            opacity: 1,
          },
          "20%": {
            opacity: 0,
          },
          "97%": {
            opacity: 0,
          },
          "100%": {
            opacity: 1,
          },
        },
      },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
    require("@tailwindcss/line-clamp"),
    require("tailwindcss-animation-delay"),
    require("@tailwindcss/aspect-ratio"),
  ],
};

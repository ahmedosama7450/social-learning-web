const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",

      gray: colors.coolGray,
      blueGray: colors.blueGray,
      trueGray: colors.trueGray,
      black: colors.black,
      white: colors.white,
      red: colors.red,
      green: colors.emerald,
      yellow: colors.yellow,

      primary: {
        DEFAULT: "#1da1f2",
        ...colors.sky,
      },
      divider: colors.coolGray[200],
      error: colors.red[500],
      link: colors.sky[600],
      linkHover: colors.sky[500],

      aside: "#F7F9F9",
    },

    extend: {
      fontFamily: {
        sans: ["Open Sans", "sans-serif", ...defaultTheme.fontFamily.sans],
      },
      width: {
        "1/2-screen": "50vw",
        "3/4-screen": "72vw", // TODO rename to be related to slide over
      },
      fontSize: {
        md: [".9375rem", "1.375rem"], // TODO I am not sure I need this
      },

      /* borderColor: {
        DEFAULT: colors.coolGray[100],
      }, */
    },
  },

  // TODO We don't need to do this with jit mode
  variants: {
    extend: {
      ringWidth: ["focus-visible"],
      ringColor: ["focus-visible"],
      ringOffsetWidth: ["focus-visible"],
      ringOffsetColor: ["focus-visible"],
    },
  },

  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"), // TODO not used yet
    require("@tailwindcss/aspect-ratio"), // TODO not used yet
    require("@tailwindcss/line-clamp"), // TODO not used yet
  ],
};

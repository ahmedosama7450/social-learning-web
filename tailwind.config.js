const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false,
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",

      primary: {
        DEFAULT: "#1da1f2",
        ...colors.sky,
      },
      gray: colors.coolGray,
      black: colors.black,
      white: colors.white,
      red: colors.red,
      green: colors.emerald,
      yellow: colors.yellow,

      divider: colors.coolGray[200],
      error: colors.red[500],
      link: colors.sky[600],
      linkHover: colors.sky[500],
      aside: "#F7F9F9",
    },

    extend: {
      fontFamily: {
        sans: ["Cairo", "sans-serif", ...defaultTheme.fontFamily.sans],
      },

      fontSize: {
        "2xs": ["0.8125rem", "1rem"],
        md: [".9375rem", "1.375rem"],
      },

      borderColor: {
        DEFAULT: colors.coolGray[200], // Same as divider color
      },
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
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"), // TODO not used yet
    require("@tailwindcss/line-clamp"), // TODO not used yet
  ],
};

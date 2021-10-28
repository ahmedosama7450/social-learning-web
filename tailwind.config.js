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
      black: colors.black,
      white: colors.white,

      primary: {
        DEFAULT: "#1da1f2",
        ...colors.sky,
      },
      secondary: {
        DEFAULT: "#F7F9F9",
        dark: "#EFF3F4",
      },

      // TODO Maybe just include both cool gray and blue gray making cool gray the default gray
      gray: {
        DEFAULT: colors.blueGray[200], // Divider color mostly
        ...colors.blueGray,
      },
      red: {
        DEFAULT: colors.red[500], // Error color mostly
        ...colors.red,
      },
      green: {
        DEFAULT: colors.emerald[500],
        ...colors.emerald,
      },
      yellow: {
        DEFAULT: colors.yellow[500],
        ...colors.yellow,
      },

      link: colors.sky[600],
      linkHover: colors.sky[500],
    },

    screens: {
      xs: "512px",
      ...defaultTheme.screens,
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
        DEFAULT: colors.blueGray[200], // Same as divider color
      },

      spacing: {
        13: "3.25rem",
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

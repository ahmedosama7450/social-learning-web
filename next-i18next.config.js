module.exports = {
  i18n: {
    locales: ["ar", "en"],
    defaultLocale: "en",
    localeDetection: false,
  },
  defaultNS: "common",
  debug: process.env.NODE_ENV !== "production",
  saveMissing: true,
};

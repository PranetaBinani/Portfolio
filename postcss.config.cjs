// postcss.config.cjs
module.exports = {
  plugins: {
    // Change 'tailwindcss': {} to require the new package
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
};
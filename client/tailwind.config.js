// tailwind.config.js
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateColumns: {
        'editor': 'minmax(200px, 310px) 1fr 1fr',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
// tailwind.config.js
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        blue: {
          default: "#1976d2"
        }
      },
      gridTemplateColumns: {
        'editor': 'minmax(200px, 310px) 1fr',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
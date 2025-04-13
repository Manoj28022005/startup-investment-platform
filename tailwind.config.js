/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3f51b5', // Angular Material primary color
          light: '#757de8',
          dark: '#002984'
        }
      }
    },
  },
  plugins: [],
}

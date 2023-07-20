/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx}'
  ],
  theme: {
    colors: {
      ...require('tailwindcss/colors'),
      yellow: '#FFF212',
      pink: '#EC268F',
      green: '#009155',
      lightGreen : '#4ecb4e'
    },
    extend: {},
  },
  plugins: [],
}
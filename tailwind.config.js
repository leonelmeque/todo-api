/** @type {import('tailwindcss').Config} */
const isProduction = process.env.ENV === 'production';

module.exports = {
  content: [
    "./src/**/*.ejs"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  ...(isProduction && {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/**/*.html', './views/**/*.ejs'],

  })

}


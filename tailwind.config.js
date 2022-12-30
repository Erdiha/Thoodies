/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'lightest-clr': '#eff5f5',
        'light-clr': '#D6E4E5',
        'green-blue-clr': '#497174',
        'orange-red-clr': '#EB6440',
      },
      backgroundImage: {
        'hero-wrapper':
          "linear-gradient(to right bottom, rgba('#000',0.8),[rgb(173,221,208,0.5)]))",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('daisyui')],
};

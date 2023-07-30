/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        white: '#fff',
        black: '#000',
        dark: '#1c1a1a',
        'primary-color': '#023E8A',
        'secondary-color': '#EDF5FE',
        'light-grey': '#333333',
        torqorise: '#C1DBFD',
        'mikando-yellow': '#FFC633',
      },
      backgroundImage: {
        'hero-pattern':
          'linear-gradient(90deg, rgba(52,58,64,1) 0%, rgba(130,140,150,1) 45%, rgba(233,236,239,1) 100%);',
      },
    },
    fontFamily: {
      IBM: ['IBM Plex Sans', 'sans-serif'],
    },
    boxShadow: {
      xl: 'box-shadow: 2px 6px 5px -2px rgba(0,0,0,0.75);',
      lg: '0px 1px 3px rgba(0, 0, 0, 0.07);',
    },
  },
  plugins: [],
}

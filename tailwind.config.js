const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Lexend', 'sans-serif'],
        body: ['Lexend', 'sans-serif'],
        sans: ['Lexend', 'sans-serif']
      },
      colors: {
        primary: {
          DEFAULT: '#a7373a',
          container: '#ffdad8',
          oncontainer: '#410007',
          dark: '#ffb3b0',
          darkon: '#670311',
          darkcontainer: '#871f25',
          darkoncontainer: '#ffdad8'
        },
        secondary: {
          DEFAULT: '#006d34',
          container: '#78fc9d',
          oncontainer: '#00210b',
          dark: '#59df83',
          darkon: '#003918',
          darkcontainer: '#005225',
          darkoncontainer: '#78fc9d'
        },
        background: {
          light: '#fffbff',
          onlight: '#201a1a',
          dark: '#201a1a',
          ondark: '#ede0de'
        },
        work: '#FF6B6B',
        shortpause: '#F4A261',
        longpause: '#2EC4B6',
        theme: '#F87171',
        themed: 'rgb(var(--theme) / <alpha-value>)'
      }
    }
  },
  plugins: [
    // require('@tailwindcss/typography')
    require('@tailwindcss/forms')
  ],
  future: {
    // TODO only in Tailwind 3.1
    // only apply hover classes when @media hover:hover and pointer:fine
    hoverOnlyWhenSupported: true
  }
}

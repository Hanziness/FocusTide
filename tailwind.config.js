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
        primary: colors.red[400],
        'primary-font': colors.black,
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

module.exports = {
  content: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './error.vue',
    './app.vue'
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
        /* derived from Material Theme Builder - seeds:
        - primary: #F77272
        - secondary: #72F798
        - tertiary: #aa8c5c
        - neutral: #998e8d
        */
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
        surface: {
          light: '#fffbff',
          onlight: '#201a1a',
          variant: '#f4dddc',
          onvariant: '#524342',
          outline: '#857372',
          dark: '#201a1a',
          ondark: '#ede0de',
          darkvariant: '#524342',
          ondarkvariant: '#d7c1c0',
          darkoutline: '#a08c8b'
        },
        error: {
          light: '#ba1a1a',
          onlight: '#ffffff',
          lightcontainer: '#ffdad6',
          onlightcontainer: '#410002',
          dark: '#ffb4ab',
          ondark: '#690005',
          darkcontainer: '#93000a',
          ondarkcontainer: '#ffdad6'
        },
        work: '#FF6B6B',
        shortpause: '#F4A261',
        longpause: '#2EC4B6',
        theme: '#F87171',
        themed: 'rgb(var(--theme) / <alpha-value>)'
      }
    }
  },
  future: {
    // TODO only in Tailwind 3.1
    // only apply hover classes when @media hover:hover and pointer:fine
    hoverOnlyWhenSupported: true
  }
}

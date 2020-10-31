// const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  // prefix: '',
  // important: false,
  // separator: ':',
  // purge: [
  //   './src/**/*.vue'
  // ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Poppins', 'sans-serif'],
        body: ['Poppins', 'sans-serif'],
        sans: ['Poppins', 'sans-serif']
      },
      colors: {
        primary: '#3498db'
      }
    }
  },
  variants: {},
  plugins: [
    // require('@tailwindcss/typography')
    require('@tailwindcss/custom-forms')
  ],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true
  }
}

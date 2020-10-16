module.exports = {
  prefix: '',
  important: false,
  separator: ':',
  purge: [
    './src/**/*.vue'
  ],
  theme: {
    extend: {
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

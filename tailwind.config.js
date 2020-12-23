module.exports = {
  // purge: {
  //   enabled: true
  // },
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
    require('@tailwindcss/forms')
  ]
}

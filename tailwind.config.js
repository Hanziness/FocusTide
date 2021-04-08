module.exports = {
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
  plugins: [
    // require('@tailwindcss/typography')
    require('@tailwindcss/forms')
  ]
}

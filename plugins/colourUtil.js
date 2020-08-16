const colourUtils = {
  calculateBrightness (rgbArray) {
    // http://www.w3.org/TR/AERT#color-contrast
    return Math.round(((parseInt(rgbArray[0]) * 299) +
      (parseInt(rgbArray[1]) * 587) +
      (parseInt(rgbArray[2]) * 114)) / 1000)
  },

  isTextWhite (rgbArray) {
    const brightness = this.calculateBrightness(rgbArray)
    return !(brightness > 125)
  }

}

export default function (context, inject) {
  inject('colour', colourUtils)
}

export default {
  props: {
    timeElapsed: {
      type: Number,
      required: true
    },
    timeOriginal: {
      type: Number,
      required: true
    },
    timerState: {
      type: Number,
      required: true
    }
  },

  computed: {
    running () {
      return this.timerState === 1
    }
  }
}

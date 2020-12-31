export default {
  props: {
    canUseKeyboard: {
      type: Boolean,
      default: true
    }
  },

  mounted () {
    document.addEventListener('keyup', this.mixin_keyboardListener_handleKeyUp)
  },

  beforeDestroy () {
    document.removeEventListener('keyup', this.mixin_keyboardListener_handleKeyUp)
  },

  methods: {
    mixin_keyboardListener_handleKeyUp (e) {
    }
  }
}

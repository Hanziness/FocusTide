<script>
// import Error from '@/assets/errors'

export default {

  props: {
    /** Settings keys representing the value to change.
     * @example `['a', 'b']` will create a binding to `settings.state.a.b`
     */
    settingsKey: {
      type: Array,
      default: () => []
    },

    /**
     * Custom function that will be called when the value changes
     * Useful for more complicated store operations
     */
    customSetFunction: {
      type: Function,
      default: undefined
    },

    /** Value used for preset controls to specify active item (read-only) */
    customValue: {
      type: [Number, String, Object],
      default: undefined
    }
  },
  data () {
    return {
      lastError: null
    }
  },

  computed: {
    /**
     * Computed property responsible for getting and setting the appropriate
     * store state variable.
     */
    settingValue: {
      get () {
        // if customValue is set, return that, else query the store
        return this.customValue !== undefined ? this.customValue : this.resolveKeys(this.settingsKey, false)
      },
      set (newValue) {
        if (this.customSetFunction) {
          this.customSetFunction(newValue, this.settingsKey)
        } else {
          this.$store.commit('settings/SET', { key: this.settingsKey, value: newValue })
        }
      }
    },

    /** Returns the translation key used for i18n */
    translationKey: {
      get () {
        return 'settings.values.' + this.settingsKey.join('.')
      }
    }
  },

  methods: {
    /** Resolves key array into value */
    resolveKeys (keys, parent = false) {
      const maxIndex = parent ? keys.length - 1 : keys.length
      let currentValue = this.$store.state.settings
      for (let index = 0; index < maxIndex; index++) {
        currentValue = currentValue ? currentValue[keys[index]] : null
      }
      return currentValue
    },

    updateValue (newValue) {
      this.settingValue = newValue
      this.lastError = null
    },

    errorValue (error, additionalInfo = {}) {
      if (error !== undefined) {
        this.lastError = this.$i18n.t('error.' + error, additionalInfo)
      } else {
        this.lastError = undefined
      }
    }
  },

  render () {
    return this.$scopedSlots.default({
      key: this.settingsKey,
      value: this.settingValue,
      svalue: this.settingValue,
      update: this.updateValue,
      error: this.errorValue,
      translationKey: this.translationKey,
      lastError: this.lastError
    })
  }
}
</script>

export default {
  data () {
    return {
      inputData: '',
      defaultValidations: {}
    }
  },

  props: {
    settingsKey: {
      type: Array,
      default: () => []
    },

    validators: {
      type: Object,
      default: () => {}
    },

    disabled: {
      type: Boolean,
      default: false
    },

    customSetFunction: {
      type: Function,
      default: undefined
    }
  },

  validations () {
    const additionalValidators = this.validators
    const defaultValidations = this.defaultValidations
    return {
      ...defaultValidations,
      ...additionalValidators
    }
  },

  methods: {
    checkUpdate (newValue, updateFn, errorFn) {
      updateFn(newValue)
    }
  }
}

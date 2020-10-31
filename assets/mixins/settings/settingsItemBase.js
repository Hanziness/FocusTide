export default {
  components: {
    BaseSettingsItem: () => import('@/components/tailwinded/settings/baseSettingsItem.vue')
  },

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

      // for (const rule in this.rules) {
      //   const rulePass = rule(newValue)
      //   if (rulePass !== true) {
      //     pass = rulePass.type
      //   }
      // }

      // if (pass === true) {
      //   updateFn(newValue)
      // } else {
      //   errorFn(pass.type, pass.additionalInfo)
      // }
    }
  }
}

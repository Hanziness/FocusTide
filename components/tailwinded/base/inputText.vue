<template>
  <input
    v-model="displayValue"
    :v-mask="mask"
    class="form-input bg-gray-200 focus:bg-white w-full text-right"
    type="text"
  >
</template>

<script>
import { validationMixin } from 'vuelidate'

import { required, minValue, maxValue, numeric } from 'vuelidate/lib/validators'
export default {
  mixins: [validationMixin],

  props: {
    value: {
      type: String,
      default: ''
    },

    required: {
      type: Boolean,
      default: false
    },

    numeric: {
      type: Boolean,
      default: false
    },

    mask: {
      type: String,
      default: undefined
    },

    min: {
      type: Number,
      default: undefined
    },

    max: {
      type: Number,
      default: undefined
    },

    customValidators: {
      type: Object,
      default: () => {}
    }
  },

  data () {
    return {
      internalData: '',
      dirty: true
    }
  },

  validations () {
    const validationData = {}

    if (this.required) { validationData.required = required }
    if (this.numeric) { validationData.numeric = numeric }
    if (this.min) { validationData.min = minValue(this.min) }
    if (this.max) { validationData.max = maxValue(this.max) }

    return {
      internalData: validationData
    }
  },

  computed: {
    displayValue: {
      get () {
        if (!this.dirty) {
          return this.internalData
        } else {
          return this.value
        }
      },

      set (newValue) {
        this.internalData = newValue
        this.$v.internalData.$touch()

        this.dirty = this.$v.internalData.$anyError
        if (!this.dirty) {
          this.$emit('input', this.displayValue)
          console.log('Outputting ' + this.displayValue + ' (internal = ' + this.internalData + ', value = ' + this.value + ')')
        }

        const rules = Object.keys(this.$v.internalData).filter(name => !name.startsWith('$'))
        let errorRule

        for (const ruleKey of rules) {
          if (!this.$v.internalData[ruleKey]) {
            errorRule = ruleKey
            break
          }
        }

        this.$emit('error', { type: errorRule, additionalInfo: this.additionalInfo })
      }
    },

    additionalInfo: {
      get () {
        return {
          min: this.min,
          max: this.max
        }
      }
    }
  }
}
</script>

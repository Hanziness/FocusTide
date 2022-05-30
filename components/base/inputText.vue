<template>
  <input
    v-model="displayValue"
    :class="['form-input w-full text-right', { 'border-yellow-300 ring ring-yellow-300 focus:ring-yellow-300': $v.internalData.$anyError }]"
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
      type: [String, Number],
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

    min: {
      type: Number,
      default: undefined
    },

    max: {
      type: Number,
      default: undefined
    },

    /** Object containing custom validators */
    customValidators: {
      type: Object,
      default: () => {}
    }
  },

  data () {
    return {
      /** Internal v-model value (can contain invalid input, unlike the setting
       * value that it corresponds to) */
      internalData: this.value,

      /** Controls whether the input is invalid or not */
      dirty: true
    }
  },

  validations () {
    const validationData = {
      ...this.customValidators
    }

    // Add validation rules based on props
    if (this.required) { validationData.required = required }
    if (this.numeric) { validationData.numeric = numeric }
    if (this.min) { validationData.min = minValue(this.min) }
    if (this.max) { validationData.max = maxValue(this.max) }

    return {
      internalData: validationData
    }
  },

  computed: {
    /** This value will return the original (valid) settings value if
     * the input is in an invalid state but will allow the input to have its
     * own internal state as well (so it won't be janky when the user enters
     * an invalid input)
     */
    displayValue: {
      get () {
        return this.internalData
      },

      set (newValue) {
        this.internalData = newValue

        // Force validation
        this.$v.internalData.$touch()

        this.dirty = this.$v.internalData.$anyError
        if (!this.dirty) {
          // Validation successful, emit input event with updated value
          this.$emit('input', this.numeric ? Number.parseInt(this.displayValue) : this.displayValue)
        }

        // Check which rule was violated first
        const rules = Object.keys(this.$v.internalData).filter(name => !name.startsWith('$'))
        let errorRule

        for (const ruleKey of rules) {
          if (!this.$v.internalData[ruleKey]) {
            errorRule = ruleKey
            break
          }
        }

        // Update error message
        // This should also be called when there is no error, so the error gets cleared
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
  },

  watch: {
    value (newValue) {
      this.internalData = newValue
    }
  }
}
</script>

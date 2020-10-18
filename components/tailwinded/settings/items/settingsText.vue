<template>
  <!-- FIXME try to make sure that the field can be edited even if it results in an errorneous state -->
  <base-settings-item :settings-key="settingsKey">
    <template #content-action="{ settingsValue, update, error }">
      <!-- <input
        class="form-input w-full text-right bg-gray-200 focus:bg-white"
        type="text"
        :value="settingsValue"
        @input="checkUpdate($event.target.value, update, error)"
      > -->
      <input-text
        :value="settingsValue"
        :min="min"
        :max="max"
        :numeric="numeric"
        @input="update($event)"
        @error="error($event.type, $event.additionalInfo)"
      />
    </template>
  </base-settings-item>
</template>

<script>
import { validationMixin } from 'vuelidate'
import settingsInputMixin from '@/assets/mixins/settings/settingsItemBase'
import InputText from '@/components/tailwinded/base/inputText.vue'

import { required, minValue, maxValue, numeric } from 'vuelidate/lib/validators'

export default {
  components: { InputText },

  mixins: [validationMixin, settingsInputMixin],

  props: {
    min: {
      type: Number,
      default: undefined
    },

    max: {
      type: Number,
      default: undefined
    },

    numeric: {
      type: Boolean,
      default: false
    }
  },

  validations () {
    const returnValue = { inputData: { required } }

    if (this.numeric) {
      returnValue.inputData.numeric = numeric
    }

    if (this.min) {
      returnValue.inputData.min = minValue(this.min)
    }

    if (this.max) {
      returnValue.inputData.max = maxValue(this.max)
    }

    return returnValue
  },

  computed: {
    additionalInfo: {
      get () {
        return {
          min: this.min,
          max: this.max,
          numeric: this.numeric
        }
      }
    }
  },

  methods: {
    checkUpdate (newValue, updateFn, errorFn) {
      console.log('Updating with value "' + newValue + '"')
      this.inputData = newValue
      this.$v.inputData.$touch()

      console.log('Error? ' + this.$v.inputData.$error)

      if (!this.$v.inputData.$error) {
        updateFn(newValue)
        console.log('Updated with "' + newValue + '"')
        return true
      }

      const validationKeys = Object.keys(this.$v.inputData).filter(name => !name.startsWith('$'))

      for (const key of validationKeys) {
        if (!this.$v.inputData[key]) {
          errorFn(key, this.additionalInfo)
        }
      }

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
</script>

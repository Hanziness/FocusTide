<template>
  <!-- FIXME try to make sure that the field can be edited even if it results in an errorneous state -->
  <BaseSettingsItem :settings-key="settingsKey" :disabled="disabled">
    <template #content-action="{ settingsValue, update, error }">
      <InputText
        :value="settingsValue"
        :min="min"
        :max="max"
        :numeric="numeric"
        required
        @input="update($event)"
        @error="error($event.type, $event.additionalInfo)"
      />
    </template>
  </BaseSettingsItem>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minValue, maxValue, numeric } from 'vuelidate/lib/validators'
import settingsInputMixin from '@/assets/mixins/settings/settingsItemBase'

export default {
  components: {
    BaseSettingsItem: () => import(/* webpackMode: "eager" */ '~/components/settings/resolvedSettingsItem.vue'),
    InputText: () => import(/* webpackMode: "eager" */ '@/components/base/inputText.vue')
  },

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

    // Check if input should be numeric
    if (this.numeric) {
      returnValue.inputData.numeric = numeric

      // Check for minimum value
      if (this.min) {
        returnValue.inputData.min = minValue(this.min)
      }

      // Check for maximum value
      if (this.max) {
        returnValue.inputData.max = maxValue(this.max)
      }
    }

    return returnValue
  },

  computed: {
    /** Information needed to display better error messages */
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
    /** Validates the input before calling the update function */
    checkUpdate (newValue, updateFn, errorFn) {
      this.inputData = newValue
      this.$v.inputData.$touch()

      if (!this.$v.inputData.$error) {
        updateFn(newValue)
        return true
      }

      const validationKeys = Object.keys(this.$v.inputData).filter(name => !name.startsWith('$'))

      for (const key of validationKeys) {
        if (!this.$v.inputData[key]) {
          errorFn(key, this.additionalInfo)
        }
      }
    }
  }
}
</script>

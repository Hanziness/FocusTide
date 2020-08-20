<template>
  <v-list-item
    v-if="(visibleIf.length > 0 && visibleIf.every((item) => item === true)) || true"
    :disabled="!isEnabled"
    :two-line="showDescription && $i18n.t(translationKey + '._description').length > 0"
  >
    <!-- Title and description of the settings item -->
    <v-list-item-content>
      <v-list-item-title>
        {{ $i18n.t('settings.values.' + stateKeys.join('.') + '._title') }}
      </v-list-item-title>
      <v-list-item-subtitle v-if="showDescription && $i18n.t(translationKey + '._description').length > 0">
        {{ $i18n.t(translationKey + '._description') }}
      </v-list-item-subtitle>

      <!-- Preset settings -->
      <settings-preset
        v-if="type === 'preset'"
        v-model="settingValue"
        :state-keys="stateKeys"
        :values="transformedValues"
        :custom-value="presetCustomSelectedValue"
      />
    </v-list-item-content>
    <v-list-item-action v-if="type !== 'preset'" class="d-flex flex-row align-center my-0 settings-item-action">
      <!-- Reset button -->
      <v-tooltip v-if="defaultValue !== null" left>
        <template v-slot:activator="{on, attrs}">
          <v-btn icon class="mr-2" v-bind="attrs" v-on="on" @click.stop="reset">
            <v-icon>mdi-rotate-left</v-icon>
          </v-btn>
        </template>
        <span>Reset</span>
      </v-tooltip>

      <!-- Input types -->
      <v-form v-model="isInputValid">
        <!-- Boolean -->
        <v-switch
          v-if="type === 'boolean'"
          v-model="settingValue"
          :disabled="!isEnabled"
          inset
          readonly
          @click.stop="toggleValue"
        />
        <!-- Select -->
        <v-select
          v-else-if="type === 'select'"
          v-model="settingValue"
          :disabled="!isEnabled"
          class="settings-input"
          outlined
          dense
          hide-details
          :items="transformedValues"
        />
        <!-- Number -->
        <v-text-field
          v-else-if="type === 'number'"
          v-model="settingValue"
          :disabled="!isEnabled"
          :rules="ruleFunctions"
          outlined
          dense
          class="settings-input"
          hide-details
        />
        <!-- Time -->
        <input-time v-else-if="type === 'time'" v-model="settingValue" :disabled="!isEnabled" />
      </v-form>
    </v-list-item-action>
  </v-list-item>
</template>

<style lang="scss" scoped>
.settings-item-action {
  max-width: 30%;
}

.settings-input {
  font-size: 14px;
}
</style>

<script>
import SettingsPreset from '@/components/settings/settingsPresets.vue'
import InputTime from '@/components/settings/inputTime.vue'

export const rules = {
  number (input) {
    return !!input && !isNaN(input)
  },
  positive (input) {
    return input > 0
  },
  min3 (input) {
    return input >= 3
  }
}

export default {
  components: { SettingsPreset, InputTime },

  props: {
    /** Array of `String`s specifying the path to the controlled store variable. Eg.
     * `['schedule', 'length']` refers to `$store.state.settings.schedule.length`.
     */
    stateKeys: {
      type: Array,
      required: true
    },

    /** Determines the input type */
    type: {
      type: String,
      default: 'boolean',
      validator (v) {
        return ['boolean', 'select', 'number', 'preset', 'time'].includes(v)
      }
    },

    /** Used by select inputs to determine the possible values for a setting. */
    values: {
      type: Array,
      default: () => []
    },
    extraAttributes: {
      type: Object,
      default: () => {}
    },
    visibleIf: {
      type: Array,
      default: () => []
    },

    /** Array of store key arrays that need to be truish for this input to be enabled */
    enabledIf: {
      type: Array,
      default: () => []
    },

    /** Array of store key arrays - if any of these turn truish, this input will be disabled */
    disabledIf: {
      type: Array,
      default: () => []
    },

    /** Rule function names specified in `rules` that will be applied to the input */
    useRules: {
      type: Array,
      default: () => [],
      validator (val) {
        return val.every(v => Object.keys(rules).includes(v))
      }
    },

    /**
     * If provided, the input will show a 'reset' button that restores the
     * variable to this value.
     */
    defaultValue: {
      type: [String, Number],
      default: null
    },

    /** Whether to show the description under the setting name. */
    showDescription: {
      type: Boolean,
      default: false
    },

    /**
     * Custom function that will be called when the value changes
     * Useful for more complicated store operations
     */
    customSetFunction: {
      type: Function,
      default: null
    },

    /**
     * Custom value that will be reported to preset selection
     * Useful when the selected preset is based on a store getter
     */
    presetCustomSelectedValue: {
      type: [Number, String, Object],
      default: undefined
    }
  },

  data () {
    return {
      isInputValid: false
    }
  },

  computed: {

    /**
     * Computed variable that retrieves the root translation key needed to display
     * translated text on this input.
     */
    translationKey: {
      get () {
        return 'settings.values.' + this.stateKeys.join('.')
      }
    },

    /**
     * Computed property responsible for getting and setting the appropriate
     * store state variable.
     */
    settingValue: {
      get () {
        return this.resolveKeys(this.stateKeys, false)
      },
      set (newValue) {
        let isValid = true
        this.ruleFunctions.forEach(function (fn) {
          isValid = isValid && fn(newValue)
        })

        if (isValid) {
          if (this.customSetFunction !== null) {
            this.customSetFunction(newValue)
          } else {
            this.$store.commit('settings/SET', { key: this.stateKeys, value: newValue })
          }
        }
      }
    },

    /**
     * Computed variable that transforms the input values into {value, text} objects, where
     * `value` is the original value and `text` is a translation provided for that value.
     * Used to translate select inputs' values.
     */
    transformedValues: {
      get () {
        const returnValue = []
        const i18n = this.$i18n
        this.values.forEach((element) => {
          returnValue.push({
            value: element,
            text: i18n.t(this.translationKey + '._values.' + element)
          })
        })
        return returnValue
      }
    },

    /**
     * Creates an array of functions from the `useRules` string array.
     * These functions can then be evaluated on inputs and can be supplied
     * to form components.
     */
    ruleFunctions: {
      get () {
        const returnRules = []
        this.useRules.forEach(function (rule) {
          returnRules.push(rules[rule])
        })

        if (this.type === 'number' && !this.useRules.includes('number')) {
          returnRules.push(rules.number)
        }

        return returnRules
      }
    },

    /**
     * Evaluates all store keys in `disabledIf` and `enabledIf` to see if this input can
     * be enabled.
     */
    isEnabled: {
      get () {
        if (this.enabledIf.length < 1 && this.disabledIf.length < 1) { return true }

        for (const storeKeys of this.disabledIf) {
          const currentValue = this.resolveKeys(storeKeys, false)

          if (currentValue) { return false }
        }

        for (const storeKeys of this.enabledIf) {
          const currentValue = this.resolveKeys(storeKeys, false)

          if (!currentValue) { return false }
        }

        return true
      }
    }
  },

  methods: {
    toggleValue () {
      this.settingValue = !this.settingValue
    },
    reset (event) {
      // do something
    },
    resolveKeys (keys, parent = false) {
      const maxIndex = parent ? keys.length - 1 : keys.length
      let currentValue = this.$store.state.settings
      for (let index = 0; index < maxIndex; index++) {
        currentValue = currentValue ? currentValue[keys[index]] : null
      }
      return currentValue
    }
  }
}
</script>

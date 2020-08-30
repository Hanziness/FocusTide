<template>
  <div v-if="visible">
    <settings-item-base :disabled="disabled" :settings-key="stateKeys" :show-description="showDescription" :icon="icon">
      <template v-if="type === 'preset'" v-slot:content-main>
        <!-- Preset settings -->
        <settings-preset
          :value="settingValue"
          :items="transformedValues"
          @change="customSetFunction ? customSetFunction($event) : (settingValue = $event)"
        />
      </template>

      <!-- Inline inputs -->
      <template v-if="type !== 'preset'" v-slot:content-action>
        <settings-input-inline v-model="settingValue" :disabled="disabled" :rules="ruleFunctions" :type="type" />
      </template>
    </settings-item-base>
    <v-divider v-if="showDivider" class="my-1" />
  </div>
</template>

<style lang="scss" scoped>
.settings-input {
  font-size: 14px;
}
</style>

<script>
import SettingsItemBase from '@/components/settings/settingsItemBase.vue'
import SettingsInputInline from '@/components/settings/input/settingsInputInline.vue'
// import SettingsPreset from '@/components/settings/settingsPresets.vue'
import SettingsPreset from '@/components/settings/input/controls/presetSelector.vue'
// import InputTime from '@/components/settings/inputTime.vue'

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
  components: {
    SettingsItemBase,
    SettingsInputInline,
    // SettingsPreset,
    // InputTime,
    SettingsPreset
  },

  props: {
    /** Array of `String`s specifying the path to the controlled store variable. Eg.
     * `['schedule', 'length']` refers to `$store.state.settings.schedule.length`.
     */
    stateKeys: {
      type: Array,
      required: true
    },

    /** Whether to commit store change as soon as the value changes */
    setValueOnChange: {
      type: Boolean,
      default: true
    },

    /** Determines the input type */
    type: {
      type: String,
      default: 'boolean',
      validator (v) {
        return ['boolean', 'select', 'number', 'preset', 'preset-apply', 'time'].includes(v)
      }
    },

    /** Used by select inputs to determine the possible values for a setting. */
    values: {
      type: [Array, Object],
      default: () => []
    },

    disabled: {
      type: Boolean,
      default: false
    },

    /** Rule function names specified in `rules` that will be applied to the input */
    useRules: {
      type: Array,
      default: () => [],
      validator (val) {
        // check if v is a function or one of the keys of the `rules` object
        return val.every(v => typeof v === 'function' || Object.keys(rules).includes(v))
      }
    },

    showDivider: {
      type: Boolean,
      default: false
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
      default: undefined
    },

    /** Value used for preset controls to specify active item (read-only) */
    customValue: {
      type: [Number, String, Object],
      default: undefined
    },

    /** Icon to be used with <v-icon> in the setting's avatar slot */
    icon: {
      type: String,
      default: undefined
    },

    /** Determines whether the component should render at all */
    visible: {
      type: Boolean,
      default: true
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
        // if customValue is set, return that, else query the store
        return this.customValue !== undefined ? this.customValue : this.resolveKeys(this.stateKeys, false)
      },
      set (newValue) {
        if (this.setValueOnChange) {
          this.$store.commit('settings/SET', { key: this.stateKeys, value: newValue })
        } else {
          this.$emit('change', newValue)
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
        const i18n = this.$i18n
        const returnValue = []
        const isArray = Array.isArray(this.values)

        // `it` will be the element of the array or the key of the object
        for (const it in this.values) {
          returnValue.push({
            value: this.values[it],
            text: i18n.t(this.translationKey + '._values.' + (isArray ? this.values[it] : it)),
            description: i18n.t(this.translationKey + '._valueDescription.' + (isArray ? this.values[it] : it)),
            key: isArray ? undefined : it
          })
        }

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
          returnRules.push(typeof rule === 'function' ? rule : rules[rule])
        })

        if (this.type === 'number' && !this.useRules.includes('number')) {
          returnRules.push(rules.number)
        }

        return returnRules
      }
    }
  },

  methods: {
    resolveKeys (keys, parent = false) {
      const maxIndex = parent ? keys.length - 1 : keys.length
      let currentValue = this.$store.state.settings
      for (let index = 0; index < maxIndex; index++) {
        currentValue = currentValue ? currentValue[keys[index]] : null
      }
      return currentValue
    },

    reset (event) {
      // do something
    }
  }
}
</script>

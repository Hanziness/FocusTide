<template>
  <baseSettingsItem>
    <template #item-title>
      {{ $t(translationKey + '._title') }}
    </template>
    <template #item-subtitle>
      {{ $t(translationKey + '._description') }}
    </template>
  </baseSettingsItem>
</template>

<script>
import { mapStores } from 'pinia'
import { useSettings } from '@/stores/settings'

import BaseSettingsItem from '@/components/settings/resolvedSettingsItem.vue'

export default {
  components: {
    BaseSettingsItem
  },

  props: {
    /** A default value that the user can reset the field to */
    defaultValue: {
      type: [String, Number, Object],
      default: undefined
    },

    /** Whether to show the description of the setting */
    showDescription: {
      type: Boolean,
      default: true
    },

    /** Settings keys representing the value to change.
     * @example `['a', 'b']` will create a binding to `settings.state.a.b`
     */
    settingsKey: {
      type: Array,
      default: () => []
    },

    /** Controls whether the setting item is disabled */
    disabled: {
      type: Boolean,
      default: false
    },

    /** Controls whether the item is visible */
    visible: {
      type: Boolean,
      default: true
    },

    /** String representing the icon */
    icon: {
      type: String,
      default: undefined
    },

    /** Whether to commit store change as soon as the value changes */
    setValueOnChange: {
      type: Boolean,
      default: true
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
      isInputValid: true
    }
  },

  computed: {
    ...mapStores(useSettings),

    /** Returns the translation key used for i18n */
    translationKey: {
      get () {
        return 'settings.values.' + this.settingsKey.join('.')
      }
    },

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
        if (this.setValueOnChange) {
          this.settingsStore.SET({ key: this.settingsKey, value: newValue })
        } else {
          this.$emit('change', newValue)
        }
      }
    }
  },

  methods: {
    /** Function passed to action slot */
    updateValue (newValue) {
      // console.log(newValue)
      this.settingValue = newValue
    },

    /** Resolves key array into value */
    resolveKeys (keys, parent = false) {
      const maxIndex = parent ? keys.length - 1 : keys.length
      let currentValue = this.settingsStore.$state
      for (let index = 0; index < maxIndex; index++) {
        currentValue = currentValue ? currentValue[keys[index]] : null
      }
      return currentValue
    }
  }
}
</script>

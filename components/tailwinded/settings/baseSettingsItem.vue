<!-- TODO This should only forward the changed value from the input upwards and let
 the parent decide what to do with it. What I don't like is that settingsValue still needs
 to be passed down somehow. I'd like to eliminate the need for settingsKey and dealing
 with values.
 Maybe make a renderless component that deals with the settings key resolution and such?
  That can then pass down the actual value and whatnot. See
  https://vuejsdevelopers.com/2017/06/11/vue-js-extending-components/#do-you-really-need-to-extend-your-component -->
<template>
  <section v-show="visible" :class="[{'disabled': disabled}]" :disabled="disabled" :aria-disabled="disabled">
    <div class="flex flex-row h-16 align-center mx-4">
      <div v-if="!!$slots['icon']" class="w-12 text-left">
        <slot name="icon" />
      </div>
      <div class="flex-grow-1">
        <div>
          <slot name="item-title">
            {{ $i18n.t(translationKey + '._title') }}
          </slot>
        </div>
        <div v-if="showDescription" class="text-gray-800 text-sm">
          <slot name="item-subtitle">
            {{ $i18n.t(translationKey + '._description') }}
          </slot>
        </div>
      </div>
      <div class="w-24 text-right">
        <!-- v-if="!!$slots['content-action']"  -->
        <slot name="content-action" :update="updateValue" :value="settingValue" />
      </div>
    </div>

    <!-- Content to show below the title and description -->
    <slot name="content-main" />
  </section>
</template>

<style lang="postcss" scoped>
.disabled {
  @apply opacity-50 cursor-default;

  pointer-events: none;
}
</style>

<script>
export default {
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
          this.$store.commit('settings/SET', { key: this.settingsKey, value: newValue })
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
      this.$emit('input', newValue)
    },

    /** Resolves key array into value */
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

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
        <slot name="content-action" :settingsValue="settingsValue" />
      </div>
    </div>

    <!-- Content to show below the title and description -->
    <div class="mx-4">
      <slot name="content-main" :settingsValue="settingsValue" />
    </div>
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
    /** Whether to show the description of the setting */
    showDescription: {
      type: Boolean,
      default: true
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

    /** The key used to provide translations in the component */
    translationKey: {
      type: String,
      default: undefined
    },

    /** Value to be passed further down to child slots */
    settingsValue: {
      type: [Boolean, Number, String, Object, Array],
      default: null
    }
  },
  data () {
    return {
      isInputValid: true
    }
  }
}
</script>

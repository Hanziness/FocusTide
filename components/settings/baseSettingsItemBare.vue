<template>
  <section v-show="visible" :class="[{'disabled': disabled}]" :disabled="disabled" :aria-disabled="disabled">
    <div class="flex flex-row items-center" :class="[(!showDescription || !!$slots['content-main']) ? 'h-10' : 'h-12']">
      <div v-if="!!$slots['icon']" class="w-12 text-left">
        <slot name="icon" />
      </div>
      <div class="flex-grow">
        <div class="truncate">
          <slot name="item-title">
            {{ $i18n.t(translationKey + '._title') }}
          </slot>
        </div>
        <div v-if="showDescription" class="text-black text-opacity-75 dark:text-gray-50 dark:text-opacity-75 text-sm truncate">
          <slot name="item-subtitle">
            {{ $i18n.t(translationKey + '._description') }}
          </slot>
        </div>
      </div>
      <slot name="content-error" :errorValue="errorValue">
        <div v-show="errorValue && errorValue.length > 0" class="bg-red-700 text-white text-sm rounded px-2 mx-2">
          {{ errorValue }}
        </div>
      </slot>
      <div class="w-24 text-right">
        <!-- v-if="!!$slots['content-action']"  -->
        <slot name="content-action" :settingsValue="settingsValue" :errorValue="errorValue" />
      </div>
    </div>

    <!-- Content to show below the title and description -->
    <div class="">
      <slot name="content-main" :settingsValue="settingsValue" />
    </div>
  </section>
</template>

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
    },

    /** Error value to pass down to `content-error` slot */
    errorValue: {
      type: String,
      default: undefined
    }
  },
  data () {
    return {
      isInputValid: true
    }
  }
}
</script>

<style lang="postcss" scoped>
.disabled {
  @apply opacity-50 cursor-default;

  pointer-events: none;
}
</style>

<template>
  <div v-show="visible" :class="['transition-all -m-1 p-1 rounded-lg', { 'opacity-50 cursor-default pointer-events-none': disabled, 'ring ring-yellow-200 bg-yellow-100': isError }]" :disabled="disabled" :aria-disabled="disabled">
    <div class="flex flex-row items-center my-1">
      <div v-if="!!$slots['icon']" class="w-12 text-left">
        <slot name="icon" />
      </div>
      <div class="flex-grow min-w-0">
        <div class="">
          <slot name="item-title">
            {{ $i18n.t(translationKey + '._title') }}
          </slot>
        </div>
        <div v-if="showDescription" class="text-black text-opacity-75 dark:text-gray-50 dark:text-opacity-75 text-sm leading-snug">
          <slot name="item-subtitle" class="break-words">
            {{ $i18n.t(translationKey + '._description') }}
          </slot>
        </div>
      </div>
      <div class="w-24 text-right">
        <!-- v-if="!!$slots['content-action']"  -->
        <slot name="content-action" :settingsValue="settingsValue" :errorValue="errorValue" />
      </div>
    </div>

    <!-- Content to show below the title and description -->
    <div class="flex flex-col w-full">
      <slot name="content-main" :settingsValue="settingsValue" />
    </div>
    <slot name="content-error" :errorValue="errorValue">
      <div v-show="isError" class="mt-1 text-yellow-700 flex flex-row space-x-1 items-center">
        <ErrorIcon />
        <span v-text="errorValue" />
      </div>
    </slot>
  </div>
</template>

<script>
import { AlertTriangleIcon } from 'vue-tabler-icons'

export default {
  components: {
    ErrorIcon: AlertTriangleIcon
  },
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
  },
  computed: {
    isError () {
      return this.errorValue && this.errorValue.length > 0
    }
  }
}
</script>

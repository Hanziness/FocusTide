<template>
  <button
    class="px-3 py-4 border border-solid border-gray-300 rounded-lg bg-white text-left dark:bg-gray-800 dark:border-gray-600 basis-0 transition-colors flex flex-col justify-start"
    :class="[{
      'bg-primary dark:bg-primary border-transparent dark:border-transparent ring ring-primary ring-offset-2 dark:ring-offset-slate-800 text-white': active,
      'hover:bg-gray-200 dark:hover:bg-gray-600': !active
    }]"
    @click="$emit('click')"
  >
    <div class="text-lg" :class="[{'font-bold uppercase': description.length > 0 }]">
      <slot name="title">
        {{ title }}
      </slot>
    </div>
    <div v-show="description.length > 0" class="text-sm text-opacity-75">
      <slot name="description">
        {{ description }}
      </slot>
    </div>
  </button>
</template>

<script>
export default {
  props: {
    translationKey: {
      type: String,
      default: ''
    },

    translationSubkey: {
      type: String,
      default: ''
    },

    active: {
      type: Boolean,
      default: false
    },

    /// Override the auto-translated title
    customTitle: {
      type: String,
      default: null
    },

    /// Override the auto-translated description
    customDescription: {
      type: String,
      default: null
    }
  },

  computed: {
    title () {
      return this.customTitle || this.$i18n.t(this.translationKey + '._values.' + this.translationSubkey)
    },

    description () {
      return this.customDescription || this.$i18n.t(this.translationKey + '._valueDescription.' + this.translationSubkey)
    }
  }
}
</script>

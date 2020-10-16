<template>
  <button class="select-option" :class="[{ 'active': active }]" @click="$emit('click')">
    <div class="select-option-title">
      <slot name="title">
        {{ $i18n.t(translationKey + '._values.' + translationSubkey) }}
      </slot>
    </div>
    <div class="select-option-description">
      <slot name="description">
        {{ $i18n.t(translationKey + '._valueDescription.' + translationSubkey) }}
      </slot>
    </div>
  </button>
</template>

<style lang="postcss" scoped>
.select-option {
  @apply px-3 py-4 border border-solid border-gray-300 rounded bg-white text-left;
}

.select-option:hover {
  @apply bg-gray-200;
}

.select-option.active {
  @apply bg-primary;
}

.select-option-title {
  @apply text-lg;
}

.select-option-description {
  @apply text-sm text-opacity-75;
}
</style>

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
    }
  }
}
</script>

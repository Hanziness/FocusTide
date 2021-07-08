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

<style lang="postcss" scoped>
.select-option {
  @apply px-3 py-4 border border-solid border-gray-300 rounded-md bg-white text-left;
  @apply dark:bg-gray-800 dark:border-gray-600;

  flex-basis: 0;
  transition: background-color 100ms ease-out, color 100ms ease-out;

  &:hover {
    @apply bg-gray-200;
    @apply dark:bg-gray-600;
  }

  &.active {
    @apply bg-primary border-transparent shadow text-white;
  }
}

.select-option-title {
  @apply text-lg;
}

.select-option-description {
  @apply text-sm text-opacity-75;
}
</style>

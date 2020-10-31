<template functional>
  <Component
    :is="props.tag"
    :ref="data.ref"
    :class="['ui-button', { 'subtle': props.subtle, 'regular': !props.subtle }, data.class, data.staticClass, {
      'cursor-pointer': !props.disabled,
      'disabled': props.disabled
    }]"
    :style="[data.style, data.staticStyle]"
    v-bind="data.attrs"
    :aria-disabled="props.disabled"
    :disabled="props.disabled"
    v-on="listeners"
  >
    <slot />
  </Component>
</template>

<style lang="scss" scoped>
.ui-button {
  transition: background-color 0.1s ease-out;
}

.ui-button.regular {
  @apply bg-gray-400 rounded p-4;
}

.ui-button.regular:hover:not(:disabled) {
  @apply bg-gray-500;
}

.ui-button.regular:active:not(:disabled) {
  @apply bg-gray-600;
}

.ui-button.subtle {
  @apply bg-transparent rounded-full p-2;
}

.ui-button.subtle:hover {
  @apply bg-gray-200;
}

.ui-button.subtle:active {
  @apply bg-gray-400;
}

.ui-button.disabled {
  @apply cursor-default;

  opacity: 0.5;
}
</style>

<script>
export default {
  name: 'ControlButton',
  props: {
    tag: {
      default: 'button',
      type: String
    },
    disabled: {
      default: false,
      type: Boolean
    },
    subtle: {
      default: false,
      type: Boolean
    }
  }
}
</script>

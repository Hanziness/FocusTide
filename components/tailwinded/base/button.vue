<template functional>
  <Component
    :is="props.tag"
    :ref="data.ref"
    :class="['rounded p-4 bg-teal-500 ui-button', data.class, data.staticStyle, {
      'cursor-pointer': !props.disabled,
      'disabled': props.disabled
    }]"
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
  @apply bg-gray-400;

  transition: background-color 0.1s ease-out;
}

.ui-button:hover:not(:disabled) {
  @apply bg-gray-500;
}

.ui-button:active:not(:disabled) {
  @apply bg-gray-600;
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
    }
  }
}
</script>

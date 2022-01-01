<template functional>
  <Component
    :is="props.tag"
    :ref="data.ref"
    :class="[
      'transition-colors',
      {
        'bg-transparent rounded-full p-2 hover:bg-gray-200 dark:hover:bg-gray-50 dark:hover:bg-opacity-20 active:bg-gray-400 dark:active:bg-gray-50 dark:active:bg-opacity-40': !props.noStyle && props.subtle,
        'bg-gray-400 hover:bg-gray-500 active:bg-gray-600 rounded p-4': !props.noStyle && !props.subtle,
        'cursor-pointer': !props.disabled,
        'opacity-50': props.disabled
      },
      data.staticClass,
      data.class
    ]"
    :style="[data.style, data.staticStyle]"
    v-bind="data.attrs"
    :aria-disabled="props.disabled"
    :disabled="props.disabled"
    v-on="listeners"
  >
    <slot />
  </Component>
</template>

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
    },
    noStyle: {
      default: false,
      type: Boolean
    }
  }
}
</script>

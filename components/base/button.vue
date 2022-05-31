<template functional>
  <button
    :ref="data.ref"
    class="relative p-2 overflow-hidden transition duration-300 rounded-full before:transition before:absolute before:opacity-0 before:bg-black before:w-full before:h-full before:left-0 before:top-0 before:mix-blend-overlay"
    :class="[
      { 'px-3': !props.circle },
      { 'opacity-60 pointer-events-none': props.disabled },
      { 'bg-theme border-theme ring-theme shadow-theme': props.default },
      { 'bg-opacity-100 hover:shadow-md hover:before:opacity-10 active:before:opacity-30': props.importance === 1 },
      { 'border-2 bg-opacity-0 hover:bg-theme active:before:opacity-20 active:shadow-sm': props.importance === 2 },
      { 'bg-opacity-0 hover:bg-opacity-30 active:bg-opacity-60 focus:ring': props.importance === 3 },
      data.staticClass,
      data.class
    ]"
    :style="[data.style, data.staticStyle]"
    v-bind="data.attrs"
    :aria-disabled="props.disabled"
    :disabled="props.disabled"
    v-on="listeners"
  >
    <slot>
      {{ (data.domProps && data.domProps.textContent) ? data.domProps.textContent : null }}
    </slot>
  </button>
</template>

<script>
export default {
  name: 'ControlButton',
  props: {
    disabled: {
      default: false,
      type: Boolean
    },

    /** Apply default colour scheme to the button */
    default: {
      default: false,
      type: Boolean
    },

    /** Make padding equal on all sides for circular buttons */
    circle: {
      default: false,
      type: Boolean
    },

    /** The higher the number, the less important the button is. 1 is for primary buttons,
     * 2 for secondary buttons and 3 for tertiary buttons.
     */
    importance: {
      type: Number,
      default: 1,
      validator: value => value >= 1 && value <= 3
    }
  }
}
</script>

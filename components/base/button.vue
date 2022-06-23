<template functional>
  <Component
    :is="props.link ? 'a' : 'button'"
    :ref="data.ref"
    class="relative p-3 overflow-hidden transition duration-300 rounded-full before:transition before:absolute before:opacity-0 before:w-full before:h-full before:left-0 before:top-0"
    :class="[
      { 'px-4': !props.circle },
      { 'opacity-40 pointer-events-none': props.disabled },
      { 'bg-theme border-theme ring-theme shadow-theme': props.default },
      { 'hover:before:opacity-10 active:before:opacity-30 active:scale-110': props.extendedBaseStyles },
      { 'text-center': props.link },
      { 'before:bg-black': !props.dark, 'before:bg-slate-50': props.dark },
      { 'bg-opacity-100 hover:shadow-sm hover:before:opacity-20 active:before:opacity-30 active:shadow-lg': props.importance === 1 },
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
    <div class="relative">
      <slot>
        {{ (data.domProps && data.domProps.textContent) ? data.domProps.textContent : null }}
      </slot>
    </div>
  </Component>
</template>

<script>
export default {
  name: 'ControlButton',
  props: {
    disabled: {
      default: false,
      type: Boolean
    },

    /** If true, the component is rendered as an anchor (`<a>`) instead of a `<button>` */
    link: {
      default: false,
      type: Boolean
    },

    /** Apply default colour scheme to the button */
    default: {
      default: false,
      type: Boolean
    },

    /** Adds some more classes, like scaling on active and before:background opacity for hover and active */
    extendedBaseStyles: {
      default: true,
      type: Boolean
    },

    /** Indicates that the button is dark. Classes will be adjusted to it. */
    dark: {
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

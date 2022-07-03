<template functional>
  <!--
    Element styling setup:
    - ::before - darkening/lightening on the backdrop (used for hover and active states, effect strength is driven by the opacity of the ::before pseudo-element)
    - bg       - coloured background of the button
  -->

  <Component
    :is="props.link ? 'a' : 'button'"
    :ref="data.ref"
    class="group"
    :class="[
      { 'opacity-40 pointer-events-none': props.disabled },
      { 'text-center': props.link },
      data.staticClass,
      data.class
    ]"
    :style="[data.style, data.staticStyle]"
    v-bind="data.attrs"
    :aria-disabled="props.disabled"
    :disabled="props.disabled"
    v-on="listeners"
  >
    <!-- Backdrop -->
    <div class="relative">
      <div
        class="absolute w-full h-full overflow-hidden transition duration-300 rounded-full before:transition before:absolute before:opacity-0 before:w-full before:h-full before:left-0 before:top-0"
        :class="[
          { 'bg-theme border-theme ring-theme shadow-theme': props.default },
          { '': props.extendedBaseStyles },
          { 'group-active:scale-105 group-active:scale-y-110': props.extendedBaseStyles && !props.circle },
          { 'group-active:scale-110': props.extendedBaseStyles && props.circle },
          { 'before:bg-black dark:before:bg-slate-50': !props.dark, 'before:bg-slate-50': props.dark },
          { 'bg-opacity-100 group-hover:shadow-sm group-hover:before:opacity-10 group-active:before:opacity-25 group-active:shadow-lg': props.importance === 1 },
          { 'border-2 bg-opacity-0 dark:bg-opacity-0 group-hover:bg-opacity-100 group-active:bg-opacity-100 group-active:shadow-sm group-active:before:opacity-10': props.importance === 2 },
          { 'bg-opacity-0 dark:bg-opacity-0 group-hover:bg-opacity-30 group-active:bg-opacity-40 group-focus:ring': props.importance === 3 },
          props.bgClass
        ]"
      />

      <!-- Contents -->
      <div
        class="relative p-3"
        :class="[
          { 'px-4': !props.circle },
          props.innerClass,
        ]"
      >
        <slot>
          {{ (data.domProps && data.domProps.textContent) ? data.domProps.textContent : null }}
        </slot>
      </div>
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

    /** Classes to be applied to the background of the button */
    bgClass: {
      default: '',
      type: String
    },

    /** Classes to apply to the inner element (contents) */
    innerClass: {
      default: '',
      type: String
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

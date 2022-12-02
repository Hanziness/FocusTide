<script setup lang="ts">
import { PropType } from 'vue'

enum ButtonTheme {
  /// Use primary theme colours
  Primary = 'primary',

  /// Use secondary theme colours
  Secondary = 'secondary',

  /// Use neutral theme colours
  Neutral = 'neutral',

  /// Use neutral theme colours, but force dark variant
  NeutralDark = 'neutraldark',

  /// Use neutral theme colours, but force light variant
  NeutralWhite = 'neutralwhite'
}

/// Defines in which directions the button scales when clicked
enum MotionType {
  None = 'none',
  Horizontal = 'horizontal',
  All = 'all'
}

const props = defineProps({
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

  theme: {
    type: String as PropType<ButtonTheme>,
    default: 'primary'
  },

  motion: {
    type: String as PropType<MotionType>,
    default: 'all'
  },

  /** Apply default colour scheme to the button */
  defaultStyle: {
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
    validator: (value: number) => value >= 1 && value <= 3
  }
})
</script>

<template>
  <!--
    Element styling setup:
    - ::before - darkening/lightening on the backdrop (used for hover and active states, effect strength is driven by the opacity of the ::before pseudo-element)
    - bg       - coloured background of the button
  -->

  <Component
    :is="link ? 'a' : 'button'"
    class="group"
    :class="[
      { 'opacity-40 pointer-events-none': props.disabled },
      { 'text-center': props.link },
      { 'aspect-square': props.circle}
    ]"
    :aria-disabled="props.disabled"
    :disabled="props.disabled"
    :type="props.link ? undefined : 'button'"
  >
    <!-- Backdrop -->
    <div class="relative w-full h-full isolate">
      <div
        class="absolute w-full h-full overflow-hidden transition duration-300 rounded-full -z-10 before:transition before:absolute before:opacity-0 before:w-full before:h-full before:left-0 before:top-0"
        :class="[
          // { 'bg-theme border-theme ring-theme shadow-theme': props.defaultStyle },
          { 'bg-primary border-primary ring-primary shadow-primary dark:bg-primary-dark dark:border-primary-dark dark:ring-primary-dark dark:shadow-none': props.theme === ButtonTheme.Primary},
          { 'bg-primary border-secondary ring-secondary shadow-secondary dark:bg-secondary-dark dark:border-secondary-dark dark:ring-secondary-dark dark:shadow-none': props.theme === ButtonTheme.Secondary },
          { 'bg-surface-light border-surface-light ring-surface-light dark:bg-surface-dark dark:border-surface-dark dark:ring-surface-dark dark:shadow-none': props.theme === ButtonTheme.Neutral},
          { '': props.extendedBaseStyles },
          { 'group-active:scale-105 group-active:scale-y-110': props.extendedBaseStyles && !props.circle },
          { 'group-active:scale-110': props.extendedBaseStyles && props.circle },
          { 'before:bg-black dark:before:bg-slate-50': !props.dark, 'before:bg-slate-50': props.dark },
          { 'bg-opacity-100 group-hover:shadow-sm group-hover:before:opacity-10 group-active:before:opacity-25 group-active:shadow-lg': importance === 1 },
          { 'border-2 bg-opacity-0 dark:bg-opacity-0 group-hover:bg-opacity-100 group-active:bg-opacity-100 group-active:shadow-sm group-active:before:opacity-10': importance === 2 },
          { 'bg-opacity-0 dark:bg-opacity-0 group-hover:bg-opacity-30 group-active:bg-opacity-40 group-focus:ring': importance === 3 },
          props.bgClass
        ]"
      />

      <!-- Contents -->
      <div
        class="grid items-center justify-center w-full h-full grid-flow-col p-3"
        :class="[
          { 'px-4': !props.circle },
          props.innerClass,
        ]"
      >
        <slot />
      </div>
    </div>
  </Component>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { ButtonTheme, MotionTheme } from './types/button'

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

  /// The button's colour theme
  theme: {
    type: String as PropType<ButtonTheme>,
    default: 'primary'
  },

  /// Defines whether the button should have a scaling animation when pressed
  motion: {
    type: String as PropType<MotionTheme>,
    default: 'all'
  },

  /// Remove the default padding on the contents of the button
  noPadding: {
    type: Boolean,
    default: false
  },

  /// Disable colour theming the contents of the button
  noContentTheme: {
    type: Boolean,
    default: false
  },

  /** Apply default colour scheme to the button */
  defaultStyle: {
    default: false,
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
          { 'bg-primary-container border-primary-container ring-primary-container shadow-primary dark:bg-primary-darkcontainer dark:border-primary-darkcontainer dark:ring-primary-darkcontainer': props.theme === ButtonTheme.Primary},
          { 'bg-secondary-container border-secondary-container ring-secondary-container shadow-secondary dark:bg-secondary-darkcontainer dark:border-secondary-darkcontainer dark:ring-secondary-darkcontainer': props.theme === ButtonTheme.Secondary },
          { 'bg-surface-light border-surface-light ring-surface-light dark:bg-surface-dark dark:border-surface-dark dark:ring-surface-dark': props.theme === ButtonTheme.Neutral },
          {'bg-surface-light border-surface-light ring-surface-light': props.theme === ButtonTheme.NeutralWhite},
          { 'bg-surface-dark border-surface-dark ring-surface-dark': props.theme === ButtonTheme.NeutralDark},
          { 'group-active:scale-x-110': props.motion === MotionTheme.Horizontal || props.motion === MotionTheme.All },
          { 'group-active:scale-y-110': props.motion === MotionTheme.All },
          { 'before:bg-surface-dark dark:before:bg-surface-light': !props.dark, 'before:bg-surface-light': props.dark },
          { 'bg-opacity-100 group-hover:shadow-sm group-hover:before:opacity-10 group-active:before:opacity-25 group-active:shadow-lg ring-0 border-0': importance === 1 },
          { 'border-2 bg-opacity-0 dark:bg-opacity-0 group-hover:bg-opacity-100 group-active:bg-opacity-100 group-active:shadow-sm group-active:before:opacity-10': importance === 2 },
          { 'bg-opacity-0 dark:bg-opacity-0 group-hover:bg-opacity-100 group-active:bg-opacity-100 group-focus:ring': importance === 3 },
          props.bgClass
        ]"
      />

      <!-- Contents -->
      <div
        class="grid items-center justify-center w-full h-full grid-flow-col"
        :class="[
          { 'p-3': !props.noPadding },
          { 'px-4': !props.circle && !props.noPadding },
          { 'text-primary-oncontainer dark:text-primary-darkoncontainer': !props.noContentTheme && props.theme === ButtonTheme.Primary },
          { 'text-secondary-oncontainer dark:text-secondary-darkoncontainer': !props.noContentTheme && props.theme === ButtonTheme.Secondary },
          { 'text-surface-onlight': !props.noContentTheme && (props.theme === ButtonTheme.NeutralWhite || props.theme === ButtonTheme.Neutral) },
          { 'dark:text-surface-ondark': !props.noContentTheme && props.theme === ButtonTheme.Neutral },
          { 'text-surface-ondark': !props.noContentTheme && props.theme === ButtonTheme.NeutralDark},
          props.innerClass,
        ]"
      >
        <slot />
      </div>
    </div>
  </Component>
</template>

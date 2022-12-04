<script setup lang="ts">
const props = defineProps({
  active: {
    type: Boolean,
    default: false
  },

  text: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div
    role="tab"
    tabindex="0"
    class="box-border flex flex-row items-center justify-center flex-1 h-full p-2 mx-1 space-x-1 text-center transition-colors rounded-lg cursor-pointer select-none first-of-type:ml-0 last-of-type:mr-0"
    :class="[{ 'bg-surface-variant dark:bg-surface-darkvariant': !props.active, 'bg-primary text-white dark:bg-primary-dark dark:text-primary-darkon px-3 md:px-2': props.active }]"
  >
    <slot name="icon" />
    <span :class="[{ 'hidden md:block': !props.active }]" v-text="props.text" />
  </div>
</template>

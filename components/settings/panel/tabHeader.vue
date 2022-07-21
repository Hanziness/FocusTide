<template>
  <div
    role="tab"
    tabindex="0"
    class="box-border flex flex-row items-center justify-center flex-1 h-full p-2 mx-1 space-x-1 text-center transition-colors rounded-lg cursor-pointer select-none first-of-type:ml-0 last-of-type:mr-0"
    :class="[{ 'bg-gray-200 dark:bg-gray-800': !active, 'bg-primary text-primary-font dark:text-primary-font px-3 md:px-2': active }]"
  >
    <slot name="icon" />
    <span :class="[{ 'hidden md:block': !active }]" v-text="text" />
  </div>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: false
    },

    text: {
      type: String,
      default: ''
    }
  }
}
</script>

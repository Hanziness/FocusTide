<template functional>
  <div
    role="tab"
    tabindex="0"
    class="flex-1 h-full p-2 cursor-pointer text-center flex flex-row space-x-1 items-center justify-center select-none rounded-lg box-border transition-colors mx-1 first-of-type:ml-0 last-of-type:mr-0"
    :class="[{ 'bg-gray-200 dark:bg-gray-800': !props.active, 'bg-primary text-primary-font dark:text-primary-font px-3 md:px-2': props.active }]"
    v-bind="data.attrs"
    v-on="listeners"
  >
    <slot name="icon" />
    <span :class="[{ 'hidden md:block': !props.active }]" v-text="props.text" />
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

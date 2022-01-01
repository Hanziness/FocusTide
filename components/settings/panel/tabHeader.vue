<template>
  <div class="flex-1 h-full p-2 cursor-pointer text-center flex flex-row space-x-1 items-center justify-center select-none rounded-lg box-border transition-colors mx-1 first-of-type:ml-0 last-of-type:mr-0" :class="[{ 'bg-gray-200 dark:bg-gray-800': !active, 'bg-primary text-white': active }]" @click="clicked">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    clicked (event) {
      this.$emit('click', event)
    }
  }
}
</script>

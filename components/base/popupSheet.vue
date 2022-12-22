<script setup lang="ts">
const props = defineProps({
  open: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <transition
    enter-from-class="!translate-y-full"
    enter-active-class="transition-all duration-300"
    leave-to-class="!translate-y-full"
    leave-active-class="transition-all duration-300"
    appear
  >
    <div v-show="props.open" class="bottom-0 left-0 right-0 z-20 mx-auto transition-all">
      <slot />
    </div>
  </transition>
</template>

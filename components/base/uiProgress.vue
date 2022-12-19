<script setup lang="ts">

const props = defineProps({
  progress: {
    type: Number,
    default: 1.0,
    validator: (value: number) => value >= 0.0 && value <= 1.0
  }
})

</script>

<template>
  <div class="rounded-full h-2 bg-primary-container dark:bg-primary-darkcontainer overflow-hidden">
    <div class="rounded-full bg-primary dark:bg-primary-dark w-full h-full transition-all" :style="{ 'translate': `-${100 - 100 * props.progress}% 0` }"></div>
  </div>
</template>

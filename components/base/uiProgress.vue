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
  <div class="rounded-full h-2 bg-surface-variant dark:bg-surface-darkvariant overflow-hidden ring-1 ring-inset ring-surface-onlight ring-opacity-10 dark:ring-surface-ondark dark:ring-opacity-25">
    <div class="rounded-full bg-primary dark:bg-primary-dark w-full h-full transition-all" :style="{ 'translate': `-${100 - 100 * props.progress}% 0` }" />
  </div>
</template>

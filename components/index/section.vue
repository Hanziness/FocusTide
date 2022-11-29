<script setup lang="ts">
const emit = defineEmits<{(type: 'mounted'): void}>()

onMounted(() => {
  emit('mounted')
})
</script>

<template>
  <div class="relative w-screen">
    <slot name="before" />
    <slot />
    <slot name="after" />
  </div>
</template>

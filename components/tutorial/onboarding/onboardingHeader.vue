<script setup lang="ts">
const props = defineProps({
  text: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="px-6 py-3 flex gap-2 text-lg flex-row justify-center items-center">
    <slot />
    <span v-text="props.text" />
  </div>
</template>

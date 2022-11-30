<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: ''
  },

  description: {
    type: String,
    default: ''
  },

  duration: {
    type: String,
    default: ''
  },

  dotClass: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div
    class="flex flex-col justify-between h-full px-3 py-2 text-gray-100 transition-all duration-500 rounded-lg bg-slate-800 w-80"
  >
    <div>
      <div class="flex flex-row items-center text-xl font-bold uppercase">
        <div :class="['w-4 h-4 inline-block rounded-md mr-2', props.dotClass]" />
        <span v-text="props.title" />
      </div>
      <div class="mb-2 text-gray-100 text-opacity-90" v-text="props.description" />
    </div>
    <div class="font-bold" v-text="props.duration" />
  </div>
</template>

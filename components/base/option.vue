<script setup lang="ts">
const props = defineProps({
  active: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <button
    class="px-3 py-4 border border-solid border-gray-300 rounded-xl bg-white text-left dark:bg-gray-800 dark:border-gray-600 basis-0 transition-colors flex flex-col justify-start"
    :class="[{
      'bg-primary dark:bg-primary border-transparent dark:border-transparent ring ring-primary ring-offset-2 dark:ring-offset-slate-800 text-primary-font dark:text-primary-font': active,
      'hover:bg-gray-200 dark:hover:bg-gray-600': !active
    }]"
    @click="$emit('click')"
  >
    <div class="text-lg" :class="[{'font-bold uppercase': props.description.length > 0 }]">
      <slot name="title">
        {{ props.title }}
      </slot>
    </div>
    <div v-show="props.description.length > 0" class="text-sm text-opacity-75">
      <slot name="description">
        {{ props.description }}
      </slot>
    </div>
  </button>
</template>

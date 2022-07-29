<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  value: {
    type: String,
    required: true
  }
})

const innerValue = computed({
  get () {
    return props.value
  },

  set (newValue) {
    emit('input', newValue)
  }
})

const emit = defineEmits<{(event: 'input', value: string): void}>()
</script>

<template>
  <input
    v-model="innerValue"
    class="w-full min-w-0"
    type="text"
  >
</template>

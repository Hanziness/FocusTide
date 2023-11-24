<script setup lang="ts">
import { type PropType } from 'vue'
import { Section, useSettings } from '~~/stores/settings'

const settingsStore = useSettings()

const props = defineProps({
  type: {
    type: String as PropType<Section>,
    required: true
  },
  active: {
    type: Boolean,
    default: false
  }
})

const colour = computed(() => settingsStore.getColor(props.type))
</script>

<template>
  <div
    class="inline-block h-full mr-2 rounded-full last:mr-0 aspect-square transition"
    :class="[
      { 'ring-surface-ondark ring-2 ring-inset scale-110': props.active },
      { 'shadow-sm opacity-25 ring-0 scale-90': !props.active }
    ]"
    :style="[
      { 'background-color': colour }
    ]"
  />
</template>

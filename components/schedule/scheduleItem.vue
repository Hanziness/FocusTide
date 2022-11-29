<script setup lang="ts">
import { PropType } from 'vue'
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
    class="inline-block h-full mr-2 rounded-full ring-2 last:mr-0 aspect-square"
    :class="[
      { 'ring-gray-100 dark:ring-gray-800': props.active },
      { 'shadow-sm opacity-40 ring-0': !props.active }
    ]"
    :style="[
      { 'background-color': colour }
    ]"
  />
</template>

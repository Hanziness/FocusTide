<script setup lang="ts">
import { settings } from '~~/dist/_nuxt/fr.3cdea116.mjs'
import { useSettings } from '~~/stores/settings'

const settingsStore = useSettings()

const props = defineProps({
  type: {
    type: String,
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
    class="w-12 h-12 border rounded-lg"
    :class="[
      { 'border-gray-100 shadow': props.active },
      { 'shadow-sm opacity-40 border-transparent': !props.active }
    ]"
    :style="[
      { 'background-color': colour }
    ]"
  />
</template>

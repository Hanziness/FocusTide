<script setup lang="ts">
import { defineProps, computed } from 'vue'
import { useSettings } from '@/stores/settings'

interface Props {
  path: Array<string>
}

const props = defineProps<Props>()

const settingsStore = useSettings()

const value = computed({
  get () {
    return settingsStore.$state.lang
  },

  set (newValue) {
    settingsStore.$patch(state =>
      props.path.reduce((prev, property, index) => {
        const next = props.path.length === ++index ? newValue : prev[property] || {}
        return next
      }, state)
    )
  }
})
</script>

<template>
  <div v-text="value" />
</template>

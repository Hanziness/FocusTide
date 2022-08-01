<template>
  <div
    class="w-12 h-12 border rounded-lg"
    :class="[
      { 'border-gray-100 shadow': active },
      { 'shadow-sm opacity-40 border-transparent': !active }
    ]"
    :style="[
      { 'background-color': visuals[data.type].colour }
    ]"
  />
</template>

<script>
import { mapState } from 'pinia'
import { useSettings } from '~~/stores/settings'
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    active: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    ...mapState(useSettings, ['visuals'])
  }
}
</script>

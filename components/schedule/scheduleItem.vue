<template>
  <div
    :class="[
      'mr-2 inline-block w-12 h-12 relative border border-transparent rounded-lg p-0 last-of-type:mr-0',
      { 'border-gray-100 shadow': active },
      { 'shadow-sm opacity-40': !active }
    ]"
    :style="[
      { 'background-color': visuals[data.type].colour }
    ]"
  />
</template>

<script>
import { mapState } from 'pinia'
import { useSettings } from '~/stores/settings'
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

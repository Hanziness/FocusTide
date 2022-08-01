<template>
  <div :class="[{ 'dark': visuals.darkMode }]">
    <slot />
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useSettings } from '~~/stores/settings'

export default {
  name: 'LayoutDefault',
  computed: {
    ...mapState(useSettings, ['visuals'])
  }
}
</script>

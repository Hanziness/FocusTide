<template>
  <div :class="['timer-traditional timer-display', { 'active': $store.getters['timer/isRunning'] }]">
    {{ $dayjs.formatMs(timerRemaining, {}) }}
  </div>
</template>

<style lang="scss" scoped>
.timer-traditional {
  font-family: 'Source Sans Pro', monospace;
  font-size: 20vw;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  font-feature-settings: "lnum" on;
  letter-spacing: 0.5rem;
}
</style>

<script>
import TimerMixin from '@/assets/mixins/timerMixin'

export default {
  mixins: [TimerMixin]
}
</script>

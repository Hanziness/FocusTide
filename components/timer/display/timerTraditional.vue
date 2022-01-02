<template>
  <div :class="['timer-traditional timer-display', { 'active': running }]" v-text="$dayjs.formatMs(timeOriginal - timeElapsed, {})" />
</template>

<script>
import TimerMixin from '@/assets/mixins/timerMixin'

export default {
  mixins: [TimerMixin]
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/SourceSansPro_Numbers.scss';

.timer-traditional {
  font-family: 'Source Sans Pro', monospace;
  font-size: 20vw;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  font-feature-settings: "lnum" on;
  letter-spacing: 0.5rem;
}
</style>

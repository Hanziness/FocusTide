<template>
  <div class="timer-percentage select-none text-8xl md:text-[14rem] font-bold timer-display" :class="[{ 'active': running }]">
    <transition name="transition-percentage" tag="span" mode="out-in">
      <span :key="timerValue" class="relative inline-block" v-text="timerValue" />
    </transition>
    <span>%</span>
  </div>
</template>

<script>
import TimerMixin from '@/assets/mixins/timerMixin'

export default {
  mixins: [TimerMixin],
  computed: {
    timerValue () {
      return this.$dayjs.formatPercentage(this.timeOriginal - this.timeElapsed, {
        total: this.timeOriginal,
        addPercentage: false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/SourceSansPro_Numbers.scss';

div.timer-percentage {
  font-family: 'Source Sans Pro', monospace;
}
.transition-percentage-enter-active,
.transition-percentage-leave-active {
  transition: 300ms ease-out;
  transition-property: opacity, transform !important;
}

.transition-percentage-enter {
  opacity: 0 !important;
  transform: translateY(60px);
}

.transition-percentage-leave-to {
  opacity: 0 !important;
  transform: translateY(-60px);
}
</style>

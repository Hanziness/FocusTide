<template>
  <div class="timer-percentage select-none timer-display flex flex-row items-center gap-4" :class="[{ 'active': running }]">
    <transition name="transition-percentage" tag="span" mode="out-in">
      <span
        :key="timerValue"
        :style="{ 'width': `${Math.max(1, Math.ceil(Math.log10(timerValue + 1)))}ch` }"
        class="relative inline-block text-9xl md:text-[14rem] font-bold"
        v-text="timerValue"
      />
    </transition>
    <span class="text-4xl md:text-8xl">%</span>
  </div>
</template>

<script>
import TimerMixin from '@/assets/mixins/timerMixin'

export default {
  mixins: [TimerMixin],
  computed: {
    timerValue () {
      const completeRounded = Math.round((this.timeOriginal - this.timeElapsed) / 1000)
      const totalRounded = Math.round(this.timeOriginal / 1000)
      const percentageValue = Math.round(((totalRounded - completeRounded) / totalRounded) * 100)

      this.$emit('tick', `${percentageValue}%`)
      return percentageValue
    }
  }
}
</script>

<style lang="scss" scoped>
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

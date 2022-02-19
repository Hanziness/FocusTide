<template>
  <div :class="['timer-display select-none flex flex-row gap-2 items-center leading-none', { 'active': running }]">
    <transition name="transition-approximate-up" mode="out-in">
      <div :key="time.value" :style="{ '--ch': Math.ceil(Math.log10(time.value + 1)) }" class="text-9xl xl:text-[12rem] font-bold text-right time-value">
        {{ time.value }}
      </div>
    </transition>
    <transition name="transition-approximate-up" mode="out-in">
      <div :key="time.string" class="text-3xl xl:text-7xl">
        {{ time.string }}
      </div>
    </transition>
  </div>
</template>

<script>
import TimerMixin from '@/assets/mixins/timerMixin'

export default {
  mixins: [TimerMixin],
  computed: {
    time () {
      const remainingMinutes = (this.timeOriginal - this.timeElapsed) / (1000 * 60)

      const timeObject = {
        value: 0,
        string: null
      }
      if (remainingMinutes > 59) {
        timeObject.value = Math.round(remainingMinutes / 60)
        timeObject.string = this.$i18n.tc('timer.approximate.hours', timeObject.value)
      } else {
        timeObject.value = Math.ceil(remainingMinutes)
        timeObject.string = this.$i18n.tc('timer.approximate.minutes', timeObject.value)
      }

      this.$emit('tick', `${timeObject.value} ${timeObject.string}`)
      return timeObject
    }
  }
}
</script>

<style lang="scss" scoped>
div.time-value {
  width: calc(var(--ch) * 1ch);
}

.transition-approximate-up-enter-active,
.transition-approximate-up-leave-active {
  transition: 300ms ease-out;
  transition-property: opacity, transform;
}

.transition-approximate-up-enter {
  opacity: 0 !important;
  transform: translateY(30px) !important;
}

.transition-approximate-up-leave-to {
  opacity: 0 !important;
  transform: translateY(-30px) !important;
}
</style>

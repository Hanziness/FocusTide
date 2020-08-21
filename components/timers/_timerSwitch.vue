<template>
  <div class="timer-container d-flex flex-column justify-center text-center">
    <transition name="timer-switch" mode="out-in">
      <timer-traditional v-if="timerWidget === 'traditional'" :key="'traditional'" />
      <timer-approximate v-else-if="timerWidget === 'approximate'" :key="'approximate'" />
      <timer-percentage v-else-if="timerWidget === 'percentage'" :key="'percentage'" />
    </transition>
  </div>
</template>

<style lang="scss" scoped>
div.timer-container {
  width: 100%;
  height: 40vh;
  z-index: 10;
  position: relative;
}

div.timer-display {
  transition: 300ms ease-in;
  transition-property: opacity;
  opacity: 0.7;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
}

div.timer-display.active {
  opacity: 1;
}

.timer-switch-enter-active,
.timer-switch-leave-active {
  transition: opacity 0.5s ease-out;
}

.timer-switch-enter,
.timer-switch-leave-to {
  opacity: 0 !important;
}
</style>

<script>
import TimerTraditional from '@/components/timers/traditional.vue'
import TimerApproximate from '@/components/timers/approximate.vue'
import TimerPercentage from '@/components/timers/percentage.vue'

import { AvailableTimers } from '@/store/settings'

export default {
  components: {
    TimerTraditional, TimerApproximate, TimerPercentage
  },
  props: {
    timerWidget: {
      type: String,
      default: 'traditional',
      validator (value) {
        return Object.values(AvailableTimers).includes(value)
      }
    }
  }
}
</script>

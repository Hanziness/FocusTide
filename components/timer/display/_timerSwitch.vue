<template>
  <div class="timer-container flex flex-col justify-center text-center">
    <transition name="timer-switch" mode="out-in">
      <complete-marker v-if="$store.getters['schedule/getCurrentTimerState'] === 3" :key="'complete'" />
      <timer-traditional v-else-if="timerWidget === 'traditional'" :key="'traditional'" v-bind="timerInfo" />
      <timer-approximate v-else-if="timerWidget === 'approximate'" :key="'approximate'" v-bind="timerInfo" />
      <timer-percentage v-else-if="timerWidget === 'percentage'" :key="'percentage'" v-bind="timerInfo" />
    </transition>
  </div>
</template>

<script>
import { AvailableTimers } from '@/store/settings'
import TimerMixin from '@/assets/mixins/timerMixin'

export default {
  components: {
    TimerTraditional: () => import(/* webpackChunkName: "timerTraditional" */ '@/components/timer/display/traditional.vue'),
    TimerApproximate: () => import(/* webpackChunkName: "timerApproximate" */ '@/components/timer/display/approximate.vue'),
    TimerPercentage: () => import(/* webpackChunkName: "timerPercentage" */ '@/components/timer/display/percentage.vue'),
    CompleteMarker: () => import(/* webpackMode: "eager" */ '@/components/timer/display/timerComplete.vue')
  },
  mixins: [TimerMixin],
  props: {
    timerWidget: {
      type: String,
      default: 'traditional',
      validator (value) {
        return Object.values(AvailableTimers).includes(value)
      }
    }
  },
  computed: {
    timerInfo () {
      return {
        timeElapsed: this.timeElapsed,
        timeOriginal: this.timeOriginal,
        timerState: this.timerState
      }
    }
  }
}
</script>

<style lang="scss" scoped>
div.timer-container {
  @apply w-full h-full;

  z-index: 5;
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

<template>
  <div class="w-full h-full relative flex flex-col justify-center text-center text-black dark:text-gray-100 transition-opacity duration-500 select-none" :class="[{ 'opacity-70': !running, 'opacity-100': running }]">
    <Transition name="timer-switch" mode="out-in">
      <CompleteMarker v-if="$store.getters['schedule/getCurrentTimerState'] === 3" :key="'complete'" />
      <TimerTraditional v-else-if="timerWidget === 'traditional'" :key="'traditional'" v-bind="timerInfo" />
      <TimerApproximate v-else-if="timerWidget === 'approximate'" :key="'approximate'" v-bind="timerInfo" />
      <TimerPercentage v-else-if="timerWidget === 'percentage'" :key="'percentage'" v-bind="timerInfo" />
    </Transition>
  </div>
</template>

<script>
import { AvailableTimers } from '@/store/settings'
import TimerMixin from '@/assets/mixins/timerMixin'

export default {
  components: {
    TimerTraditional: () => import(/* webpackChunkName: "timerTraditional" */ '~/components/timer/display/timerTraditional.vue'),
    TimerApproximate: () => import(/* webpackChunkName: "timerApproximate" */ '~/components/timer/display/timerApproximate.vue'),
    TimerPercentage: () => import(/* webpackChunkName: "timerPercentage" */ '~/components/timer/display/timerPercentage.vue'),
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
.timer-switch-enter-active,
.timer-switch-leave-active {
  transition: opacity 0.5s ease-out;
}

.timer-switch-enter,
.timer-switch-leave-to {
  opacity: 0 !important;
}
</style>

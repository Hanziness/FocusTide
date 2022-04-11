<template>
  <div class="dark:text-gray-100 relative flex flex-col justify-center text-center text-black transition-opacity duration-500 select-none" :class="[{ 'opacity-70': !running, 'opacity-100': running }]">
    <Transition name="timer-switch" mode="out-in">
      <CompleteMarker v-if="$store.getters['schedule/getCurrentTimerState'] === 3" :key="'complete'" />
      <TimerTraditional v-else-if="timerWidget === 'traditional'" v-bind="timerInfo" :key="'traditional'" @tick="$emit('tick', $event)" />
      <TimerApproximate v-else-if="timerWidget === 'approximate'" v-bind="timerInfo" :key="'approximate'" @tick="$emit('tick', $event)" />
      <TimerPercentage v-else-if="timerWidget === 'percentage'" v-bind="timerInfo" :key="'percentage'" @tick="$emit('tick', $event)" />
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

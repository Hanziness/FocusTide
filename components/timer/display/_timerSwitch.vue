<template>
  <div class="relative grid text-black transition-opacity duration-500 select-none place-items-center dark:text-gray-100" :class="[{ 'opacity-70': !running, 'opacity-100': running }]">
    <Transition name="timer-switch" mode="out-in">
      <CompleteMarker v-if="getCurrentTimerState === timerStates.COMPLETED" :key="'complete'" />
      <TimerTraditional v-else-if="timerWidget === 'traditional'" v-bind="timerInfo" :key="'traditional'" @tick="$emit('tick', $event)" />
      <TimerApproximate v-else-if="timerWidget === 'approximate'" v-bind="timerInfo" :key="'approximate'" @tick="$emit('tick', $event)" />
      <TimerPercentage v-else-if="timerWidget === 'percentage'" v-bind="timerInfo" :key="'percentage'" @tick="$emit('tick', $event)" />
    </Transition>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { AvailableTimers } from '~~/stores/settings'
import TimerMixin from '@/assets/mixins/timerMixin'
import { useSchedule, TimerState } from '~~/stores/schedule'

import TimerTraditional from '@/components/timer/display/timerTraditional.vue'
import TimerApproximate from '@/components/timer/display/timerApproximate.vue'
import TimerPercentage from '@/components/timer/display/timerPercentage.vue'
import CompleteMarker from '@/components/timer/display/timerComplete.vue'

export default {
  components: {
    TimerTraditional,
    TimerApproximate,
    TimerPercentage,
    CompleteMarker
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
    },

    timerStates () {
      return TimerState
    },

    ...mapState(useSchedule, ['getCurrentTimerState'])
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

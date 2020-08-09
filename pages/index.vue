<template>
  <section>
    <schedule-display />
    <div class="text-center">
      <timer-approximate />
      <promodoro-timer />
    </div>
  </section>
</template>

<script>
import PromodoroTimer from '@/components/promodoroTimer.vue'
import ScheduleDisplay from '@/components/scheduleDisplay.vue'
import TimerApproximate from '@/components/timers/approximate.vue'

export default {
  components: {
    PromodoroTimer, ScheduleDisplay, TimerApproximate
  },

  mounted () {
    this.$store.commit('settings/applyPreset', 'debug')
    this.$store.dispatch('events/checkSchedule')
    this.$store.dispatch('timer/setNewTimer', this.$store.state.events.schedule[0]._length)
    this.$store.dispatch('timer/initDefaultSubscribeFunctions')
  }
}
</script>

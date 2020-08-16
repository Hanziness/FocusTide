<template>
  <section>
    <schedule-display />
    <div class="text-center">
      <promodoro-timer />
    </div>
  </section>
</template>

<script>
import PromodoroTimer from '@/components/promodoroTimer.vue'
import ScheduleDisplay from '@/components/scheduleDisplay.vue'

export default {

  components: {
    PromodoroTimer, ScheduleDisplay
  },
  data () {
    return {

    }
  },

  computed: {
    remainingTimeString () {
      return this.$dayjs.getFormattedTime(this.$store.state.timer.timerRemaining, this.$store.state.settings.currentTimer)
    },

    pageTitle () {
      return this.$store.getters['events/currentScheduleEntry'] ? this.$store.getters['events/currentScheduleEntry']._type : 'Pomodoro'
    }
  },

  mounted () {
    this.$store.commit('settings/applyPreset', 'debug')
    this.$store.dispatch('events/checkSchedule')
    this.$store.dispatch('timer/setNewTimer', this.$store.state.events.schedule[0]._length)
    this.$store.dispatch('timer/initDefaultSubscribeFunctions')
  },

  head () {
    return {
      titleTemplate: `(${this.remainingTimeString}) %s`,
      title: `${this.pageTitle}`
    }
  }
}
</script>

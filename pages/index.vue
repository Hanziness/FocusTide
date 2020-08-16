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
      title: `${this.pageTitle}`,
      link: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: `data:image/svg+xml,
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  style="color: ${this.$store.getters['events/currentScheduleColour']};"
                  xmlns="http://www.w3.org/2000/svg"
                ><circle cx="16" cy="16" r="15.0049" fill="currentColor" /></svg>`
        }
      ]
    }
  }
}
</script>

<template>
  <section class="timer-section">
    <v-sheet class="timer-background" :color="$store.getters['events/currentScheduleColour']" height="100%">
      <pomodoro-timer />
      <!-- <portal-target name="footer" /> -->
    </v-sheet>
  </section>
</template>

<style lang="scss" scoped>
section.timer-section {
  height: 100%;
}

.timer-background {
  transition: 300ms ease-in;
  transition-property: background-color;
  position: relative;
  height: 100%;
}
</style>

<script>
import PomodoroTimer from '@/components/pomodoroTimer.vue'

export default {

  components: {
    PomodoroTimer
  },
  data () {
    return {

    }
  },

  computed: {
    remainingTimeString () {
      return this.$dayjs.getFormattedTime(
        this.$store.state.timer.timerRemaining,
        this.$store.state.settings.currentTimer,
        { total: this.$store.state.timer.timerOriginal }
      )
    },

    pageTitle () {
      return this.$store.getters['events/currentScheduleEntry']
        ? this.$i18n.t('section.' + this.$store.getters['events/currentScheduleEntry']._type).toLowerCase() : 'Pomodoro'
    }
  },

  beforeCreate () {
    // this.$store.commit('settings/applyPreset', 'debug')
    // this.$store.dispatch('events/checkSchedule')
    this.$store.dispatch('timer/setNewTimer', this.$store.getters['events/getSchedule'][0]._length)
    this.$store.dispatch('timer/initDefaultSubscribeFunctions')
  },

  mounted () {

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
                ><circle cx="16" cy="16" r="14" fill="currentColor" /></svg>`
        }
      ]
    }
  }
}
</script>

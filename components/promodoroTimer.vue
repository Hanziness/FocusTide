<template>
  <v-sheet :class="['timer-background pa-8 d-flex flex-column justify-center align-center']" :color="$store.getters['events/currentScheduleColour']" width="100%">
    <timer-progress v-if="$store.getters['settings/performanceSettings'].showProgressBar" />
    <timer-switch :timer-widget="$store.state.settings.currentTimer" />
    <timer-controls />
  </v-sheet>
</template>

<style lang="scss">
  .timer-background {
    transition: 300ms ease-in;
    transition-property: background-color;
    position: relative;
  }
</style>

<script>
import TimerSwitch from '@/components/timers/_timerSwitch.vue'
import TimerControls from '@/components/timerControls.vue'
import TimerProgress from '@/components/timerProgress.vue'

export default {
  name: 'PromodoroTimer',
  components: { TimerSwitch, TimerControls, TimerProgress },
  data () {
    return {
      start: this.$dayjs.dayjs(),
      target: this.$dayjs.dayjs().add(80, 'second')
    }
  },

  computed: {
    timerSecs () {
      // return (this.$timeFormat.datefns.differenceInMinutes(this.$store.state.timer.target, this.$store.state.timer.start) % 60) + ':' +
      // (this.$timeFormat.datefns.differenceInSeconds(this.$store.state.timer.target, this.$store.state.timer.start) % 60)
      // return '< TODO >'

      // note: dayjs does not have duration formatting, this only works for stuff under 24 hours
      // return this.$dayjs.dayjs.utc(this.$dayjs.getDiff(this.start, this.target).asMilliseconds()).format('mm:ss')
      return 'NOT USED AS OF NOW HEHE'
    },
    currentColour () {
      const currentState = this.$store.state.events.schedule[0] ? this.$store.state.events.schedule[0]._type : null
      if (currentState) {
        return this.$store.state.settings.visuals[currentState].colour
      } else {
        return ''
      }
    }
  },

  mounted () {
    // this.$store.commit('timer/setStart', new Date())
    // this.$store.commit('timer/setTarget', this.$timeFormat.datefns.addSeconds(new Date(), 80))
  }
}
</script>

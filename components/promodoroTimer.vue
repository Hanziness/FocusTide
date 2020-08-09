<template>
  <v-sheet :class="['timer-background pa-8', currentColour]" width="100%">
    <div :class="['timerDisplay', { 'active': $store.getters['timer/isRunning'] }]">
      {{ $store.getters['timer/getFormattedRemainingTime'] }}
    </div>
    <timer-controls />
  </v-sheet>
</template>

<style lang="scss">
  .timerDisplay {
    font-family: 'Source Sans Pro', monospace;
    font-size: 20vw;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
    font-feature-settings: "lnum" on;
    letter-spacing: 0.5rem;
    transition: 300ms ease-in;
    transition-property: opacity;
    opacity: 0.7;
  }

  .timerDisplay.active {
    opacity: 1;
  }

  .timer-background {
    transition: 300ms ease-in;
    transition-property: background-color;
  }
</style>

<script>
import { functionUpdateGroup } from '@/store/timer'
import TimerControls from '@/components/timerControls.vue'

export default {
  name: 'PromodoroTimer',
  components: { TimerControls },
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
    const storeRef = this.$store
    this.$store.commit('timer/subscribeToNotify', {
      fn (state) {
        storeRef.dispatch('events/advanceSchedule')
        storeRef.dispatch('timer/startTimer')
      },
      id: 'auto-advance',
      functionGroup: functionUpdateGroup.COMPLETE
    })
  }
}
</script>

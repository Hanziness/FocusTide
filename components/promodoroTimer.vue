<template>
  <v-sheet :class="['pa-8', currentColour]" width="100%">
    <div class="timerDisplay">
      {{ $store.getters['timer/getFormattedRemainingTime'] }}
    </div>
    <v-btn large depressed color="blue darken-2" dark @click="startTimer">
      GO
    </v-btn>
    <v-btn large depressed color="orange darken" @click="$store.dispatch('timer/pauseOrStopTimer', false)">
      PAUSE
    </v-btn>
    <v-btn large depressed color="red darken" @click="$store.dispatch('timer/pauseOrStopTimer', true)">
      STOP
    </v-btn>
    <v-btn large depressed dark color="red" @click="$store.dispatch('events/advanceSchedule')">
      [D] ADVANCE
    </v-btn>
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
  }
</style>

<script>
export default {
  name: 'PromodoroTimer',
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
  },

  methods: {
    startTimer () {
      this.$store.dispatch('timer/startTimer')
    }
  }
}
</script>

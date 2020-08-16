<template>
  <v-sheet class="rounded-lg pa-2 timer-control-panel text-center elevation-8" color="#343A40">
    <v-btn
      large
      depressed
      color="blue darken-2"
      dark
      :disabled="$store.getters['timer/isRunning']"
      @click="$store.dispatch('timer/startTimer')"
    >
      GO
    </v-btn>
    <v-btn
      :disabled="!$store.getters['timer/isRunning']"
      large
      depressed
      dark
      color="orange darken"
      @click="$store.dispatch('timer/pauseOrStopTimer', false)"
    >
      PAUSE
    </v-btn>
    <v-btn
      :disabled="$store.getters['timer/isStopped']"
      large
      depressed
      dark
      color="red darken"
      @click="$store.dispatch('timer/pauseOrStopTimer', true)"
    >
      STOP
    </v-btn>
    <v-btn large depressed dark color="red" @click="$store.dispatch('events/advanceSchedule', {})">
      [D] ADVANCE
    </v-btn>

    <v-btn large depressed dark color="purple" @click="changeLocale">
      [D] Change Locale
    </v-btn>
  </v-sheet>
</template>

<style lang="scss" scoped>
  div.timer-control-panel {
    width: max-content;
    z-index: 10;
  }
</style>

<script>
export default {
  methods: {
    changeLocale () {
      this.$dayjs.dayjs.locale() === 'hu' ? this.$dayjs.dayjs.locale('en') : this.$dayjs.dayjs.locale('hu')
      this.$i18n.locale = this.$dayjs.dayjs.locale()
      this.$store.commit('timer/refreshTime')
      // console.log('New locale is ' + this.$dayjs.dayjs.locale())
    }
  }
}
</script>

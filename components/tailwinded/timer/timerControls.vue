<template>
  <div class="rounded-lg p-2 timer-control-panel bg-gray-800 text-center shadow-lg" color="#343A40">
    <ui-button
      color="blue darken-2"
      :disabled="$store.getters['timer/isRunning']"
      @click="$store.dispatch('timer/startTimer')"
    >
      GO
    </ui-button>
    <ui-button
      color="orange darken"
      :disabled="!$store.getters['timer/isRunning']"
      @click="$store.dispatch('timer/pauseOrStopTimer', false)"
    >
      PAUSE
    </ui-button>
    <ui-button
      color="red darken"
      :disabled="$store.getters['timer/isStopped']"
      @click="$store.dispatch('timer/pauseOrStopTimer', true)"
    >
      STOP
    </ui-button>
    <ui-button
      color="red"
      @click="$store.dispatch('events/advanceSchedule', {})"
    >
      [D] ADVANCE
    </ui-button>

    <ui-button
      color="purple"
      @click="changeLocale"
    >
      [D] Change Locale
    </ui-button>
  </div>
</template>

<style lang="scss" scoped>
  div.timer-control-panel {
    width: max-content;
    z-index: 10;
  }
</style>

<script>
export default {
  components: {
    UiButton: () => import('@/components/tailwinded/base/button.vue')
  },
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

<template>
  <div class="rounded-lg p-2 timer-control-panel bg-gray-800 text-center shadow-lg" color="#343A40">
    <ui-button
      color="blue darken-2"
      :disabled="[1, 3].includes($store.getters['schedule/getCurrentTimerState'])"
      @click="$store.commit('schedule/updateTimerState', 1)"
    >
      GO
    </ui-button>
    <ui-button
      color="orange darken"
      :disabled="$store.getters['schedule/getCurrentTimerState'] !== 1"
      @click="$store.commit('schedule/updateTimerState', 2)"
    >
      PAUSE
    </ui-button>
    <ui-button
      color="red darken"
      :disabled="$store.getters['schedule/getCurrentTimerState'] === 0"
      @click="$store.commit('schedule/updateTimerState', 0)"
    >
      STOP
    </ui-button>
    <ui-button
      color="red"
      @click="$store.commit('schedule/advance')"
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
    UiButton: () => import(/* webpackChunkName: "uibase" */ '@/components/tailwinded/base/button.vue')
  },
  methods: {
    changeLocale () {
      // console.log('Test print')
      const newLocale = this.$dayjs.dayjs.locale() === 'hu' ? 'en' : 'hu'
      // this.$dayjs.dayjs.locale() === 'hu' ? this.$dayjs.dayjs.locale('en') : this.$dayjs.dayjs.locale('hu')
      this.$dayjs.dayjs.locale(newLocale)
      this.$i18n.setLocale(newLocale)
      this.$store.commit('timer/refreshTime')
      // console.log('New locale is ' + this.$i18n.locale)
    }
  }
}
</script>

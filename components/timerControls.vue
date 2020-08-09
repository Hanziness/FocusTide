<template>
  <div>
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
    <v-btn large depressed dark color="red" @click="$store.dispatch('events/advanceSchedule')">
      [D] ADVANCE
    </v-btn>
  </div>
</template>

<script>
export default {

}
</script>

<template>
  <v-sheet :class="['pa-8 d-flex flex-column justify-center align-center']" width="100%" height="100%" color="transparent">
    <schedule-display />
    <notification-controller />
    <timer-progress v-if="$store.getters['settings/performanceSettings'].showProgressBar" />
    <v-spacer />
    <timer-switch :timer-widget="$store.state.settings.currentTimer" />
    <v-spacer />
    <timer-controls />
  </v-sheet>
</template>

<script>
import TimerSwitch from '@/components/timers/_timerSwitch.vue'
import TimerControls from '@/components/tailwinded/timer/timerControls.vue'
import TimerProgress from '@/components/timerProgress.vue'
import NotificationController from '@/components/notifications/notificationController.vue'

import ScheduleDisplay from '@/components/tailwinded/schedule/scheduleDisplay.vue'

export default {
  name: 'PomodoroTimer',
  components: { TimerSwitch, TimerControls, TimerProgress, ScheduleDisplay, NotificationController },
  data () {
    return {
      start: this.$dayjs.dayjs(),
      target: this.$dayjs.dayjs().add(80, 'second')
    }
  },

  computed: {
    currentColour () {
      const currentState = this.$store.state.events.schedule[0] ? this.$store.state.events.schedule[0]._type : null
      if (currentState) {
        return this.$store.state.settings.visuals[currentState].colour
      } else {
        return ''
      }
    }
  }
}
</script>

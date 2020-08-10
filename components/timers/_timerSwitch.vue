<template>
  <div class="timer-container d-flex flex-column justify-center">
    <timer-traditional v-if="timerWidget === 'traditional'" />
    <timer-approximate v-else-if="timerWidget === 'approximate'" />
  </div>
</template>

<style lang="scss" scoped>
div.timer-container {
  width: 100%;
  height: 40vh;
}

div.timer-display {
  transition: 300ms ease-in;
  transition-property: opacity;
  opacity: 0.7;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
}

div.timer-display.active {
  opacity: 1;
}
</style>

<script>
import TimerTraditional from '@/components/timers/traditional.vue'
import TimerApproximate from '@/components/timers/approximate.vue'

export default {
  components: {
    TimerTraditional, TimerApproximate
  },
  props: {
    timerWidget: {
      type: String,
      default: 'traditional',
      validator (value) {
        return ['traditional', 'approximate'].includes(value)
      }
    }
  }
}
</script>

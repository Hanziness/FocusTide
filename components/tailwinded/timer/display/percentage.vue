<template>
  <div :class="['timer-percentage timer-display', { 'active': $store.getters['timer/isRunning'] }]">
    <transition name="transition-percentage" tag="span" mode="out-in">
      <span :key="timerValue" class="timer-percentage-value">
        {{ timerValue }}
      </span>
    </transition>
    %
  </div>
</template>

<script>
export default {
  computed: {
    timerValue () {
      return Math.round(this.$store.getters['timer/completedFraction'] * 100)
    }
  }
}
</script>

<style>
div.timer-percentage {
  font-size: 40vh;
  font-weight: 700;
  font-family: 'Source Sans Pro', monospace;
}

span.timer-percentage-value {
  position: relative;
  display: inline-block;
}

span.timer-percentage-value.transition-percentage-enter-active,
span.timer-percentage-value.transition-percentage-leave-active {
  transition: 300ms ease-out;
  transition-property: opacity, transform !important;
}

span.timer-percentage-value.transition-percentage-enter {
  opacity: 0 !important;
  transform: translateY(60px);
}

span.timer-percentage-value.transition-percentage-leave-to {
  opacity: 0 !important;
  transform: translateY(-60px);
}
</style>

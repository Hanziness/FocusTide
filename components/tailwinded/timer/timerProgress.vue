<template>
  <transition-group name="progress-transition" mode="out-in">
    <div
      :key="$store.getters['events/getSchedule'][0]._index"
      :class="['timer-progress']"
      :style="{
        'background-color': $store.getters['events/nextScheduleColour'],
        'transform': `translateX(${-progressPercentage}%)`
      }"
    />
  </transition-group>
</template>

<script>
export default {
  computed: {
    progressPercentage () {
      return (1 - this.$store.getters['timer/completedFraction']) * 100
    }
  }
}
</script>

<style lang="scss" scoped>
// provides a background filling progress bar (parent needs to be position: relative)
.timer-progress {
  transition: 200ms ease-in-out;
  transition-property: clip-path background-color transform;
  // background-color: red;
  // clip-path: inset(0% 100% 0% 0%);
  width: 100%;
  height: 100%;
  content: "";
  position: fixed;
  display: block;
  top: 0;
  left: 0;
}

.progress-transition-enter-active,
.progress-transition-leave-active {
  transition: 500ms ease-in;
  transition-property: opacity clip-path !important;
}

.progress-transition-enter {
  opacity: 0;
}

.progress-transition-leave-to {
  opacity: 0;
  clip-path: inset(0% 0% 0% 0%) !important;
}
</style>

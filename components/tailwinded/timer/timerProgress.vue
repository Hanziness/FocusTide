<template>
  <transition-group name="progress-transition" mode="out-in">
    <div
      :key="$store.getters['schedule/getCurrentItem'].id"
      :class="['timer-progress']"
      :style="{
        'background-color': $store.getters['schedule/nextScheduleColour'],
        'transform': `translateX(${-100 + progressPercentage}%)`
      }"
    />
  </transition-group>
</template>

<script>
export default {
  props: {
    timeElapsed: {
      type: Number,
      required: true
    },
    timeOriginal: {
      type: Number,
      required: true
    }
  },

  computed: {
    progressPercentage () {
      // return (1 - this.$store.getters['timer/completedFraction']) * 100
      return (this.timeElapsed / this.timeOriginal) * 100
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
  transition-property: opacity transform !important;
}

.progress-transition-enter {
  // opacity: 0;
}

.progress-transition-leave-to {
  // opacity: 0;
  transform: translateX(0%) !important;
}
</style>

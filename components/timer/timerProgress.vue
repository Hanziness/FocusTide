<template>
  <transition-group name="progress-transition" mode="out-in">
    <div
      :key="$store.getters['schedule/getCurrentItem'].id"
      :class="['timer-progress']"
      :style="{
        'background-color': $store.getters['schedule/getScheduleColour'][scheduleEntryId],
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
    },
    scheduleEntryId: {
      type: Number,
      default: 1
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
  transition-property: background-color transform;
  width: 100%;
  height: 100%;
  position: fixed;
  display: block;
  top: 0;
  left: 0;
}

.progress-transition-enter-active,
.progress-transition-leave-active {
  transition: 500ms ease-in;
  transition-property: transform !important;
}

// .progress-transition-enter {
// }

.progress-transition-leave-to {
  transform: translateX(0%) !important;
}
</style>

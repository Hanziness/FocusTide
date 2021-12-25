<template>
  <div
    :class="['timer-progress']"
    :style="{
      'background-color': colour ? colour : $store.getters['schedule/getScheduleColour'][scheduleEntryId],
      'transform': !background ? `translateX(${-100 + progressPercentage}%)` : 'translateX(0%)'
    }"
  >
    <!-- Dark mode background override -->
    <div class="absolute w-full h-full invisible dark:visible bg-gray-600 mix-blend-multiply" />
  </div>
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
    },
    colour: {
      type: String,
      default: null
    },
    background: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    progressPercentage () {
      return (this.timeElapsed / this.timeOriginal) * 100
    }
  }
}
</script>

<style lang="scss" scoped>
// provides a background filling progress bar (parent needs to be position: relative)
.timer-progress {
  transition: background-color 200ms ease-in-out, transform 200ms ease-in-out;
  width: 100%;
  height: 100%;
  position: fixed;
  display: block;
  top: 0;
  left: 0;
}
</style>

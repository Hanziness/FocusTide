<template>
  <div :class="['timer-progress', $store.getters['events/nextScheduleColour']]" :style="{ 'clip-path': 'inset(0% ' + progressPercentage + '% 0% 0%)' }" />
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
  transition-property: clip-path;
  // background-color: red;
  clip-path: inset(0% 100% 0% 0%);
  width: 100%;
  height: 100%;
  content: "";
  position: absolute;
  display: block;
  top: 0;
  left: 0;
}
</style>

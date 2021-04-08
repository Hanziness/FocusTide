<template>
  <div class="timer-complete-icon">
    <complete-icon />
  </div>
</template>

<style lang="scss" scoped>
.timer-complete-icon svg {
  width: 20vw !important;
  height: 20vw !important;
}
</style>

<script>
import CompleteIcon from 'vue-material-design-icons/Check.vue'

export default {
  components: { CompleteIcon }
}
</script>

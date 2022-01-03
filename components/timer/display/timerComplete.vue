<template>
  <div class="timer-complete-icon">
    <CompleteIcon />
  </div>
</template>

<script>
import { CheckIcon } from 'vue-tabler-icons'

export default {
  components: { CompleteIcon: CheckIcon }
}
</script>

<style lang="scss" scoped>
.timer-complete-icon svg {
  width: 20vw !important;
  height: 20vw !important;
}
</style>

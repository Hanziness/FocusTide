<template>
  <transition name="transition-approximate-up" mode="out-in">
    <div :key="value" :class="['timer-approximate timer-display', { 'active': $store.getters['timer/isRunning'] }]">
      {{ value }}
    </div>
  </transition>
</template>

<script>
import TimerMixin from '@/assets/mixins/timerMixin'

export default {
  mixins: [TimerMixin],
  computed: {
    value () {
      return this.$dayjs.formatRelative(this.$store.state.timer.timerRemaining)
    }
  }
}
</script>

<style lang="scss" scoped>
div.timer-approximate {
  font-size: 8vw;
}

div.timer-approximate.transition-approximate-up-enter-active,
div.timer-approximate.transition-approximate-up-leave-active {
  transition: 300ms ease-out;
  transition-property: opacity, transform;
}

div.timer-approximate.transition-approximate-up-enter {
  opacity: 0 !important;
  transform: translateY(60px);
}

div.timer-approximate.transition-approximate-up-leave-to {
  opacity: 0 !important;
  transform: translateY(-60px);
}
</style>

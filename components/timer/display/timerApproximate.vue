<template>
  <div :class="['timer-display select-none text-3xl md:text-7xl xl:text-9xl', { 'active': running }]">
    <transition name="transition-approximate-up" mode="out-in">
      <div :key="value" class="timer-approximate">
        {{ value }}
      </div>
    </transition>
  </div>
</template>

<script>
import TimerMixin from '@/assets/mixins/timerMixin'

export default {
  mixins: [TimerMixin],
  computed: {
    value () {
      const lang = this.$store.state.settings.lang
      return this.$dayjs.formatRelative(this.timeOriginal - this.timeElapsed, {
        lang
      })
    }
  }
}
</script>

<style lang="scss" scoped>
div.timer-approximate.transition-approximate-up-enter-active,
div.timer-approximate.transition-approximate-up-leave-active {
  transition: 300ms ease-out;
  transition-property: opacity, transform;
}

div.timer-approximate.transition-approximate-up-enter {
  opacity: 0 !important;
  transform: translateY(30px) !important;
}

div.timer-approximate.transition-approximate-up-leave-to {
  opacity: 0 !important;
  transform: translateY(-30px) !important;
}
</style>

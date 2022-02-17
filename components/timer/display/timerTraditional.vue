<template>
  <div
    :class="['flex flex-row gap-0 md:text-[14rem] text-[9rem] leading-none timer-display relative', { 'active': running }]"
  >
    <transition-group
      name="transition-traditional"
      enter-class="translate-x-4 opacity-0"
      enter-active-class="duration-500"
      enter-to-class=""
      leave-class=""
      leave-active-class="duration-300 absolute"
      leave-to-class="opacity-0"
      move-class="duration-500"
      class="flex flex-col items-center md:flex-row"
      tag="div"
    >
      <div
        v-for="key in timeLeftStructured.displayKeys"
        :key="key"
        class="transition flex flex-row"
        :class="{ 'font-bold': key === 'minutes', 'md:text-9xl md:self-start': key === 'seconds', 'md:mr-4': key === 'hours' }"
        tag="div"
      >
        <span
          v-for="(char, idx) in timeLeftStructured.num[key].toString().padStart(2, '0')"
          :key="`${key}-${idx}`"
          class="w-[1ch]"
          :class="{ 'md:text-right text-center': idx === 0, 'md:text-left text-center': idx === 1 }"
          v-text="char"
        />
      </div>
    </transition-group>
  </div>
</template>

<script>
import TimerMixin from '@/assets/mixins/timerMixin'

export default {
  mixins: [TimerMixin],
  computed: {
    timeLeftStructured () {
      const sLeft = Math.round((this.timeOriginal - this.timeElapsed) / 1000)
      const hours = Math.floor(sLeft / (60 * 60))
      const minutes = Math.floor((sLeft % (60 * 60)) / (60))
      const seconds = Math.floor(sLeft % 60)

      const returnObject = {
        num: { hours, minutes, seconds },
        displayKeys: ['hours', 'minutes', 'seconds'].filter(value => value !== 'hours' || hours > 0)
      }

      this.$emit(
        'tick',
        returnObject.displayKeys
          .map(key => returnObject.num[key].toString().padStart(2, '0'))
          .join(':')
      )
      return returnObject
    }
  }
}
</script>

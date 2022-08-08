<template>
  <div
    :class="['md:text-[14rem] text-[9rem] leading-none timer-display relative', { 'active': running }]"
  >
    <transition-group
      name="transition-traditional"
      enter-from-class="translate-y-4 opacity-0 md:translate-y-0 md:translate-x-4"
      enter-active-class="duration-500"
      enter-to-class=""
      leave-class=""
      leave-active-class="absolute duration-300"
      leave-to-class="opacity-0 md:-translate-x-8"
      move-class="duration-500"
      class="relative flex flex-col items-center transition md:flex-row isolate"
      tag="div"
      @beforeLeave="beforeLeave"
    >
      <div
        v-for="key in timeLeftStructured.displayKeys"
        :key="key"
        class="flex flex-row transition"
        :class="{ 'font-bold': key === 'minutes', 'md:text-9xl md:self-start': key === 'seconds', 'md:mr-4': key === 'hours' }"
      >
        <div v-if="key === '_plus'" class="font-bold text-[.75em]">
          +
        </div>
        <span
          v-for="(char, idx) in timeLeftStructured.num[key].toString().padStart(2, '0')"
          v-else
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
      const sLeft = Math.abs(Math.round((this.timeOriginal - this.timeElapsed) / 1000))
      const hours = Math.floor(sLeft / (60 * 60))
      const minutes = Math.floor((sLeft % (60 * 60)) / (60))
      const seconds = Math.floor(sLeft % 60)

      const displayKeys = ['hours', 'minutes', 'seconds'].filter(value => value !== 'hours' || hours > 0)
      const completed = this.timeElapsed > this.timeOriginal && [hours, minutes, seconds].some(num => num > 0)

      if (completed) {
        displayKeys.unshift('_plus')
      }

      const returnObject = {
        num: { hours, minutes, seconds },
        displayKeys,
        completed
      }

      this.$emit(
        'tick',
        (completed ? '+' : '') + displayKeys
          .filter(key => !key.startsWith('_'))
          .map(key => returnObject.num[key].toString().padStart(2, '0'))
          .join(':')
      )
      return returnObject
    }
  },
  methods: {
    /** "Hack" used to get around object flying in from the corners of the page */
    beforeLeave (el) {

    }
  }
}
</script>

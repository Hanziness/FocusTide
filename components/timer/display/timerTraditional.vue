<template>
  <div
    :class="['flex flex-row gap-0 text-[14rem] timer-display relative', { 'active': running }]"
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
      class="flex flex-row"
      tag="div"
    >
      <div
        v-for="key in timeLeftStructured.displayKeys"
        :key="key"
        class="transition"
        :class="{ 'font-bold': key !== 'minutes', 'text-9xl self-start': key === 'seconds', 'mr-4': key === 'hours' }"
        tag="div"
      >
        <span
          v-for="(char, idx) in timeLeftStructured.str[key].padStart(2, '0')"
          :key="`${key}-${idx}`"
          class="inline-block w-[1ch]"
          :class="{ 'text-right': idx === 0, 'text-left': idx === 1 }"
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
        str: { hours: hours.toString(), minutes: minutes.toString(), seconds: seconds.toString() },
        displayKeys: ['hours', 'minutes', 'seconds'].filter(value => value !== 'hours' || hours > 0)
      }
      return returnObject
    }
  }
}
</script>

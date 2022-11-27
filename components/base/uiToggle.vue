<template>
  <div role="checkbox" :tabindex="disabled ? -1 : 0" class="relative group flex flex-row items-center rounded-full w-14 h-7 cursor-pointer bg-opacity-25 focus:ring ring-theme transition" :class="[{ 'bg-theme bg-opacity-25': !!value, 'bg-slate-900 bg-opacity-25 dark:bg-slate-200 dark:bg-opacity-25': !value }]" @click="computedValue = !value">
    <div v-show="!hideOnOffMarkers" class="absolute px-2 flex flex-row justify-between items-center w-full h-full">
      <!-- ON component -->
      <div class="transition" :class="[{ 'opacity-0': !value }]">
        <slot name="when-on">
          <CheckIcon size="18" class="opacity-80" />
        </slot>
      </div>

      <!-- OFF component -->
      <div class="transition" :class="[{ 'opacity-0': !!value }]">
        <slot name="when-off">
          <XIcon size="18" class="opacity-80" />
        </slot>
      </div>
    </div>

    <!-- Toggle head -->
    <div class="origin-center absolute transition-all duration-300 rounded-full scale-75 aspect-square h-full" :class="{ 'left-full -translate-x-full bg-theme': !!value, 'left-0 bg-slate-800 bg-opacity-80 dark:bg-slate-200 dark:bg-opacity-60': !value }" />
  </div>
</template>

<script>
import { CheckIcon, XIcon } from 'vue-tabler-icons'

export default {
  components: { CheckIcon, XIcon },

  props: {
    value: {
      type: Boolean,
      default: false
    },

    hideOnOffMarkers: {
      type: Boolean,
      default: false
    },

    disabled: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    computedValue: {
      get () {
        return this.value
      },
      set (newValue) {
        this.$emit('input', newValue)
      }
    }
  }
}
</script>

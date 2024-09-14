<script setup lang="ts">
import { IconCheck, IconX } from '@tabler/icons-vue'

const props = defineProps({
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
})

const emit = defineEmits<{(type: 'input', value: boolean): void}>()

const computedValue = computed({
  get () {
    return props.value
  },
  set (newValue) {
    emit('input', newValue)
  }
})
</script>

<template>
  <div role="checkbox" :tabindex="disabled ? -1 : 0" class="relative flex flex-row items-center transition bg-opacity-25 rounded-full cursor-pointer group w-14 h-7 focus:ring ring-primary dark:ring-primary-dark" :class="[{ 'bg-primary dark:bg-primary-dark bg-opacity-25 dark:bg-opacity-25': !!value, 'bg-surface-darkvariant bg-opacity-25 dark:bg-surface-variant dark:bg-opacity-25': !value }]" @click="computedValue = !value">
    <div v-show="!props.hideOnOffMarkers" class="absolute flex flex-row items-center justify-between w-full h-full px-2">
      <!-- ON component -->
      <div class="transition" :class="[{ 'opacity-0': !props.value }]">
        <slot name="when-on">
          <IconCheck size="18" class="opacity-80" />
        </slot>
      </div>

      <!-- OFF component -->
      <div class="transition" :class="[{ 'opacity-0': !!props.value }]">
        <slot name="when-off">
          <IconX size="18" class="opacity-80" />
        </slot>
      </div>
    </div>

    <!-- Toggle head -->
    <div class="absolute h-full transition-all duration-300 origin-center scale-75 rounded-full aspect-square" :class="{ 'left-full -translate-x-full bg-primary dark:bg-primary-dark': !!props.value, 'left-0 bg-surface-darkvariant bg-opacity-80 dark:bg-surface-variant dark:bg-opacity-60': !props.value }" />
  </div>
</template>

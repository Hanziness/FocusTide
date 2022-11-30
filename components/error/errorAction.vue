<script setup lang="ts">
import { PropType } from 'vue'

enum ErrorActionState {
  Recommended = 'recommended',
  Default = 'default',
  Disabled = 'disabled'
}

const props = defineProps({
  state: {
    type: String as PropType<ErrorActionState>,
    default: 'default'
  },

  textColours: {
    type: Boolean,
    default: false
  },

  href: {
    type: String,
    default: null
  }
})

const emit = defineEmits<{(type: 'click', event: MouseEvent): void}>()

const handleClick = (event: MouseEvent) => {
  if (props.state === 'disabled') {
    return
  }

  emit('click', event)
}
</script>

<template>
  <a
    role="button"
    :href="state !== ErrorActionState.Disabled ? props.href : undefined"
    :aria-disabled="state === ErrorActionState.Disabled"
    :disabled="state === ErrorActionState.Disabled"
    :class="[
      'transition relative overflow-hidden rounded-lg bg-current outline-current before:block before:absolute before:inset-0 before:transition',
      {
        'outline outline-offset-2 before:bg-black before:bg-opacity-0 before:hover:bg-opacity-10 before:active:bg-opacity-20 cursor-pointer mx-1': state === 'recommended',
        'before:bg-slate-100 before:bg-opacity-70 before:hover:bg-opacity-50 before:active:bg-opacity-30 cursor-pointer': state === 'default',
        'opacity-60 cursor-not-allowed': props.state === ErrorActionState.Disabled
      }
    ]"
    @click="handleClick"
  >
    <div :class="['relative flex px-3 py-2 flex-row space-x-1 pointer-events-none', { 'text-white': props.textColours && props.state === ErrorActionState.Recommended, 'text-black': props.textColours && props.state !== ErrorActionState.Recommended }]">
      <slot name="icon" />
      <slot />
    </div>
  </a>
</template>

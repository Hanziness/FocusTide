<script setup lang="ts">
const props = defineProps({
  value: {
    type: Number,
    required: true
  },
  min: {
    type: Number,
    default: -Infinity
  },
  max: {
    type: Number,
    default: Infinity
  }
})

const state = reactive({
  value: JSON.parse(JSON.stringify(props.value)) as number
})

watch(() => state.value, (newValue) => {
  if (newValue !== null && newValue !== undefined && !isNaN(newValue) && isFinite(newValue) && newValue <= props.max && newValue >= props.min) {
    emit('input', newValue)
  }
})

watch(() => props.value, (newValue) => {
  state.value = newValue
})

const emit = defineEmits<{(event: 'input', value: number): void }>()

const updateInput = (newValue: string) => {
  const newValueNumber = Number.parseInt(newValue)

  if (!isNaN(newValueNumber)) {
    state.value = newValueNumber
  }
}
</script>

<template>
  <div class="flex flex-row items-center gap-2">
    <input
      class="relative min-w-0 appearance-none group isolate before:bg-theme before:absolute before:left-0 before:h-2 before:w-2"
      :value="state.value"
      :min="props.min"
      :max="props.max"
      type="range"
      @input="(e) => updateInput((e.target as HTMLInputElement).value)"
    >
    <span class="min-w-[2ch] text-center" v-text="state.value" />
  </div>
</template>

<style lang="postcss" scoped>
input[type="range"]::-moz-range-track {
  @apply h-1 min-w-0 rounded-full bg-theme bg-opacity-20 group-active:bg-opacity-40;
}

input[type="range"]::-moz-range-thumb {
  @apply rounded-full border-none bg-theme scale-90 transition-all duration-300 active:scale-100;

  &:focus {
    @apply ring ring-theme;
  }
}
</style>

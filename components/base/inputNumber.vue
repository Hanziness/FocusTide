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
  },
  prefix: {
    type: String,
    default: ''
  },
  postfix: {
    type: String,
    default: ''
  },
  valueClass: {
    type: String,
    default: ''
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
      class="relative h-3 min-w-0 bg-transparent appearance-none group isolate w-full"
      :value="state.value"
      :min="props.min"
      :max="props.max"
      type="range"
      @input="(e) => updateInput((e.target as HTMLInputElement).value)"
    >
    <span class="min-w-[2ch] text-center" :class="props.valueClass" v-text="`${props.prefix}${state.value}${props.postfix}`" />
  </div>
</template>

<style lang="scss" scoped>
@mixin range-track {
  @apply h-1 min-w-0 rounded-full bg-primary dark:bg-primary-dark bg-opacity-20 group-active:bg-opacity-40;
}

@mixin range-thumb {
  @apply rounded-full border-none bg-primary dark:bg-primary-dark scale-90 transition-all duration-300 active:scale-125 appearance-none w-4 h-4 mt-[-0.375rem];

  &:focus {
    @apply ring ring-primary dark:ring-primary-dark;
  }
}

::-moz-range-thumb {
  @include range-thumb;
}

::-moz-range-track {
  @include range-track;
}

::-ms-thumb {
  @include range-thumb;
}

::ms-track {
  @include range-track;
}

::-webkit-slider-thumb {
  @include range-thumb;
}

::-webkit-slider-runnable-track {
  @include range-track;
}
</style>

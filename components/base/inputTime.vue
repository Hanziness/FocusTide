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

const timeToObject = (timeInMs: number) => {
  return {
    min: Math.floor(timeInMs / 1000 / 60),
    sec: Math.floor((timeInMs / 1000)) % 60
  }
}

const innerValue = reactive(timeToObject(props.value))
const errorState = reactive({
  min: false,
  sec: false
})

const innerValueMs = computed(() => innerValue.min * 60 * 1000 + innerValue.sec * 1000)

const emit = defineEmits({
  input (value: number) {
    return value >= 5
  }
})

// Emit 'input' if innerValue changes
watch(innerValue, (newValue) => {
  if (newValue.min >= 0 && newValue.sec >= 0 && !(newValue.min === 0 && newValue.sec === 0)) {
    emit('input', innerValueMs.value)
  }
})

// Update innerValue if the "value" prop changes
watch(() => props.value, (newValue) => {
  const newTime = timeToObject(newValue)
  innerValue.min = newTime.min
  innerValue.sec = newTime.sec

  errorState.min = false
  errorState.sec = false
})

const updateMin = (newValue: string) => {
  const newValueNum = Number.parseInt(newValue)

  if (!isNaN(newValueNum) && newValueNum >= 0) {
    innerValue.min = newValueNum
    errorState.min = false
  } else {
    errorState.min = true
  }
}

const updateSec = (newValue: string) => {
  const newValueNum = Number.parseInt(newValue)

  if (!isNaN(newValueNum) && newValueNum >= 0 && newValueNum <= 59) {
    innerValue.sec = newValueNum
    errorState.sec = false
  } else {
    errorState.sec = true
  }
}
</script>

<template>
  <div class="flex flex-row items-center gap-2 relative rounded-lg overflow-hidden bg-surface-light dark:bg-surface-dark outline outline-1 outline-surface-outline dark:outline-surface-darkoutline focus-within:ring focus-within:ring-primary dark:focus-within:ring-primary-dark transition">
    <input
      :value="innerValue.min"
      type="text"
      pattern="[0-9]*"
      inputmode="numeric"
      class="bg-transparent w-full py-2 pl-2 focus:ring-0 focus:bg-primary-container focus:text-primary-oncontainer dark:focus:bg-primary-darkcontainer dark:focus:text-primary-darkoncontainer focus:outline-none"
      :class="{ 'bg-error-light dark:bg-error-dark text-error-onlight dark:text-error-ondark': errorState.min }"
      @input="(e) => updateMin((e.target as HTMLInputElement).value)"
    >
    <span>:</span>
    <input
      :value="innerValue.sec"
      type="text"
      pattern="[0-9]*"
      inputmode="numeric"
      class="bg-transparent w-full py-2 pl-2 focus:ring-0 focus:bg-primary-container focus:text-primary-oncontainer dark:focus:bg-primary-darkcontainer dark:focus:text-primary-darkoncontainer focus:outline-none"
      :class="{ 'bg-error-light dark:bg-error-dark text-error-onlight dark:text-error-ondark': errorState.sec }"
      @input="(e) => updateSec((e.target as HTMLInputElement).value)"
    >
  </div>
</template>

<script setup lang="ts">
// import Toggle from './toggle.vue'
// import ButtonComponent from './button.vue'

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
const inputMinutes = ref(true)

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
  console.log(newValue)
  const newTime = timeToObject(newValue)
  innerValue.min = newTime.min
  innerValue.sec = newTime.sec
  console.log(innerValue)
})

const updateMin = (newValue: string) => {
  const newValueNum = Number.parseInt(newValue)

  if (!isNaN(newValueNum) && newValueNum >= 0) {
    innerValue.min = newValueNum
  }
}

const updateSec = (newValue: string) => {
  const newValueNum = Number.parseInt(newValue)

  if (!isNaN(newValueNum) && newValueNum >= 0 && newValueNum <= 59) {
    innerValue.sec = newValueNum
  }
}
</script>

<template>
  <div class="flex flex-row items-center gap-2">
    <input
      v-if="inputMinutes"
      :value="innerValue.min"
      class="min-w-0"
      type="text"
      pattern="[0-9]*"
      inputmode="numeric"
      @input="(e) => updateMin((e.target as HTMLInputElement).value)"
    >
    <input
      v-else
      :value="innerValue.sec"
      class="min-w-0"
      type="text"
      pattern="[0-9]*"
      inputmode="numeric"
      @input="(e) => updateSec((e.target as HTMLInputElement).value)"
    >
    <div class="flex flex-row items-center gap-1 mr-2">
      <div class="w-6 h-6 text-center rounded-full text-sm cursor-pointer -mx-1 px-1" :class="{ 'font-bold bg-theme bg-opacity-40': inputMinutes }" @click="inputMinutes = true">
        m
      </div>
      <div class="w-6 h-6 text-center rounded-full text-sm cursor-pointer -mx-1 px-1" :class="{ 'font-bold bg-theme bg-opacity-40': !inputMinutes }" @click="inputMinutes = false">
        s
      </div>
      <!-- <ButtonComponent default-style circle :importance="3" class="flex-shrink-0 text-sm" inner-class="!p-2">
        m
      </ButtonComponent>
      <ButtonComponent default-style circle :importance="3" class="flex-shrink-0 text-sm" inner-class="!p-2">
        s
      </ButtonComponent> -->
    </div>
    <!-- <Toggle :value="inputMinutes" class="flex-shrink-0" @input="(newValue) => inputMinutes = newValue">
      <template #when-on>
        m
      </template>
      <template #when-off>
        s
      </template>
    </Toggle> -->
  </div>
</template>

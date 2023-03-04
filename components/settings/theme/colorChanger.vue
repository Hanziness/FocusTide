<script setup lang="ts">
import { HSLToRGB, RGBToHSL } from './colorUtils'
import InputNumber from '~~/components/base/inputNumber.vue'

interface InputProps {
  inputTheme: number[]
}

const props = defineProps<InputProps>()

const propHSL = RGBToHSL(props.inputTheme[0], props.inputTheme[1], props.inputTheme[2])
const inputHue = ref(propHSL[0] ?? 0)
const inputSat = ref(propHSL[1] ?? 10)
const inputLit = ref(60)

const previewColorRGB = computed(() => HSLToRGB(inputHue.value, inputSat.value, inputLit.value))

const emit = defineEmits<{(e: 'input', rgbColors: number[]) : void }>()

watch(previewColorRGB, (newRGB) => {
  emit('input', newRGB)
})

watch(() => props.inputTheme, (newTheme) => {
  const themeHSL = RGBToHSL(newTheme[0], newTheme[1], newTheme[2])

  inputHue.value = themeHSL[0]
  inputSat.value = themeHSL[1]
})
</script>

<template>
  <div class="flex flex-row gap-4">
    <div class="w-6 h-6 rounded-full flex-shrink-0" :style="{ backgroundColor: `rgb(${previewColorRGB[0]} ${previewColorRGB[1]} ${previewColorRGB[2]})` }" />
    <InputNumber
      class="flex-grow"
      value-class="w-[4ch]"
      postfix="°"
      :value="inputHue"
      :min="0"
      :max="360"
      @input="$value => inputHue = $value"
    />
    <InputNumber
      class="flex-grow"
      value-class="w-[4ch]"
      :value="inputSat"
      postfix="%"
      :min="10"
      :max="100"
      @input="$value => inputSat = $value"
    />
    <!-- <InputNumber
      class="flex-grow"
      value-class="w-[4ch]"
      :value="inputLit"
      :min="50"
      :max="80"
      @input="$value => inputLit = $value"
    /> -->
  </div>
</template>

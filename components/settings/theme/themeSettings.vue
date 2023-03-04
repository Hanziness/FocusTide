<script setup lang="ts">
import { prebuiltThemes } from './prebuiltThemes'
import ColorChanger from './colorChanger.vue'
import ThemePreview from './themePreview.vue'
import { useSettings } from '~~/stores/settings'
import UiOption from '~~/components/base/uiOption.vue'

const settingsStore = useSettings()

const customTheme = reactive(settingsStore.visuals.theme)
const activeThemeKey = computed(() => {
  const findValue = Object.keys(prebuiltThemes).find((key) => {
    const rgbValues = [customTheme.work, customTheme.shortpause, customTheme.longpause].flat()
    const prebuiltValues = [prebuiltThemes[key as keyof typeof prebuiltThemes].work, prebuiltThemes[key as keyof typeof prebuiltThemes].shortpause, prebuiltThemes[key as keyof typeof prebuiltThemes].longpause].flat()

    return rgbValues.every((value, index) => prebuiltValues[index] === value)
  })

  return findValue
})

const isUsingCustomTheme = ref(activeThemeKey === undefined)
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="grid grid-flow-row grid-cols-3 gap-2 mb-2">
      <UiOption
        v-for="(theme, index) in prebuiltThemes"
        :key="`theme-${index}`"
        :title="''"
        class="text-center"
        :active="!isUsingCustomTheme && activeThemeKey === index"
        @click="$newTheme => {
          settingsStore.visuals.theme.work = theme.work
          settingsStore.visuals.theme.shortpause = theme.shortpause
          settingsStore.visuals.theme.longpause = theme.longpause
          isUsingCustomTheme = false
        }"
      >
        <template #pre>
          <ThemePreview class="mx-auto" :theme="theme" />
        </template>
      </UiOption>
      <UiOption key="custom" :title="$t('settings.values.visuals.theme.custom')" class="text-center" :active="isUsingCustomTheme" @click="isUsingCustomTheme = true">
        <!-- <template #pre>
          <ThemePreview class="mx-auto mb-2" :theme="customTheme" />
        </template> -->
      </UiOption>
    </div>

    <template v-if="isUsingCustomTheme">
      <ColorChanger :input-theme="customTheme.work" @input="$newColor => customTheme.work = $newColor" />
      <ColorChanger :input-theme="customTheme.shortpause" @input="$newColor => customTheme.shortpause = $newColor" />
      <ColorChanger :input-theme="customTheme.longpause" @input="$newColor => customTheme.longpause = $newColor" />
    </template>
  </div>
</template>

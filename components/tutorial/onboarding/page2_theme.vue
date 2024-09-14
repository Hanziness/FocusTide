<script setup lang="ts">
import { IconBrightnessDown, IconDeviceWatch } from '@tabler/icons-vue'
import OnboardingPage from './onboardingPage.vue'
import OnboardingHeader from './onboardingHeader.vue'
import OptionGroup from '~~/components/base/optionGroup.vue'
import { TimerType, useSettings } from '~~/stores/settings'

const settingsStore = useSettings()

const currentTheme = computed(() => settingsStore.visuals.darkMode ? 'dark' : 'light')
const currentTimer = computed(() => settingsStore.currentTimer as string)
</script>

<template>
  <OnboardingPage>
    <OnboardingHeader :text="$t('tutorials.onboarding.pages.2.theme.heading')">
      <IconBrightnessDown :size="42" />
    </OnboardingHeader>

    <OptionGroup :value="currentTheme" :choices="{ 'light': 'Light', 'dark': 'Dark' }" translation-key="tutorials.onboarding.pages.2.theme.options" class="w-full" @input="(newValue) => settingsStore.visuals.darkMode = (newValue === 'dark')" />

    <OnboardingHeader :text="$t('tutorials.onboarding.pages.2.display.heading')">
      <IconDeviceWatch :size="42" />
    </OnboardingHeader>

    <OptionGroup :value="currentTimer" :choices="{ 'traditional': 'Traditional', 'approximate': 'Approximate', 'percentage': 'Percentage' }" translation-key="settings.values.currentTimer" class="w-full" @input="(newValue) => settingsStore.currentTimer = newValue as TimerType" />
  </OnboardingPage>
</template>

<script setup lang="ts">
import { IconClockPlay } from '@tabler/icons-vue'
import OnboardingPage from './onboardingPage.vue'
import OnboardingHeader from './onboardingHeader.vue'
import OptionGroup from '~~/components/base/optionGroup.vue'
import { useSettings } from '~~/stores/settings'

const settingsStore = useSettings()
</script>

<template>
  <OnboardingPage>
    <OnboardingHeader :text="$t('tutorials.onboarding.pages.1.heading')">
      <IconClockPlay :size="42" />
    </OnboardingHeader>

    <div class="text-center -mt-3 mb-4" v-text="$t('tutorials.onboarding.pages.1.text')" />

    <OptionGroup :value="settingsStore.getActiveSchedulePreset" :choices="{ 'default': 'default', 'easy': 'easy', 'advanced': 'advanced', 'workaholic': 'workaholic' }" class="w-full" translation-key="timerpreset" @input="(selectedPreset) => { settingsStore.applyPreset(selectedPreset) }" />
  </OnboardingPage>
</template>

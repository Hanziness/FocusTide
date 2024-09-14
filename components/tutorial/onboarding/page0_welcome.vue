<script setup lang="ts">
import { IconLanguage } from '@tabler/icons-vue'
import OnboardingPage from './onboardingPage.vue'
import OnboardingHeader from './onboardingHeader.vue'
import OptionGroup from '~~/components/base/optionGroup.vue'
import { useSettings } from '~~/stores/settings'

const settingsStore = useSettings()
</script>

<template>
  <OnboardingPage>
    <div class="py-3 flex gap-2 text-3xl flex-col md:flex-row justify-center items-center">
      <img width="40" height="40" class="w-10" src="/favicon.svg" role="note">
      <span v-text="$t('tutorials.onboarding.pages.0.title')" />
    </div>

    <div class="text-center -mt-3 mb-4" v-text="$t('tutorials.onboarding.pages.0.onboarding_invite')" />

    <OnboardingHeader :text="$t('tutorials.onboarding.pages.0.heading')">
      <IconLanguage :size="42" />
    </OnboardingHeader>

    <OptionGroup
      class="w-full"
      :choices="$languages"
      :value="settingsStore.lang"
      :override-text="{ title: $languages, description: {} }"
      @input="(newLang) => { settingsStore.lang = newLang }"
    />
  </OnboardingPage>
</template>

<script setup lang="ts">
import { IconHeartHandshake } from '@tabler/icons-vue'
import OnboardingHeader from './onboardingHeader.vue'
import OnboardingPage from './onboardingPage.vue'
</script>

<template>
  <OnboardingPage>
    <OnboardingHeader :text="$t('tutorials.onboarding.pages.support.heading')">
      <IconHeartHandshake :size="42" />
    </OnboardingHeader>

    <div class="text-center" v-text="$t('tutorials.onboarding.pages.support.text')" />

    <div class="text-center" v-text="$t('tutorials.onboarding.pages.support.hint')" />
  </OnboardingPage>
</template>

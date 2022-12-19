<script setup lang="ts">
import { ClockIcon, MugIcon, SettingsIcon, HeartIcon } from 'vue-tabler-icons'
import Button from '~~/components/base/uiButton.vue'
import PopupSheet from '@/components/base/popupSheet.vue'
import { ButtonImportance } from '../base/types/button'
import UiProgress from '~~/components/base/uiProgress.vue'

import OnboardingPage0 from '~~/components/tutorial/onboarding/page0_welcome.vue'
import OnboardingPage1 from '~~/components/tutorial/onboarding/page1.vue'
import OnboardingPage2 from '~~/components/tutorial/onboarding/page2_timers.vue'

const state = reactive({
  page: 0
})
</script>

<template>
  <popup-sheet class="fixed w-full max-w-2xl md:p-4" open>
    <div class="flex flex-col px-6 pt-6 pb-6 transition bg-surface-light dark:bg-surface-dark backdrop-blur-xl backdrop-brightness-200 backdrop-contrast-50 backdrop-saturate-50 bg-opacity-80 shadow-lg md:pb-3 rounded-t-2xl md:rounded-2xl">
      <UiProgress :progress="state.page / 4" class="mb-4" />
      <transition enter-active-class="transition" enter-from-class="translate-x-4 opacity-0" leave-to-class="-translate-x-4 opacity-0" leave-active-class="transition" mode="out-in">
        <!-- Welcome screen -->
        <OnboardingPage0 v-if="state.page === 0" />
        <OnboardingPage1 v-else-if="state.page === 1" />
        <OnboardingPage2 v-else-if="state.page === 2" />
      </transition>
      <div class="flex-grow h-4" />
      <div class="flex flex-col gap-2 mt-4 md:flex-row">
        <Button class="flex-grow w-full" default-style :importance="ButtonImportance.Tonal" @click="$emit('close')">
          {{ $t('tutorials.onboarding.buttons.close') }}
        </Button>
        <Button v-if="state.page === 0" class="flex-grow w-full" default-style :importance="ButtonImportance.Filled" @click="state.page = 1">
          {{ $t('tutorials.onboarding.buttons.start') }}
        </Button>
        <Button v-else-if="state.page < 4" class="flex-grow w-full" default-style :importance="ButtonImportance.Filled" @click="state.page += 1">
          {{ $t('tutorials.onboarding.buttons.next') }}
        </Button>
        <Button
          v-else-if="state.page === 4"
          link
          href="https://www.buymeacoffee.com/imreg?utm_source=anotherpomodoro&utm_medium=cta&utm_campaign=onboarding"
          target="_blank"
          :importance="ButtonImportance.Filled"
          class="flex-grow w-full"
          bg-class="bg-amber-300 border-amber-300"
        >
          {{ $t('tutorials.onboarding.buttons.support') }}
        </Button>
      </div>
    </div>
  </popup-sheet>
</template>

<template>
  <popup-sheet class="fixed w-full max-w-2xl md:p-4" open>
    <div class="flex flex-col px-6 pt-6 pb-6 transition bg-white shadow-lg md:pb-3 rounded-t-2xl md:rounded-2xl">
      <transition enter-active-class="transition" enter-from-class="translate-x-4 opacity-0" leave-to-class="-translate-x-4 opacity-0" leave-active-class="transition" mode="out-in">
        <!-- Welcome screen -->
        <div v-if="page === 0" key="page-index" class="flex flex-col">
          <div class="flex flex-col items-center gap-2 mb-2 text-center">
            <img src="/favicon.svg" class="p-3 bg-work bg-opacity-20 rounded-xl" width="72">
            <h2 class="mt-2 text-xl font-bold uppercase" v-text="$t('tutorials.onboarding.pages.0.title')" />
            <p v-text="$t('tutorials.onboarding.pages.0.text')" />
          </div>
        </div>
        <div v-else-if="page === 1" key="tutorial-1" class="flex flex-col items-center gap-2 text-center">
          <ClockIcon size="72" class="p-3 bg-work bg-opacity-20 rounded-xl" />
          <h2 class="mt-2 text-xl font-bold uppercase text-work" v-text="$t('tutorials.onboarding.pages.1.title')" />
          <p v-text="$t('tutorials.onboarding.pages.1.text')" />
        </div>
        <div v-else-if="page === 2" key="tutorial-2" class="flex flex-col items-center gap-2 text-center">
          <MugIcon size="72" class="p-3 bg-shortpause bg-opacity-20 rounded-xl" />
          <h2 class="mt-2 text-xl font-bold uppercase text-shortpause" v-text="$t('tutorials.onboarding.pages.2.title')" />
          <p v-text="$t('tutorials.onboarding.pages.2.text')" />
        </div>
        <div v-else-if="page === 3" key="tutorial-3" class="flex flex-col items-center gap-2 text-center">
          <SettingsIcon size="72" class="p-3 bg-longpause bg-opacity-20 rounded-xl" />
          <h2 class="mt-2 text-xl font-bold uppercase text-longpause" v-text="$t('tutorials.onboarding.pages.3.title')" />
          <p v-text="$t('tutorials.onboarding.pages.3.text')" />
        </div>
        <div v-else-if="page === 4" key="tutorial-4" class="flex flex-col items-center gap-2 text-center">
          <HeartIcon size="72" class="p-3 text-black bg-amber-400 rounded-xl" />
          <h2 class="mt-2 text-xl font-bold uppercase text-amber-500" v-text="$t('tutorials.onboarding.pages.support.title')" />
          <p v-text="$t('tutorials.onboarding.pages.support.text')" />
        </div>
      </transition>
      <div class="flex-grow h-4" />
      <div class="flex flex-col gap-2 mt-4 md:flex-row">
        <Button class="flex-grow w-full" default-style :importance="2" @click="$emit('close')">
          {{ $t('tutorials.onboarding.buttons.close') }}
        </Button>
        <Button v-if="page === 0" class="flex-grow w-full" default-style :importance="1" @click="page = 1">
          {{ $t('tutorials.onboarding.buttons.start') }}
        </Button>
        <Button v-else-if="page < 4" class="flex-grow w-full" default-style :importance="1" @click="page += 1">
          {{ $t('tutorials.onboarding.buttons.next') }}
        </Button>
        <Button
          v-else-if="page === 4"
          link
          href="https://www.buymeacoffee.com/imreg?utm_source=anotherpomodoro&utm_medium=cta&utm_campaign=onboarding"
          target="_blank"
          :importance="1"
          class="flex-grow w-full"
          bg-class="bg-amber-300 border-amber-300"
        >
          {{ $t('tutorials.onboarding.buttons.support') }}
        </Button>
      </div>
    </div>
  </popup-sheet>
</template>

<script>
import { ClockIcon, MugIcon, SettingsIcon, HeartIcon } from 'vue-tabler-icons'
import Button from '@/components/base/button.vue'
import PopupSheet from '@/components/base/popupSheet.vue'

export default {
  components: { Button, PopupSheet, ClockIcon, MugIcon, SettingsIcon, HeartIcon },
  data () {
    return {
      page: 0
    }
  }
}
</script>

<script setup lang="ts">
import { CoffeeIcon, BrandGithubIcon, BrandTwitterIcon, BrandFacebookIcon, BrandRedditIcon } from 'vue-tabler-icons'
import Button from '~~/components/base/button.vue'
import { AppPlatform } from '~~/platforms/platforms'
import { useMain } from '~~/stores/main'

const runtimeConfig = useRuntimeConfig()
const isMobile = computed(() => runtimeConfig.public.PLATFORM === AppPlatform.mobile)
const mainStore = useMain()
</script>

<template>
  <div class="flex flex-col items-center">
    <img src="/favicon.svg" width="64" height="64" class="inline-block p-2 mb-1 bg-red-200 rounded-lg">
    <div>
      <div class="inline-block text-2xl font-bold">
        AnotherPomodoro
      </div>
      <sup class="text-base" v-text="mainStore.version" />
    </div>
    <div v-text="$t('settings.about.madeby')" />

    <div class="flex flex-col items-center justify-center mt-8 text-center">
      <div class="mb-2">
        <span v-text="$t('settings.about.supportBody')" /> <span class="italic">&mdash; Imre</span>
      </div>
      <div v-if="isMobile" class="px-4 my-2 text-sm" v-text="$t('settings.about.mobileSupport')" />

      <!-- Support links -->
      <div class="flex flex-row flex-wrap justify-center gap-2 mt-3 text-center">
        <Button
          :importance="1"
          dark
          link
          href="https://www.github.com/Hanziness/AnotherPomodoro?utm_source=AnotherPomodoro&utm_medium=web&utm_content=settings"
          inner-class="flex flex-row items-center gap-1 text-slate-50 text-gray-50"
          bg-class="bg-slate-900 dark:bg-slate-700"
        >
          <BrandGithubIcon />
          <span v-text="$t('settings.about.source')" />
        </Button>
        <Button
          v-if="!isMobile"
          :importance="1"
          link
          dark
          href="https://www.buymeacoffee.com/imreg?utm_source=AnotherPomodoro&utm_medium=web&utm_content=settings"
          inner-class="flex flex-row items-center gap-1 text-black"
          bg-class="bg-yellow-300"
        >
          <CoffeeIcon />
          <span v-text="$t('settings.about.support')" />
        </Button>
        <Button
          v-else
          :importance="1"
          disabled
          inner-class="flex flex-row items-center gap-1 text-black"
          bg-class="bg-yellow-300"
        >
          <CoffeeIcon />
          <span v-text="$t('settings.about.support')" />
        </Button>
      </div>
      <!-- Share links -->
      <div class="my-2" v-text="$t('settings.about.share')" />
      <div class="flex flex-row items-center space-x-2 text-sm">
        <Button
          link
          circle
          dark
          :importance="1"
          href="https://twitter.com/AnotherPomodoro?utm_source=AnotherPomodoro&utm_medium=web&utm_content=settings"
          bg-class="bg-[#1da1f2]"
          inner-class="!p-4 text-slate-50"
        >
          <BrandTwitterIcon :aria-label="$t('index.alt.links.share.twitter')" size="24" />
        </Button>
        <Button
          link
          circle
          dark
          :importance="1"
          :href="`http://www.facebook.com/share.php?u=${runtimeConfig.public.URL}`"
          bg-class="bg-[#1877f2]"
          inner-class="!p-4 text-slate-50"
        >
          <BrandFacebookIcon :aria-label="$t('index.alt.links.share.facebook')" size="24" class="translate-x-[-1px]" />
        </Button>
        <Button
          link
          circle
          dark
          :importance="1"
          :href="`https://reddit.com/submit?url=${runtimeConfig.public.URL}`"
          bg-class="bg-[#ff4500]"
          inner-class="!p-4 text-slate-50"
        >
          <BrandRedditIcon :aria-label="$t('index.alt.links.share.reddit')" size="24" />
        </Button>
      </div>
    </div>
  </div>
</template>

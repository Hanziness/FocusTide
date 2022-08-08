<script setup lang="ts">
import { swPath } from 'virtual:pwa'
import { useSettings } from '~~/stores/settings'

useHead({
  link: [
    {
      rel: 'manifest',
      href: '/app_manifest.json'
    }
  ],
  script: [
    {
      src: `/${swPath}`
    }
  ]
})

const settingsStore = useSettings()
const isDarkMode = settingsStore.visuals.darkMode
</script>

<template>
  <NuxtLayout>
    <NuxtPage :class="{'dark': isDarkMode}" />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { swPath } from 'virtual:pwa'
import { useSettings } from '~~/stores/settings'

if (!process.server) {
  useHead({
    link: [
      {
        rel: 'manifest',
        href: '/app_manifest.json'
      },
      {
        rel: 'apple-touch-icon',
        href: '/icons/icon-apple-192.png'
      }
    ],
    meta: [
      { name: 'theme-color', content: '#F87171' }
    ]
  })

  onMounted(() => {
    if (typeof window !== 'undefined') {
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', function () {
          navigator.serviceWorker.register(`/${swPath}`)
        })
      }
    }
  })
}

const settingsStore = useSettings()
const isDarkMode = computed(() => settingsStore.visuals.darkMode)
</script>

<template>
  <NuxtLayout>
    <NuxtPage :class="{'dark': isDarkMode}" />
  </NuxtLayout>
</template>

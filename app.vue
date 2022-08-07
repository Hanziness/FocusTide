<script setup lang="ts">
import { swPath } from 'virtual:pwa'

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
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

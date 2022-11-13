<script setup>
import SettingsPanel from '@/components/settings/settingsPanel.vue'
import { useOpenPanels } from '~~/stores/openpanels'

const openPanels = useOpenPanels()
</script>

<template>
  <div class="relative w-screen h-screen">
    <transition enter-from-class="opacity-0" enter-active-class="transition duration-300" leave-to-class="opacity-0" leave-active-class="transition">
      <div v-show="openPanels.settings" class="fixed z-40 w-screen h-screen bg-black bg-opacity-30" />
    </transition>
    <transition enter-from-class="translate-x-32 opacity-0" enter-active-class="transition duration-300 ease-out" leave-to-class="scale-90 opacity-0" leave-active-class="transition ease-in">
      <SettingsPanel v-show="openPanels.settings" class="right-0" />
    </transition>
    <slot />
  </div>
</template>

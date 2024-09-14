<script setup lang="ts">
import type { Component, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import { IconBrandGithub as GitHub, IconCoffee as Coffee } from '@tabler/icons-vue'

const { t } = useI18n()

interface ConfigItem {
  url: string,
  icon: Component,
  class: string,
  darkClass: string,
  text: string
}

const config: Record<string, ConfigItem> = {
  github: {
    url: 'https://www.github.com/Hanziness/FocusTide',
    icon: GitHub,
    class: 'bg-black hover:bg-gray-700 active:bg-gray-800 text-white',
    darkClass: 'dark:bg-gray-700 dark:hover:bg-gray-600 dark:active:bg-gray-800',
    text: t('settings.about.source')
  },
  support: {
    url: 'https://www.buymeacoffee.com/imreg',
    icon: Coffee,
    class: 'bg-yellow-300 hover:bg-yellow-200 active:bg-yellow-400 text-black',
    darkClass: '',
    text: t('settings.about.support')
  }
}

const props = defineProps({
  type: {
    type: String as PropType<keyof typeof config>,
    required: true
  },
  showText: {
    type: Boolean,
    default: true
  },
  defaultClasses: {
    type: Boolean,
    default: false
  },
  defaultColours: {
    type: Boolean,
    default: true
  },
  defaultDarkColours: {
    type: Boolean,
    default: true
  },
  utmTags: {
    type: String,
    default: '?utm_source=FocusTide&utm_medium=web&utm_content=settings'
  },
  iconSize: {
    type: String,
    default: '24'
  }
})
</script>

<template>
  <a :href="config[props.type].url + props.utmTags" :class="['rounded-full flex flex-row items-center transition-colors', { 'px-3 py-2 space-x-1': defaultClasses, 'bg-black hover:bg-gray-700 active:bg-gray-800 text-white': defaultColours && type === 'github', 'bg-yellow-300 hover:bg-yellow-200 active:bg-yellow-400 text-black': defaultColours && type === 'support' }]">
    <component :is="config[props.type].icon" :size="props.iconSize" />
    <span v-if="props.showText" v-text="config[props.type].text" />
  </a>
</template>

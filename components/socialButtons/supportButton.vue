<template>
  <a :href="config[type].url + utmTags" :class="['rounded-full flex flex-row items-center transition-colors', { 'px-3 py-2 space-x-1': defaultClasses, 'bg-black hover:bg-gray-700 active:bg-gray-800 text-white': defaultColours && type === 'github', 'bg-yellow-300 hover:bg-yellow-200 active:bg-yellow-400 text-black': defaultColours && type === 'support' }]">
    <component :is="config[type].icon" :size="iconSize" />
    <span v-if="showText" v-text="config[type].text" />
  </a>
</template>

<script>
import { BrandGithubIcon, CoffeeIcon } from 'vue-tabler-icons'
export default {
  components: { GitHub: BrandGithubIcon, Coffee: CoffeeIcon },
  props: {
    type: {
      type: String,
      required: true,
      validator: (value) => {
        return ['github', 'support'].includes(value)
      }
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
      default: '?utm_source=AnotherPomodoro&utm_medium=web&utm_content=settings'
    },
    iconSize: {
      type: String,
      default: '24'
    }
  },
  data () {
    return {
      config: {
        github: {
          url: 'https://www.github.com/Hanziness/AnotherPomodoro',
          icon: 'GitHub',
          class: 'bg-black hover:bg-gray-700 active:bg-gray-800 text-white',
          darkClass: 'dark:bg-gray-700 dark:hover:bg-gray-600 dark:active:bg-gray-800',
          text: this.$t('settings.about.source')
        },
        support: {
          url: 'https://www.buymeacoffee.com/imreg',
          icon: 'Coffee',
          class: 'bg-yellow-300 hover:bg-yellow-200 active:bg-yellow-400 text-black',
          darkClass: '',
          text: this.$t('settings.about.support')
        }
      }
    }
  }
}
</script>

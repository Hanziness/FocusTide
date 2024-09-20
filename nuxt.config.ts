import * as fs from 'fs'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import VueI18nVitePlugin from '@intlify/unplugin-vue-i18n/vite'
import StylelintPlugin from 'vite-plugin-stylelint'
import { AppPlatform } from './platforms/platforms'
import type { IconResizerPluginOptions } from './modules/build/icon_resize'

const packageJson = fs.readFileSync('./package.json').toString()
const version = JSON.parse(packageJson).version || 0

const iconConfig: IconResizerPluginOptions = {
  outputFolder: 'icons',
  variants: [
    {
      src: '/public/icon.png',
      prefix: 'icon-maskable-',
      purpose: 'maskable',
      size: [64, 120, 144, 152, 192, 384, 512]
    },
    {
      src: '/public/icon_monochrome.png',
      prefix: 'icon-monochrome-',
      purpose: 'monochrome',
      size: [64, 120, 144, 152, 192, 384, 512]
    },
    {
      src: '/public/favicon.png',
      prefix: 'icon-base-',
      purpose: 'any',
      size: [64, 120, 144, 152, 192, 384, 512]
    },
    {
      src: '/public/icon.png',
      prefix: 'icon-apple-',
      purpose: 'any',
      bgColor: '#fee2e2',
      size: [192]
    }
  ]
}

const currentPlatform = import.meta.env.NUXT_PUBLIC_PLATFORM ?? AppPlatform.web
console.info(`Platform is ${currentPlatform}`)

export default defineNuxtConfig({
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  // mode: 'universal',

  runtimeConfig: {
    public: {
      PACKAGE_VERSION: version,
      PLATFORM: AppPlatform.web,
      URL: 'https://focustide.app'
    }
  },

  ssr: true,

  nitro: {
    prerender: {
      crawlLinks: false,
      routes: ['/']
    }
  },

  app: {
    head: {
      title: 'FocusTide',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' },
        { hid: 'description', name: 'description', content: 'Modern and open-source productivity timer, right from your browser. Built to be simple.' },
        { hid: 'keywords', name: 'keywords', content: 'pomodoro app, pomodoro, free, productivity tool, app, open-source, online timer, countdown timer, focus timer, pomodoro clock, no ads, productivity timer, todo list, task management, tomato timer, pwa' },
        { hid: 'twitter:title', name: 'twitter:title', content: 'FocusTide' },
        { hid: 'twitter:description', name: 'twitter:description', content: 'Modern and open-source productivity timer, right from your browser. Built to be simple.' },
        { hid: 'twitter:image', name: 'twitter:image', content: '/img/ogImage.png' },
        { hid: 'og:image', property: 'og:image', content: '/img/ogImage.png' },
        { hid: 'og:image:url', property: 'og:image:url', content: '/img/ogImage.png' },
        { hid: 'og:url', property: 'og:url', content: import.meta.env.URL ? import.meta.env.URL : 'https://another-pomodoro.netlify.app' }
      ],
      link: [
        { rel: 'icon', href: '/favicon.svg' }
      ]
    }
  },

  /*
  ** Global CSS
  */
  css: [
    '@/assets/scss/tailwind.scss',
    '@/assets/scss/transitions.scss',
    '@/assets/css/disable_tap_highlight.css'
  ],

  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: false,

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/google-fonts',
    '@pinia/nuxt',
    ['./modules/build/icon_resize', iconConfig],
    ['modules/build/pwa', { swPath: 'serviceworker.js' }]
  ],

  /*
  ** Google Fonts
  */
  googleFonts: {
    families: {
      Lexend: [400, 700]
    },
    display: 'swap',
    download: false
  },

  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  postcss: {
    plugins: {
      'postcss-import': {},
      'tailwindcss/nesting': {},
      tailwindcss: {},
      autoprefixer: {}
    }
  },

  watchers: {
    chokidar: {
      ignoreInitial: true
    }
  },

  build: {
    transpile: ['vue-i18n']
  },

  vite: {
    define: {
      // disable Options API support in Vue
      __VUE_OPTIONS_API__: false,
      __VUE_PROD_DEVTOOLS__: false,
      __VUE_I18N_LEGACY_API__: false,
      __VUE_I18N_FULL_INSTALL__: false,
      __INTLIFY_JIT_COMPILATION__: true,
      __INTLIFY_DROP_MESSAGE_COMPILER__: true
    },
    build: {
      manifest: false,
      ssrManifest: false
    },
    plugins: [
      StylelintPlugin(),
      VueI18nVitePlugin({
        runtimeOnly: true,
        fullInstall: false,
        compositionOnly: true,
        dropMessageCompiler: true,
        ssr: true,
        include: [
          resolve(dirname(fileURLToPath(import.meta.url)), './i18n/*.json')
        ]
      })
    ]
  },

  compatibilityDate: '2024-09-14'
})

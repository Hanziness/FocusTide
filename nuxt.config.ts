// import colors from 'vuetify/es5/util/colors'
// import { join } from 'path'

import * as fs from 'fs'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import { defineNuxtConfig } from 'nuxt'
import VueI18nVitePlugin from '@intlify/unplugin-vue-i18n/vite'
import VitePWAGenerator from './modules/build/pwa'
import IconResizer from './modules/build/icon_resize'

const packageJson = fs.readFileSync('./package.json').toString()
const version = JSON.parse(packageJson).version || 0

const iconConfig = {
  outputFolder: 'icons',
  sizes: [64, 120, 144, 152, 192, 384, 512],
  variants: [
    {
      src: '/public/icon.png',
      prefix: 'icon-maskable-',
      purpose: 'maskable'
    },
    {
      src: '/public/icon_monochrome.png',
      prefix: 'icon-monochrome-',
      purpose: 'monochrome'
    },
    {
      src: '/public/favicon.png',
      prefix: 'icon-base-',
      purpose: 'any'
    }
  ]
}

export default defineNuxtConfig({
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  // mode: 'universal',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */

  runtimeConfig: {
    public: {
      PACKAGE_VERSION: version
    }
  },

  target: 'static',
  ssr: false,

  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    titleTemplate: '%s',
    title: 'AnotherPomodoro',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      { hid: 'keywords', name: 'keywords', content: 'pomodoro app, pomodoro, free, productivity tool, app, open-source, online timer, countdown timer, focus timer, pomodoro clock, no ads, productivity timer, todo list, task management, tomato timer, pwa' },
      { hid: 'twitter:title', name: 'twitter:title', content: 'AnotherPomodoro' },
      { hid: 'twitter:description', name: 'twitter:description', content: process.env.npm_package_description || '' },
      { hid: 'twitter:image', name: 'twitter:image', content: '/img/ogImage.png' },
      { hid: 'og:image', property: 'og:image', content: '/img/ogImage.png' },
      { hid: 'og:image:url', property: 'og:image:url', content: '/img/ogImage.png' },
      { hid: 'og:url', property: 'og:url', content: process.env.URL ? process.env.URL : 'https://another-pomodoro.netlify.app' }
    ],
    link: [
      { rel: 'icon', href: '/favicon.svg' }
      // { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
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
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  // plugins: [
  //   // '@/plugins/notifications.client.js',
  //   '@/plugins/store-persist.client.js',
  //   '@/plugins/store-i18n-watch.client.js'
  // ],
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
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    '@pinia/nuxt'
    // '@nuxtjs/sitemap'
  ],

  /** Modules that need to be transpiled */
  // transpileDependencies: ['vuex-persist'],

  /** ESLint module settings */
  eslint: {
    // Caching is disabled to prevent constant Nuxt rebuilds when there are warnings
    cache: false
  },

  generate: {
    // Generate fallback pages (makes error pages work on Netlify, too)
    fallback: '404.html'
  },

  /**
   * i18n settings
   */
  i18n: {
    locales: [
      { code: 'en', name: 'English', iso: 'en-US', file: 'en.json' },
      { code: 'hu', name: 'Magyar', iso: 'hu-HU', file: 'hu.json' },
      { code: 'hr', name: 'Hrvatski', iso: 'hr-HR', file: 'hr.json' },
      { code: 'fr', name: 'Français', iso: 'fr-FR', file: 'fr.json' }
    ],
    defaultLocale: 'en',
    lazy: true,
    langDir: 'i18n/',
    parsePages: false,
    vueI18n: {
      fallbackLocale: 'en'
    },
    // vuex: false,
    // Routes generation strategy, can be set to one of the following:
    // - 'no_prefix': routes won't be prefixed
    // - 'prefix_except_default': add locale prefix for every locale except default
    // - 'prefix': add locale prefix for every locale
    // - 'prefix_and_default': add locale prefix for every locale and default
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      // If enabled, a cookie is set once a user has been redirected to his
      // preferred language to prevent subsequent redirections
      // Set to false to redirect every time
      useCookie: true,
      // Set to override the default domain of the cookie. Defaults to host of the site.
      cookieDomain: null,
      // Cookie name
      cookieKey: 'lang',
      // Set to always redirect to value stored in the cookie, not just once
      alwaysRedirect: false,
      // If no locale for the browsers locale is a match, use this one as a fallback
      fallbackLocale: 'en'
    }
  },

  // sitemap: {
  //   hostname: process.env.URL ? process.env.URL : 'https://another-pomodoro.netlify.app'
  // },

  /*
  ** Google Fonts
  */
  googleFonts: {
    families: {
      Poppins: [400, 700]
    },
    display: 'swap'
    // download: true
  },

  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          'postcss-import': {},
          'tailwindcss/nesting': {},
          tailwindcss: {},
          autoprefixer: {}
        }
      }
    }
  },

  watchers: {
    chokidar: {
      ignoreInitial: true
      // ignored: ['**/node_modules', '**/.git', '**/.nuxt']
    },
    webpack: {
      // ignored: ['**/node_modules', '**/.git', '**/.nuxt']
    }
  },

  vite: {
    build: {
      manifest: false,
      ssrManifest: false
    },
    plugins: [
      VueI18nVitePlugin({
        // TODO this is needed to make lazy-loading work properly
        runtimeOnly: false,
        fullInstall: false,
        include: [
          resolve(dirname(fileURLToPath(import.meta.url)), './i18n/en.json')
        ]
      }),
      VitePWAGenerator({ swPath: 'serviceworker.js' }),
      IconResizer(iconConfig)
    ]
  }
})

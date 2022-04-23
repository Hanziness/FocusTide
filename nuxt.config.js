// import colors from 'vuetify/es5/util/colors'
// import { join } from 'path'

import fs from 'fs'
import path from 'path'
import { defineNuxtConfig } from '@nuxt/bridge'
import workbox from 'workbox-webpack-plugin'

const packageJson = fs.readFileSync('./package.json')
const version = JSON.parse(packageJson).version || 0

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
  bridge: false,

  env: {
    PACKAGE_VERSION: version
  },

  target: 'static',
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
  plugins: [
    { src: '@/plugins/add-service-worker.client.js', mode: 'client' },
    '@/plugins/i18nlanguages.js',
    { src: '@/plugins/notifications.client.js', ssr: false },
    { src: '@/plugins/vuex-persist.client.js', ssr: false },
    { src: '@/plugins/i18nwatcher.client.js', ssr: false }
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: false,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxt/postcss8',
    '@nuxtjs/google-fonts',
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    '@nuxt/image',
    '@nuxtjs/pwa'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/i18n',
    '@nuxtjs/sitemap'
  ],

  /** Modules that need to be transpiled */
  transpileDependencies: ['vuex-persist'],

  /** ESLint module settings */
  eslint: {
    // Caching is disabled to prevent constant Nuxt rebuilds when there are warnings
    cache: false
  },

  generate: {
    // Generate fallback pages (makes error pages work on Netlify, too)
    fallback: true
  },

  /**
   * PWA module settings
   */
  pwa: {
    meta: {
      name: 'AnotherPomodoro',
      author: 'Imre Gera',
      description: 'Modern and customisable productivity timer, right in your browser!',
      theme_color: '#F87171',
      lang: 'en',
      twitterCard: 'summary_large_image'
    },
    icon: {
      fileName: 'icon.png',
      purpose: ['maskable', 'any'],
      plugin: false
    },
    manifest: {
      name: 'AnotherPomodoro: modern & simple Pomodoro app',
      short_name: 'AnotherPomodoro',
      start_url: '/timer?standalone=true',
      orientation: 'any',
      categories: ['productivity', 'utilities'],
      display: 'standalone',
      screenshots: [
        {
          src: '/assets/img/screenshots/stores/mobile_0.jpg',
          sizes: '1520x3040',
          type: 'image/jpg',
          platform: 'narrow',
          label: 'A pomodoro timer running in the app'
        },
        {
          src: '/assets/img/screenshots/stores/mobile_1.jpg',
          sizes: '1520x3040',
          type: 'image/jpg',
          platform: 'narrow',
          label: 'AnotherPomdoro comes with a built-in to-do manager'
        },
        {
          src: '/assets/img/screenshots/stores/mobile_2.jpg',
          sizes: '1520x3040',
          type: 'image/jpg',
          platform: 'narrow',
          label: 'The timer is fully customizable: the timer\'s looks, the schedules and there\'s also a dark mode.'
        },
        {
          src: '/assets/img/screenshots/stores/mobile_3.jpg',
          sizes: '1520x3040',
          type: 'image/jpg',
          platform: 'narrow',
          label: 'Every feature is optional in AnotherPomodoro. If all you need is a simple timer, it can do that, too.'
        },
        {
          src: '/assets/img/screenshots/stores/mobile_4.jpg',
          sizes: '1520x3040',
          type: 'image/jpg',
          platform: 'narrow',
          label: 'Two screenshots showing the "approximate" and "percentage" timer styles.'
        }
      ]
    },
    workbox: process.env.NEW_SERVICE_WORKER
      ? false
      : {
          preCaching: ['/favicon.svg']
        }
  },

  /**
   * i18n settings
   */
  i18n: {
    locales: [
      { code: 'en', name: 'English', iso: 'en-US', file: 'en.js' },
      { code: 'hu', name: 'Magyar', iso: 'hu-HU', file: 'hu.js' },
      { code: 'hr', name: 'Hrvatski', iso: 'hr-HR', file: 'hr.js' }
    ],
    defaultLocale: 'en',
    lazy: true,
    langDir: 'i18n/',
    parsePages: false,
    vueI18n: {
      fallbackLocale: 'en'
    },
    vuex: false,
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

  sitemap: {
    hostname: process.env.URL ? process.env.URL : 'https://another-pomodoro.netlify.app'
  },

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
    corejs: 3,
    postcss: {
      plugins: {
        'postcss-import': {},
        'tailwindcss/nesting': {},
        tailwindcss: {},
        autoprefixer: {}
      }
    },

    extend (config, { isDev, isClient }) {
      if (process.env.NEW_SERVICE_WORKER && !isDev && isClient) {
        console.info('Adding custom service worker generator') // eslint-disable-line no-console
        config.plugins.push(
          new workbox.GenerateSW({
            cleanupOutdatedCaches: true,
            clientsClaim: true,
            navigationPreload: true,
            runtimeCaching: [{
              urlPattern: '/_nuxt/.*',
              handler: 'CacheFirst'
            },
            {
              urlPattern: '/.*',
              handler: 'NetworkFirst'
            }],
            chunks: ['pages/timer', 'settings'],
            skipWaiting: true,
            // swDest: 'sw/service-worker.js'
            swDest: path.resolve(__dirname, 'static', 'service-worker.js'),
            sourcemap: false
          })
        )
      }
    }
  },
  watchers: {
    chokidar: {
      ignoreInitial: true,
      ignored: ['**/node_modules', '**/.git', '**/.nuxt']
    },
    webpack: {
      ignored: ['**/node_modules', '**/.git', '**/.nuxt']
    }
  }
})

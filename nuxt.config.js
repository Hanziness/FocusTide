// import colors from 'vuetify/es5/util/colors'
// import { join } from 'path'

import fs from 'fs'
import { defineNuxtConfig } from '@nuxt/bridge'

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
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      { hid: 'keywords', name: 'keywords', content: 'pomodoro app, pomodoro, free, productivity tool, app, open-source, online timer, countdown timer, focus timer, pomodoro clock, no ads' },
      { hid: 'twitter:title', name: 'twitter:title', content: 'AnotherPomodoro' },
      { hid: 'twitter:description', name: 'twitter:description', content: process.env.npm_package_description || '' },
      { hid: 'twitter:image', name: 'twitter:image', content: '/img/ogImage.jpg' },
      { hid: 'og:image', property: 'og:image', content: '/img/ogImage.jpg' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/tailwind.css',
    // '@/assets/global.scss',
    '@/assets/transitions.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    '@/plugins/dayjs.js',
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
      description: 'Free and open-source Pomodoro app for everyone, right from your browser!',
      theme_color: '#FF6B6B',
      lang: 'en',
      twitterCard: 'summary_large_image'
    },
    icon: {
      fileName: 'icon.png',
      purpose: ['maskable', 'any']
    },
    manifest: {
      name: 'AnotherPomodoro - free & modern Pomodoro app',
      short_name: 'AnotherPomodoro',
      start_url: '/timer?standalone=true'
    }
  },

  /**
   * i18n settings
   */
  i18n: {
    locales: [
      { code: 'en', name: 'English', iso: 'en-US', file: 'en.js' },
      { code: 'hu', name: 'Magyar', iso: 'hu-HU', file: 'hu.js' }
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
    hostname: process.env.hostname ? process.env.hostname : 'https://another-pomodoro.netlify.app'
  },

  /*
  ** Google Fonts
  */
  googleFonts: {
    families: {
      Poppins: [400, 700]
      // 'Source Sans Pro': [700]
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
    }
    // babel: {
    //   presets ({ isServer }) {
    //     const envTargets = {
    //       client: { browsers: ['last 2 versions'] },
    //       server: { node: 'current' }
    //     }
    //     const env = isServer ? 'server' : 'client'

    //     return [
    //       [
    //         '@nuxt/babel-preset-app',
    //         {
    //           targets: envTargets[env],
    //           corejs: { version: 3 }
    //         }
    //       ]
    //     ]
    //   }
    // }
  }
})

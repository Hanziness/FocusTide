// import colors from 'vuetify/es5/util/colors'
// import { join } from 'path'

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
      size: [64, 120, 144, 152, 192, 384, 512],
    },
    {
      src: '/public/icon_monochrome.png',
      prefix: 'icon-monochrome-',
      purpose: 'monochrome',
      size: [64, 120, 144, 152, 192, 384, 512],
    },
    {
      src: '/public/favicon.png',
      prefix: 'icon-base-',
      purpose: 'any',
      size: [64, 120, 144, 152, 192, 384, 512],
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

const currentPlatform = process.env.NUXT_PUBLIC_PLATFORM ?? AppPlatform.web
console.info(`Platform is ${currentPlatform}`)

// function getIgnoredFiles () { }

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
      PACKAGE_VERSION: version,
      PLATFORM: AppPlatform.web,
      URL: 'https://focustide.app'
    }
  },

  ssr: true,

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
        { hid: 'og:url', property: 'og:url', content: process.env.URL ? process.env.URL : 'https://another-pomodoro.netlify.app' }
      ],
      link: [
        { rel: 'icon', href: '/favicon.svg' }
      // { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
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
    // '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@pinia/nuxt',
    ['./modules/build/icon_resize', iconConfig],
    ['modules/build/pwa', { swPath: 'serviceworker.js' }]
    // '@nuxtjs/sitemap'
  ],

  /** Modules that need to be transpiled */
  // transpileDependencies: ['vuex-persist'],

  /** ESLint module settings */
  // eslint: {
  //   // Caching is disabled to prevent constant Nuxt rebuilds when there are warnings
  //   cache: false
  // },

  generate: {
    // Generate fallback pages (makes error pages work on Netlify, too)
    // fallback: currentPlatform === 'web' ? '404.html' : undefined,
    // crawler: currentPlatform === 'web',

    // Exclude home and setup pages on mobile platforms
    exclude: currentPlatform === 'mobile' ? ['/', '/setup'] : []
    // manifest: false
  },

  /**
   * i18n settings
   */
  // i18n: {
  //   locales: [
  //     { code: 'en', name: 'English', iso: 'en-US', file: 'en.json' },
  //     { code: 'hu', name: 'Magyar', iso: 'hu-HU', file: 'hu.json' },
  //     { code: 'hr', name: 'Hrvatski', iso: 'hr-HR', file: 'hr.json' },
  //     { code: 'fr', name: 'Français', iso: 'fr-FR', file: 'fr.json' }
  //   ],
  //   defaultLocale: 'en',
  //   lazy: true,
  //   langDir: 'i18n/',
  //   parsePages: false,
  //   vueI18n: {
  //     fallbackLocale: 'en'
  //   },
  //   // vuex: false,
  //   // Routes generation strategy, can be set to one of the following:
  //   // - 'no_prefix': routes won't be prefixed
  //   // - 'prefix_except_default': add locale prefix for every locale except default
  //   // - 'prefix': add locale prefix for every locale
  //   // - 'prefix_and_default': add locale prefix for every locale and default
  //   strategy: 'no_prefix',
  //   detectBrowserLanguage: {
  //     // If enabled, a cookie is set once a user has been redirected to his
  //     // preferred language to prevent subsequent redirections
  //     // Set to false to redirect every time
  //     useCookie: true,
  //     // Set to override the default domain of the cookie. Defaults to host of the site.
  //     cookieDomain: null,
  //     // Cookie name
  //     cookieKey: 'lang',
  //     // Set to always redirect to value stored in the cookie, not just once
  //     alwaysRedirect: false,
  //     // If no locale for the browsers locale is a match, use this one as a fallback
  //     fallbackLocale: 'en'
  //   }
  // },

  // sitemap: {
  //   hostname: process.env.URL ? process.env.URL : 'https://another-pomodoro.netlify.app'
  // },

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
      // ignored: ['**/node_modules', '**/.git', '**/.nuxt']
    },
    webpack: {
      // ignored: ['**/node_modules', '**/.git', '**/.nuxt']
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
      }),
      // ServiceWorkerGenerator({ swPath: 'serviceworker.js' })
    ]
  },

  compatibilityDate: '2024-09-14'
})
// import colors from 'vuetify/es5/util/colors'
import { join } from 'path'

export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  // mode: 'universal',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
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
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    // 'normalize.css/normalize.css',
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
    '@nuxtjs/google-fonts',
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/pwa'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    'nuxt-i18n'
    // 'portal-vue/nuxt'
  ],

  /** Modules that need to be transpiled */
  transpileDependencies: ['vuex-persist'],

  /**
   * PWA module settings
   */
  pwa: {
    meta: {
      name: 'AnotherPomodoro',
      author: 'Imre Gera',
      description: 'Free and open-source Pomodoro app for everyone',
      theme_color: '#FF6B6B',
      lang: 'en'
    }
  },

  /**
   * i18n settings
   */
  i18n: {
    locales: [
      { code: 'en', iso: 'en-US', file: 'en.js' },
      { code: 'hu', iso: 'hu-HU', file: 'hu.js' }
    ],
    defaultLocale: 'en',
    lazy: true,
    langDir: 'i18n/',
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
      useCookie: false,
      // Set to override the default domain of the cookie. Defaults to host of the site.
      cookieDomain: null,
      // Cookie name
      cookieKey: 'i18n_redirected',
      // Set to always redirect to value stored in the cookie, not just once
      alwaysRedirect: false,
      // If no locale for the browsers locale is a match, use this one as a fallback
      fallbackLocale: 'en'
    }
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
    babel: {
      presets ({ envName }) {
        const envTargets = {
          client: { browsers: ['last 2 versions'], ie: 11 },
          server: { node: 'current' }
        }
        return [
          [
            '@nuxt/babel-preset-app',
            {
              targets: envTargets[envName],
              corejs: { version: 3 }
            }
          ]
        ]
      }
    },
    extractCSS: {
      ignoreOrder: true
    },
    optimizeCSS: {},
    postcss: {
      plugins: {
        tailwindcss: join(__dirname, 'tailwind.config.js'),
        cssnano: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true }
            }
          ]
        }
      }
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          styles: {
            name: true,
            priority: 10,
            test: /\.(s?css|vue)$/,
            chunks: 'all',
            minSize: 10000,
            reuseExistingChunk: true
          }
        }
      }
    },
    extend (config, ctx) {
      // enable source maps (inline on the server!)
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
      }
    }
  }
}

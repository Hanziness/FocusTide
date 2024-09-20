import { join } from 'node:path'
import { readdirSync, rmSync, existsSync } from 'fs'
import { defineNuxtModule } from '@nuxt/kit'
import { generateSW } from 'workbox-build'

interface PWAModuleOptions {
    swPath: string
}

const outputPath = 'serviceworker'

export default defineNuxtModule({
  setup (moduleOptions: PWAModuleOptions, nuxt) {
    nuxt.hook('nitro:config', async (nitroConfig) => {
      console.log(moduleOptions)

      const outputDir = join('.build', outputPath)

      if (existsSync(outputDir)) {
        readdirSync(outputDir).filter(file => file.startsWith('workbox-')).forEach((file) => {
          console.info(`Removing ${join(outputDir, file)}`)
          rmSync(join(outputDir, file))
        })
      }

      await generateSW({
        swDest: join(outputDir, moduleOptions.swPath),
        globDirectory: '.output/public',
        globPatterns: [
          '!(_nuxt)/**/*.{js,json,mjs,css,html,svg,woff2,mp3}',
          '*.{html,svg,png}',
          '_nuxt/*.{js,css}'
        ],
        sourcemap: false,
        navigationPreload: true,
        runtimeCaching: [
          {
            urlPattern: ({ url }) => /\.(js|json|css)$/.exec(url.pathname) !== null,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'code',
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: ({ url }) => /\.(jpg|png|jpeg|svg|mp3)$/.exec(url.pathname) !== null,
            handler: 'CacheFirst',
            options: {
              cacheName: 'assets',
              cacheableResponse: {
                statuses: [200]
              }
            }
          },
          {
            urlPattern: ({ url }) => /\.(woff2)$/.exec(url.pathname) !== null,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'fonts',
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: ({ url }) => ['', '/', '/index', '/index.html'].includes(url.pathname),
            handler: 'NetworkFirst',
            options: {
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      })
      console.info(`Generated service worker at ${join(outputDir, moduleOptions.swPath)}`)

      nitroConfig.publicAssets ||= []
      nitroConfig.publicAssets.push({
        baseURL: '/',
        dir: join(nuxt.options.rootDir, '.build', outputPath),
        maxAge: 60 * 60 * 24 * 365 // 1 year
      })
    })
  }
})

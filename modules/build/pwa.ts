import path from 'path'
import { rmSync, readdirSync } from 'fs'
import { generateSW } from 'workbox-build'
import { type PluginOption } from 'vite'

interface PWAModuleOptions {
  swPath: string
}

export default function VitePWAGenerator (moduleOptions: PWAModuleOptions): PluginOption {
  const virtualModuleId = 'virtual:pwa'
  const resolvedVirtualModuleId = '\0' + virtualModuleId

  const { swPath = 'sw.js' } = moduleOptions

  return {
    name: 'Workbox installer',
    resolveId (id: string) {
      // register virtual module
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },
    load (id: string) {
      // return virtual module
      if (id === resolvedVirtualModuleId) {
        return `export const swPath = '${swPath}'`
      }
    },
    async configResolved (config) {
      // Do not emit anything if we're bundling the server
      if (config.build.outDir.endsWith('/server')) {
        return
      }

      const outputDir = config.publicDir
      readdirSync(outputDir).filter(file => file.startsWith('workbox-')).forEach((file) => {
        console.info(`Removing ${path.join(outputDir, file)}`)
        rmSync(path.join(outputDir, file))
      })

      await generateSW({
        swDest: path.join(outputDir, moduleOptions.swPath),
        globDirectory: outputDir,
        globPatterns: [
          '**/*.{js,json,mjs,css,html,svg,woff2}'
        ],
        sourcemap: false,
        navigationPreload: true,
        runtimeCaching: [
          {
            urlPattern: ({ url }) => /\.(js|json|css)$/.exec(url.pathname) !== null,
            handler: 'CacheFirst',
            options: {
              cacheName: 'code',
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: ({ url }) => /\.(jpg|png|jpeg|svg)$/.exec(url.pathname) !== null,
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
      console.info(`Generated service worker at ${path.join(outputDir, moduleOptions.swPath)}`)
    }
  }
}

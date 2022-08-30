import path from 'path'
import { PluginOption } from 'vite'
import { generateSW } from 'workbox-build'

interface PWAModuleOptions {
  swPath: string
}

export default function VitePWAGenerator (moduleOptions: PWAModuleOptions): PluginOption {
  const virtualModuleId = 'virtual:pwa'
  const resolvedVirtualModuleId = '\0' + virtualModuleId

  const { swPath = 'sw.js' } = moduleOptions

  return {
    name: 'Workbox installer',
    resolveId (id) {
      // register virtual module
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },
    load (id) {
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

      await generateSW({
        swDest: path.join(config.build.outDir, swPath),
        globDirectory: config.build.outDir,
        globPatterns: [
          '**/*.{js,mjs,css,html}'
        ],
        sourcemap: false,
        runtimeCaching: [
          {
            urlPattern: '*.js',
            handler: 'StaleWhileRevalidate',
            options: {
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: '*.css',
            handler: 'StaleWhileRevalidate',
            options: {
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: '*.{jpg,png,jpeg}',
            handler: 'CacheFirst'
          }
        ]
      })
      console.info(`Generated service worker at ${path.join(config.build.outDir, swPath)}`)
    }
  }
}

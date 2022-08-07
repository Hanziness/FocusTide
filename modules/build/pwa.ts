import path from 'path'
import { PluginOption } from 'vite'
import { generateSW } from 'workbox-build'

export default function VitePWAGenerator ({ swPath = 'sw.js' }): PluginOption {
  const virtualModuleId = 'virtual:pwa'
  const resolvedVirtualModuleId = '\0' + virtualModuleId

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
      console.log(config.build.outDir)
      await generateSW({
        swDest: path.join(config.build.outDir, swPath),
        globDirectory: config.build.outDir,
        globPatterns: [
          '**/*.{js,mjs,css,html}'
        ],
        clientsClaim: true,
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
      console.info(`Generated service worker at ${path.join(config.build.outDir, 'sw.js')}`)
    }
  }
}

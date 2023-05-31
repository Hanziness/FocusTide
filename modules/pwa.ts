import path from 'path'
import { rmSync, readdirSync } from 'fs'
import { generateSW } from 'workbox-build'
import { defineNuxtModule } from '@nuxt/kit'

interface PWAModuleOptions {
  swPath: string
}

export default defineNuxtModule<PWAModuleOptions>({
  defaults: {
    swPath: 'serviceworker.js'
  },
  async setup (resolvedOptions, nuxt) {
    const outputDir = nuxt.options.dir.public
    readdirSync(outputDir).filter(file => file.startsWith('workbox-')).forEach((file) => {
      console.info(`Removing ${path.join(outputDir, file)}`)
      rmSync(path.join(outputDir, file))
    })

    await generateSW({
      swDest: path.join(outputDir, resolvedOptions.swPath),
      globDirectory: outputDir,
      globPatterns: [
        '**/*.{js,json,mjs,css,html}'
      ],
      sourcemap: false,
      navigationPreload: true,
      runtimeCaching: [
        {
          urlPattern: ({ url }) => /\.(js|json|css)/.exec(url.pathname) !== null,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        },
        {
          urlPattern: /.*\.(jpg|png|jpeg|svg)/,
          handler: 'CacheFirst'
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
    console.info(`Generated service worker at ${path.join(outputDir, resolvedOptions.swPath)}`)
  }
})

// export default function VitePWAGenerator (moduleOptions: PWAModuleOptions): PluginOption {
//   const virtualModuleId = 'virtual:pwa'
//   const resolvedVirtualModuleId = '\0' + virtualModuleId

//   const { swPath = 'sw.js' } = moduleOptions

//   return {
//     name: 'Workbox installer',
//     resolveId (id) {
//       // register virtual module
//       if (id === virtualModuleId) {
//         return resolvedVirtualModuleId
//       }
//     },
//     load (id) {
//       // return virtual module
//       if (id === resolvedVirtualModuleId) {
//         return `export const swPath = '${swPath}'`
//       }
//     },
//     async configResolved (config) {
//       // Do not emit anything if we're bundling the server
//       if (config.build.outDir.endsWith('/server')) {
//         return
//       }

//       await generateSW({
//         swDest: path.join(config.build.outDir, swPath),
//         globDirectory: config.build.outDir,
//         globPatterns: [
//           '**/*.{js,mjs,css,html}'
//         ],
//         sourcemap: false,
//         navigationPreload: true,
//         runtimeCaching: [
//           {
//             urlPattern: '*.js',
//             handler: 'StaleWhileRevalidate',
//             options: {
//               cacheableResponse: {
//                 statuses: [0, 200]
//               }
//             }
//           },
//           {
//             urlPattern: '*.css',
//             handler: 'StaleWhileRevalidate',
//             options: {
//               cacheableResponse: {
//                 statuses: [0, 200]
//               }
//             }
//           },
//           {
//             urlPattern: '*.{jpg,png,jpeg}',
//             handler: 'CacheFirst'
//           },
//           {
//             urlPattern: ({ url }) => ['/', '/index', '/index.html'].includes(url.pathname),
//             handler: 'NetworkFirst',
//             options: {
//               cacheableResponse: {
//                 statuses: [0, 200]
//               }
//             }
//           }
//         ]
//       })
//       console.info(`Generated service worker at ${path.join(config.build.outDir, swPath)}`)
//     }
//   }
// }

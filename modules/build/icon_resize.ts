import { join } from 'path'
import { mkdirSync, existsSync } from 'fs'
import sharp from 'sharp'
import { PluginOption } from 'vite'

interface IconVariant {
  src: string,
  prefix: string,
  purpose: string
  bgColor?: string
}

interface IconResizerPluginOptions {
  sizes: number[],
  outputFolder: string,
  variants: IconVariant[],
}

export default function IconResizer (moduleOptions: IconResizerPluginOptions): PluginOption {
  return {
    name: 'icon-generator',

    async configResolved (config) {
      // Do not emit anything if we're bundling the server
      if (config.build.outDir.endsWith('/server')) {
        return
      }

      await moduleOptions.variants.map((iconConfig): Promise<unknown> => {
        if (!iconConfig.src) {
          return new Promise((_resolve, reject) => reject(new Error('No source file specified')))
        }

        const outputFolder = join(config.build.outDir, moduleOptions.outputFolder)

        if (!existsSync(outputFolder)) {
          mkdirSync(outputFolder, { recursive: true })
        }

        console.info(`Generating ${iconConfig.src} into sizes [${moduleOptions.sizes.join(', ')}] -> ${moduleOptions.outputFolder}`)

        const promises = []
        for (const size of moduleOptions.sizes) {
          const outputFileName = `${iconConfig.prefix}${size}.png`
          let basePromise = sharp(join(config.root, iconConfig.src)).resize(size)

          if (iconConfig.bgColor) {
            basePromise = basePromise.flatten({ background: iconConfig.bgColor })
          }

          promises.push(basePromise
            .toFile(join(outputFolder, outputFileName))
            .then(() => console.info(`Written ${outputFileName}`))
          )
        }

        return Promise.all(promises)
      })
    }
  }
}

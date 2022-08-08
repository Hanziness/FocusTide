import { join } from 'path'
import { mkdirSync, existsSync } from 'fs'
import sharp from 'sharp'
import { PluginOption } from 'vite'

interface IconVariant {
  src: string,
  prefix: string,
  purpose: string
}

interface IconResizerPluginOptions {
  sizes: number[],
  outputFolder: string,
  variants: IconVariant[]
}

export default function IconResizer (moduleOptions: IconResizerPluginOptions): PluginOption {
  return {
    name: 'icon-generator',
    async configResolved (config) {
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
          promises.push(sharp(join(config.root, iconConfig.src))
            .resize(size)
            .toFile(join(outputFolder, outputFileName))
            .then(() => console.info(`Written ${outputFileName}`))
          )
        }

        return Promise.all(promises)
      })
    }
  }
}

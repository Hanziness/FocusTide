import { defineNuxtModule } from '@nuxt/kit'
import { join } from 'node:path'
import { existsSync, mkdirSync } from 'fs'
import sharp from 'sharp'

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

export default defineNuxtModule({
    setup(moduleOptions: IconResizerPluginOptions, nuxt) {
        nuxt.hook('nitro:config', async (nitroConfig) => {
            // generate icons into temp folder
            moduleOptions.variants.map((iconConfig): Promise<unknown> => {
                if (!iconConfig.src) {
                    return new Promise((_resolve, reject) => reject(new Error('No source file specified')))
                }

                const outputFolder = join('.build', moduleOptions.outputFolder)

                if (!existsSync(outputFolder)) {
                    mkdirSync(outputFolder, { recursive: true })
                }

                console.info(`Generating ${iconConfig.src} into sizes [${moduleOptions.sizes.join(', ')}] -> ${moduleOptions.outputFolder}`)

                const promises = []
                for (const size of moduleOptions.sizes) {
                    const outputFileName = `${iconConfig.prefix}${size}.png`
                    let basePromise = sharp(join(nuxt.options.rootDir, iconConfig.src)).resize(size)

                    if (iconConfig.bgColor) {
                        basePromise = basePromise.flatten({ background: iconConfig.bgColor })
                    }

                    promises.push(basePromise
                        .toFile(join(outputFolder, outputFileName))
                        .then(() => console.info(`Written ${outputFileName}`))
                    )
                }

                return Promise.all(promises)
            }).forEach(async (promise) => await promise)

            nitroConfig.publicAssets ||= []
            nitroConfig.publicAssets.push({
                baseURL: `/${moduleOptions.outputFolder}`,
                dir: join(nuxt.options.rootDir, '.build', moduleOptions.outputFolder),
                maxAge: 60 * 60 * 24 * 365 // 1 year
            })
        })
    },
})
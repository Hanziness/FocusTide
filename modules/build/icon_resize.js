import { join } from 'path'
import { mkdirSync, existsSync } from 'fs'
import sharp from 'sharp'

export default function IconResizer (moduleOptions) {
  const options = (this.options.iconResizer ?? moduleOptions).map(iconConfig => Object.assign({
    sizes: [128, 256, 512],
    outputFolder: 'icons',
    prefix: 'icon-'
  }, iconConfig))

  options.forEach((iconConfig) => {
    this.options.build.plugins.push({
      apply (compiler) {
        compiler.hooks.afterPlugins.tap('IconResizerWebpackPlugin', (compilation) => {
          if (!iconConfig.src) {
            return new Promise((resolve, reject) => reject(new Error('No source file specified')))
          }

          const outputFolder = join(compiler.options.output.path, iconConfig.outputFolder)

          if (!existsSync(outputFolder)) {
            mkdirSync(outputFolder, { recursive: true })
          }

          console.info(`Generating ${iconConfig.src} into sizes [${iconConfig.sizes.join(', ')}] -> ${iconConfig.outputFolder}`)

          const promises = []
          for (const size of iconConfig.sizes) {
            const outputFileName = `${iconConfig.prefix}${size}.png`
            promises.push(
              sharp(join(compiler.context, iconConfig.src))
                .resize(size)
                .toFile(join(outputFolder, outputFileName))
                .then(console.info(`Written ${outputFileName}`))
            )
          }
        })
      }
    })
  })
}

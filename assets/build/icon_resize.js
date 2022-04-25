import { join } from 'path'
import { mkdirSync, existsSync } from 'fs'
import sharp from 'sharp'

export class IconResizerWebpackPlugin {
  constructor (options) {
    this.options = Object.assign({
      sizes: [128, 256, 512],
      outputFolder: 'icons',
      prefix: 'icon-'
    }, options)
  }

  apply (compiler) {
    compiler.hooks.afterPlugins.tap('IconResizerWebpackPlugin', (compilation) => {
      if (!this.options.src) {
        return new Promise((resolve, reject) => reject(new Error('No source file specified')))
      }

      const outputFolder = join(compiler.options.output.path, this.options.outputFolder)

      if (!existsSync(outputFolder)) {
        mkdirSync(outputFolder, { recursive: true })
      }

      console.info(`Generating ${this.options.src} into sizes [${this.options.sizes.join(', ')}] -> ${this.options.outputFolder}`)

      const promises = []
      for (const size of this.options.sizes) {
        const outputFileName = `${this.options.prefix}${size}.png`
        promises.push(
          sharp(join(compiler.context, this.options.src))
            .resize(size)
            .toFile(join(outputFolder, outputFileName))
            .then(console.info(`Written ${outputFileName}`))
        )
      }
    })
  }
}

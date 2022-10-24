import fs from 'node:fs/promises'
import path from 'node:path'
import { execa } from 'execa'

// Type GetTemporaryPathOptions = {
//   srcPath: string
// }
//
// const getTemporaryPath = (options: GetTemporaryPathOptions) => {
//   const { srcPath } = options
//   return `${srcPath}.tmp`
// }

type GetImgpOutputPathOptions = {
  srcPath: string
}

const getImgpOutputPath = (options: GetImgpOutputPathOptions) => {
  const { srcPath } = options
  const dirname = path.dirname(srcPath)
  const extension = path.extname(srcPath)
  const basename = path.basename(srcPath, extension)
  const modifiedBasename = `${basename}_IMGP${extension}`
  return path.join(dirname, modifiedBasename)
}

type GetResizedOutputPathOptions = {
  dirPath: string
  name: string
  extension: string
}

const getResizedOutputPath = (options: GetResizedOutputPathOptions) => {
  const { dirPath, name, extension } = options
  const outputName = `${name}${extension}`
  return path.join(dirPath, outputName)
}

// Type PioOptions = {
//   srcPath: string
//   destPath: string
// }
//
// const pio = async (options: PioOptions) => {
//   const { srcPath, destPath } = options
//   await execa('pio', [
//     '--output-format',
//     'webp',
//     '--output',
//     destPath,
//     srcPath,
//   ])
// }

type ImgpOptions = {
  srcPath: string
  destPath: string
  maxWidth: number
  maxHeight: number
  quality: number
  eraseexif: boolean
  optimize: boolean
  progressive: boolean
}

const imgp = async (options: ImgpOptions) => {
  const {
    srcPath,
    destPath,
    maxWidth,
    maxHeight,
    eraseexif,
    optimize,
    progressive,
  } = options
  const imgpPath = getImgpOutputPath({ srcPath })
  console.log(`» imgp -x ${maxWidth}x${maxHeight} ${srcPath}`)
  await execa(
    'imgp',
    [
      '-x',
      `${maxWidth}x${maxHeight}`,
      srcPath,
      eraseexif ? '--eraseexif' : [],
      optimize ? '--optimize' : [],
      progressive ? '--progressive' : [],
    ].flat(),
  )
  await fs.rename(imgpPath, destPath)
}

type ResizeImageOptions = {
  srcPath: string
  maxWidth: number
  maxHeight: number
}

const resizeImage = async (options: ResizeImageOptions) => {
  const { srcPath, maxWidth, maxHeight } = options
  const dirPath = path.dirname(srcPath)

  const destPath = getResizedOutputPath({
    dirPath,
    name: maxWidth.toString(),
    extension: '.jpg',
  })

  console.log({ srcPath, maxWidth, maxHeight, destPath })

  try {
    await fs.stat(destPath)
    console.log('Skipping...')
    return
  } catch {}

  // Const temporaryPath = getTemporaryPath({ srcPath: destPath })
  // await imgp({ srcPath: srcPath, destPath: temporaryPath, size })
  // await pio({ srcPath: temporaryPath, destPath })
  // await fs.unlink(temporaryPath)

  await imgp({
    srcPath,
    destPath,
    maxWidth,
    maxHeight,
    quality: 75,
    eraseexif: true,
    optimize: true,
    progressive: true,
  })
}

type ProcessImageOptions = {
  srcPath: string
  sizes: Array<{ maxWidth: number; maxHeight: number }>
}

const processImage = async (options: ProcessImageOptions) => {
  const { srcPath, sizes } = options
  for (const size of sizes) {
    const { maxWidth, maxHeight } = size
    await resizeImage({ srcPath, maxWidth, maxHeight })
  }
}

export { processImage }

import fs from 'node:fs/promises'
import path from 'node:path'
import { execa } from 'execa'
import { getImageSize } from './size.js'

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
  width: number
  quality: number
  eraseexif: boolean
  optimize: boolean
  progressive: boolean
}

const imgp = async (options: ImgpOptions) => {
  const { srcPath, destPath, width, eraseexif, optimize, progressive } = options
  const imgpPath = getImgpOutputPath({ srcPath })
  console.log(`» imgp -x ${width}x0 ${srcPath}`)
  await execa(
    'imgp',
    [
      '-x',
      `${width}x0`,
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
  width: number
}

const resizeImage = async (options: ResizeImageOptions) => {
  const { srcPath, width } = options
  const dirPath = path.dirname(srcPath)

  const currentSize = await getImageSize(srcPath)
  if (currentSize instanceof Error) {
    throw currentSize
  }

  const destPath = getResizedOutputPath({
    dirPath,
    name: width.toString(),
    extension: '.jpg',
  })

  if (currentSize.width < width) {
    await fs.copyFile(srcPath, destPath)
    return
  }

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
    width,
    quality: 75,
    eraseexif: true,
    optimize: true,
    progressive: true,
  })
}

type ProcessImageOptions = {
  srcPath: string
  widthList: number[]
}

const processImage = async (options: ProcessImageOptions) => {
  const { srcPath, widthList } = options
  for (const width of widthList) {
    await resizeImage({ srcPath, width })
  }
}

export { processImage }

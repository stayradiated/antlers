import crypto from 'node:crypto'
import * as path from 'node:path'
import { fetchImage } from './fetch.js'
import { processImage } from './resize.js'
import { getImageSizeSync } from './size.js'

const calculateHash = (input: string): string => {
  const hash = crypto.createHash('sha1')
  hash.update(input)
  return hash.digest('base64url')
}

const getImagePath = (cacheDirPath: string, cacheId: string) => {
  return path.join(cacheDirPath, cacheId, 'original.jpg')
}

type CacheUrlMap = Map<string, string>

type UpdateCacheOptions = {
  cacheUrlMap: CacheUrlMap
  cacheDirPath: string
  imageResolutionList: number[]
}

const updateCache = async (options: UpdateCacheOptions): Promise<void> => {
  const { cacheUrlMap, cacheDirPath, imageResolutionList } = options

  for (const [cacheId, sourceUrl] of cacheUrlMap.entries()) {
    const imagePath = getImagePath(cacheDirPath, cacheId)

    await fetchImage({
      fromUrl: sourceUrl,
      toPath: imagePath,
    })

    console.log('processing image')

    await processImage({
      srcPath: imagePath,
      widthList: imageResolutionList,
    })
  }
}

type TransformImageOptions = {
  cacheDirPath: string
  cacheHost: string
  cacheUrlMap: CacheUrlMap
  imageUrl: string
}

const transformImage = (options: TransformImageOptions): string => {
  const { cacheDirPath, cacheHost, cacheUrlMap, imageUrl } = options

  const sourceUrl = imageUrl.trim()
  const cacheId = calculateHash(sourceUrl)
  cacheUrlMap.set(cacheId, sourceUrl)

  const imagePath = getImagePath(cacheDirPath, cacheId)
  const imageSize = getImageSizeSync(imagePath)

  let width = 0
  let height = 0
  if (!(imageSize instanceof Error)) {
    width = imageSize.width
    height = imageSize.height
  }

  const cacheUrl = new URL(`./${cacheId}/`, cacheHost).href
  const cachedImageUrl = ['cache', cacheUrl, width, height].join('•')

  return cachedImageUrl
}

const createCacheUrlMap = (): CacheUrlMap => new Map()

export { updateCache, transformImage, createCacheUrlMap }

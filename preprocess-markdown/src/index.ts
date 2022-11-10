import crypto from 'node:crypto'
import * as path from 'node:path'
import { remark } from 'remark'
import type { Transformer } from 'unified'
import type { Visitor } from 'unist-util-visit'
import { visit } from 'unist-util-visit'
import type { Image } from 'mdast'
import remarkToc from 'remark-toc'
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

const createImageCacheTransformer = (
  cacheDirPath: string,
  cacheUrlMap: CacheUrlMap,
) => {
  return (): Transformer => {
    const visitImage: Visitor = (node) => {
      const image = node as Image
      if (image.url?.startsWith('http://100.125.248.114')) {
        const sourceUrl = image.url.trim()
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

        image.url = ['cache', cacheId, width, height].join(':')
      }
    }

    return (tree, _file, done) => {
      visit(tree, 'image', visitImage)
      done()
    }
  }
}

type Result = {
  markdown: string
  cacheUrlMap: CacheUrlMap
}

type TransformMarkdownOptions = {
  input: string
  cacheDirPath: string
}

const transformMarkdown = async (
  options: TransformMarkdownOptions,
): Promise<Result> => {
  const { input, cacheDirPath } = options

  const cacheUrlMap = createCacheUrlMap()
  const transformer = createImageCacheTransformer(cacheDirPath, cacheUrlMap)

  const file = await remark()
    .use(transformer)
    .use(remarkToc, {
      heading: 'Locations',
    })
    .process(input)

  console.log(cacheUrlMap)

  return {
    markdown: String(file),
    cacheUrlMap,
  }
}

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
  cacheUrlMap: CacheUrlMap
  imageUrl: string
}

const transformImage = (options: TransformImageOptions): string => {
  const { cacheDirPath, cacheUrlMap, imageUrl } = options

  if (imageUrl.startsWith('http://100.125.248.114')) {
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

    const cachedImageUrl = ['cache', cacheId, width, height].join(':')

    return cachedImageUrl
  }

  return imageUrl
}

const createCacheUrlMap = (): CacheUrlMap => new Map()

export { transformMarkdown, updateCache, transformImage, createCacheUrlMap }

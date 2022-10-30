import crypto from 'node:crypto'
import * as path from 'node:path'
import { remark } from 'remark'
import type { Transformer } from 'unified'
import type { Visitor } from 'unist-util-visit'
import { visit } from 'unist-util-visit'
import type { Image } from 'mdast'
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
      if (image.url && /^https?:\/\/.+\.jpg$/.test(image.url.trim())) {
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

const transformMarkdown = async (
  cacheDirPath: string,
  input: string,
): Promise<Result> => {
  const cacheUrlMap: CacheUrlMap = new Map()
  const transformer = createImageCacheTransformer(cacheDirPath, cacheUrlMap)

  const file = await remark().use(transformer).process(input)

  console.log(cacheUrlMap)

  return {
    markdown: String(file),
    cacheUrlMap,
  }
}

type UpdateCacheOptions = {
  cacheUrlMap: CacheUrlMap
  cacheDirPath: string
}

const updateCache = async (options: UpdateCacheOptions): Promise<void> => {
  const { cacheUrlMap, cacheDirPath } = options

  for (const [cacheId, sourceUrl] of cacheUrlMap.entries()) {
    const imagePath = getImagePath(cacheDirPath, cacheId)
    await fetchImage({
      fromUrl: sourceUrl,
      toPath: imagePath,
    })
    console.log('processing image')
    await processImage({
      srcPath: imagePath,
      sizes: [
        { maxWidth: 2560, maxHeight: 1600 },
        { maxWidth: 1280, maxHeight: 1024 },
        { maxWidth: 720, maxHeight: 720 },
        { maxWidth: 224, maxHeight: 224 },
      ],
    })
  }
}

export { transformMarkdown, updateCache }

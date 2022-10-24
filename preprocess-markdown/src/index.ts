import crypto from 'node:crypto'
import * as path from 'node:path'
import { remark } from 'remark'
import type { Transformer } from 'unified'
import type { Visitor } from 'unist-util-visit'
import { visit } from 'unist-util-visit'
import type { Image } from 'mdast'
import { execaSync } from 'execa'
import { fetchImage } from './fetch.js'
import { processImage } from './resize.js'

const calculateHash = (input: string): string => {
  const hash = crypto.createHash('sha1')
  hash.update(input)
  return hash.digest('base64url')
}

const getImagePath = (cacheDirPath: string, cacheId: string) => {
  return path.join(cacheDirPath, cacheId, 'original.jpg')
}

const getImageSize = (
  cacheDirPath: string,
  cacheId: string,
): { width: number; height: number } => {
  const imagePath = getImagePath(cacheDirPath, cacheId)
  const result = execaSync('file', [imagePath])
  const match = /\s(\d\d+)x(\d\d+),/.exec(result.stdout)
  const width = Number.parseInt(match?.[1] ?? '0', 10)
  const height = Number.parseInt(match?.[2] ?? '0', 10)
  return { width, height }
}

type CacheUrlMap = Map<string, string>

const createImageCacheTransformer = (
  cacheDirPath: string,
  cacheUrlMap: CacheUrlMap,
) => {
  return (): Transformer => {
    const visitImage: Visitor = (node) => {
      const image = node as Image
      if (image.url && /^https?:/.test(image.url.trim())) {
        const sourceUrl = image.url.trim()
        const cacheId = calculateHash(sourceUrl)
        cacheUrlMap.set(cacheId, sourceUrl)
        const { width, height } = getImageSize(cacheDirPath, cacheId)
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

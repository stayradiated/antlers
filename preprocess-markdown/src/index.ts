import crypto from 'crypto'
import { remark } from 'remark'
import type { Transformer } from 'unified'
import type { Visitor } from 'unist-util-visit'
import { visit } from 'unist-util-visit'
import type { Image } from 'mdast'
import { fetchImage } from './fetch.js'
import * as path from 'path'

const calculateHash = (input: string): string => {
  const hash = crypto.createHash('sha1')
  hash.update(input)
  return hash.digest('base64url')
}


type CacheUrlMap = Map<string, string>

const createImageCacheTransformer = (cacheUrlMap: CacheUrlMap) => {
  return (): Transformer => {
    const visitImage: Visitor = (node) => {
      const image = node as Image
      if (image.url && /^https?:/.test(image.url.trim())) {
        const sourceUrl = image.url.trim()
        const cacheId = calculateHash(sourceUrl)
        cacheUrlMap.set(cacheId, sourceUrl)
        image.url = 'cache:' + cacheId
      }
    }

    return (tree, _file, done) => {
      visit(tree, 'image', visitImage)
      done()
    }
  }
}

type Result = {
  markdown: string,
  cacheUrlMap: CacheUrlMap
}

const transformMarkdown = async (input: string): Promise<Result> => {
  const cacheUrlMap: CacheUrlMap = new Map()
  const transformer = createImageCacheTransformer(cacheUrlMap)

  const file = await remark().use(transformer).process(input)

  console.log(cacheUrlMap)

  return {
    markdown: String(file),
    cacheUrlMap,
  }
}

type UpdateCacheOptions = {
  cacheUrlMap: CacheUrlMap,
  cacheDirPath: string,
}

const updateCache = async (options: UpdateCacheOptions): Promise<void> => {
  const { cacheUrlMap, cacheDirPath } = options

  for (const [cacheId, sourceUrl] of cacheUrlMap.entries()) {
    await fetchImage({
      fromUrl: sourceUrl,
      toPath: path.join(cacheDirPath, cacheId, '2560.jpg')
    })
  }
}

export { transformMarkdown, updateCache }

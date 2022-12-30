import type { RenderableTreeNode, Node } from '@markdoc/markdoc'
import Markdoc from '@markdoc/markdoc'
import pMap from 'p-map'
import { withDebugTime } from '../debug'
import { getCache } from './cache'

import { fetchImageInfo } from './image-info'

type ParseMarkdocOptions = {
  pageId: string
  source: string
  hash: string
}

type ParseMarkdocResult = {
  createdAt: Date
  hash: string
  ast: Node
}

const forceParseMarkdoc = withDebugTime(
  async (options: ParseMarkdocOptions): Promise<ParseMarkdocResult> => {
    const { source, hash } = options

    const createdAt = new Date()

    const ast = Markdoc.parse(source)

    await pMap(
      ast.walk(),
      async (item) => {
        if (item.type === 'image') {
          const info = await fetchImageInfo({ source: item.attributes.src })
          item.attributes.width = info.width
          item.attributes.height = info.height
        }
      },
      { concurrency: 10 },
    )

    return {
      createdAt,
      hash,
      ast,
    }
  },
  (options) => `forceParseMarkdoc: ${options.pageId}`,
)

const parseMarkdoc = withDebugTime(
  async (options: ParseMarkdocOptions): Promise<ParseMarkdocResult> => {
    const { pageId, hash } = options

    const cache = await getCache()

    const cacheKey = `parseMarkdoc:${pageId}`
    const cachedResult = await cache.get<ParseMarkdocResult>(cacheKey)

    if (!cachedResult || cachedResult.hash !== hash) {
      const result = await forceParseMarkdoc(options)
      await cache.set(cacheKey, result)
      return result
    }

    return cachedResult
  },
  (options) => `parseMarkdoc: ${options.pageId}`,
)

export { parseMarkdoc }

import type { Node } from '@markdoc/markdoc'
import Markdoc from '@markdoc/markdoc'
import pMap from 'p-map'
import * as z from 'zod'
import { withDebugTime } from '../debug'
import { getCache } from './cache'

import { fetchImageInfo } from './image-info'

type ParseMarkdocOptions = {
  pageId: string
  source: string
  hash: string
}

const $Node = z.custom<Node>()
const $ParseMarkdocResult = z.object({
  createdAt: z.date(),
  hash: z.string(),
  ast: $Node,
})
type ParseMarkdocResult = z.infer<typeof $ParseMarkdocResult>

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
    const safeCachedResult = $ParseMarkdocResult.safeParse(
      await cache.get<ParseMarkdocResult>(cacheKey),
    )
    console.log(safeCachedResult)

    if (!safeCachedResult.success || safeCachedResult.data.hash !== hash) {
      const result = await forceParseMarkdoc(options)
      await cache.set(cacheKey, result)
      return result
    }

    return safeCachedResult.data
  },
  (options) => `parseMarkdoc: ${options.pageId}`,
)

export { parseMarkdoc }

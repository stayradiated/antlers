import type {
  Config,
  RenderableTreeNode,
  ValidateError,
} from '@markdoc/markdoc'
import Markdoc from '@markdoc/markdoc'
import * as z from 'zod'
import { withDebugTime } from '../debug'
import { getCache } from './cache'

import { nodes, tags } from './markdoc/index'
import { parseMarkdoc } from './markdoc-parse'

type TransformMarkdocOptions = {
  pageId: string
  source: string
  hash: string
}

const $TransformMarkdocResult = z.discriminatedUnion('success', [
  z.object({
    success: z.literal(true),
    createdAt: z.date(),
    hash: z.string(),
    value: z.custom<RenderableTreeNode>(),
  }),
  z.object({
    success: z.literal(false),
    createdAt: z.date(),
    hash: z.string(),
    errors: z.custom<ValidateError[]>(),
  }),
])
type TransformMarkdocResult = z.infer<typeof $TransformMarkdocResult>

const forceTransformMarkdoc = withDebugTime(
  async (options: TransformMarkdocOptions): Promise<TransformMarkdocResult> => {
    const { pageId, source, hash } = options

    const createdAt = new Date()

    const { ast } = await parseMarkdoc({ pageId, source, hash })

    const config: Config = {
      tags,
      nodes,
      variables: {},
    }

    const errors = Markdoc.validate(ast, config)
    if (errors.length > 0) {
      return { createdAt, hash, success: false, errors }
    }

    const value = Markdoc.transform(ast, config)
    return { createdAt, hash, success: true, value }
  },
  (options) => `forceTransformMarkdoc: ${options.pageId}`,
)

const transformMarkdoc = withDebugTime(
  async (options: TransformMarkdocOptions): Promise<TransformMarkdocResult> => {
    const { pageId, hash } = options

    const cache = await getCache()

    const cacheKey = `transformMarkdoc:${pageId}`
    const safeCachedResult = $TransformMarkdocResult.safeParse(
      await cache.get<TransformMarkdocResult>(cacheKey),
    )

    if (!safeCachedResult.success || safeCachedResult.data.hash !== hash) {
      const result = await forceTransformMarkdoc(options)
      await cache.set(cacheKey, result)
      return result
    }

    return safeCachedResult.data
  },
  (options) => `transformMarkdoc: ${options.pageId}`,
)

export { transformMarkdoc }

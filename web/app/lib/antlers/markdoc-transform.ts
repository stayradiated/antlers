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
import { calcHash } from './hash'
import { resolveReferenceKeys } from './references'
import { $References } from './types'

const config: Config = {
  tags,
  nodes,
  variables: {},
}

const configHash = calcHash(JSON.stringify(config))

type TransformMarkdocOptions = {
  pageId: string
  source: string
  sourceHash: string
}

const $RenderableTreeNode = z.custom<RenderableTreeNode>(
  z.record(z.string(), z.unknown()).parse,
)

const $TransformMarkdocResult = z.discriminatedUnion('success', [
  z.object({
    success: z.literal(true),
    createdAt: z.date(),
    sourceHash: z.string(),
    configHash: z.string(),
    value: $RenderableTreeNode,
    references: $References,
  }),
  z.object({
    success: z.literal(false),
    createdAt: z.date(),
    sourceHash: z.string(),
    configHash: z.string(),
    errors: z.custom<ValidateError[]>(),
  }),
])
type TransformMarkdocResult = z.infer<typeof $TransformMarkdocResult>

const forceTransformMarkdoc = withDebugTime(
  async (options: TransformMarkdocOptions): Promise<TransformMarkdocResult> => {
    const { pageId, source, sourceHash } = options

    const createdAt = new Date()

    const { ast, referenceKeys } = await parseMarkdoc({
      pageId,
      source,
      sourceHash,
    })

    const errors = Markdoc.validate(ast, config)
    if (errors.length > 0) {
      return { createdAt, sourceHash, configHash, success: false, errors }
    }

    const references = await resolveReferenceKeys(referenceKeys)

    const value = Markdoc.transform(ast, config)
    return {
      createdAt,
      sourceHash,
      configHash,
      success: true,
      value,
      references,
    }
  },
  (options) => `forceTransformMarkdoc: ${options.pageId}`,
)

const transformMarkdoc = withDebugTime(
  async (options: TransformMarkdocOptions): Promise<TransformMarkdocResult> => {
    const { pageId, sourceHash } = options

    const cache = await getCache()

    const cacheKey = `transformMarkdoc:${pageId}`
    const safeCachedResult = $TransformMarkdocResult.safeParse(
      await cache.get<TransformMarkdocResult>(cacheKey),
    )

    if (
      !safeCachedResult.success ||
      safeCachedResult.data.sourceHash !== sourceHash ||
      safeCachedResult.data.configHash !== configHash
    ) {
      const result = await forceTransformMarkdoc(options)
      await cache.set(cacheKey, result)
      return result
    }

    return safeCachedResult.data
  },
  (options) => `transformMarkdoc: ${options.pageId}`,
)

export { transformMarkdoc }

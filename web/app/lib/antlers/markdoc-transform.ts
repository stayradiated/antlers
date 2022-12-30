import type {
  Config,
  RenderableTreeNode,
  ValidateError,
} from '@markdoc/markdoc'
import Markdoc from '@markdoc/markdoc'
import { withDebugTime } from '../debug'
import { getCache } from './cache'

import { nodes, tags } from './markdoc/index'
import { parseMarkdoc } from './markdoc-parse'

type ParseMarkdocOptions = {
  pageId: string
  source: string
  hash: string
}

type ParseMarkdocResult =
  | {
      createdAt: Date
      hash: string
      success: true
      value: RenderableTreeNode
    }
  | {
      createdAt: Date
      hash: string
      success: false
      errors: ValidateError[]
    }

const forceTransformMarkdoc = withDebugTime(
  async (options: ParseMarkdocOptions): Promise<ParseMarkdocResult> => {
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
  async (options: ParseMarkdocOptions): Promise<ParseMarkdocResult> => {
    const { pageId, hash } = options

    const cache = await getCache()

    const cacheKey = `transformMarkdoc:${pageId}`
    const cachedResult = await cache.get<ParseMarkdocResult>(cacheKey)

    if (!cachedResult || cachedResult.hash !== hash) {
      const result = await forceTransformMarkdoc(options)
      await cache.set(cacheKey, result)
      return result
    }

    return cachedResult
  },
  (options) => `transformMarkdoc: ${options.pageId}`,
)

export { transformMarkdoc }

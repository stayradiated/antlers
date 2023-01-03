import type { Node } from '@markdoc/markdoc'
import Markdoc from '@markdoc/markdoc'
import * as z from 'zod'
import { withDebugTime } from '../debug'
import { getCache } from './cache'
import { $ReferenceKeys, $Frontmatter } from './types'
import type { ReferenceKeys } from './types'
import { parseFrontmatter } from './frontmatter'

type ParseMarkdocOptions = {
  pageId: string
  source: string
  sourceHash: string
}

const $Node = z.custom<Node>(z.record(z.string(), z.unknown()).parse)

const $ParseMarkdocResult = z.object({
  createdAt: z.date(),
  sourceHash: z.string(),
  ast: $Node,
  frontmatter: $Frontmatter,
  referenceKeys: $ReferenceKeys,
})
type ParseMarkdocResult = z.infer<typeof $ParseMarkdocResult>

const forceParseMarkdoc = withDebugTime(
  async (options: ParseMarkdocOptions): Promise<ParseMarkdocResult> => {
    const { source, sourceHash } = options

    const createdAt = new Date()

    const referenceKeys: ReferenceKeys = {
      files: [],
      images: [],
    }

    const ast = Markdoc.parse(source)

    const frontmatter = parseFrontmatter(ast.attributes.frontmatter)

    if ('image' in frontmatter && typeof frontmatter.image === 'string') {
      referenceKeys.images.push(frontmatter.image)
    }

    for (const item of ast.walk()) {
      if (item.type === 'image') {
        referenceKeys.images.push(item.attributes.src)
      }

      if (item.type === 'tag' && item.tag?.endsWith('Partial')) {
        const file = item.attributes.file as unknown
        if (typeof file === 'string') {
          referenceKeys.files.push(file)
        }
      }

      if (item.type === 'tag' && item.tag === 'sojourn') {
        const image = item.attributes.image as unknown
        if (typeof image === 'string') {
          referenceKeys.images.push(image)
        }
      }
    }

    return {
      createdAt,
      sourceHash,
      ast,
      frontmatter,
      referenceKeys,
    }
  },
  (options) => `forceParseMarkdoc: ${options.pageId}`,
)

const parseMarkdoc = withDebugTime(
  async (options: ParseMarkdocOptions): Promise<ParseMarkdocResult> => {
    const { pageId, sourceHash } = options

    const cache = await getCache()

    const cacheKey = `parseMarkdoc:${pageId}`
    const safeCachedResult = $ParseMarkdocResult.safeParse(
      await cache.get<ParseMarkdocResult>(cacheKey),
    )

    if (
      !safeCachedResult.success ||
      safeCachedResult.data.sourceHash !== sourceHash
    ) {
      const result = await forceParseMarkdoc(options)
      await cache.set(cacheKey, result)
      return result
    }

    const revivedAst = Markdoc.Ast.fromJSON(
      JSON.stringify(safeCachedResult.data.ast),
    ) as Node
    return {
      ...safeCachedResult.data,
      ast: revivedAst,
    }
  },
  (options) => `parseMarkdoc: ${options.pageId}`,
)

export { parseMarkdoc }

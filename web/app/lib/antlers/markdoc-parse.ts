import type {
  Config,
  RenderableTreeNode,
  ValidateError,
} from '@markdoc/markdoc'
import Markdoc from '@markdoc/markdoc'
import * as z from 'zod'
import { withDebugTime } from '../debug'
import { getCache } from './cache'
import { $ReferenceKeys, $Frontmatter, $Summary } from './types'
import type { ReferenceKeys } from './types'
import { parseFrontmatter } from './frontmatter'
import { calcWordCount } from './summary'
import { calcHash } from './hash'
import { nodes, tags } from './markdoc/index'

const config: Config = {
  tags,
  nodes,
  variables: {},
}

const configHash = calcHash(JSON.stringify(config))

type ParseMarkdocOptions = {
  pageId: string
  source: string
  sourceHash: string
}

const $RenderableTreeNode = z.custom<RenderableTreeNode>(
  z.record(z.string(), z.unknown()).parse,
)

const $ParseMarkdocResult = z.discriminatedUnion('success', [
  z.object({
    success: z.literal(true),
    createdAt: z.date(),
    sourceHash: z.string(),
    configHash: z.string(),
    renderableTreeNode: $RenderableTreeNode,
    referenceKeys: $ReferenceKeys,
    frontmatter: $Frontmatter,
    summary: $Summary,
  }),
  z.object({
    success: z.literal(false),
    createdAt: z.date(),
    sourceHash: z.string(),
    configHash: z.string(),
    errors: z.custom<ValidateError[]>(),
  }),
])
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

    const configWithVariables = {
      ...config,
      variables: {
        ...config.variables,
        ...frontmatter,
      },
    }

    const errors = Markdoc.validate(ast, configWithVariables)
    if (errors.length > 0) {
      return { success: false, createdAt, sourceHash, configHash, errors }
    }

    const renderableTreeNode = Markdoc.transform(ast, configWithVariables)

    if ('image' in frontmatter && typeof frontmatter.image === 'string') {
      referenceKeys.images.push(frontmatter.image)
    }

    let imageCount = 0
    let wordCount = 0

    for (const item of ast.walk()) {
      if (item.type === 'text') {
        const { content } = item.attributes
        if (typeof content === 'string') {
          wordCount += calcWordCount(content)
        }
      }

      if (item.type === 'image') {
        referenceKeys.images.push(item.attributes.src)
        imageCount += 1
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
      success: true,
      createdAt,
      sourceHash,
      configHash,
      renderableTreeNode,
      referenceKeys,
      frontmatter,
      summary: {
        wordCount,
        imageCount,
      },
    }
  },
  (options) => `forceParseMarkdoc: ${options.pageId}`,
)

const parseMarkdoc = async (
  options: ParseMarkdocOptions,
): Promise<ParseMarkdocResult> => {
  const { pageId, sourceHash } = options

  const cache = await getCache()

  const cacheKey = `parseMarkdoc:${pageId}`
  const safeCachedResult = $ParseMarkdocResult.safeParse(
    await cache.get<ParseMarkdocResult>(cacheKey),
  )

  if (
    !safeCachedResult.success ||
    safeCachedResult.data.sourceHash !== sourceHash ||
    safeCachedResult.data.configHash !== configHash
  ) {
    const result = await forceParseMarkdoc(options)
    await cache.set(cacheKey, result)
    return result
  }

  return safeCachedResult.data
}

export { parseMarkdoc }

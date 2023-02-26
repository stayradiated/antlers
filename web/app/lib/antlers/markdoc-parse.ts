import { match, P } from 'ts-pattern'
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
import type { ReferenceKeys, Frontmatter, Summary } from './types'
import { parseFrontmatter } from './frontmatter'
import { calcWordCount } from './summary'
import { calcHash } from './hash'
import { nodes, tags } from './markdoc/index'

const isString = (x: unknown): x is string => typeof x === 'string'

const config: Config = {
  tags,
  nodes,
  variables: {},
}

// Increment this number to bust cache
const configVersion = '1.0.3'

const configHash = calcHash(JSON.stringify(config) + configVersion)

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
    frontmatterReferenceKeys: $ReferenceKeys,

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
  async (options: ParseMarkdocOptions): Promise<ParseMarkdocResult | Error> => {
    const { source, sourceHash } = options

    const createdAt = new Date()

    const referenceKeys: ReferenceKeys = {
      files: [],
      images: [],
    }
    const frontmatterReferenceKeys: ReferenceKeys = {
      files: [],
      images: [],
    }

    const ast = Markdoc.parse(source)
    const frontmatter = parseFrontmatter(ast.attributes.frontmatter)
    if (frontmatter instanceof Error) {
      return frontmatter
    }

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

    const frontmatterReferenceKeyFile = match<Frontmatter, string | undefined>(
      frontmatter,
    )
      .with(
        { type: 'sojourn', locationFile: P.when(isString) },
        (item) => item.locationFile,
      )
      .with(
        { type: 'location', countryMapFile: P.when(isString) },
        (item) => item.countryMapFile,
      )
      .otherwise(() => undefined)
    if (typeof frontmatterReferenceKeyFile === 'string') {
      frontmatterReferenceKeys.files.push(frontmatterReferenceKeyFile)
    }

    const frontmatterReferenceKeyImage = match<Frontmatter, string | undefined>(
      frontmatter,
    )
      .with({ type: 'sojourn', image: P.when(isString) }, (item) => item.image)
      .with({ type: 'map' }, (item) => item.image)
      .otherwise(() => undefined)
    if (typeof frontmatterReferenceKeyImage === 'string') {
      frontmatterReferenceKeys.images.push(frontmatterReferenceKeyImage)
    }

    const summary: Summary = {
      imageCount: 0,
      wordCount: 0,
      images: [],
    }

    for (const item of ast.walk()) {
      if (item.type === 'text') {
        const { content } = item.attributes
        if (typeof content === 'string') {
          summary.wordCount += calcWordCount(content)
        }
      }

      if (item.type === 'image') {
        referenceKeys.images.push(item.attributes.src)
        summary.imageCount += 1
        summary.images.push(item.attributes.src)
      }

      if (item.type === 'tag' && item.tag?.endsWith('Partial')) {
        for (const [key, value] of Object.entries(item.attributes)) {
          if (key === 'file' || key.endsWith('File')) {
            if (typeof value === 'string') {
              referenceKeys.files.push(value)
            } else if (value instanceof Markdoc.Ast.Variable) {
              referenceKeys.files.push(value.resolve(configWithVariables))
            }
          }
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
      frontmatterReferenceKeys,
      summary,
    }
  },
  (options) => `forceParseMarkdoc: ${options.pageId}`,
)

const parseMarkdoc = async (
  options: ParseMarkdocOptions,
): Promise<ParseMarkdocResult | Error> => {
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
    if (!(result instanceof Error)) {
      await cache.set(cacheKey, result)
    }

    return result
  }

  return safeCachedResult.data
}

export { parseMarkdoc }

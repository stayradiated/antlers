import { match, P } from 'ts-pattern'
import type { Config, RenderableTreeNode } from '@markdoc/markdoc'
import Markdoc from '@markdoc/markdoc'
import type { ReferenceKey, Frontmatter, Summary } from './types.js'
import { parseFrontmatter } from './frontmatter.js'
import { calcWordCount } from './summary.js'
import { nodes, tags } from './markdoc/index.js'

const isString = (x: unknown): x is string => typeof x === 'string'

const config: Config = {
  tags,
  nodes,
  variables: {},
}

const removeDuplicateReferenceKeys = (list: ReferenceKey[]): ReferenceKey[] => {
  const byType: Record<string, Set<string>> = {}

  for (const entry of list) {
    byType[entry.type] ??= new Set()
    byType[entry.type]!.add(entry.id)
  }

  const output = Object.entries(byType).flatMap(([type, idSet]) =>
    [...idSet].map((id) => ({ type, id })),
  )
  return output
}

type ParseMarkdocOptions = {
  filePath: string
  source: string
}

type ParseMarkdocResult = {
  filePath: string
  frontmatter: Frontmatter
  renderableTreeNode: RenderableTreeNode
  referenceKeyList: ReferenceKey[]
  summary: Summary
}

const parseMarkdoc = async (
  options: ParseMarkdocOptions,
): Promise<ParseMarkdocResult | Error> => {
  const { filePath, source } = options

  const referenceKeyList: ReferenceKey[] = []

  const ast = Markdoc.parse(source)
  const frontmatter = parseFrontmatter(ast.attributes['frontmatter'])
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
    const errorBlob = errors
      .map((error) => {
        return `  - ${error.lines} ${error.error.message}`
      })
      .join('\n')
    throw new Error(`Invalid Markdoc in "${filePath}"\n${errorBlob}`)
  }

  const renderableTreeNode = Markdoc.transform(ast, configWithVariables)

  const frontmatterReferenceKeyFile = match<
    Frontmatter,
    ReferenceKey | undefined
  >(frontmatter)
    .with({ type: 'sojourn', locationFile: P.when(isString) }, (item) => ({
      type: 'location',
      id: item.locationFile,
    }))
    .with({ type: 'location', countryMapFile: P.when(isString) }, (item) => ({
      type: 'map',
      id: item.countryMapFile,
    }))
    .otherwise(() => undefined)
  if (frontmatterReferenceKeyFile) {
    referenceKeyList.push(frontmatterReferenceKeyFile)
  }

  const frontmatterReferenceKeyImage = match<
    Frontmatter,
    ReferenceKey | undefined
  >(frontmatter)
    .with({ type: 'sojourn', image: P.when(isString) }, (item) => ({
      type: 'image',
      id: item.image,
    }))
    .with({ type: 'map' }, (item) => ({ type: 'image', id: item.image }))
    .otherwise(() => undefined)
  if (frontmatterReferenceKeyImage) {
    referenceKeyList.push(frontmatterReferenceKeyImage)
  }

  const summary: Summary = {
    imageCount: 0,
    wordCount: 0,
  }

  for (const item of ast.walk()) {
    if (item.type === 'text') {
      const { content } = item.attributes
      if (typeof content === 'string') {
        summary.wordCount += calcWordCount(content)
      }
    }

    if (item.type === 'image') {
      referenceKeyList.push({ type: 'image', id: item.attributes['src'] })
      summary.imageCount += 1
    }

    if (item.type === 'tag' && item.tag?.endsWith('Partial')) {
      for (const [key, value] of Object.entries(item.attributes)) {
        if (key === 'file' || key.endsWith('File')) {
          const referenceType = key.replace(/File/, '')
          if (typeof value === 'string') {
            referenceKeyList.push({ type: referenceType, id: value })
          } else if (value instanceof Markdoc.Ast.Variable) {
            referenceKeyList.push({
              type: referenceType,
              id: value.resolve(configWithVariables),
            })
          }
        }
      }
    }

    if (item.type === 'tag' && item.tag === 'sojourn') {
      const image = item.attributes['image'] as unknown
      if (typeof image === 'string') {
        referenceKeyList.push({ type: 'image', id: image })
      }
    }
  }

  const dedupedReferenceKeyList = removeDuplicateReferenceKeys(referenceKeyList)

  return {
    filePath,
    renderableTreeNode,
    referenceKeyList: dedupedReferenceKeyList,
    frontmatter,
    summary,
  }
}

export { parseMarkdoc }
export type { ParseMarkdocResult, ParseMarkdocOptions }

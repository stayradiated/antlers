import type {
  Config,
  RenderableTreeNode,
  ValidateError,
} from '@markdoc/markdoc'
import Markdoc from '@markdoc/markdoc'
import pMap from 'p-map'

import { nodes, tags } from './markdoc/index'
import { fetchImageInfo } from './image-info'

type ParseMarkdocOptions = {
  source: string
}

type Result =
  | {
      success: true
      value: RenderableTreeNode
    }
  | {
      success: false
      errors: ValidateError[]
    }

const parseMarkdoc = async (options: ParseMarkdocOptions): Promise<Result> => {
  const { source } = options

  const ast = Markdoc.parse(source)

  const config: Config = {
    tags,
    nodes,
    variables: {},
  }

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

  const errors = Markdoc.validate(ast, config)
  if (errors.length > 0) {
    return { success: false, errors }
  }

  const value = Markdoc.transform(ast, config)
  return { success: true, value }
}

export { parseMarkdoc }

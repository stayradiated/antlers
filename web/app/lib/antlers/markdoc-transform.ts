import type { RenderableTreeNode, ValidateError } from '@markdoc/markdoc'
import * as z from 'zod'
import { withDebugTime } from '../debug'

import { parseMarkdoc } from './markdoc-parse'
import { resolveReferenceKeys } from './references'
import { $References } from './types'

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
    renderableTreeNode: $RenderableTreeNode,
    references: $References,
  }),
  z.object({
    success: z.literal(false),
    errors: z.custom<ValidateError[]>(),
  }),
])
type TransformMarkdocResult = z.infer<typeof $TransformMarkdocResult>

const transformMarkdoc = withDebugTime(
  async (
    options: TransformMarkdocOptions,
  ): Promise<TransformMarkdocResult | Error> => {
    const { pageId, source, sourceHash } = options

    const result = await parseMarkdoc({
      pageId,
      source,
      sourceHash,
    })
    if (result instanceof Error) {
      return result
    }

    if (!result.success) {
      return result
    }

    const { renderableTreeNode, referenceKeys } = result
    const references = await resolveReferenceKeys(referenceKeys)
    if (references instanceof Error) {
      return new Error('Could not resolve references.', { cause: references })
    }

    return {
      success: true,
      renderableTreeNode,
      references,
    }
  },
  (options) => `transformMarkdoc: ${options.pageId}`,
)

export { transformMarkdoc }

import * as z from 'zod'
import type {
  CustomAttributeTypeInterface,
  ValidationError,
} from '@markdoc/markdoc'

const $ViewPort = z.object({
  aspectRatio: z.number(),
  translate: z.tuple([z.number(), z.number()]),
  scale: z.number(),
})
type ViewPort = z.infer<typeof $ViewPort>

class ViewPortAttribute implements CustomAttributeTypeInterface {
  validate(value: unknown) {
    const result = $ViewPort.safeParse(value)
    if (!result.success) {
      const error: ValidationError = {
        id: 'invalid-viewport-type',
        level: 'critical',
        message: `Invalid ViewPort attribute: ${JSON.stringify(
          result.error.issues,
        )}`,
      }
      return [error]
    }

    return []
  }

  transform(value: unknown) {
    if (typeof value === 'undefined') {
      return null
    }

    return $ViewPort.parse(value)
  }
}

export { ViewPortAttribute, $ViewPort }
export type { ViewPort }

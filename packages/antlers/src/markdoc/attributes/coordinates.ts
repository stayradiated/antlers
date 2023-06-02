import * as z from 'zod'
import type {
  CustomAttributeTypeInterface,
  ValidationError,
} from '@markdoc/markdoc'

const $Coordinates = z.tuple([z.number(), z.number()])
type Coordinates = z.infer<typeof $Coordinates>

class CoordinatesAttribute implements CustomAttributeTypeInterface {
  validate(value: unknown) {
    const result = $Coordinates.safeParse(value)
    if (!result.success) {
      const error: ValidationError = {
        id: 'invalid-coordinates-type',
        level: 'critical',
        message: `Invalid Coordinates attribute: ${JSON.stringify(
          result.error.issues,
        )}`,
      }
      return [error]
    }

    return []
  }

  transform(value: unknown) {
    return $Coordinates.parse(value)
  }
}

export { CoordinatesAttribute, $Coordinates }
export type { Coordinates }

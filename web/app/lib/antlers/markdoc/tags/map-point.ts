import * as z from 'zod'
import type {
  Schema,
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

type MapPointProps = {
  label: string
  coordinates: Coordinates
}

const mapPoint: Schema = {
  render: 'MapPoint',
  children: [],
  selfClosing: true,
  attributes: {
    label: { type: String, required: true },
    coordinates: { type: CoordinatesAttribute, required: true },
  },
}

export { mapPoint }
export type { MapPointProps }

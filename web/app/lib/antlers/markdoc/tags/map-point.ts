import type { Schema } from '@markdoc/markdoc'
import type { Coordinates } from '../attributes/index'
import { CoordinatesAttribute } from '../attributes/index'

type MapPointProps = {
  label: string
  coordinates: Coordinates
}

const mapPoint: Schema = {
  render: 'MapPoint',
  selfClosing: true,
  children: [],
  attributes: {
    label: { type: String, required: true },
    coordinates: { type: CoordinatesAttribute, required: true },
  },
}

export { mapPoint }
export type { MapPointProps }

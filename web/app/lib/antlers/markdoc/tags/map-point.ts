import type { Schema } from '@markdoc/markdoc'
import type { Coordinates } from '../attributes/index'
import { CoordinatesAttribute } from '../attributes/index'

const ALL_ICONS = ['start', 'dot', 'accomodation'] as const

type MapPointProps = {
  label: string
  coordinates: Coordinates
  icon?: typeof ALL_ICONS[number]
}

const mapPoint: Schema = {
  render: 'MapPoint',
  selfClosing: true,
  children: [],
  attributes: {
    label: { type: String, required: true },
    coordinates: { type: CoordinatesAttribute, required: true },
    icon: { type: String, matches: ALL_ICONS.slice() },
  },
}

export { mapPoint }
export type { MapPointProps }

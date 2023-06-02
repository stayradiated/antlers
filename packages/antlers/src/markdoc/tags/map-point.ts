import type { Schema } from '@markdoc/markdoc'
import { CoordinatesAttribute } from '../attributes/index.js'

const ALL_ICONS = ['start', 'dot', 'accomodation'] as const

const mapPoint: Schema = {
  render: 'MapPoint',
  selfClosing: true,
  children: [],
  attributes: {
    label: { type: String, required: true },
    coordinates: { type: CoordinatesAttribute, required: true },
    icon: { type: String, matches: [...ALL_ICONS] },
  },
}

export { mapPoint }

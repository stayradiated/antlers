import type { Schema } from '@markdoc/markdoc'

type MapProps = {
  file: string
  label: string
  coordinates: {
    latitude: number
    longitude: number
  }
}

const mapp: Schema = {
  render: 'Mapp',
  children: [],
  attributes: {
    file: { type: String, required: true },
    label: { type: String, required: true },
    coordinates: { type: Object, required: true },
  },
}

export { mapp }
export type { MapProps }

import type { Schema } from '@markdoc/markdoc'

type TravelPartialProps = {
  file: string
  animated: boolean
  strokeWidth?: number
  strokeLength?: number
}

const travelPartial: Schema = {
  render: 'TravelPartial',
  selfClosing: true,
  children: [],
  attributes: {
    file: { type: String, required: true },
    animated: { type: Boolean },
    strokeWidth: { type: Number },
    strokeLength: { type: Number }
  },
}

export { travelPartial }
export type { TravelPartialProps }

import type { Schema } from '@markdoc/markdoc'

type TravelPartialProps = {
  file: string
  animated: boolean
}

const travelPartial: Schema = {
  render: 'TravelPartial',
  selfClosing: true,
  children: [],
  attributes: {
    file: { type: String, required: true },
    animated: { type: Boolean },
  },
}

export { travelPartial }
export type { TravelPartialProps }

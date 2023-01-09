import type { Schema } from '@markdoc/markdoc'

type TravelPartialProps = {
  file: string
}

const travelPartial: Schema = {
  render: 'TravelPartial',
  selfClosing: true,
  children: [],
  attributes: {
    file: { type: String, required: true },
  },
}

export { travelPartial }
export type { TravelPartialProps }

import type { Schema } from '@markdoc/markdoc'

type LocationPartialProps = {
  file: string
}

const locationPartial: Schema = {
  render: 'LocationPartial',
  selfClosing: true,
  children: [],
  attributes: {
    file: { type: String, required: true },
  },
}

export { locationPartial }
export type { LocationPartialProps }

import type { Schema } from '@markdoc/markdoc'

const map: Schema = {
  render: 'Map',
  children: [],
  attributes: {
    alt: { type: String, required: true },
    src: { type: String, required: true },
  },
}
export { map }

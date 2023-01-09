import type { Schema } from '@markdoc/markdoc'

const mapLegacy: Schema = {
  render: 'MapLegacy',
  children: [],
  attributes: {
    alt: { type: String, required: true },
    src: { type: String, required: true },
  },
}
export { mapLegacy }

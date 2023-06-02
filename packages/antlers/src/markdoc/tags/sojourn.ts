import type { Schema } from '@markdoc/markdoc'

const sojourn: Schema = {
  render: 'Sojourn',
  children: [],
  attributes: {
    arriveAt: { type: String, required: true },
    departAt: { type: String },
    location: { type: String, required: true },
    country: { type: String, required: true },
    image: { type: String },
    href: { type: String },
    imageAlignV: { type: Number },
  },
}

export { sojourn }

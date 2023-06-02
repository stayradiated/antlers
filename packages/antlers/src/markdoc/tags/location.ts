import type { Schema } from '@markdoc/markdoc'

const location: Schema = {
  render: 'Location',
  children: [],
  attributes: {
    arriveAt: { type: String, required: true },
    departAt: { type: String },
    location: { type: String, required: true },
    country: { type: String, required: true },
    image: { type: String },
    imageAlignV: { type: Number },
    href: { type: String },
    height: { type: Number, default: 0.5 },
  },
}

export { location }

import type { Schema } from '@markdoc/markdoc'

const accomodation: Schema = {
  render: 'Accomodation',
  children: ['photo', 'paragraph'],
  attributes: {
    title: { type: String, required: true },
    review: { type: Number, required: true },
    nights: { type: Number, required: true },
    costPerNight: { type: String, required: true },
    linkHref: { type: String, required: true },
    linkText: { type: String, required: true },
    description: { type: String },
  },
}

export { accomodation }

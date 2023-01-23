import type { Schema } from '@markdoc/markdoc'

type AccomodationTagProps = {
  title: string
  review: number
  nights: number
  costPerNight: string
  linkHref: string
  linkText: string
  description: string
  children: React.ReactNode
}

const accomodation: Schema = {
  render: 'Accomodation',
  children: ['tag', 'image', 'paragraph'],
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
export type { AccomodationTagProps }

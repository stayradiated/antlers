import type { Schema } from '@markdoc/markdoc'

type SojournProps = {
  arriveAt: string
  departAt?: string
  location: string
  country: string
  image?: string
  href?: string
  imageAlignV?: string
}

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
export type { SojournProps }

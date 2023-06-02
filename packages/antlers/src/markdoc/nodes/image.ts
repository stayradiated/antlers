import type { Schema } from '@markdoc/markdoc'

type ImageTagProps = {
  src: string
  alt?: string
  title?: string
}

const image: Schema = {
  render: 'Image',
  attributes: {
    src: { type: String, required: true },
    alt: { type: String },
    title: { type: String },
  },
}

export { image }
export type { ImageTagProps }

import type { Schema } from '@markdoc/markdoc'

const place: Schema = {
  render: 'Place',
  children: ['tag', 'paragraph'],
  attributes: {
    title: { type: String, required: true },
    category: { type: String, required: true },
    href: { type: String, required: true },
  },
}
export { place }

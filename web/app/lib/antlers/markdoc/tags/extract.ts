import type { Schema } from '@markdoc/markdoc'

const extract: Schema = {
  render: 'Extract',
  children: ['paragraph'],
  attributes: {
    title: { type: String, required: true },
    href: { type: String, required: true },
  },
}

export { extract }

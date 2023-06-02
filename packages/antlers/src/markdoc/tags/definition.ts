import type { Schema } from '@markdoc/markdoc'

const definition: Schema = {
  render: 'Definition',
  children: ['paragraph'],
  attributes: {
    word: { type: String, required: true },
    pronunciation: { type: String, required: true },
    category: { type: String, required: true },
  },
}

export { definition }

import type { Schema } from '@markdoc/markdoc'

type DefinitionTagProps = {
  word: string
  pronunciation: string
  category: string
  children: React.ReactNode
}

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
export type { DefinitionTagProps }

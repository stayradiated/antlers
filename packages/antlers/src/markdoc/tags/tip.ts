import type { Schema } from '@markdoc/markdoc'

const tip: Schema = {
  render: 'Tip',
  children: ['list', 'paragraph'],
  attributes: {
    title: { type: String, required: true },
  },
}
export { tip }

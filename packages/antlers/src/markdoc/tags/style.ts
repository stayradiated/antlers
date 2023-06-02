import type { Schema } from '@markdoc/markdoc'

const style: Schema = {
  render: 'Style',
  children: ['tag', 'paragraph', 'image'],
  attributes: {
    fullWidth: { type: Boolean },
  },
}

export { style }

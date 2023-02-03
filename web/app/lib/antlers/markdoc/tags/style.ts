import type { Schema } from '@markdoc/markdoc'

type StyleTagProps = {
  fullWidth?: boolean
  children: React.ReactNode
}

const style: Schema = {
  render: 'Style',
  children: ['tag', 'paragraph', 'image'],
  attributes: {
    fullWidth: { type: Boolean }
  },
}

export { style }
export type { StyleTagProps }

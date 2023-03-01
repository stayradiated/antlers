import type { Schema } from '@markdoc/markdoc'

type SojournPartialProps = {
  file: string
  link: boolean
}

const sojournPartial: Schema = {
  render: 'SojournPartial',
  children: [],
  attributes: {
    file: { type: String, required: true },
    link: { type: Boolean, default: true },
  },
}

export { sojournPartial }
export type { SojournPartialProps }

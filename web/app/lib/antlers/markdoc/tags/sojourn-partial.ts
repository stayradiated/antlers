import type { Schema } from '@markdoc/markdoc'

type SojournPartialProps = {
  file: string
}

const sojournPartial: Schema = {
  render: 'SojournPartial',
  children: [],
  attributes: {
    file: { type: String, required: true },
  },
}

export { sojournPartial }
export type { SojournPartialProps }

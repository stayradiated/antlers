import type { Schema } from '@markdoc/markdoc'

type MapPointPartialProps = {
  file: string
  style?: 'start'
}

const mapPointPartial: Schema = {
  render: 'MapPointPartial',
  selfClosing: true,
  children: [],
  attributes: {
    file: { type: String, required: true },
    style: { type: String, matches: ['start'] },
  },
}

export { mapPointPartial }
export type { MapPointPartialProps }

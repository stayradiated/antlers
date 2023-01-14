import type { Schema } from '@markdoc/markdoc'

type MapPointPartialProps = {
  file: string
  style?: 'start' | 'dot'
}

const mapPointPartial: Schema = {
  render: 'MapPointPartial',
  selfClosing: true,
  children: [],
  attributes: {
    file: { type: String, required: true },
    style: { type: String, matches: ['start', 'dot'] },
  },
}

export { mapPointPartial }
export type { MapPointPartialProps }

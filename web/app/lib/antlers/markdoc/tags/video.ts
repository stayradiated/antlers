import type { Schema } from '@markdoc/markdoc'

type VideoTagProps = {
  src: string
  controls?: boolean
  autoPlay?: boolean
  loop?: boolean
}

const video: Schema = {
  render: 'Video',
  selfClosing: true,
  children: [],
  attributes: {
    src: { type: String, required: true },
    controls: { type: Boolean },
    autoPlay: { type: Boolean },
    loop: { type: Boolean },
  },
}

export { video }
export type { VideoTagProps }

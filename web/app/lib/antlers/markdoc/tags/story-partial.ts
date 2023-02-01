import type { Schema } from '@markdoc/markdoc'

type StoryPartialProps = {
  file: string
}

const storyPartial: Schema = {
  render: 'StoryPartial',
  selfClosing: true,
  children: [],
  attributes: {
    file: { type: String, required: true },
  },
}

export { storyPartial }
export type { StoryPartialProps }

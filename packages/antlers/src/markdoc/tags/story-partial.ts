import type { Schema } from '@markdoc/markdoc'
import markdoc from '@markdoc/markdoc'

const { Tag } = markdoc

const storyPartial: Schema = {
  render: 'StoryPartial',
  selfClosing: true,
  children: [],
  attributes: {
    file: { type: String, required: true },
  },
  transform(node, config) {
    const attributes = node.transformAttributes(config)
    const children = node.transformChildren(config)
    attributes['file'] = attributes['file'].replace(/\.md$/, '')
    return new Tag(this.render, attributes, children)
  },
}

export { storyPartial }

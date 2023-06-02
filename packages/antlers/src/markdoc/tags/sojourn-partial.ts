import type { Schema } from '@markdoc/markdoc'
import markdoc from '@markdoc/markdoc'

const { Tag } = markdoc

const sojournPartial: Schema = {
  render: 'SojournPartial',
  children: [],
  attributes: {
    file: { type: String, required: true },
    link: { type: Boolean, default: true },
  },
  transform(node, config) {
    const attributes = node.transformAttributes(config)
    const children = node.transformChildren(config)
    attributes['file'] = attributes['file'].replace(/\.md$/, '')
    return new Tag(this.render, attributes, children)
  },
}

export { sojournPartial }

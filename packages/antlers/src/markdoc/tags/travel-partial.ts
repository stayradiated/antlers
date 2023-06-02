import type { Schema } from '@markdoc/markdoc'
import markdoc from '@markdoc/markdoc'

const { Tag } = markdoc

const travelPartial: Schema = {
  render: 'TravelPartial',
  selfClosing: true,
  children: [],
  attributes: {
    file: { type: String, required: true },
    animated: { type: Boolean },
    strokeWidth: { type: Number },
    strokeLength: { type: Number },
  },
  transform(node, config) {
    const attributes = node.transformAttributes(config)
    const children = node.transformChildren(config)
    attributes['file'] = attributes['file'].replace(/\.md$/, '')
    return new Tag(this.render, attributes, children)
  },
}

export { travelPartial }

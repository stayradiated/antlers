import type { Schema } from '@markdoc/markdoc'
import markdoc from '@markdoc/markdoc'

const { Tag } = markdoc

const mapPointPartial: Schema = {
  render: 'MapPointPartial',
  selfClosing: true,
  children: [],
  attributes: {
    file: { type: String, required: true },
    style: { type: String, matches: ['start', 'dot'] },
  },
  transform(node, config) {
    const attributes = node.transformAttributes(config)
    const children = node.transformChildren(config)
    attributes['file'] = attributes['file'].replace(/\.md$/, '')
    return new Tag(this.render, attributes, children)
  },
}

export { mapPointPartial }

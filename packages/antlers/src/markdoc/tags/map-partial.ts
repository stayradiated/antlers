import type { Schema } from '@markdoc/markdoc'
import markdoc from '@markdoc/markdoc'
import { ViewPortAttribute } from '../attributes/index.js'
import { assertValidChildren } from '../utils.js'

const { Tag } = markdoc

const mapPartial: Schema = {
  render: 'MapPartial',
  children: ['tag'],
  attributes: {
    file: { type: String, required: true },
    viewPort: { type: ViewPortAttribute, required: false },
  },
  validate(node) {
    return assertValidChildren(node, [
      'travelPartial',
      'mapPoint',
      'mapPointPartial',
    ])
  },
  transform(node, config) {
    const attributes = node.transformAttributes(config)
    const children = node.transformChildren(config)
    attributes['file'] = attributes['file'].replace(/\.md$/, '')
    return new Tag(this.render, attributes, children)
  },
}

export { mapPartial }

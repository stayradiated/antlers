import type { Schema } from '@markdoc/markdoc'
import markdoc from '@markdoc/markdoc'
import { ViewPortAttribute } from '../attributes/index.js'
import { assertValidChildren } from '../utils.js'

const { Tag } = markdoc

const locationPartial: Schema = {
  render: 'LocationPartial',
  children: ['tag'],
  attributes: {
    file: { type: String, required: true },
    viewPort: { type: ViewPortAttribute, required: false },
    countryMapFile: { type: String, required: false },
    showMap: { type: Boolean, required: false, default: true },
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
    attributes['countryMapFile'] = attributes['countryMapFile']
      ? attributes['countryMapFile'].replace(/\.md$/, '')
      : undefined
    return new Tag(this.render, attributes, children)
  },
}

export { locationPartial }

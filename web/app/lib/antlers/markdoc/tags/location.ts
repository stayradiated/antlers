import { Tag } from '@markdoc/markdoc'
import type { Schema } from '@markdoc/markdoc'
import { transformImage } from '../../transform-image'

const location: Schema = {
  render: 'Location',
  children: [],
  attributes: {
    arriveAt: { type: String, required: true },
    departAt: { type: String },
    location: { type: String, required: true },
    country: { type: String, required: true },
    image: { type: String },
    imageAlignV: { type: Number },
    href: { type: String },
    height: { type: Number, default: 0.5 },
  },
  transform(node, config) {
    const attributes = node.transformAttributes(config)
    const children = node.transformChildren(config)

    attributes.image = attributes.image
      ? transformImage({ source: attributes.image as string })
      : undefined

    const tagName = config.tags![node.tag!].render
    return new Tag(tagName, attributes, children)
  },
}
export { location }

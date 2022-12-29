import type { Schema } from '@markdoc/markdoc'
import { Tag } from '@markdoc/markdoc'
import { transformImage } from '../../transform-image'

const image: Schema = {
  render: 'Photo',
  attributes: {
    src: { type: String, required: true },
    alt: { type: String },
    title: { type: String },
    width: { type: Number },
    height: { type: Number },
  },
  transform(node, config) {
    const attributes = node.transformAttributes(config)
    const children = node.transformChildren(config)

    attributes.src = transformImage({
      source: attributes.src as string,
    })

    return new Tag(this.render, attributes, children)
  },
}

export { image }

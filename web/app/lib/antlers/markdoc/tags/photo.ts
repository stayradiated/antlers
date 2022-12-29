import type { Schema } from '@markdoc/markdoc'
import { Tag } from '@markdoc/markdoc'
import { transformImage } from '../../transform-image'

const photo: Schema = {
  render: 'Photo',
  children: [],
  attributes: {
    caption: { type: String },
    src: { type: String, required: true },
    fullWidth: { type: Boolean, default: true },
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
export { photo }

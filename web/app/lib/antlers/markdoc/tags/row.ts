import type { Schema } from '@markdoc/markdoc'
import { Tag } from '@markdoc/markdoc'

const row: Schema = {
  render: 'Row',
  children: ['tag', 'paragraph'],
  attributes: {},
  transform(node, config) {
    const attributes = node.transformAttributes(config)
    let children = node.transformChildren(config)

    if (
      children.length === 1 &&
      children[0] instanceof Tag &&
      children[0].name === 'p'
    ) {
      children = children[0].children
    }

    return new Tag(this.render, attributes, children)
  },
}
export { row }
